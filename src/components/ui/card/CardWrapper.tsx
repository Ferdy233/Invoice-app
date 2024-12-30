import { ReactNode } from "react";
import styles from "./cardwrapper.module.css";

interface CardWrapperProps {
  children: ReactNode;
  className?: string;
}

const CardWrapper = ({ children, className }: CardWrapperProps) => {
  const combinedClassName = `${styles["card-wrapper"]} ${className ?? ""}`;
  return <div className={combinedClassName}>{children}</div>;
};

export default CardWrapper;
