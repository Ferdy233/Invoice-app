import { ReactNode, HTMLAttributes } from "react";
import styles from "./headline.module.css";

interface HeadlineProps extends HTMLAttributes<HTMLHeadElement> {
  children?: ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Headline = ({ children, variant = "h1", className }: HeadlineProps) => {
  const combinedClassName =
    `headline ${styles[variant]} ${className ?? ""}`.trim();
  const Tag = variant;
  return <Tag className={combinedClassName}>{children}</Tag>;
};

export default Headline;
