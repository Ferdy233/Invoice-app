import styles from "./dialog.module.css";
import { ReactNode } from "react";

interface DialogContainerProps {
  children?: ReactNode;
  center?: boolean;
}

interface DialogProps {
  children?: ReactNode;
  className?: string;
  radius?:
    | "rounded"
    | "rounded-sm"
    | "rounded-md"
    | "rounded-lg"
    | "rounded-full";
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
}

export const DialogContainer = ({
  children,
  center = false,
}: DialogContainerProps) => {
  return (
    <div
      className={`${styles.dialog__container} ${center && styles.center} ${styles.overlay}`}
    >
      {children}
    </div>
  );
};

export const Dialog = ({
  children,
  radius = "rounded",
  className,
  variant,
  size = "sm",
}: DialogProps) => {
  return (
    <div
      className={`${styles.dialog} ${styles[radius]} ${className ?? ""} ${styles[variant ?? ""]} ${styles[size]}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};
