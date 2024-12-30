import Button from "../../ui/button/button.tsx";
import { toggleModal } from "../../../features/modal/modal.slice.tsx";
import {
  selectInvoice,
  updateInvoiceStatus,
} from "../../../features/invoice/invoice.slice.ts";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux.ts";

const InvoiceNoticeButtons = () => {
  const dispatch = useAppDispatch();
  const currentInvoice = useAppSelector(selectInvoice);
  const invoice = currentInvoice?.invoice;
  const loading = currentInvoice?.loading;
  return (
    <div className={"invoice__button-wrapper"}>
      {invoice?.status !== "paid" && (
        <Button
          variant={"tertiary"}
          radius={"rounded-full"}
          disabled={loading === "loading"}
          onClick={() => dispatch(toggleModal("showFormDialog"))}
        >
          Edit
        </Button>
      )}
      <Button
        variant={"danger"}
        radius={"rounded-full"}
        onClick={() => dispatch(toggleModal("showDeleteDialog"))}
        disabled={loading === "loading"}
      >
        Delete
      </Button>
      {invoice?.status !== "paid" && (
        <Button
          variant={"primary"}
          radius={"rounded-full"}
          disabled={invoice?.status === "draft" || loading === "loading"}
          onClick={() => dispatch(updateInvoiceStatus(invoice?.id ?? ""))}
        >
          Mark as Paid
        </Button>
      )}
    </div>
  );
};

export default InvoiceNoticeButtons;
