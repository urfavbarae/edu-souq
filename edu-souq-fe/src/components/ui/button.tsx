import { ButtonHTMLAttributes, FC } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "destructive" | "ghost" | "secondary";
}

export const Button: FC<ButtonProps> = ({ variant = "primary", className, ...props }) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-md transition duration-200",
        variant === "primary" && "bg-blue-500 text-white hover:bg-blue-600",
        variant === "outline" && "border border-gray-300 text-gray-700 hover:bg-gray-100",
        variant === "destructive" && "bg-red-500 text-white hover:bg-red-600",
        variant === "ghost" && "text-gray-500 hover:bg-gray-200",
        variant === "secondary" && "bg-gray-200 text-gray-700 hover:bg-gray-300",
        className
      )}
      {...props}
    />
  );
};
