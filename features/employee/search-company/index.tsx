import React from "react";
import style from "./style.module.scss";
import { Button } from "@/shared/components/button";
export default function SearchCompany() {
    return (
        <div className={style["main"]}>
            <div className={style["back-btn"]}>back</div>
            <div className={style["welcome"]}>
                <h1>Welcomme to Dsumma Time Track</h1>
            </div>
            <div className={style["desc"]}>
            Find the Company you Work for...
            </div>
            <div className={style["search-box"]}>
                <input type="text" placeholder="search company..."/>

            </div>
            <div className={style["selected-company"]}>
                <p>Selected company</p>
            </div>
            <div className={style["company"]}>
                <div className={style["company-title"]}>
                    <p>#HAH</p>
                </div>
                <p>Hüseyin Altikulac Holding Limited</p>
            </div>
            <div className={style["login"]}>
                <h2>Do you allready have an account?</h2>
                <h2>Log in</h2>
            </div>
            <div className={style["next-btn"]}>
                <Button>Next</Button>
            </div>

        </div>
    )
}