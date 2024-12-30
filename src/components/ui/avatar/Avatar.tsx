import Button from "../button/button.tsx";
import Icon from "../icon/Icon.tsx";
import { HTMLAttributes } from "react";
import styles from "./avatar.module.css";

interface AvatarProps extends HTMLAttributes<HTMLButtonElement> {
  image: string;
  radius?:
    | "rounded"
    | "rounded-sm"
    | "rounded-md"
    | "rounded-lg"
    | "rounded-full";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

const Avatar = ({
  image,
  radius = "rounded",
  size = "md",
  className,
}: AvatarProps) => {
  const combinedClassName = `${styles.avatar} ${className ?? ""}`.trim();
  return (
    <Button radius={radius} className={combinedClassName}>
      <Icon icon={image} description={"profile"} radius={radius} size={size} />
    </Button>
  );
};

export default Avatar;
