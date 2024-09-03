import React from "react";
import style from "./style.module.scss";
import { Button } from "@/shared/components/button";

export default function EmployeeEntry() {
  return (
    <div className={style["main"]}>
      <div className={style["logo-wrapper"]}>
        <img src="" alt="Logo" />
      </div>
      <h2 className={style["title"]}>D-summa Time Track</h2>
      <div className={style["description"]}>
        Keep better track on your employéers working hours
      </div>
      <div className={style["entry-image"]}>Image</div>

      <div className={style["button-group"]}>
        <Button
        size="small" intent="secondary" className={style["employee-btn"]}>
          I am a Employee
        </Button>
        <Button intent="text" className={style["employer-btn"]}>
          I am a Employer
        </Button>
      </div>
      <div className={style['demo']}>
        <h2 className={style['try-out']}>Try out demo: </h2>
        <h2 className={style['go']}>Go Here</h2>
      </div>
    </div>
  );
}
