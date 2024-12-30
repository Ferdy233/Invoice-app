import { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "default" | "primary" | "secondary" | "tertiary" | "danger";
  radius?:
    | "rounded"
    | "rounded-sm"
    | "rounded-md"
    | "rounded-lg"
    | "rounded-full";
}

const Button = ({
  children,
  radius = "rounded",
  variant = "default",
  className,
  ...props
}: ButtonProps) => {
  const combinedClassName =
    `${styles.button} ${styles[variant]} ${styles[radius]} ${className ?? ""}`.trim();
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
