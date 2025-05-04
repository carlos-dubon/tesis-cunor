"use client";

import { HTMLProps } from "react";
import { cn } from "../_util/cn";

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button = ({ type = "button", ...props }: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        "flex items-center justify-center p-2 rounded bg-blue-500 hover:bg-blue-400 text-white font-medium text-sm transition cursor-pointer",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
