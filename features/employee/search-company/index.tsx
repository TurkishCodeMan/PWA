"use client";

import React from "react";
import style from "./style.module.scss";
import { Button } from "@/shared/components/button";
import { Combobox } from "@headlessui/react";
import { useAllCompany } from "@/entities/company/model";
import { upperFirstLetter } from "@/shared/utils/util-func";
import { IoMdArrowBack } from "react-icons/io";

export default function SearchCompany() {
  const [companyName, setCompany] = React.useState("" as any);
  const result = useAllCompany();
  return (
    <div className={style["main"]}>
      <div className={style["back-btn"]}><IoMdArrowBack size={30}/>
      </div>
      <div className={style["welcome"]}>
        <h1>Welcomme to Dsumma Time Track</h1>
      </div>
      <div className={style["desc"]}>Find the Company you Work for...</div>
      <div className={style["search-box"]}>
        <Combobox value={companyName} onChange={setCompany}>
          <Combobox.Input
            className={style['input']}
            placeholder="Enter Company Name"
            onChange={(event) => setCompany(event.target.value)}
            displayValue={(company: any) => company?.name}
          />
          {result.status == "loading" ? (
            <span>Loading...</span>
          ) : (
            <Combobox.Options className={style["options"]}>
              {result?.data?.map((company: any) => (
                <Combobox.Option
                  className={style["option"]}
                  key={company.id}
                  value={company}
                >
                  {company.name}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </Combobox>
      </div>
      <div className={style["selected-company"]}>
        <p>Selected company</p>
      </div>
      <div className={style["company"]}>
        <div className={style["company-title"]}>
          <p>#{upperFirstLetter(companyName.name ?? '')}</p>
        </div>
        <p>{companyName.name}</p>
      </div>
      <div className={style["login"]}>
        <h2>Do you allready have an account?</h2>
        <h2>Log in</h2>
      </div>
      <div className={style["next-btn"]}>
        <Button>Next</Button>
      </div>
    </div>
  );
}
