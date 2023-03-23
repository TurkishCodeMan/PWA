"use client";

import style from "./style.module.scss";
import React from "react";

import { BoardItem } from "./board-item";
import { Board } from "./board";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const boardData = [
  {
    id: "1",
    name: "Starters",
    items: [
      {
        id: "1",
        title: "Adresse zip code",
        users: [],
        startDate: new Date(),
        endDate: new Date("20/06/2023"),
      },
    ],
  },
  {
    id: "2",
    name: "Finished",
    items: [
      {
        id: "13",
        title: "Convesation",
        users: [],
        startDate: new Date(),
        endDate: new Date("20/06/2023"),
      },
    ],
  },
  {
    id: "3",
    name: "Updating",
    items: [
      {
        id: "14",
        title: "New Painting",
        users: [],
        startDate: new Date(),
        endDate: new Date("20/06/2023"),
      },
    ],
  },
];

export function Kanban() {
  const [board, setBoard] = React.useState(boardData);
  // SEARCH YAP DOWNSHİFT

  function onDragEnd(val: DropResult) {
    if (!val.destination) return;
    let newBoardData = board;
    var dragItem =
      newBoardData[parseInt(val.source.droppableId)]?.items[val.source.index];

    newBoardData[parseInt(val.source.droppableId)].items.splice(
      val.source.index,
      1
    );

    newBoardData[parseInt(val.destination.droppableId)]?.items.splice(
      val?.destination?.index as number,
      0,
      dragItem
    );

    setBoard(() => [...newBoardData]);
  }

  return (
    <DragDropContext
      onDragStart={() => {}}
      onDragUpdate={() => {}}
      onDragEnd={onDragEnd}
    >
      <div className={style["kanban"]}>
        {board.map((board, bIndex) => (
          <Board
            key={board.id}
            id={board.id}
            index={bIndex.toString()}
            title={board.name}
          >
            {board.items.map((item, index) => (
              <BoardItem key={item.id} index={index} item={item} />
            ))}
          </Board>
        ))}
      </div>
    </DragDropContext>
  );
}
