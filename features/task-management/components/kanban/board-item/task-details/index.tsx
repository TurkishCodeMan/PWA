import React, { PropsWithChildren, Fragment } from "react";
import style from "./style.module.scss";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { Button } from "@/shared/components/button";
import { Form, Formik } from "formik";
import { Input } from "@/shared/components/input";
import DatePicker from "react-datepicker";
import { GiWorld } from "react-icons/gi";
import { TaskGroupWithTasks, useCreateTask } from "@/entities/task/model";
import { TaskWithUsers } from "..";
import { AdressSearch } from "../adress-search";

export function TaskDetailsModal({
  task,
  isOpen,
  setIsOpen,
  addTask,
  taskGroupId,
}: {
  task: TaskWithUsers | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addTask: any;
  taskGroupId: string;
}) {
  const [taskInitial, setTaskInitial] = React.useState({
    address: task?.address?.address,
    city: task?.address?.city,
    zipCode: task?.address?.zipCode,
  });

  const [startDate, setStartDate] = React.useState(
    new Date(task?.startDate as Date)
  );
  const [endDate, setEndDate] = React.useState(
    new Date(task?.endDate ?? Date.now())
  );
  const [selectedAdress, setSelectedAdress] = React.useState('' as any);

  return (
    <Transition
      show={isOpen}
      as={"div"}
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
        <Dialog.Overlay
          className={style["dialog-overlay"]}
          as="div"
        ></Dialog.Overlay>

        <div className={style["panel-container"]}>
          <Dialog.Panel as="div" className={style["dialog-panel"]}>
            <Dialog.Title className={style["dialog-title"]}>
              Task Details{" "}
            </Dialog.Title>

            <div className={style["modal-detail"]}>
              <Formik
                initialValues={{ ...taskInitial }}
                
                onSubmit={async (val) =>
                  //TODO: rxjs işlem pending yap
                  {
                    setIsOpen(false);
                    addTask({
                      address: selectedAdress?.adressebetegnelse,
                      city: val.city,
                      zipCode: val.zipCode,
                      taskGroupId: taskGroupId,
                      coords:selectedAdress?.adgangsadresse?.vejpunkt?.koordinater
                    });
                  }
                }
              >
                {({ isSubmitting, getFieldProps }) => (
                  <Form>
                    <div className={style["formik-panel"]}>
                      <Form id="task" className={style["task-form"]}>
                        <label htmlFor="address">
                          {/* <Input
                            type="text"
                            placeholder="Adresse"
                            id="address"
                            {...getFieldProps("address")}
                          /> */}
                          <AdressSearch selectedAdress={selectedAdress} setSelectedAdress={setSelectedAdress}/>
                        </label>

                        <div className={style["date-select-container"]}>
                          {/* <label
                            className={style["start-select"]}
                            htmlFor="start-select"
                          >
                            Start Date
                            <DatePicker
                              withPortal
                              portalId="modal"
                              selected={startDate}
                              onChange={(date) => setStartDate(date as Date)}
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
                              withPortal
                              portalId="modal"
                              onChange={(date) => setEndDate(date as Date)}
                              timeInputLabel="Time:"
                              dateFormat="MM/dd/yyyy h:mm aa"
                              showTimeInput
                            />
                          </label> */}
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
                              {endDate.getHours() + `:` + endDate.getMinutes()}
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={style["actions"]}>
                      <Button intent="secondary" type="submit">
                        Submit
                      </Button>
                      <Button intent="primary" onClick={() => setIsOpen(false)}>Cancel</Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
