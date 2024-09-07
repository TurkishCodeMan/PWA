import React from "react";
import style from "./style.module.scss";
import { IoMdArrowBack } from "react-icons/io";
// import { RiRobot3Line } from "react-icons/ri";

export default function Profile() {
    return (
        <div className={style["main"]}>

            <div className={style["back-icon"]}>
                <IoMdArrowBack size={25} />
            </div>
            <div className={style["profile-img-card"]}>
                <div className={style["profile-img"]}>
                    {/* <RiRobot3Line /> */}
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
                
            </div>
        </div>
    )
}