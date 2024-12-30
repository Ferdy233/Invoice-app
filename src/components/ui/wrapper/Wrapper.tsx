import { HTMLAttributes, ReactNode } from "react";
import styles from "./wrapper.module.css";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

const Wrapper = ({ children, className }: ContainerProps) => {
  return (
    <section className={`${styles.wrapper} ${className ?? ""}`}>
      {children}
    </section>
  );
};

export default Wrapper;
