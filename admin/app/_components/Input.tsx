import { forwardRef, HTMLProps } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ required, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <div className="font-medium text-sm">
          {props.label} {required && "*"}
        </div>
        <input
          ref={ref}
          type="text"
          className="ring ring-gray-200 rounded px-4 py-2"
          {...props}
        />
        <div className="text-red-500 text-xs">{props.error}</div>
      </div>
    );
  }
);

Input.displayName = "Input";
