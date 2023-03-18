"use client";

import { Modal, ModalToggle } from "@/shared/components/modal";
import React from "react";
import style from "./style.module.scss";
import { Button } from "@/shared/components/button";
import clsx from "clsx";
import { CompanyForm } from "@/features/entry/company-form";
import { EmployeeForm } from "@/features/entry/employee-form";
import { Detail, Group } from "@/features/entry/detail-form";
import { v4 as uuidv4 } from "uuid";

function plusGroup(fn: React.Dispatch<React.SetStateAction<Group[]>>) {
  fn((curr) => [...curr, { id: uuidv4(), tag: "T", name: "Test" }]);
}
function removeGroup(
  fn: React.Dispatch<React.SetStateAction<Group[]>>,
  id: string
) {
  fn((curr) => curr.filter((val) => val.id !== id));
}
function controlHowMany(func: React.Dispatch<React.SetStateAction<number>>) {
  return (val: number) => (val >= 0 ? func(val) : () => {});
}

export default function EntryPoint() {
  const [step, setStep] = React.useState(0);

  const [howManyEmployeeSize, setHowManyEmployeeSize] = React.useState(0);
  const [groupsEmployees, setEmployeeGroups] = React.useState<Group[]>([]);
  const [howManySubContracterSize, setHowManySubContracterSize] =
    React.useState(0);
  const [groupsSubContracters, setGroupSubContracters] = React.useState<
    Group[]
  >([]);


  function submitCreateUser(values: any) {
    event?.preventDefault();
    console.log("---");
    setStep(1);
  }
  function submitCreateEmployee(){
    event?.preventDefault();
    console.log("---");
  }
  function submitDetailComplete() {
    event?.preventDefault();
    console.log("---");
  
  }

  return (
    <div>
      <Modal className={style["modal-wizard"]}>
        <ModalToggle />

        <div className={clsx(style["modal-wrapper"], style[`step-${step}`])}>
          <div className={style["main"]}>
            <img src="/start.png" alt="Home" />
            <div className={style["content"]}>
              <h2>Create User</h2>
              <div className={style["tabs"]}>
                <input
                  className={style["type"]}
                  id="company"
                  name="slider"
                  type="radio"
                
                ></input>
                <input
                  className={style["type"]}
                  id="employer"
                  name="slider"
                  type="radio"
                ></input>
                <div className={style["buttons"]}>
                  <label htmlFor="company">Company</label>
                  <label htmlFor="employer">Employee</label>
                </div>

                <div className={style["form-area"]}>
                  <CompanyForm submitCreateUser={submitCreateUser} />
                  <EmployeeForm submitCreateUser={submitCreateEmployee} />
                </div>
              </div>
            </div>
          </div>
          <div className={style["main-2"]}>
            <div className={style["main-2-content"]}>
              <Detail
                howManyTitle="How many employees?"
                howManySubTitle="You can always change it later on..."
                howManySize={howManyEmployeeSize}
                setHowManySize={setHowManyEmployeeSize}
                setGroups={setEmployeeGroups}
                controlHowMany={controlHowMany}
                groups={groupsEmployees}
                plusGroup={plusGroup}
                removeGroup={removeGroup}
              />
              <hr />
              <Detail
                howManyTitle="How many sub contracters?"
                howManySubTitle="Are you using in your company?"
                howManySize={howManySubContracterSize}
                setHowManySize={setHowManySubContracterSize}
                controlHowMany={controlHowMany}
                groups={groupsSubContracters}
                setGroups={setGroupSubContracters}
                plusGroup={plusGroup}
                removeGroup={removeGroup}
              />
            </div>
            <div className={style["controls"]}>
              <Button intent="secondary" onClick={() => setStep(0)}>Previous</Button>
              <Button onClick={submitDetailComplete}>Complete</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
