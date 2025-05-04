import { forwardRef } from "react";

interface InputProps {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-medium text-sm">{props.label}</div>
      <input
        ref={ref}
        type="text"
        className="ring ring-gray-200 rounded px-4 py-2"
      />
    </div>
  );
});

Input.displayName = "Input";
