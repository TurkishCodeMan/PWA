import { Header } from "@/widgets/header";
import style from "./style.module.scss";
import { AddUser as User } from "@/features/add-user";
export default function AddUser() {
  return (
    <div className={style["container"]}>
      <Header />
      <User.Invite />
    </div>
  );
}
