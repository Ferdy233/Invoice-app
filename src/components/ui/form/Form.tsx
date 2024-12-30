import {
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react";

import styles from "./form.module.css";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
}

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Form = ({ children, className, ...props }: FormProps) => {
  return (
    <form className={`${styles.form} ${className ?? ""}`} {...props}>
      {children}
    </form>
  );
};

export const FormInput = ({ type, className, ...props }: FormInputProps) => {
  return (
    <input
      type={type}
      className={`${styles["form-input"]} ${className ?? ""}`}
      {...props}
    />
  );
};

export const FormLabel = ({
  children,
  className,
  ...props
}: FormLabelProps) => {
  return (
    <label className={`${styles["form-label"]} ${className ?? ""}`} {...props}>
      {children}
    </label>
  );
};

export const FormGroup = ({
  children,
  className,
  ...props
}: FormGroupProps) => {
  return (
    <div className={`${styles["form-group"]} ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
};
