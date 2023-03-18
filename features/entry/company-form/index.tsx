import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { Form, Formik } from "formik";
import style from "./style.module.scss";
import React, { FormEvent } from "react";

export function CompanyForm({
  submitCreateUser,
}: {
  submitCreateUser: (values:typeof companyInitial) => void;
}) {
  const [companyInitial, setCompanyInitial] = React.useState({
    companyName: "",
    email: "",
    password: "",
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
          <label htmlFor="user-name2">
            <Input
              type="text"
              placeholder="Email"
              id="email"
              {...getFieldProps("email")}
            />
          </label>
          <label htmlFor="password2">
            <Input
              type="password"
              placeholder="Password"
              id="password"
              {...getFieldProps("password")}
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
