"use client";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { useState } from 'react';
import { FaRobot } from 'react-icons/fa';
import style from "./style.module.scss"
import { AiOutlineHome } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import { MdOutlineHistory } from "react-icons/md";

// const people = [
//   { id: 1, name: '20-05-22' },
//   { id: 2, name: 'Kenton Towne' },
//   { id: 3, name: 'Therese Wunsch' },
//   { id: 4, name: 'Benedict Kessler' },
//   { id: 5, name: 'Katelyn Rohan' },
// ];

// function Example() {
//   const [selectedPerson, setSelectedPerson] = useState(people[0]);

//   return (
//     <Listbox value={selectedPerson} onChange={setSelectedPerson}>
//       <ListboxButton>{selectedPerson.name}</ListboxButton>
//       <ListboxOptions>
//         {people.map((person) => (
//           <ListboxOption key={person.id} value={person} className="data-[focus]:bg-blue-100">
//             {person.name}
//           </ListboxOption>
//         ))}
//       </ListboxOptions>
//     </Listbox>
//   );
// }

export default function MainComponent() {
    return (
        <div className={style["main"]}>
            <div className={style["card-list"]}>
                <div className={style["profile-card"]}>
                    <div className={style["profile-img"]}>
                        <div className={style["status"]}></div>
                        <FaRobot color="#A4A1BC" size={60} />
                    </div>
                    <div className={style["names"]}>
                        <div className={style["name"]}>
                            <h3>Huseyin Altikulac</h3>
                        </div>
                        <div className={style["employe-name"]}>
                            <p>Employee : </p>
                            <p>Service</p>
                        </div>
                    </div>
                </div>
                <div className={style["hour-card"]}>
                    <div className={style["hour-title"]}>
                        <p>Hour registration</p>
                    </div>
                    <div className={style["times"]}>
                        <div className={style["worged-hours"]}>
                            <p>Total worked hours</p>
                            <p>16:20</p>
                        </div>
                        <div className={style["manuel-timer"]}>
                            <p>Manuel indtastet timer</p>
                            <p>2:00</p>
                        </div>
                    </div>
                </div>
                <div className={style["total"]}>
                    <div className={style["total-title"]}>
                        <p>Total overview</p>
                    </div>
                    <div className={style["hours"]}>
                        <div className={style["normal-hours"]}>
                            <p>Normal working hours</p>
                            <p>20</p>
                        </div>
                        <div className={style["overtime-hours"]}>
                            <p>Overtime hours</p>
                            <p>1:00</p>
                        </div>
                    </div>
                    <div className={style["overview-title"]}>
                        <p>Overview</p>
                    </div>
                    <div className={style["list-box"]}>
                        {/* Listbox bileşeni buraya ekleniyor */}
                        {/* <Example /> */}
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
    );
}
