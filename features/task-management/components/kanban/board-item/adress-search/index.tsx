import { useAdressByQuery } from "@/entities/address/model";
import { Combobox } from "@headlessui/react";
import { VariantProps } from "class-variance-authority";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import style from "./style.module.scss";
export function AdressSearch({
  selectedAdress,
  setSelectedAdress,
}: {
  selectedAdress: string;
  setSelectedAdress: React.Dispatch<any>;
}) {
  const [query, setQuery] = React.useState("");
  const result = useAdressByQuery(query);
  return (
    <Combobox value={selectedAdress} onChange={setSelectedAdress}>
      <Combobox.Input
        placeholder="Enter address"
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(adress:any) => adress?.adressebetegnelse}
      />
      {result.status == "loading" ? (
        <span>Loading...</span>
      ) : (
        <Combobox.Options className={style["options"]}>
          {result?.data?.map((address: any) => (
            <Combobox.Option
              className={style["option"]}
              key={address.id}
              value={address}
              
            >
              {address.adressebetegnelse}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      )}
    </Combobox>
  );
}
