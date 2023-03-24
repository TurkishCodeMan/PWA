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
import { Prisma, Task } from "@prisma/client";
import { upperFirstLetter } from "@/shared/utils/util-func";
const taskWithUsers = Prisma.validator<Prisma.TaskArgs>()({
  include: {
    users: true,
  },
});

export type TaskWithUsers = Prisma.TaskGetPayload<typeof taskWithUsers>;

export function BoardItem({
  item,
  index,
  isLoadingTaskGroup,
}: {
  item: TaskWithUsers;
  index: number;
  isLoadingTaskGroup: boolean;
}) {
  const { id, name, users } = item;

  const [popoverType, setType] = React.useState<number>(0);

  const [selectionRange, setSelectionRange] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  function calendarOnChange({
    selection,
  }: {
    selection: typeof selectionRange;
  }) {
    return setSelectionRange([selection] as any);
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
              <h3>{name}</h3>
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
                <span></span>
              </div>

              <div className={style["user-detail"]}>
                <Popover as="div" className={style["add-user"]}>
                  {users?.length > 0 ? (
                    users.map((user) => (
                      <div key={user.id} className={style["avatar"]}>
                        <p>{upperFirstLetter(user.name ?? "")}</p>
                      </div>
                    ))
                  ) : (
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
                  )}

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
                        <div className={style["add-user-content"]}>
                          <div className={style["user-list"]}>
                            <div className={style["user"]}>
                              <div className={style["user-header"]}>
                                <div className={style["avatar"]}>
                                  <p>HA</p>
                                </div>
                                <p>Erdem Demir</p>
                              </div>
                              <XMarkIcon className="icon" />
                            </div>
                          </div>

                          <div className={style["search-content"]}>
                            <div className={style["search-bar"]}>
                              <input type="search" name="search" id="search" />
                              <span>
                                <MagnifyingGlassIcon
                                  className={clsx("icon", style["search-icon"])}
                                />
                              </span>
                            </div>
                            <div className={style["add-user"]}>
                              <UserPlusIcon
                                className={clsx("icon", style["user-add-icon"])}
                              />
                            </div>
                          </div>

                          <div className={style["finish-team"]}>
                            <h3>Finish Team</h3>
                            <div className={style["user-large"]}>
                              <div className={style["avatar"]}>
                                <p>HA</p>
                              </div>
                              <p>Huseyin Altikulac</p>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  )}
                </Popover>
              </div>
            </div>
          </li>
          {popoverType == 0 && (
            <Transition
              enter={style["enter-transition"]}
              enterFrom={style["enter-from-transition"]}
              enterTo={style["enter-to-transition"]}
              leave={style["leave-transition"]}
              leaveFrom={style["leave-from-transition"]}
              leaveTo={style["leave-to-transition"]}
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
              enter={style["enter-transition"]}
              enterFrom={style["enter-from-transition"]}
              enterTo={style["enter-to-transition"]}
              leave={style["leave-transition"]}
              leaveFrom={style["leave-from-transition"]}
              leaveTo={style["leave-to-transition"]}
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
              enter={style["enter-transition"]}
              enterFrom={style["enter-from-transition"]}
              enterTo={style["enter-to-transition"]}
              leave={style["leave-transition"]}
              leaveFrom={style["leave-from-transition"]}
              leaveTo={style["leave-to-transition"]}
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
                    <li>
                      <MinusCircleIcon className={clsx("icon")} />
                      Delete
                    </li>
                  </ul>
                </div>
              </Popover.Panel>
            </Transition>
          )}

          {popoverType == 3 && (
            <Transition
              enter={style["enter-transition"]}
              enterFrom={style["enter-from-transition"]}
              enterTo={style["enter-to-transition"]}
              leave={style["leave-transition"]}
              leaveFrom={style["leave-from-transition"]}
              leaveTo={style["leave-to-transition"]}
            >
              <Popover.Panel className={style["user-panel"]}>
                <div className={style["user-content"]}>sdfsdfsdfsd</div>
              </Popover.Panel>
            </Transition>
          )}
        </Popover>
      )}
    </Draggable>
  );
}
