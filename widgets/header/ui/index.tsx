"use client";

import { Menu } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import style from "./style.module.scss";
import { FaChevronDown } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { GiWorld } from "react-icons/gi";
import { TbNotes } from "react-icons/tb";
import { RxAvatar } from "react-icons/rx";

export default function Header() {
  return (
    <header id={style["header"]}>
      <div className={style["logo"]}>
        <img className={style["img"]} src="/icon-256x256.png" alt="" />
        <Menu as="div" className={style["menu"]}>
          <Menu.Button className={style["menu-button"]}>
            Task Management
            <FaChevronDown size={15} />
          </Menu.Button>
          <Menu.Items className={style["menu-items"]}>
            <Menu.Item key="/" as={Fragment}>
              {({ active }) => (
                <Link className={style["menu-item"]} href="/timeline">
                  Timeline
                </Link>
              )}
            </Menu.Item>
            <Menu.Item key="/" as={Fragment}>
              {({ active }) => (
                <Link className={style["menu-item"]} href="/dashboard">
                  Dashboard
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
      <nav className={style["nav"]}>
        <ul className={style["nav-list"]}>
          <li className={style["nav-list-item"]}>
            <Link href="#">
              <TbNotes size={25} />
            </Link>
          </li>
          <li className={style["nav-list-item"]}>
            <Link href="#">
              <BsPeople size={25} />
            </Link>
          </li>
          <li className={style["nav-list-item"]}>
            <Link href="#">
              <GiWorld size={25} />
            </Link>
          </li>
          <li className={style["nav-list-item"]}>
            <Link href="#">
              <RxAvatar size={25} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
