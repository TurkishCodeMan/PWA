import { Header } from "@/widgets/header";
import style from "./style.module.scss";
import { TaskManagement } from "@/features/task-management";

export default function Home() {
  return (
    <div className={style["container"]}>
      <Header />

      <TaskManagement.ExportPublish />
      <TaskManagement.Kanban />
    </div>
  );
}
