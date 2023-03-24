import React, { PropsWithChildren } from "react";
import style from "./style.module.scss";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Droppable } from "react-beautiful-dnd";
import { Popover } from "@headlessui/react";

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

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <Popover as="div" className={style["popover"]}>
          <article
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={clsx(style["board"] ,seeAll && style['board-open'])}
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
              {seeAll ? 'Collapse' :'See All'}
            </span>
          </article>
        </Popover>
      )}
    </Droppable>
  );
}
