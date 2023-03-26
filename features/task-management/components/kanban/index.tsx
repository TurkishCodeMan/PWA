"use client";

import style from "./style.module.scss";
import React from "react";

import { BoardItem } from "./board-item";
import { Board } from "./board";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
  TaskGroupWithTasks,
  useAllTaskGroups,
  useUpdateTask,
} from "@/entities/task/model";

export function Kanban() {
  // SEARCH YAP DOWNSHİFT

  const { data, isLoading } = useAllTaskGroups();

  const { mutateAsync: updateTaskGroup, isLoading: isLoadingTaskGroup } =
    useUpdateTask();

  async function onDragEnd(val: DropResult) {
    if (!val.destination) return;

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
            {data?.map((board, bIndex) => (
              <Board
                key={board.id}
                id={board.id}
                index={bIndex.toString()}
                title={board.name}
              >
                {board?.tasks.map((item, index) => (
                  <BoardItem
                    key={item.id}
                    index={index}
                    item={item}
                    isLoadingTaskGroup={isLoadingTaskGroup}
                  />
                ))}
              </Board>
            ))}
          </>
        )}
      </div>
    </DragDropContext>
  );
}
