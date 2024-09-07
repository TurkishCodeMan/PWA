import React from "react";
import style from "./style.module.scss";
import { IoMdArrowBack } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { Button } from "@/shared/components/button";
import { Field, Label } from "@headlessui/react";
import { Input } from "@/shared/components/input";
import clsx from "clsx";

export default function SignUp() {
  return (
    <div className={style["main"]}>
      <div className={style["back-icon"]}>
        <IoMdArrowBack size={30} />
      </div>
      <div className={style["name-card"]}>
        <h3 className={style["short-name"]}>#HAH</h3>
      </div>
      <div className={style["company-name"]}>
        <h2>"Huseyin Altikulac Holding Limited"</h2>
      </div>
      <div className={style["name"]}>
        <Field className={style["field"]}>
          <Label>Name</Label>

          <div className={style["col-field"]}>
            <Input size_type="small" />

            <div className={style["person-icon"]}>
              <BsPerson size={25} />
            </div>
          </div>
        </Field>
      </div>
      <div className={style["phone"]}>
        <Field className={style["field"]}>
          <Label>Phone number</Label>
          <div className={style["col-field"]}>
            <Input size_type="small" />
            <div className={style["phone-icon"]}>
              <FiPhone size={25} />
            </div>
          </div>
        </Field>
      </div>
      <div className={style["work-as"]}>
        <p>I Work here as....</p>
      </div>
      <div className={style["cards"]}>
        <div className={style["card"]}>
          <div className={clsx(style["card-head"], style["active"])}>
            <h1>S</h1>
          </div>
          <div className={style["card-title"]}>
            <h3>Starters</h3>
          </div>
        </div>

        <div className={style["card"]}>
          <div className={style["card-head"]}>
            <h1>T</h1>
          </div>
          <div className={style["card-title"]}>
            <h3>Test</h3>
          </div>
        </div>
      </div>
      <div className={style["cards"]}>
        <div className={style["card"]}>
          <div className={clsx(style["card-head"])}>
            <h1>O</h1>
          </div>
          <div className={style["card-title"]}>
            <h3>Outdoors</h3>
          </div>
        </div>

        <div className={style["card"]}>
          <div className={style["card-head"]}>
            <h1>S</h1>
          </div>
          <div className={style["card-title"]}>
            <h3>Service</h3>
          </div>
        </div>
      </div>
      <div className={style["finish-button"]}>
        <Button>Finish</Button>
      </div>
    </div>
  );
}
