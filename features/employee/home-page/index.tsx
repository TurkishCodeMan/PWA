'use client'

import React from "react";
import style from "./style.module.scss";
import { FaRobot } from 'react-icons/fa';
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Description, Field, Label, Textarea } from '@headlessui/react';
import clsx from 'clsx';
import { IoIosPlayCircle } from "react-icons/io";
import { MdPerson } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { MdDateRange } from "react-icons/md";
import { GoClock } from "react-icons/go";
import { HiBoltSlash } from "react-icons/hi2";
import { AiOutlineHome } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import { MdOutlineHistory } from "react-icons/md";
import { useMe } from "@/entities/user/model";

// function Example() {
//     return (
//             <div >
//                 <Disclosure >
//                     <DisclosureButton >
//                         <ChevronDownIcon />
//                     </DisclosureButton>
//                     <DisclosurePanel >No</DisclosurePanel>
//                 </Disclosure>
//             </div>
//     )
// }

function Desc() {
    return (
        <div >
            <Field className={style["desc-module"]}>
                <Description >
                </Description>
                <Textarea
                    placeholder="Description"
                    className={clsx(
                        'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                    rows={6} cols={40}
                />
            </Field>
        </div>
    )
}

export default function HomePage() {
    const {data}=useMe()
    //Bitanem useCompanyId den id yi yolla ve şirketi de al :)
    return (
        <div className={style["main"]}>
            <div className={style["card-list"]}>
                <div className={style["profile-card"]}>
                    <div className={style["profile-card-main"]}>
                        <div className={style["profile-intro"]}>
                            <div className={style["profile-img"]}>
                                <div className={style["status"]}></div>
                                <FaRobot color="#A4A1BC" size={40} />
                            </div>
                            <div className={style["profile-name"]}>
                                <div className={style["names"]}>
                                    <h3>Huseyin Altikulac</h3>
                                </div>
                                <div className={style["employee-name"]}>
                                    <p>Employee : </p>
                                    <p>Service</p>
                                </div>
                            </div>
                        </div>
                        <div className={style["employer-name"]}>
                            <p>Huseyin Altikulac Holding limited</p>
                        </div>
                    </div>
                </div>
                <div className={style["timeClock-card"]}>
                    <div className={style["timeClock-main"]}>
                        <div className={style["timeClock-name"]}>
                            <h2>Time Clock</h2>
                        </div>
                        <div className={style["timeClock"]}>
                            <h1>0:00:20</h1>
                        </div>
                    </div>
                    <div className={style["button-group"]}>
                        <div className={style["play-button"]}>
                            <FaPlay color="#FFFFFF" size={14} />
                        </div>
                        <div className={style["pause-button"]}>
                            <FaPause color="#FFFFFF" size={14} />
                        </div>

                    </div>
                </div>
                <div className={style["manuelEntry-card"]}>
                    <div className={style["manuelEntry-main"]}>
                        <div className={style["working-hours"]}>
                            <p>Todays working hours</p>
                            <p>8:45</p>
                            <p>03-07-2022</p>
                        </div>
                        <div className={style["manuel-entry"]}>
                            <p>Manuel entry</p>
                            <IoIosArrowDown color="#9394A7" size={20} />
                            {/* <Example /> */}
                        </div>
                    </div>
                </div>
                <div className={style["timeClock-card"]}>
                    <div className={style["timeClock-main"]}>
                        <div className={style["timeClock-name"]}>
                            <h2>Time Clock</h2>
                        </div>
                        <div className={style["timeClock"]}>
                            <h1>0:00:20</h1>
                        </div>
                    </div>
                    <div className={style["button-group"]}>
                        <div className={style["play-button"]}>
                            <FaPlay color="#FFFFFF" size={14} />
                        </div>
                        <div className={style["pause-button"]}>
                            <FaPause color="#FFFFFF" size={14} />
                        </div>

                    </div>
                </div>
                <div className={style["manuelEntry-card"]}>
                    <div className={style["manuelEntry-main"]}>
                        <div className={style["working-hours"]}>
                            <p>Todays working hours</p>
                            <p>8:45</p>
                            <p>03-07-2022</p>
                        </div>
                        <div className={style["manuel-entry"]}>
                            <p>Manuel entry</p>
                            <IoIosArrowDown color="#9394A7" size={20} />
                            {/* <Example /> */}
                        </div>
                    </div>
                </div>
                <div className={style["desc-card"]}>
                    <div className={style["times"]}>
                        <h1>00.00.00</h1>
                    </div>
                    <div className={style["desc"]}>
                        <Desc />
                    </div>
                    <div className={style["start-button"]}>
                        <div className={style["play-icon"]}>
                            <IoIosPlayCircle color="#FFFF" size={38} />
                        </div>
                        <div className={style["start"]}>
                            <h3>Start clock</h3>
                        </div>
                    </div>
                </div>
                <div className={style["working-card-list"]}>
                    <div className={style["names-card"]}>
                        <div className={style["names-card-main"]}>
                            <div className={style["short-name-card"]}>
                                <div className={style["short-name"]}>
                                    <h3>SY/ED</h3>
                                </div>
                            </div>
                            <div className={style["names"]}>
                                <p>Hüseyin Altikulac / Erdem Demir</p>
                                <p>Booked</p>
                            </div>
                        </div>
                    </div>
                    <div className={style["progress-card"]}>
                        <div className={style["progress"]}>
                            <div className={style["color-progress"]}></div>
                        </div>
                        <div className={style["progress-write"]}>
                            <p>30%</p>
                        </div>
                    </div>
                    <div className={style["intro-card"]}>
                        <div className={style["intro-card-main"]}>
                            <div className={style["profile-col-name"]}>
                                <div className={style["profile-icon"]}>
                                    <MdPerson color="#9394A9" size={25} />
                                </div>
                                <div className={style["profile-name"]}>
                                    <p>2/2 Hüseyin Altikulac / Erdem</p>
                                </div>
                            </div>
                            <div className={style["profile-col-location"]}>
                                <div className={style["location-icon"]}>
                                    <TiLocation color="#9394A9" size={25} />
                                </div>
                                <div className={style["location-name"]}>
                                    <p>Workplace adresse 15 - Zip code - City</p>
                                </div>
                            </div>
                            <div className={style["profile-col-date"]}>
                                <div className={style["date-icon"]}>
                                    <MdDateRange color="#9394A9" size={25} />
                                </div>
                                <div className={style["date-name"]}>
                                    <div className={style["start-date"]}>
                                        <p>Start</p>
                                        <p>Mon. Jun 10</p>
                                    </div>
                                    <div className={style["end-date"]}>
                                        <p>End</p>
                                        <p>Fri. Jun 20</p>
                                    </div>
                                </div>
                            </div>
                            <div className={style["profile-col-hours"]}>
                                <div className={style["hours-icon"]}>
                                    <GoClock color="#9394A9" size={25} />
                                </div>
                                <div className={style["hours-name"]}>
                                    <div className={style["work-hours"]}>
                                        <p>Working hours</p>
                                        <p>78 hours</p>
                                    </div>
                                    <div className={style["overtime-hours"]}>
                                        <p>Overtime hours</p>
                                        <p>8 hours</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style["upcoming-name-card"]}>
                        <div className={style["upcoming-card-main"]}>
                            <div className={style["short-name-card"]}>
                                <h3>SY/--</h3>
                            </div>
                            <div className={style["employe-names"]}>
                                <p>Hüseyin Altikulac / --</p>
                                <p>Upcoming</p>
                            </div>
                        </div>
                    </div>
                    <div className={style["card-intro"]}>
                        <div className={style["intro-card-main"]}>
                            <div className={style["profile-col-name"]}>
                                <div className={style["profile-icon"]}>
                                    <MdPerson color="#9394A9" size={25} />
                                </div>
                                <div className={style["profile-name"]}>
                                    <p>2/1 Selahatin / --</p>
                                </div>
                            </div>
                            <div className={style["profile-col-location"]}>
                                <div className={style["location-icon"]}>
                                    <TiLocation color="#9394A9" size={25} />
                                </div>
                                <div className={style["location-name"]}>
                                    <p>Workplace adresse 15 - Zip code - City</p>
                                </div>
                            </div>
                            <div className={style["profile-col-date"]}>
                                <div className={style["date-icon"]}>
                                    <MdDateRange color="#9394A9" size={25} />
                                </div>
                                <div className={style["date-name"]}>
                                    <div className={style["start-date"]}>
                                        <p>Start</p>
                                        <p>Mon. Jun 14</p>
                                    </div>
                                    <div className={style["end-date"]}>
                                        <p>End</p>
                                        <p>Fri. Jun 24</p>
                                    </div>
                                </div>
                            </div>
                            <div className={style["button-location"]}>
                                <div className={style["accept-button"]}>
                                    <p>Accept</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style["any-tasks"]}>
                        <div className={style["any-tasks-icon"]}>
                            <HiBoltSlash color="#9394A9" size={130} />
                        </div>
                        <div className={style["desc"]}>
                            <p>You dont have any tasks to assign yet</p>
                            <p>Your dashboard will be available when your employer provide you a task.</p>
                        </div>
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