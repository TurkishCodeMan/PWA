import React from "react";
import style from "./style.module.scss";
import { FaRobot } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { MdDateRange } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import { MdOutlineHistory } from "react-icons/md";


export default function HistoryPage() {
    return (
        <div className={style["main"]}>
            <div className={style["card-list"]}>
                <div className={style["profile-card"]}>
                    <div className={style["profile"]}>
                        <div className={style["profile-img"]}>
                            <div className={style["status"]}></div>
                            <FaRobot color="#A4A1BC" size={40} />
                        </div>
                        <div className={style["name-list"]}>
                            <div className={style["name"]}>
                                <h3>Hüseyin Altikulac</h3>
                            </div>
                            <div className={style["employee"]}>
                                <p>Emloyee : </p>
                                <p>Service</p>
                            </div>
                        </div>
                    </div>
                    <div className={style["company-name"]}>
                        <p>Huseyin Altikulac Holding limited</p>
                    </div>
                </div>
            </div>
            <div className={style["text"]}>
                <h2>History</h2>
                <h2>Status</h2>

            </div>
            <div className={style["main-cards"]}>
                <div className={style["history-cards"]}>
                    <div className={style["names"]}>
                        <div className={style["person-icon"]}>
                            <MdPerson size={25} />
                        </div>
                        <div className={style["person-name"]}>
                            <p>2/2 Selahatin / Erdem</p>
                        </div>
                        <div className={style["person-card"]}>
                            <p>F</p>
                        </div>
                    </div>
                    <div className={style["location"]}>
                        <div className={style["location-icon"]}>
                            <TiLocation size={25} />
                        </div>
                        <div className={style["adress"]}>
                            <p>Workplace adresse 15 - Zip code - City</p>
                        </div>
                    </div>
                    <div className={style["history"]}>
                        <div className={style["history-icon"]}>
                            <MdDateRange size={25} />
                        </div>
                        <div className={style["start-history"]}>
                            <p>Start</p>
                            <p>Mon. Jun 10</p>

                        </div>
                        <div className={style["end-history"]}>
                            <p>End</p>
                            <p>Fri. Jun 22</p>
                        </div>
                    </div>
                </div>
                <div className={style["status-cards"]}>
                    <div className={style["card"]}>
                        <div className={style["card-text"]}>
                            <p>HAH</p>
                        </div>
                    </div>
                    <div className={style["status"]}>
                        <h3>Ongoing</h3>
                    </div>
                </div>
            </div>
            <div className={style["main-cards"]}>
                <div className={style["history-cards"]}>
                    <div className={style["names"]}>
                        <div className={style["person-icon"]}>
                            <MdPerson size={25} />
                        </div>
                        <div className={style["person-name"]}>
                            <p>2/2 Selahatin / Erdem</p>
                        </div>
                        <div className={style["person-card1"]}>
                            <p>S</p>
                        </div>
                    </div>
                    <div className={style["location"]}>
                        <div className={style["location-icon"]}>
                            <TiLocation size={25} />
                        </div>
                        <div className={style["adress"]}>
                            <p>Workplace adresse 15 - Zip code - City</p>
                        </div>
                    </div>
                    <div className={style["history"]}>
                        <div className={style["history-icon"]}>
                            <MdDateRange size={25} />
                        </div>
                        <div className={style["start-history"]}>
                            <p>Start</p>
                            <p>Mon. Jun 10</p>

                        </div>
                        <div className={style["end-history"]}>
                            <p>End</p>
                            <p>Fri. Jun 22</p>
                        </div>
                    </div>
                </div>
                <div className={style["status-cards"]}>
                    <div className={style["card"]}>
                        <div className={style["card-text"]}>
                            <p>HAH</p>
                        </div>
                    </div>
                    <div className={style["status"]}>
                        <h3>Done</h3>
                    </div>
                </div>
            </div>
            <div className={style["main-cards"]}>
                <div className={style["history-cards"]}>
                    <div className={style["names"]}>
                        <div className={style["person-icon"]}>
                            <MdPerson size={25} />
                        </div>
                        <div className={style["person-name"]}>
                            <p>2/2 Selahatin / Erdem</p>
                        </div>
                        <div className={style["person-card2"]}>
                            <p>O</p>
                        </div>
                    </div>
                    <div className={style["location"]}>
                        <div className={style["location-icon"]}>
                            <TiLocation size={25} />
                        </div>
                        <div className={style["adress"]}>
                            <p>Workplace adresse 15 - Zip code - City</p>
                        </div>
                    </div>
                    <div className={style["history"]}>
                        <div className={style["history-icon"]}>
                            <MdDateRange size={25} />
                        </div>
                        <div className={style["start-history"]}>
                            <p>Start</p>
                            <p>Mon. Jun 10</p>

                        </div>
                        <div className={style["end-history"]}>
                            <p>End</p>
                            <p>Fri. Jun 22</p>
                        </div>
                    </div>
                </div>
                <div className={style["status-cards"]}>
                    <div className={style["card"]}>
                        <div className={style["card-text"]}>
                            <p>HAH</p>
                        </div>
                    </div>
                    <div className={style["status"]}>
                        <h3>Done</h3>
                    </div>
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