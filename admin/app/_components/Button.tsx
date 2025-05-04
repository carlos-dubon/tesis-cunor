"use client";

import { ReactNode } from "react";
import { cn } from "../_util/cn";

interface Props {
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}

export const Button = (props: Props) => {
  return (
    <button
      type="button"
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
