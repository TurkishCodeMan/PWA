import React from "react";
import style from "./style.module.scss";

export default function Welcome() {
    return (
        <div className={style["main"]}>
            <div className={style["logo"]}>
                <img src="" alt="Logo" />
            </div>
            <div className={style["welcome"]}>
                <h1>Welcomme to Dsumma Time Track</h1>
            </div>
            <div className={style["name"]}>
                <h2>Huseyin Altikulac</h2>
            </div>
        </div>
    )
}