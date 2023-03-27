import style from "./style.module.scss";
import {
  EllipsisVerticalIcon,
  ChatBubbleLeftIcon,
  CalendarIcon,
  UserCircleIcon,
  ArrowTopRightOnSquareIcon,
  DocumentDuplicateIcon,
  ArrowDownOnSquareIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import clsx from "clsx";
import { DateRange } from "react-date-range";
import { Popover, Transition, Menu } from "@headlessui/react";
import { Button } from "@/shared/components/button";
import { Draggable } from "react-beautiful-dnd";
import { Prisma } from "@prisma/client";
import { upperFirstLetter } from "@/shared/utils/util-func";
import {
  useDeleteTask,
  useTaskAddMembers,
  useUpdateTaskDetail,
} from "@/entities/task/model";
import { useMyCompany } from "@/entities/company/model";
const taskWithUsers = Prisma.validator<Prisma.TaskArgs>()({
  include: {
    users: true,
    address: true,
  },
});

export type TaskWithUsers = Prisma.TaskGetPayload<typeof taskWithUsers>;

function calculateProgressInDays(item: TaskWithUsers) {
  var t2 = new Date().getTime();
  var t1 = item.endDate
    ? new Date(item.endDate).getTime()
    : new Date().getTime();
  const result = Math.floor((t2 - t1) / (24 * 3600 * 1000));

  return Math.abs(result) * 1;
}

export function BoardItem({
  item,
  index,
  isLoadingTaskGroup,
}: {
  item: TaskWithUsers;
  index: number;
  isLoadingTaskGroup: boolean;
}) {
  const { id, name, users, address } = item;

  const [popoverType, setType] = React.useState<number>(0);
  const [selectedUserTags, setSelectedUserTags] = React.useState<string[]>([
    ...users.map((val) => val.email),
  ]);
  const [selectionRange, setSelectionRange] = React.useState([
    {
      startDate: new Date(item.startDate),
      endDate: new Date(item.endDate ?? Date.now()),
      key: "selection",
    },
  ]);
  const { data: company, isLoading: isLoadingCompany } = useMyCompany();

  const { mutateAsync: updateTask, isLoading } = useUpdateTaskDetail();
  const { mutateAsync: deleteTask, isLoading: isLoadingDelete } =
    useDeleteTask();
  const { mutateAsync: addMembers, isLoading: isLoadingMembers } =
    useTaskAddMembers();

  async function calendarOnChange({ selection }: { selection: any }) {
    setSelectionRange([selection] as any);
    await updateTask({
      ...item,
      startDate: selection?.startDate as Date,
      endDate: selection?.endDate as Date,
    });
  }
  async function deleteTaskFn() {
    await deleteTask({ id: item.id });
  }

  function selectUser(email: string) {
    if (!selectedUserTags.includes(email)) {
      return setSelectedUserTags((curr) => [...curr, email]);
    }
    return setSelectedUserTags((curr) => curr.filter((val) => val != email));
  }

  async function addTeamMember() {
    if (selectedUserTags.length > 0) {
       return addMembers({
        id: item.id,
        members: selectedUserTags,
      })
    }
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Popover
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={style["popover"]}
        >
          <li
            className={clsx(
              style["board-item"],
              isLoadingTaskGroup && style["updating"]
            )}
          >
            <div className={style["item-header"]}>
              <h3>
                {address.address} {address.zipCode}
              </h3>
              <div className={style["actions"]}>
                <Popover.Button key={1} className={style["popover-button"]}>
                  <CalendarIcon
                    onClick={() => setType(0)}
                    className={clsx("icon")}
                  />

                  <ChatBubbleLeftIcon
                    onClick={() => setType(1)}
                    className={clsx("icon")}
                  />

                  <EllipsisVerticalIcon
                    onClick={() => setType(2)}
                    className={clsx("icon")}
                  />
                </Popover.Button>
              </div>
            </div>
            <div className={style["item-info"]}>
              <div className={style["owner"]}>
                <UserCircleIcon className={clsx("icon")} />
              </div>
              <div className={style["progress"]}>
                <span
                  role="progress"
                  style={{
                    width: `${calculateProgressInDays(item) * 10}%`,
                  }}
                ></span>
              </div>

              <div className={style["user-detail"]}>
                <Popover as="div" className={style["add-user"]}>
                  <div className={style["user-area"]}>
                    {users.map((user) => (
                      <div key={user.id} className={style["avatar"]}>
                        <p>{upperFirstLetter(user.name ?? "")}</p>
                      </div>
                    ))}
                    <div className={style["empty"]}>
                      <Popover.Button
                        className={style["popover-button"]}
                        onClick={() => setType(3)}
                      >
                        <p>
                          <PlusCircleIcon className={clsx("icon")} />
                        </p>
                      </Popover.Button>
                    </div>
                  </div>

                  {popoverType == 3 && (
                    <Transition
                      enter={style["enter-transition"]}
                      enterFrom={style["enter-from-transition"]}
                      enterTo={style["enter-to-transition"]}
                      leave={style["leave-transition"]}
                      leaveFrom={style["leave-from-transition"]}
                      leaveTo={style["leave-to-transition"]}
                    >
                      <Popover.Panel className={style["add-user-panel"]}>
                        {({ close }) => (
                          <div className={style["add-user-content"]}>
                            <div className={style["user-list"]}>
                              {company?.employees.map((user, index) => (
                                <div
                                  key={user.id}
                                  onClick={() => selectUser(user.email)}
                                  className={clsx(
                                    style["user"],

                                    selectedUserTags.includes(user.email)
                                      ? style["selected"]
                                      : ""
                                  )}
                                >
                                  <div className={style["user-header"]}>
                                    <div className={style["avatar"]}>
                                      <p>
                                        {upperFirstLetter(user.name as string)}
                                      </p>
                                    </div>
                                    <p>
                                      {user.name} {user.lastName as string}
                                    </p>
                                  </div>
                                  <XMarkIcon className="icon" />
                                </div>
                              ))}
                            </div>

                            <div className={style["search-content"]}>
                              <div className={style["search-bar"]}>
                                <input
                                  type="search"
                                  name="search"
                                  id="search"
                                />
                                <span>
                                  <MagnifyingGlassIcon
                                    className={clsx(
                                      "icon",
                                      style["search-icon"]
                                    )}
                                  />
                                </span>
                              </div>
                              <div className={style["add-user"]}>
                                <UserPlusIcon
                                  className={clsx(
                                    "icon",
                                    style["user-add-icon"]
                                  )}
                                />
                              </div>
                            </div>

                            <div className={style["finish-team"]}>
                              <h3>Finish Team</h3>
                              {item.users.map((user, index) => (
                                <div key={user.id} className={style["user-large"]}>
                                  <div className={style["avatar"]}>
                                    <p>
                                      {upperFirstLetter(user.name as string)}
                                    </p>
                                  </div>
                                  <p>{user.name as string}</p>
                                </div>
                              ))}
                            </div>

                            <Button
                              onClick={async () => {
                                await addTeamMember();
                                close()
                                setSelectedUserTags([])
                              }}
                              disabled={isLoadingMembers}
                              className={style["save-btn"]}
                            >
                              Save
                            </Button>
                          </div>
                        )}
                      </Popover.Panel>
                    </Transition>
                  )}
                </Popover>
              </div>
            </div>
          </li>
          {popoverType == 0 && (
            <Transition
              enter={"enter-transition"}
              enterFrom={"enter-from-transition"}
              enterTo={"enter-to-transition"}
              leave={"leave-transition"}
              leaveFrom={"leave-from-transition"}
              leaveTo={"leave-to-transition"}
            >
              <Popover.Panel className={style["calendar-panel"]}>
                <div className={style["calendar"]}>
                  <DateRange
                    ranges={selectionRange}
                    moveRangeOnFirstSelection={false}
                    editableDateInputs={true}
                    onChange={calendarOnChange as any}
                  />
                </div>
              </Popover.Panel>
            </Transition>
          )}
          {popoverType == 1 && (
            <Transition
              enter={"enter-transition"}
              enterFrom={"enter-from-transition"}
              enterTo={"enter-to-transition"}
              leave={"leave-transition"}
              leaveFrom={"leave-from-transition"}
              leaveTo={"leave-to-transition"}
            >
              <Popover.Panel className={style["text-box-panel"]}>
                <div className={style["text-box-content"]}>
                  <h3>Leave a commit to the group</h3>
                  <textarea
                    rows={10}
                    cols={2}
                    name="content"
                    className={style["text-area"]}
                  ></textarea>
                  <div className={style["footer"]}>
                    <Button>Submit</Button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          )}

          {popoverType == 2 && (
            <Transition
              enter={"enter-transition"}
              enterFrom={"enter-from-transition"}
              enterTo={"enter-to-transition"}
              leave={"leave-transition"}
              leaveFrom={"leave-from-transition"}
              leaveTo={"leave-to-transition"}
            >
              <Popover.Panel className={style["menu-panel"]}>
                <div className={style["menu-content"]}>
                  <ul>
                    <li>
                      <ArrowTopRightOnSquareIcon className={clsx("icon")} />
                      Open Item
                    </li>
                    <li>
                      <DocumentDuplicateIcon className={clsx("icon")} />
                      Copy
                    </li>
                    <li>
                      <Menu as="div" className={style["menu"]}>
                        <Menu.Button className={style["menu-button"]}>
                          <ArrowDownOnSquareIcon className={clsx("icon")} />
                          Move to
                        </Menu.Button>
                        <Menu.Items className={style["menu-items"]}>
                          <Menu.Item as="div" className={style["menu-item"]}>
                            {({ active }) => <div>Starters</div>}
                          </Menu.Item>
                          <Menu.Item as="div" className={style["menu-item"]}>
                            {({ active }) => <div>Finish</div>}
                          </Menu.Item>
                          <Menu.Item as="div" className={style["menu-item"]}>
                            {({ active }) => <div>Outdoors</div>}
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    </li>
                    <li onClick={deleteTaskFn}>
                      <MinusCircleIcon className={clsx("icon")} />
                      Delete
                    </li>
                  </ul>
                </div>
              </Popover.Panel>
            </Transition>
          )}
        </Popover>
      )}
    </Draggable>
  );
}
