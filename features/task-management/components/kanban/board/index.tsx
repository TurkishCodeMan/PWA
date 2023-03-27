import React, { PropsWithChildren, Fragment } from "react";
import style from "./style.module.scss";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Droppable } from "react-beautiful-dnd";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { Button } from "@/shared/components/button";
import { Form, Formik } from "formik";
import { Input } from "@/shared/components/input";
import DatePicker from "react-datepicker";
import { GiWorld } from "react-icons/gi";
import { useCreateTask } from "@/entities/task/model";


interface BoardTypes {
  title: string;
  id: string;
  index: string;
}

export function Board({
  children,
  id,
  index,
  title = "",
}: PropsWithChildren<BoardTypes>) {
  const [seeAll, setSeeAll] = React.useState(false);
  let [isOpen, setIsOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const [taskInitial, setTaskInitial] = React.useState({
    address: "",
    city: "",
    zipCode: "",
  });

  const { mutateAsync: createTask, isLoading } = useCreateTask();
 
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <>
          <Popover as="div" className={style["popover"]}>
            <article
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={clsx(style["board"], seeAll && style["board-open"])}
            >
              <div className={style["board-header"]}>
                <h2>{title}</h2>

                <span>
                  <div className={style["plus-area"]}>
                    <PlusIcon className={clsx("icon")} />
                  </div>
                  <Popover.Button className={style["popover-button"]}>
                    <span>
                      <EllipsisVerticalIcon className={clsx("icon")} />
                    </span>
                  </Popover.Button>
                </span>

                <Popover.Panel className={style["popover-panel"]}>
                  <div className={style["popover-content"]}>
                    <h2>Set default for all items</h2>
                    <div className={style["options"]}>
                      <div className={style["selection"]}>
                        <label htmlFor="radio">
                          <input type="radio" name="radio" id="radio" />
                        </label>
                        <p>Geolocation</p>
                      </div>
                      <div className={style["selection"]}>
                        <label htmlFor="radio">
                          <input type="radio" name="radio" id="radio" />
                        </label>
                        <p>Auto archive</p>
                      </div>
                      <Button onClick={() => setIsOpen(true)} size="small">
                        New Item
                      </Button>
                    </div>
                  </div>
                </Popover.Panel>
              </div>

              <ul className={style["board-items"]}>{children}</ul>
              {provided.placeholder}
              <span
                role="button"
                onClick={() => setSeeAll((curr) => !curr)}
                className={clsx(style["see-all"])}
              >
                {seeAll ? "Collapse" : "See All"}
              </span>
            </article>
          </Popover>

          <Transition
            show={isOpen}
            as={Fragment}
            enter={"enter-transition"}
            enterFrom={"enter-from-transition"}
            enterTo={"enter-to-transition"}
            leave={"leave-transition"}
            leaveFrom={"leave-from-transition"}
            leaveTo={"leave-to-transition"}
          >
            <Dialog
              as="div"
              className={style["dialog"]}
              open={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter={"enter-transition"}
                enterFrom={"enter-from-transition"}
                enterTo={"enter-to-transition"}
                leave={"leave-transition"}
                leaveFrom={"leave-from-transition"}
                leaveTo={"leave-to-transition"}
              >
                <Dialog.Overlay
                  className={style["dialog-overlay"]}
                  as="div"
                ></Dialog.Overlay>
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter={"enter-transition"}
                enterFrom={"enter-from-transition"}
                enterTo={"enter-to-transition"}
                leave={"leave-transition"}
                leaveFrom={"leave-from-transition"}
                leaveTo={"leave-to-transition"}
              >
                <div className={style["panel-container"]}>
                  <Dialog.Panel as="div" className={style["dialog-panel"]}>
                    <Dialog.Title className={style["dialog-title"]}>
                      Task Details{" "}
                    </Dialog.Title>

                    <div className={style["modal-detail"]}>
                      <Formik
                        initialValues={{ ...taskInitial }}
                        onSubmit={async (values, { setSubmitting }) => {
                          await createTask({
                            ...values,
                            taskGroupId: id,
                            startDate,
                            endDate,
                          }).then(() => setIsOpen(false));
                          setSubmitting(false);
                        }}
                      >
                        {({ isSubmitting, getFieldProps }) => (
                          <Form>
                            <div className={style["formik-panel"]}>
                              <Form id="task" className={style["task-form"]}>
                                <label htmlFor="address">
                                  <Input
                                    type="text"
                                    placeholder="Adresse"
                                    id="address"
                                    {...getFieldProps("address")}
                                  />
                                </label>

                                <label htmlFor="city">
                                  <Input
                                    className={style["input"]}
                                    type="text"
                                    placeholder="City"
                                    id="city"
                                    {...getFieldProps("city")}
                                  />
                                </label>
                                <label htmlFor="zipCode">
                                  <Input
                                    className={style["input"]}
                                    type="text"
                                    placeholder="Zip-code"
                                    id="zipCode"
                                    {...getFieldProps("zipCode")}
                                  />
                                </label>

                                <div className={style["date-select-container"]}>
                                  <label
                                    className={style["start-select"]}
                                    htmlFor="start-select"
                                  >
                                    Start Date
                                    <DatePicker
                                      selected={startDate}
                                      onChange={(date) =>
                                        setStartDate(date as Date)
                                      }
                                      timeInputLabel="Time:"
                                      dateFormat="MM/dd/yyyy h:mm aa"
                                      showTimeInput
                                    />
                                  </label>
                                  <label
                                    className={style["end-select"]}
                                    htmlFor="end-select"
                                  >
                                    End Date
                                    <DatePicker
                                      selected={endDate}
                                      onChange={(date) =>
                                        setEndDate(date as Date)
                                      }
                                      timeInputLabel="Time:"
                                      dateFormat="MM/dd/yyyy h:mm aa"
                                      showTimeInput
                                    />
                                  </label>
                                </div>
                              </Form>

                              <div className={style["geolocation"]}>
                                <GiWorld size={120} />
                                <p>Turn geo location for this item</p>
                                <label htmlFor="geolocation">
                                  <input
                                    type="checkbox"
                                    name="geolocation"
                                    id="geolocation"
                                  />
                                </label>
                                <div className={style["work-time"]}>
                                  <p className={style["start-time"]}>
                                    StartDate
                                    <div>
                                      {startDate.getHours() +
                                        `:` +
                                        startDate.getMinutes()}
                                    </div>
                                  </p>
                                  <p className={style["end-time"]}>
                                    EndDate
                                    <div>
                                      {endDate.getHours() +
                                        `:` +
                                        endDate.getMinutes()}
                                    </div>
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className={style["actions"]}>
                              <Button
                                intent="secondary"
                                type="submit"
                                disabled={isLoading}
                              >
                                Submit
                              </Button>
                              <Button onClick={() => setIsOpen(false)}>
                                Cancel
                              </Button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </Dialog.Panel>
                </div>
              </Transition.Child>
            </Dialog>
          </Transition>
        </>
      )}
    </Droppable>
  );
}
