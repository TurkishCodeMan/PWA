
import { Button } from "@/shared/components/button";
import style from "./style.module.scss";
import { Facebook, Instagram, Linkedin } from "react-feather";
import { Input } from "@/shared/components/input";
import { useRegister } from "@/shared/api/auth";
import AuthForm from "@/features/auth/auth-form";
export default function Signin() {

  return (
    <AuthForm mode="login"/>
  );
}
