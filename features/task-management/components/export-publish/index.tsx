"use client";


import { Button } from "@/shared/components/button";
import style from "./style.module.scss";

export function ExportPublish() {
  return (
    <div className={style["bar"]}>
      <Button  size="small" disabled intent="secondary" className={style["button"]}>
        Published
      </Button>
      <Button size="small" className={style["button"]}>
        Publish
      </Button>
    </div>
  );
}
