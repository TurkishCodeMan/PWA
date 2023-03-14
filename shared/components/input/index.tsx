import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  PropsWithChildren,
} from "react";
import clsx from "clsx";
import style from "./style.module.scss";
import { VariantProps, cva } from "class-variance-authority";

interface InputProps
  extends DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    VariantProps<typeof inputClasses> {}

const inputClasses = cva(style["input"], {
  variants: {
    intent: {
      primary: style["primary"],
      secondary: style["secondary"],
    },
    size_type: {
      small: style["small"],
      medium: style["medium"],
      large: style["large"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size_type: "medium",
  },
});

export function Input({
  className,
  intent,
  size_type,
  ...props
}: PropsWithChildren<InputProps>) {
  return (
    <input
      className={clsx(inputClasses({ intent, size_type, className }))}
      {...props}
    />
  );
}
