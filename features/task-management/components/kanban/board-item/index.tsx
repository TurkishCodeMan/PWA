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
import { Address, Prisma, User } from "@prisma/client";
import { upperFirstLetter } from "@/shared/utils/util-func";
import {
  useCreateTask,
  useDeleteTask,
  useTaskAddMembers,
  useTaskRemoveMembers,
  useUpdateTask,
  useUpdateTaskDetail,
} from "@/entities/task/model";
import { useMyCompany } from "@/entities/company/model";
import { Input } from "@/shared/components/input";
import { useUpdateAddress } from "@/entities/address/model";
import Downshift, { useCombobox } from "downshift";
import { TaskDetailsModal } from "./task-details";
const taskWithUsers = Prisma.validator<Prisma.TaskArgs>()({
  include: {
    users: true,
    address: true,
    owner: true,
  },
});

export type TaskWithUsers = Prisma.TaskGetPayload<typeof taskWithUsers>;

//TODO:Add Unit Test And To make in backend
function calculateProgressInDays(item: TaskWithUsers) {
  var t2 = new Date().getTime();
  var t1 = item.endDate
    ? new Date(item.endDate).getTime()
    : new Date().getTime();
  const result = Math.floor((t2 - t1) / (24 * 3600 * 1000));

  return Math.abs(result) * 1;
}

function getUserFilter(inputValue: string) {
  const lowerCasedInputValue = inputValue.toLowerCase();

  return function usersFilter(user: User) {
    return (
      !inputValue ||
      (user?.name as string).toLowerCase().includes(lowerCasedInputValue) ||
      user.email.toLowerCase().includes(lowerCasedInputValue)
    );
  };
}

export function BoardItem({
  item,
  index,
  taskGroupId,
  isLoadingTaskGroup,
  boards,
}: {
  item: TaskWithUsers;
  index: number;
  taskGroupId: string;
  isLoadingTaskGroup: boolean;
  boards: { id: string; name: string }[];
}) {
  const { id, name, users, address, ownerId } = item;

  let [isOpen, setIsOpen] = React.useState(false);

  const [addressClient, setAddressClient] = React.useState({ ...address });

  const [popoverType, setType] = React.useState<number>(0);
  const [selectedUserTags, setSelectedUserTags] = React.useState<string[]>([
    ...users?.map((val) => val.email),
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
  const { mutateAsync: updateTaskGroup, isLoading: isLoadingTask } =
    useUpdateTask();
  const { mutateAsync: deleteTask, isLoading: isLoadingDelete } =
    useDeleteTask();
  const { mutateAsync: addMembers, isLoading: isLoadingMembers } =
    useTaskAddMembers();
  const { mutateAsync: removeMembers, isLoading: isLoadingRemoveMembers } =
    useTaskRemoveMembers();
  const { mutateAsync: updateAddress, isLoading: isLoadingAddress } =
    useUpdateAddress();
  const [companyEmployees, setCompanyEmployees] = React.useState(
    company?.employees ?? []
  );

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
  async function updateMove(destId: string) {
    await updateTaskGroup({
      taskId: id,
      destinationGroupId: destId,
      sourceGroupId: "",
    });
  }

  function selectUser(email: string) {
    if (!selectedUserTags.includes(email)) {
      return setSelectedUserTags((curr) => [...curr, email]);
    }
    return setSelectedUserTags((curr) => curr.filter((val) => val != email));
  }

  async function removeSelectUser(email: string) {
    await removeMembers({
      id: item.id,
      members: [email],
    });
    return setSelectedUserTags((curr) => curr.filter((val) => val != email));
  }

  async function addTeamMember(item: TaskWithUsers, user: User) {
    await addMembers({
      id: item.id,
      members: [user.email],
    });
    return selectUser(user.email);
  }

  //TODO: rxjs ile switchMap kullan tuş basımına göre
  function onChange(event: any) {
    event.preventDefault();
    setAddressClient((curr) => ({
      ...curr,
      [event.target?.name]: event?.target?.value,
    }));
  }

  function autoSaveAddress() {
    console.log("---");
    return updateAddressTask().execute<
      Address & { taskGroupId: string; taskId: string }
    >(updateAddress, {
      ...(addressClient as Address),
      id: item.addressId as string,
      taskGroupId: item.taskGroupId as string,
      taskId: id,
    });
  }

  function updateAddressTask() {
    return {
      execute: async function <T>(fn: any, args: T) {
        return await fn(args);
      },
    };
  }

  React.useEffect(() => {
    setCompanyEmployees(company?.employees ?? []);
    console.log(companyEmployees, company?.employees);
  }, [isLoadingCompany, company]);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <>
          <Popover
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={style["popover"]}
          >
            <li
              className={clsx(
                style["board-item"],
                (isLoadingTaskGroup || isLoadingTask) && style["updating"]
              )}
            >
              <div className={style["item-header"]}>
                <Input
                  value={addressClient?.address}
                  size_type="small"
                  name="address"
                  contentEditable
                  placeholder="Address"
                  onChange={onChange}
                  onBlur={autoSaveAddress}
                />
             

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
                      data-testid="three-dot"
                      onClick={() => setType(2)}
                      className={clsx("icon")}
                    />
                  </Popover.Button>
                </div>
              </div>
              <div className={style["item-info"]}>
                <div className={style["owner"]}>
                  <UserCircleIcon className={clsx("icon")} />
                  <span>{item?.owner?.name}</span>
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
                          
                            <PlusCircleIcon className={clsx("icon")} />
                          
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
                            <Downshift
                              onChange={(selection) =>
                                selectUser(selection.email)
                              }
                              itemToString={(item) =>
                                item ? `${item.name}` : ""
                              }
                            >
                              {({
                                getInputProps,
                                getItemProps,
                                getLabelProps,
                                getMenuProps,
                                getToggleButtonProps,
                                isOpen,
                                inputValue,
                                highlightedIndex,
                                selectedItem,

                                getRootProps,
                              }) => (
                                <div
                                  {...getRootProps(
                                    {},
                                    { suppressRefError: true }
                                  )}
                                  className={style["add-user-content"]}
                                >
                                  <ul className={clsx(style["user-list"])}>
                                    {item.users.map((user, index) => (
                                      <li
                                        key={user.id}
                                        className={clsx(
                                          style["user"],

                                          selectedUserTags.includes(user.email)
                                            ? style["selected"]
                                            : ""
                                        )}
                                        {...getItemProps({
                                          item: user,
                                          index,
                                          key: user.id,
                                        })}
                                      >
                                        <div className={style["user-header"]}>
                                          <div className={style["avatar"]}>
                                            <p>
                                              {upperFirstLetter(
                                                user.name as string
                                              )}
                                            </p>
                                          </div>
                                          <p>
                                            {user.name}{" "}
                                            {user.lastName as string}
                                          </p>
                                        </div>
                                        <XMarkIcon
                                          onClick={async (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            await removeSelectUser(user.email);
                                          }}
                                          className={clsx(
                                            "icon",
                                            style["close-icon"]
                                          )}
                                        />
                                      </li>
                                    ))}
                                  </ul>

                                  <div className={style["search-content"]}>
                                    <div className={style["search-bar"]}>
                                      <input
                                        type="search"
                                        name="search"
                                        id="search"
                                        {...getInputProps()}
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

                                  <div
                                    {...getMenuProps()}
                                    className={style["finish-team"]}
                                  >
                                    <h3>Finish Team</h3>

                                    {companyEmployees
                                      .filter((val) =>
                                        getUserFilter(inputValue as string)(val)
                                      )
                                      .map((user, index) => (
                                        <div
                                          key={user.id}
                                          onClick={() =>
                                            addTeamMember(item, user)
                                          }
                                          className={style["user-large"]}
                                        >
                                          <div className={style["avatar"]}>
                                            <p>
                                              {upperFirstLetter(
                                                user.name as string
                                              )}
                                            </p>
                                          </div>
                                          <p>{user.name as string}</p>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              )}
                            </Downshift>
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
                  {({ close }) => (
                    <div className={style["menu-content"]}>
                      <ul>
                        <li onClick={() => setIsOpen((curr) => !curr)}>
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
                              {boards
                                .filter((val) => val.id != taskGroupId)
                                .map((val) => (
                                  <Menu.Item
                                    key={val.id}
                                    onClick={async () => {
                                      await updateMove(val.id);
                                      close();
                                    }}
                                    as="div"
                                    className={style["menu-item"]}
                                  >
                                    {({ active }) => <div>{val.name}</div>}
                                  </Menu.Item>
                                ))}
                            </Menu.Items>
                          </Menu>
                        </li>
                        <li onClick={deleteTaskFn}>
                          <MinusCircleIcon className={clsx("icon")} />
                          Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </Popover.Panel>
              </Transition>
            )}
          </Popover>

          {/* {isOpen && (
            <TaskDetailsModal
              task={item}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          )} */}
        </>
      )}
    </Draggable>
  );
}
