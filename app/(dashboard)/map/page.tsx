import { Header } from "@/widgets/header";
import style from "./style.module.scss";
import dynamic from "next/dynamic";

const Map=dynamic(()=>import('@/features/map-watch/map'),{ssr:false})

export default function MapWatch() {
  return (
    <div className={style["container"]}>
      <Header/>
      <div className={style["map"]}>
        <Map />
      </div>
    </div>
  );
}
