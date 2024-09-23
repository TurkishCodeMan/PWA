'use client'

import React from "react";
import style from "./style.module.scss";
import { useMe } from "@/entities/user/model";

export default function Welcome() {
    const {data,isLoading,isIdle,status} = useMe();
  console.log(data,'USER')
    return (
        <div className={style["main"]}>
            <div className={style["logo"]}>
                <img src="" alt="Logo" />
            </div>
            <div className={style["welcome"]}>
                <h1>Welcomme to Dsumma Time Track</h1>
            </div>
            <div className={style["name"]}>
                {isLoading  || isIdle ? <span>Loading...</span> : <h2>{data?.name}</h2>}
            </div>
        </div>
    )
}