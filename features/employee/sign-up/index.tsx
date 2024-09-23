"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { BsPass, BsPerson, BsVoicemail } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { Button } from "@/shared/components/button";
import { Field, Label } from "@headlessui/react";
import { Input } from "@/shared/components/input";
import { useCompanyId } from "@/entities/company/model";
import { upperFirstLetter } from "@/shared/utils/util-func";
import { useRegister } from "@/entities/user/model";
import style from "./style.module.scss";
import clsx from "clsx";

const TASK_GROUPS = ["Starters", "Test", "Outdoors", "Service"] as const;
type TaskGroup = typeof TASK_GROUPS[number];

type UserDetails = {
  name: string;
  email: string;
  password: string;
  phone: string;
  taskGroup: TaskGroup | '';
  role: "EMPLOYEES";
};

export default function SignUp() {
  const router = useRouter();
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { mutate: register, isLoading: isLoadingRegister } = useRegister();
  const { data: companyData, isSuccess: isCompanyDataSuccess } = useCompanyId(companyId as string);
  const [userDetails, setUserDetails] = useState<UserDetails>(() => ({
    name: "",
    email: "",
    password: "",
    phone: "",
    taskGroup: '',
    role: "EMPLOYEES",
  }));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("company");
    if (id) setCompanyId(id);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleTaskGroupSelect = (taskGroup: TaskGroup) => {
    setUserDetails(prev => ({ ...prev, taskGroup }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({ ...userDetails, companyId: companyId as string });
  };

  const renderField = (name: keyof UserDetails, label: string, icon: React.ReactNode, type = "text") => (
    <div className={style.name}>
      <Field className={style.field}>
        <Label>{label}</Label>
        <div className={style["col-field"]}>
          <Input
            size_type="small"
            type={type}
            name={name}
            value={userDetails[name]}
            onChange={handleInputChange}
          />
          <div className={style["person-icon"]}>{icon}</div>
        </div>
      </Field>
    </div>
  );

  return (
    <div className={style.main}>
      <div className={style["back-icon"]}>
        <IoMdArrowBack onClick={() => router.push('/search-company')} size={30} />
      </div>
      <div className={style["name-card"]}>
        <h3 className={style["short-name"]}>#{upperFirstLetter(companyData?.name ?? "")}</h3>
      </div>
      <div className={style["company-name"]}>
        <h2>{isCompanyDataSuccess ? companyData?.name : "Loading..."}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {renderField("name", "Name", <BsPerson size={25} />)}
        {renderField("email", "Email", <BsVoicemail size={25} />, "email")}
        {renderField("password", "Password", <BsPass size={25} />, "password")}
        {renderField("phone", "Phone number", <FiPhone size={25} />)}
        <div className={style["work-as"]}>
          <p>I Work here as....</p>
        </div>
        <div className={style['cards']}>
          {TASK_GROUPS.map((group) => (
            <div
              key={group}
              className={`${clsx(style['card'])}`}
              onClick={() => handleTaskGroupSelect(group)}
            >
              <div className={clsx(style['card-head'], userDetails.taskGroup === group ? style['active'] : style[''])}>
                <h1>{group[0]}</h1>
              </div>
              <div className={style["card-title"]}>
                <h3>{group}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className={style["finish-button"]}>
          <Button type="submit" disabled={isLoadingRegister}>
            {isLoadingRegister ? "Registering..." : "Finish"}
          </Button>
        </div>
      </form>
    </div>
  );
}