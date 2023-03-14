"use client";

import React from "react";
import style from "./style.module.scss";
import { Facebook, Instagram, Linkedin, Loader } from "react-feather";
import { Button } from "@/shared/components/button";

import { Input } from "@/shared/components/input";
import { useLogin, useRegister } from "@/shared/api/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

const registerContent = {
  headerText: "Register With",
  checkBoxText: "I agree the Terms and Conditions",
  buttonText: "Sign up",
  footerText: "Already have an account",
  directionText: "Sign in",
};
const loginContent = {
  headerText: "Sign in",
  checkBoxText: "Remember me",
  buttonText: "Sign in",
  footerText: "Or",
  directionText: "Sign up",
};

type AuthFormType = {
  mode: "login" | "register";
};

type InputTypes = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
};

const initial: InputTypes = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

export default function AuthForm({ mode }: AuthFormType) {
  const router = useRouter();

  const content = mode === "login" ? loginContent : registerContent;
  const { mutateAsync: register, isLoading: isLoadingRegister } = useRegister();
  const { mutateAsync: login, isLoading: isLoadingLogin } = useLogin();

  async function submit(value: InputTypes) {
    if (mode === "register") {
      await register(value);
      router.replace("/home");
    }
    if (mode === "login") {
      const res=await login(value);
      console.log(res)
      router.replace("/home");
    }
  }

  return (
    <div
      className={clsx(
        style["signin"],
        style[mode === "login" ? "login" : "register"]
      )}
    >
      <h2>{content.headerText}</h2>
      <Formik
        initialValues={{ ...initial }}
        validate={(values) => {
          const errors: InputTypes = {};

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await submit(values);
          setSubmitting(false);
         
        }}
      >
        {({ isSubmitting, getFieldProps }) => (
          <>
            <div className={style["social"]}>
              <div>
                <Facebook size={20} />
              </div>
              <div>
                <Instagram size={20} />
              </div>
              <div>
                <Linkedin size={20} />
              </div>
            </div>
            {mode == "register" ? <p className={style["or"]}>Or</p> : ""}
            <Form className={style["inputs"]}>
              {mode === "register" && (
                <>
                  <Input
                    type="firstName"
                    placeholder="FirstName"
                    {...getFieldProps("firstName")}
                  />
                  <ErrorMessage name="firstName" component="div" />
                  <Input
                    type="lastName"
                    placeholder="LastName"
                    {...getFieldProps("lastName")}
                  />
                  <ErrorMessage name="lastName" component="div" />
                </>
              )}
              <Input
                type="email"
                placeholder="Email"
                {...getFieldProps("email")}
              />
              <ErrorMessage name="email" component="div" />
              <Input
                type="password"
                placeholder="Password"
                {...getFieldProps("password")}
              />
              <ErrorMessage name="password" component="div" />
              <label htmlFor="me" data-content={content.checkBoxText}>
                <Input type="checkbox" name="me" id="me" />
              </label>
              <div className={style["buttons"]}>
                {isLoadingLogin ? (
                  <Loader size={40} />
                ) : (
                  <Button
                    intent={mode == "login" ? "primary" : "secondary"}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {content.buttonText}
                  </Button>
                )}
                {mode == "login" ? (
                  <>
                    <p className={style["or"]}>Or</p>
                    {isLoadingRegister ? (
                      <Loader size={40} />
                    ) : (
                      <Button
                        intent="secondary"
                        type="button"
                        onClick={() => router.push("/signup")}
                      >
                        Signup
                      </Button>
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
              {mode === "register" && (
                <p className={style["footer-text"]}>
                  Already have an account?{" "}
                  <Link href="/signin">{content.directionText}</Link>
                </p>
              )}
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}