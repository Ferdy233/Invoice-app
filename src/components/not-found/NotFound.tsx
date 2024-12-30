import notFoundImage from "../../assets/images/illustration-empty.svg";
import Icon from "../ui/icon/Icon.tsx";
import { ReactNode } from "react";
import styles from "./notfound.module.css";
interface NotFoundProps {
  children: ReactNode;
}

const NotFound = ({ children }: NotFoundProps) => {
  return (
    <div className={styles["not-found"]}>
      <Icon icon={notFoundImage} description={"not found"} size={"xxl"} />
      {children}
    </div>
  );
};

export default NotFound;
