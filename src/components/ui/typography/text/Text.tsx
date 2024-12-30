import { ReactNode, HTMLAttributes } from "react";
import styles from "./text.module.css";

interface TextProps
  extends HTMLAttributes<HTMLParagraphElement | HTMLLabelElement> {
  children?: ReactNode;
  size?: "sm" | "md";
  type?: "p" | "span" | "label";
  bold?: boolean;
  htmlFor?: string; // Applicable only to "label"
}

const Text = ({
  children,
  size = "md",
  type = "p",
  className,
  bold = false,
  htmlFor,
  ...props
}: TextProps) => {
  const Tag = type;
  const combinedClassName = `${styles.text} ${styles[size]} ${
    className ?? ""
  } ${bold ? styles.bold : ""}`.trim();

  if (type === "label") {
    return (
      <label className={combinedClassName} htmlFor={htmlFor} {...props}>
        {children}
      </label>
    );
  }

  return (
    <Tag className={combinedClassName} {...props}>
      {children}
    </Tag>
  );
};

export default Text;
