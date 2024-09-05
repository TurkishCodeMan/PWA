import React from "react";
import style from "./style.module.scss";
import { IoMdArrowBack } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { Button } from "@/shared/components/button";
// import { Field, Input, Label } from '@headlessui/react'

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
                <div className={style["person-icon"]}>
                    <BsPerson size={25} />
                </div>
                {/* <Field>
                    <Label>Name</Label>
                    <Input name="full_name" />
                </Field> */}
            </div>
            <div className={style["phone"]}>
                <div className={style["phone-icon"]}>
                    <FiPhone size={25} />
                </div>
            </div>
            <div className={style["work-as"]}>
                <p>I Work here as....</p>
            </div>
            <div className={style["starters-card"]}>
                <h1>S</h1>
            </div>
            <div className={style["starters"]}>
                <h3>Starters</h3>
            </div>
            <div className={style["finish-button"]}>
                <Button>Finish</Button>
            </div>


        </div>
    )
}