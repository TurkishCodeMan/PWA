import { Input } from "@/shared/components/input";
import { Group } from "../detail-form";
import style from "./style.module.scss";
import React from "react";
import { FaMinus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

export function Group({
  group,
  removeGroup,
}: {
  group: Group;
  removeGroup: (id: string) => void;
}) {
  const [group_, setGroup] = React.useState<Group>({ ...group });
  return (
    <div className={style["group"]}>
      <span onClick={() => removeGroup(group_.id)}>
        <FaMinus size={10} />
      </span>
      <div className={style["tag"]}>
        <h3>{group_.tag.charAt(0)}</h3>
      </div>
      <div className={style["name"]}>
        <label htmlFor="name">
          <Input
            value={group_.name}
            id="name"
            onChange={(event) => {
              console.log(event.target.value);
              setGroup(() => ({
                ...group,
                tag: event.target.value.charAt(0).toUpperCase(),
                name: event.target.value,
              }));
            }}
            contentEditable
          ></Input>
        </label>
      </div>
    </div>
  );
}
