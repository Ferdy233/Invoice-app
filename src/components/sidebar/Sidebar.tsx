import "./sidebar.styles.css";
import Icon from "../ui/icon/Icon.tsx";
import logo from "../../assets/images/logo.svg";
import ToggleTheme from "./toggle-theme/ToggleTheme.tsx";
import Avatar from "../ui/avatar/Avatar.tsx";
import profileImage from "../../assets/images/image-avatar.jpg";

const Sidebar = () => {
  return (
    <section className={"sidebar"}>
      <div className={"sidebar__logo-container"}>
        <div className={"sidebar__logo-container-bottom"}></div>
        <Icon icon={logo} description={"logo"} size={"md"} />
      </div>

      <div className={"sidebar__bottom-container"}>
        <ToggleTheme />
        <hr />
        <Avatar
          image={profileImage}
          radius={"rounded-full"}
          className={"profile"}
        />
      </div>
    </section>
  );
};

export default Sidebar;
