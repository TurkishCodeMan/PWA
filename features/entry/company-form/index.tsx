

import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { Form, Formik } from "formik";
import style from "./style.module.scss";
import React, { FormEvent } from "react";

export interface CompanyFormProps {
  companyName:string,

}

export function CompanyForm({
  submitCreateUser,
}: {
  submitCreateUser: (values:CompanyFormProps) => void;
}) {
  const [companyInitial, setCompanyInitial] = React.useState<CompanyFormProps>({
    companyName: "",
  
  });

  return (
    <Formik
      initialValues={{ ...companyInitial }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false);
        submitCreateUser(values)
      }}
    >
      {({ isSubmitting, getFieldProps }) => (
        <Form
      
          id="company"
          className={style["company-form"]}
        >
          <label htmlFor="company-name2">
            <Input
              type="text"
              placeholder="Company name"
              id="company-name2"
              {...getFieldProps("companyName")}
            />
          </label>
        

          <Button className={style["submit"]} type="submit" intent="primary">
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
}
