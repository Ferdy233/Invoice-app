import Headline from "../ui/typography/headline/Headline.tsx";
import Text from "../ui/typography/text/Text.tsx";
import Button from "../ui/button/button.tsx";
import Icon from "../ui/icon/Icon.tsx";
import Filter from "../filter/Filter.tsx";

import plusIcon from "../../assets/images/icon-plus.svg";
import "./header.styles.css";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.ts";
import { toggleModal } from "../../features/modal/modal.slice.tsx";
import { selectStatusFilter } from "../../features/invoice/invoice.slice.ts";
import { useEffect } from "react";

const Header = ({ total }: { total?: number }) => {
  const dispatch = useAppDispatch();
  const statusFilter = useAppSelector(selectStatusFilter);
  return (
    <header className={"invoice__header"}>
      <div className={"heading"}>
        <Headline variant={"h1"}>Invoices</Headline>
        {total === 0 ? (
          <Text>No invoices</Text>
        ) : (
          <Text>
            There {total === 1 ? "is" : "are"} {total}{" "}
            {statusFilter.length === 1 && statusFilter[0]}{" "}
            {statusFilter.length ? "invoice" : "total"}
            {statusFilter.length && total && total > 1 ? "s" : ""}
          </Text>
        )}
      </div>

      <div className={"invoice__header-right__container"}>
        <Filter />
        <Button
          variant={"primary"}
          radius={"rounded-lg"}
          className={"new__invoice-button"}
          onClick={() => dispatch(toggleModal("showFormDialog"))}
        >
          <div className={"new__invoice-plus-icon"}>
            <Icon icon={plusIcon} description={"plus icon"} size={"xs"} />
          </div>
          New Invoice
        </Button>
      </div>
    </header>
  );
};

export default Header;
