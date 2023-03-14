import { PropsWithChildren } from "react";
import style from "./style.module.scss";
import clsx from "clsx";
export function Pane({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={clsx(style['pane'], className)}>{children}</div>;
}
