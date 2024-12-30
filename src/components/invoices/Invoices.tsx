import Wrapper from "../ui/wrapper/Wrapper.tsx";
import "./invoices.styles.css";
import Header from "../header/Header.tsx";
import InvoiceCard from "../ui/card/invoiceCard/Invoice.Card.tsx";
import { useAppSelector } from "../../hooks/useRedux.ts";
import {
  selectInvoices,
  selectStatusFilter,
} from "../../features/invoice/invoice.slice.ts";
import NotFound from "../not-found/NotFound.tsx";
import Headline from "../ui/typography/headline/Headline.tsx";
import Text from "../ui/typography/text/Text.tsx";
import { selectFormDialog } from "../../features/modal/modal.slice.tsx";
import FormDialogModal from "../modals/form-modal/FormDialog.modal.tsx";

const Invoices = () => {
  const invoices = useAppSelector(selectInvoices);
  const statusFilter = useAppSelector(selectStatusFilter);
  const showForm = useAppSelector(selectFormDialog);

  const filteredInvoices = statusFilter.length
    ? invoices.filter((invoice) => statusFilter.includes(invoice.status))
    : [...invoices];

  return (
    <>
      {showForm && <FormDialogModal type={"newInvoice"} />}
      <Wrapper className={"invoices"}>
        <Header total={filteredInvoices.length} />
        <div className="invoices__card-list">
          {filteredInvoices.map((invoice) => (
            <InvoiceCard key={invoice.id} {...invoice} />
          ))}

          {filteredInvoices.length === 0 && (
            <NotFound>
              <Headline variant={"h2"}>There is nothing here</Headline>
              <Text>
                Create an invoice by clicking the{" "}
                <Text type={"span"} bold={true}>
                  New Invoice
                </Text>{" "}
                button and get started
              </Text>
            </NotFound>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default Invoices;
