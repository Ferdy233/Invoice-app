import styles from "./icon.module.css";

interface IconProps {
  icon: string;
  description: string;
  radius?:
    | "rounded"
    | "rounded-sm"
    | "rounded-md"
    | "rounded-lg"
    | "rounded-full";
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

const Icon = ({
  icon,
  description,
  radius = "rounded",
  size = "sm",
  className,
}: IconProps) => {
  const combinedClassName =
    `${styles.icon} ${styles[radius]} ${styles[size]} ${className ?? ""}`.trim();

  return <img src={icon} alt={description} className={combinedClassName} />;
};

export default Icon;
