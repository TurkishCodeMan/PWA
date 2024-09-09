"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./style.module.scss";
import { IoMdArrowBack } from "react-icons/io";
import { BsPass, BsPerson, BsVoicemail } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { Button } from "@/shared/components/button";
import { Field, Label } from "@headlessui/react";
import { Input } from "@/shared/components/input";
import clsx from "clsx";
import { useCompanyId } from "@/entities/company/model";
import { upperFirstLetter } from "@/shared/utils/util-func";
import { useRegister } from "@/entities/user/model";

export default function SignUp() {
  const router = useRouter();
  const [companyId, setCompanyId] = useState<string | null>(null);
  const { mutate: register, isLoading:isLoadingRegister } = useRegister(); // Kayıt fonksiyonunu ve loading state'ini alıyoruz

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    taskGroup:'',
    companyId:companyId,
    role: "EMPLOYEES", // Kullanıcının seçtiği rol
  });

  React.useEffect(() => {
    // URL'deki query string'den şirket bilgisini al
    const params = new URLSearchParams(window.location.search);
    const companyId = params.get("company");
    if (companyId) {
      setCompanyId(companyId);
    }

    console.log(companyId);
  }, []);

  const { data, error, isLoading, isSuccess } = useCompanyId(
    companyId as string
  );
  console.log(data);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTaskGroupSelect = (taskGroup: string) => {
    setUserDetails((prev) => ({
      ...prev,
      taskGroup,
    }));
  };

  const handleSubmit = async (e:any) => {
    const payload = {
      ...userDetails,
      companyId:companyId as string
    };
    e.preventDefault()

    register({...payload})
  };

  const backward=()=>{
    router.push('/search-company')
  }

  return (
    <div className={style["main"]}>
      <div className={style["back-icon"]}>
        <IoMdArrowBack onClick={backward} size={30} />
      </div>
      <div className={style["name-card"]}>
        <h3 className={style["short-name"]}>
          #{upperFirstLetter(data?.name ?? "")}
        </h3>
      </div>
      <div className={style["company-name"]}>
        <h2>{`${!isSuccess ? "Loading..." : data?.name}`}</h2>{" "}
        {/* Query'den gelen şirket bilgisi */}
      </div>
      <div className={style["name"]}>
        <Field className={style["field"]}>
          <Label>Name</Label>
          <div className={style["col-field"]}>
            <Input
              size_type="small"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
            />
            <div className={style["person-icon"]}>
              <BsPerson size={25} />
            </div>
          </div>
        </Field>
      </div>
      <div className={style["name"]}>
        <Field className={style["field"]}>
          <Label>Email</Label>
          <div className={style["col-field"]}>
            <Input
              size_type="small"
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
            />
            <div className={style["person-icon"]}>
              <BsVoicemail size={25} />
            </div>
          </div>
        </Field>
      </div>
      <div className={style["name"]}>
        <Field className={style["field"]}>
          <Label>Password</Label>
          <div className={style["col-field"]}>
            <Input
              size_type="small"
              type="password"
              name="password"
              value={userDetails.password}
              onChange={handleInputChange}
            />
            <div className={style["person-icon"]}>
              <BsPass size={25} />
            </div>
          </div>
        </Field>
      </div>
      <div className={style["phone"]}>
        <Field className={style["field"]}>
          <Label>Phone number</Label>
          <div className={style["col-field"]}>
            <Input
              size_type="small"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
            />
            <div className={style["phone-icon"]}>
              <FiPhone size={25} />
            </div>
          </div>
        </Field>
      </div>
      <div className={style["work-as"]}>
        <p>I Work here as....</p>
      </div>
      <div className={style["cards"]}>
        <div
          className={style["card"]}
          onClick={() => handleTaskGroupSelect("Starters")}
        >
          <div
            className={clsx(
              style["card-head"],
              userDetails.taskGroup === "Starters" && style["active"]
            )}
          >
            <h1>S</h1>
          </div>
          <div className={style["card-title"]}>
            <h3>Starters</h3>
          </div>
        </div>

        <div className={style["card"]} onClick={() => handleTaskGroupSelect("Test")}>
          <div
            className={clsx(
              style["card-head"],
              userDetails.taskGroup === "Test" && style["active"]
            )}
          >
            <h1>T</h1>
          </div>
          <div className={style["card-title"]}>
            <h3>Test</h3>
          </div>
        </div>
      </div>
      <div className={style["cards"]}>
        <div
          className={style["card"]}
          onClick={() => handleTaskGroupSelect("Outdoors")}
        >
          <div
            className={clsx(
              style["card-head"],
              userDetails.taskGroup === "Outdoors" && style["active"]
            )}
          >
            <h1>O</h1>
          </div>
          <div className={style["card-title"]}>
            <h3>Outdoors</h3>
          </div>
        </div>

        <div
          className={style["card"]}
          onClick={() => handleTaskGroupSelect("Service")}
        >
          <div
            className={clsx(
              style["card-head"],
              userDetails.taskGroup === "Service" && style["active"]
            )}
          >
            <h1>S</h1>
          </div>
          <div className={style["card-title"]}>
            <h3>Service</h3>
          </div>
        </div>
      </div>
      <div className={style["finish-button"]}>
        <Button onClick={handleSubmit}>Finish</Button>
      </div>
    </div>
  );
}
