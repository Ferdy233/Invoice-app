import styles from "./badge.module.css";
import Text from "../typography/text/Text.tsx";
interface BadgeProps {
  status: string;
}

const Badge = ({ status }: BadgeProps) => {
  return (
    <div className={`${styles.badge} ${styles[status]}`}>
      <Text type={"span"} className={styles["badge__dot"]}></Text>
      <Text bold={true}>{status}</Text>
    </div>
  );
};

export default Badge;
