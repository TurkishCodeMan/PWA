import { FaCircle, FaMinus, FaPlus, FaPlusCircle } from "react-icons/fa";
import style from "./style.module.scss";
import React from "react";
import { Input } from "@/shared/components/input";
import { GroupComp } from "../group";

export type Group = {
  id: string;
  tag: string;
  name: string;
};

type DetailContent = {
  howManyTitle: string;
  howManySubTitle: string;
  howManySize: number;
  setHowManySize: any;
  controlHowMany: any;
  groups: Group[];
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
  plusGroup: (fn: React.Dispatch<React.SetStateAction<Group[]>>) => void;
  removeGroup: (
    fn: React.Dispatch<React.SetStateAction<Group[]>>,
    id: string
  ) => void;
};

export function Detail({
  howManyTitle = "How many",
  howManySubTitle,
  howManySize,
  setHowManySize,
  controlHowMany,
  groups,
  setGroups,
  plusGroup,
  removeGroup,
}: DetailContent) {
  return (
    <div className={style["detail"]}>
      <div className={style["how-many"]}>
        <h3>{howManyTitle}</h3>
        <p>{howManySubTitle}</p>
        <div className={style["input-control"]}>
          <div
            onClick={() => controlHowMany(setHowManySize)(howManySize - 1)}
            className={style["input-down"]}
          >
            <FaMinus size={20} />
          </div>
          <Input
            onChange={() => {}}
            value={howManySize}
            className={style["input-value"]}
          />
          <div
            onClick={() => controlHowMany(setHowManySize)(howManySize + 1)}
            className={style["input-up"]}
          >
            <FaPlus size={20} />
          </div>
        </div>
      </div>

      <div className={style["groups"]}>
        <div className={style["groups-header"]}>
          <h3>Name your groups.</h3>
          <div
            className={style["plus-group"]}
            onClick={() => plusGroup(setGroups)}
          >
            <FaPlus size={20} />
          </div>
        </div>
        <div className={style["group-list"]}>
          {groups?.map((group, index) => (
            <GroupComp
              group={group}
              setGroups={setGroups}
              key={group.id}
              removeGroup={() => removeGroup(setGroups, group.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
