import Text from "../../ui/typography/text/Text.tsx";
import Badge from "../../ui/badge/Badge.tsx";
import CardWrapper from "../../ui/card/CardWrapper.tsx";
import DeleteModal from "../../modals/delete-modal/DeleteModal.tsx";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux.ts";
import {
  selectDeleteDialog,
  toggleModal,
} from "../../../features/modal/modal.slice.tsx";
import InvoiceNoticeButtons from "./InvoiceNoticeButtons.tsx";

interface InvoiceNoticeProps {
  status: string;
  id: string;
  error: string | null;
}

const InvoiceNotice = ({ status, id }: InvoiceNoticeProps) => {
  const deleteDialog = useAppSelector(selectDeleteDialog);
  const dispatch = useAppDispatch();
  return (
    <CardWrapper className={"invoice__notice-wrapper"}>
      <div className={"invoice__status-wrapper"}>
        <Text className={"status"}>Status</Text>
        <Badge status={status} />
      </div>

      <InvoiceNoticeButtons />
      {deleteDialog && (
        <DeleteModal
          onClose={() => dispatch(toggleModal("showDeleteDialog"))}
          id={id}
        />
      )}
    </CardWrapper>
  );
};

export default InvoiceNotice;
