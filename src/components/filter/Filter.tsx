import "./filter.styles.css";
import Button from "../ui/button/button.tsx";
import arrowDownIcon from "../../assets/images/icon-arrow-down.svg";
import Icon from "../ui/icon/Icon.tsx";
import Dropdown from "../ui/dropdown/Dropdown.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.ts";
import {
  selectDropdown,
  toggleModal,
} from "../../features/modal/modal.slice.tsx";

const Filter = () => {
  const dispatch = useAppDispatch();
  const showDropdown = useAppSelector(selectDropdown);
  return (
    <div className={"filter"}>
      <Button onClick={() => dispatch(toggleModal("showDropdown"))}>
        Filter by status
        <Icon
          className={showDropdown ? "rotate180" : ""}
          size={"sm"}
          icon={arrowDownIcon}
          description={"dropdown arrow"}
        />
      </Button>

      {showDropdown && (
        <>
          <div
            className="overlay"
            onClick={() => dispatch(toggleModal("showDropdown"))}
          ></div>
          <Dropdown options={["paid", "pending", "draft"]} />
        </>
      )}
    </div>
  );
};

export default Filter;
