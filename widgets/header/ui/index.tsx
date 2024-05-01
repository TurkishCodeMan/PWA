"use client";

import { Menu } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import style from "./style.module.scss";
import { FaAccessibleIcon, FaChevronDown } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { GiWorld } from "react-icons/gi";
import { TbNotes } from "react-icons/tb";
import { TbTimelineEvent } from "react-icons/tb";
import { TbLayoutDashboard } from "react-icons/tb";
import { RxAvatar } from "react-icons/rx";
import clsx from "clsx";

export default function Header() {

  return (
    <header id={style["header"]}>
      <div className={style["logo"]}>
        <Menu as="div" className={style["menu"]}>
          <Menu.Button className={style["menu-button"]}>
            <img className={style["img"]} src="/Logo-Timetrack.svg" alt="" />
            <p> Kanban Tasks</p>

            <FaChevronDown size={15} /> 
          </Menu.Button>
          
          <Menu.Items className={style["menu-items"]}>   
           
            <Menu.Item key="/" as={Fragment}>
              {({ active }) => ( 
                <Link className={style["menu-item"]} href="/timeline">
              <span className={style["t-d-icon"]}><TbTimelineEvent size={25}/></span>      
                <p> Timeline </p>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item key="/a" as={Fragment}>
              {({ active }) => (
                <Link className={style["menu-item"]} href="/dashboard">
                    <span className={style["t-d-icon"]}><TbLayoutDashboard size={25}/></span>  
                  <p>Dashboard</p>
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
      <nav className={style["nav"]}>
        <ul className={style["nav-list"]}>
          <li className={style["nav-list-item"]}>
            <Link
              href="/home" >
              <TbNotes size={30} />
            </Link>
          </li>
          <li className={style["nav-list-item"]}>
            <Link href="/add-user">
              <BsPeople size={30} />
            </Link>
          </li>
          <li className={style["nav-list-item"]}>
            <Link href="/map">
              <GiWorld size={30} />
            </Link>
          </li>



          <div className={style["logo"]}>
            <Menu as="div" className={style["menu"]}>
              <Menu.Button className={style["menu-button"]}>
                <img className={style["avatar"]} src="/Profil-avatar.svg" alt="" />
              </Menu.Button>
              <Menu.Items className={style["menu-items-avatar"]}>
                <Menu.Item key="/" as={Fragment}>
                  {({ active }) => (
                    <Link className={style["menu-item-avatar"]} href="/timeline">
                      Profil account
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item key="/a" as={Fragment}>
                  {({ active }) => (
                    <Link className={style["menu-item-avatar"]} href="/dashboard">
                      Logout
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>

        </ul>

      </nav>
    </header>
  );
}
