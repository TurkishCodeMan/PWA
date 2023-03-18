import { cva, VariantProps } from "class-variance-authority";
import style from "./style.module.scss";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";

export interface ButtonProps
  extends DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    VariantProps<typeof buttonClasses> {}

const buttonClasses = cva(style["button"], {
  variants: {
    intent: {
      primary: style["primary"],
      secondary: style["secondary"],
      text: style["text"],
    },
    size: {
      small: style["small"],
      medium: style["medium"],
      large: style["large"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

export function Button({
  children,
  className,
  intent,
  size,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button className={buttonClasses({ intent, size, className })} {...props}>
      {children}
    </button>
  );
}
