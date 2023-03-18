import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { Form, Formik } from "formik";
import style from "./style.module.scss";
import React, { FormEvent } from "react";

export function EmployeeForm({
  submitCreateUser,
}: {
  submitCreateUser: (values: typeof employeeInitial) => void;
}) {
  const [employeeInitial, setEmployeeInitial] = React.useState({
    searchCompany: "",
    email: "",
    password: "",
    workHere: "",
  });

  return (
    <Formik
      initialValues={{ ...employeeInitial }}
      onSubmit={async (values, { setSubmitting }) => {
       
        submitCreateUser(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, getFieldProps }) => (
        <Form id="employee" className={style["employee-form"]}>
          <label className={style["search"]} htmlFor="company2">
            <Input
              type="search"
              placeholder="Search Company"
              id="company2"
              {...getFieldProps("searchCompany")}
            />
          </label>

          <label htmlFor="user-name">
            <Input
              className={style["input"]}
              type="text"
              placeholder="Email"
              id="email2"
              {...getFieldProps("email")}
            />
          </label>
          <label htmlFor="password">
            <Input
              className={style["input"]}
              type="password"
              placeholder="Password"
              id="password2"
              {...getFieldProps("password")}
            />
          </label>

          <label htmlFor="work-here">
            <select {...getFieldProps("workHere")} name="works" id="work-here">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </label>

          <Button className={style["submit"]} type="submit" intent="primary">
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
}
