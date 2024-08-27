"use client";

import React from "react";
import style from "./style.module.scss";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Button } from "@/shared/components/button";
import { AiOutlineLoading } from "react-icons/ai";

import { Input } from "@/shared/components/input";
import { useRegister } from "@/shared/api/auth";
import { Formik, Form, ErrorMessage } from "formik";
import {  useRouter } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useLocalStorage } from 'usehooks-ts'

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
  name?: string;
  lastName?: string;
};

const initial: InputTypes = {
  email: "",
  password: "",
  name: "",
  lastName: "",
};

export default function AuthForm({ mode }: AuthFormType) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const content = mode === "login" ? loginContent : registerContent;
  const { mutateAsync: register, isLoading: isLoadingRegister } = useRegister();
  


  async function submit(value: InputTypes) {
    if (mode === "register") {
      await register(value);
      signIn("credentials", {
        email: value.email,
        password: value.password,
        callbackUrl: "/entry",
      });
    }
    if (mode === "login") {
      signIn("credentials", {
        email: value.email,
        password: value.password,
        callbackUrl: "/entry",
      });
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
                <FaFacebook onClick={() => signIn("facebook")} size={20} />
              </div>
              <div>
                <FaGoogle onClick={() => signIn("google")} size={20} />
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
                {status === "loading" ? (
                  <AiOutlineLoading size={40} className={"loading"} />
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
                      <AiOutlineLoading size={40} className={"loading"} />
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
