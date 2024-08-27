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
import { TaskDetailsModal } from "../board-item/task-details";
import { TaskWithUsers } from "../board-item";

interface BoardTypes {
  title: string;
  id: string;
  index: number;
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
  const [taskShadow, setTaskShadow] = React.useState<TaskWithUsers>();

  const [taskInitial, setTaskInitial] = React.useState({
    address: "",
    city: "",
    zipCode: "",
  });

  const { mutateAsync: createTask, isLoading } = useCreateTask();


  async function addTask({address="",city= "",zipCode="",coords=[],taskGroupId}:{address:string, city:string, zipCode:string,coords:number[],taskGroupId:string}){
    console.log('burada',address,city,zipCode,taskGroupId)
     await createTask({
      address,
      city,
      zipCode,
      coords,
      startDate:new Date(),
      endDate:new Date(),
      taskGroupId
    })
  }


  return (
  <>
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <article
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Popover as="div" className={style["popover"]}>
            <div
              className={clsx(style["board"], (seeAll && style["board-open"]),(isLoading && style['loading']))}
            >
              <div className={style["board-header"]}>
                <h2>{title}</h2>

                <span>
                  <div onClick={()=>setIsOpen(true)}  role="button"  className={style["plus-area"]}>
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
                      <Button onClick={() => setIsOpen(false)} size="small">
                       Save
                      </Button>
                    </div>
                  </div>
                </Popover.Panel>
              </div>
              <Droppable droppableId={id} type="task">
                {(provided, snapshot) => (
                  <>
                    <ul
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={style["board-items"]}
                    >
                      {children}
                    </ul>
                    {provided.placeholder}
                  </>
                )}
              </Droppable>

              <span
                role="button"
                onClick={() => setSeeAll((curr) => !curr)}
                className={clsx(style["see-all"])}
              >
                {seeAll ? "Collapse" : "See All"}
              </span>
            </div>
          </Popover>

     
        </article>
      )}
    </Draggable>
     {isOpen && (
      <TaskDetailsModal
        task={taskShadow}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addTask={addTask}
        taskGroupId={id}
      />
    )}</>
  );
}
