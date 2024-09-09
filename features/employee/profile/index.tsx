import React from "react";
import style from "./style.module.scss";
import { IoMdArrowBack } from "react-icons/io";
import { FaRobot } from "react-icons/fa";
import { Field, Input, Label } from '@headlessui/react';
import { SlPencil } from "react-icons/sl";
import { VscSignOut } from "react-icons/vsc";
import { AiOutlineHome } from "react-icons/ai";
import { GoClock } from "react-icons/go";
import { MdOutlineHistory } from "react-icons/md";
import { BsClock } from "react-icons/bs";

export default function Profile() {
    return (
        <div className={style["main"]}>

            <div className={style["back-icon"]}>
                <IoMdArrowBack size={25} />
            </div>
            <div className={style["profile-list"]}>
                <div className={style["profile-img-card"]}>
                    <div className={style["profile-img"]}>
                        <div className={style["status"]}></div>
                        <FaRobot color="#A4A1BC" size={50} />
                    </div>
                    <div className={style["employee-name"]}>
                        <h3>Hüseyin Altikulac</h3>
                        <div>
                            <p className={style["employee-title"]}>Employee : </p>
                            <p>Service</p>
                        </div>
                    </div>
                </div>
                <div className={style["profile-info"]}>
                    <div className={style["name"]}>
                        <Field className={style["field"]}>
                            <Label>Profile name</Label>
                            <div className={style["name-input"]}>
                                <Input name="full_name" placeholder="Huseyin Altikulac" />
                                <div className={style["pencil-icon"]}>
                                    <SlPencil size={18} />
                                </div>
                            </div>
                        </Field>
                    </div>
                    <div className={style["name"]}>
                        <Field className={style["field"]}>
                            <Label>Email</Label>
                            <div className={style["name-input"]}>
                                <Input name="full_name" placeholder="SeloYa@Hotmail.com" />
                                <div className={style["pencil-icon"]}>
                                    <SlPencil size={18} />
                                </div>
                            </div>
                        </Field>
                    </div>
                    <div className={style["name"]}>
                        <Field className={style["field"]}>
                            <Label>Password</Label>
                            <div className={style["name-input"]}>
                                <Input name="full_name" placeholder="* * * *" />
                                <div className={style["pencil-icon"]}>
                                    <SlPencil size={18} />
                                </div>
                            </div>
                        </Field>
                    </div>
                </div>
            </div>
            <div className={style["sign-out-list"]}>
                <div className={style["sign-out"]}>
                    <VscSignOut color=" #262753" size={28} />
                    <h3>Sign out</h3>
                </div>
            </div>
            <div className={style["footer"]}>
                <div className={style["home"]}>
                    <AiOutlineHome size={35} />
                    <p>Home</p>
                </div>
                <div className={style["hours"]}>
                    <BsClock size={33} />
                    <p>Hours</p>
                </div>
                <div className={style["history"]}>
                    <MdOutlineHistory size={35} />
                    <p>History</p>
                </div>
            </div>
        </div>
    )
}