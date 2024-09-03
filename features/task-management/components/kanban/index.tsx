"use client";

import style from "./style.module.scss";
import React from "react";

import { BoardItem, TaskWithUsers } from "./board-item";
import { Board } from "./board";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import {
  TaskGroupWithTasks,
  useAllTaskGroups,
  useUpdateTask,
} from "@/entities/task/model";
import { useSession } from "next-auth/react";

export function Kanban() {
  // SEARCH YAP DOWNSHİFT
 // const { data: session, status } = useSession();


  const { data, isLoading } = useAllTaskGroups();
  const { mutateAsync: updateTaskGroup, isLoading: isLoadingTaskGroup } =
    useUpdateTask();

  const [tasksShadow, setTaskShadow] = React.useState<TaskWithUsers[]>([]);
  const [newTasks,setNewTasks]=React.useState<any>([])

  async function onDragEnd(val: DropResult) {
    console.log(val);
    if (!val.destination) return;

    if (val.type === "task") {
      let newBoardData = data as TaskGroupWithTasks[];
      var dragItem = (data as TaskGroupWithTasks[])
        .find((v) => v.id === val.source.droppableId)
        ?.tasks.find((v) => v.id == val.draggableId);

      newBoardData
        .find((v) => v.id === val.source.droppableId)
        ?.tasks.splice(val.source.index, 1);

      newBoardData
        .find((v) => v.id === val?.destination?.droppableId)
        ?.tasks.splice(val?.destination?.index as number, 0, dragItem as any);

      await updateTaskGroup({
        taskId: val.draggableId,
        destinationGroupId: val.destination.droppableId,
        sourceGroupId: val.source.droppableId,
      });
    }

    if (val.type === "column") {
      //TODO:
      // await updateTaskGroupOrder({
      //   id:data?.[val.source.index-1].id as string,
      //   newOrder:val.destination.index
      // })
    }
  }

  React.useEffect(() => {}, []);

  //TODO: TÜM İŞLEMLERİ YAPARKEN SOLIDI DÜŞÜN BASİT VE SADE ANLAŞILIR OLMALI

  return (
    <DragDropContext
      onDragStart={() => {}}
      onDragUpdate={() => {}}
      onDragEnd={onDragEnd}
    >
      <div className={style["kanban"]}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              
              {(provided) => (
                <div
                  className={style["all-columns"]}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                   <Board
                      className={style['new-task-board']}
                      key={'new-task'}
                      id={'new-task-id'}
                      index={0}
                      title={'New Task'}
                    >
                      {[...newTasks].map((item, index) => (
                        <BoardItem
                          key={item.id}
                          index={index}
                          item={item}
                          taskGroupId={'new-task-id'}
                          boards={[{id:'new-task-id',name:'New Task'}]}
                          isLoadingTaskGroup={isLoadingTaskGroup}
                        />
                      ))}
                    </Board>
                  {data?.map((board, bIndex) => (
                    <Board
                      key={board.id}
                      id={board.id}
                      index={board.order as number}
                      title={board.name}
                    >
                      {[...board?.tasks].map((item, index) => (
                        <BoardItem
                          key={item.id}
                          index={index}
                          item={item}
                          taskGroupId={board.id}
                          boards={data?.map((val) => ({
                            id: val.id,
                            name: val.name,
                          }))}
                          isLoadingTaskGroup={isLoadingTaskGroup}
                        />
                      ))}
                    </Board>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </>
        )}
      </div>
    </DragDropContext>
  );
}
