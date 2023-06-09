"use client";

import React from 'react';
import { Button } from "@/shared/components/button";
import style from "./style.module.scss";
import { BoltIcon } from "@heroicons/react/24/outline";

export function ExportPublish() {
  return (
    <div className={style["bar"]}>
      <Button  size="small" disabled intent="secondary" className={style["button"]}>
        <p> Published</p>
        <div><BoltIcon className="icon"/></div>
      </Button>
      <Button size="small" className={style["button"]}>
       <p> Publish</p>
        <div><BoltIcon className="icon"/></div>
      </Button>
    </div>
  );
}
