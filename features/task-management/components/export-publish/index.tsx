"use client";

import React from 'react';
import { Button } from "@/shared/components/button";
import style from "./style.module.scss";
import { BoltIcon, PlusIcon, UserCircleIcon } from "@heroicons/react/24/outline";


export function ExportPublish() {
  return (
    <div className={style["bar"]}>
      <div className={style["plusicon"]} ><PlusIcon className="icon" /></div>
      <div className={style["border-right"]}></div>
      
      <div className={style["bgcircles"]} >
        <div className={style["circles"]} >HA</div>
      </div>

      <div className={style["buttons"]}>
        <Button size="small" disabled intent="secondary" className={style["button"]}>
          <p> Published</p>
          <div><BoltIcon className="icon" /></div>
        </Button>
        <Button size="small" className={style["button"]}>
          <p> Publish</p>
          <div><BoltIcon className="icon" /></div>
        </Button>
      </div>

    </div>
  );
}
