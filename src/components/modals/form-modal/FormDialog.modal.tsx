import { Dialog, DialogContainer } from "../../ui/dialog/Dialog.tsx";
import { Form } from "../../ui/form/Form.tsx";
import "./formdialogmodal.styles.css";
import Headline from "../../ui/typography/headline/Headline.tsx";
import Text from "../../ui/typography/text/Text.tsx";
import Button from "../../ui/button/button.tsx";
import FormAddress from "./address/FormAddress.tsx";
import BillTo from "./bill-to/BillTo.tsx";
import DateTerms from "./date-and-terms/DateTerms.tsx";
import Items from "./items/Items.tsx";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import {
  Errors,
  FormValues,
  initialItems,
  ItemType,
} from "../../../types/form.types.ts";
import calculatePaymentDue from "../../../utils/calculatePaymentDue/calculatePaymentDue.ts";
import generateRandomId from "../../../utils/generateRandomId/generateRandomId.ts";
import {
  addInvoice,
  selectLoading,
} from "../../../features/invoice/invoice.slice.ts";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux.ts";
import { toggleModal } from "../../../features/modal/modal.slice.tsx";
import Icon from "../../ui/icon/Icon.tsx";
import arrowLeftIcon from "../../../assets/images/icon-arrow-left.svg";

interface FormDialogModalProps {
  type: "newInvoice" | "edit";
  initialValues?: FormValues;
}

const FormDialogModal = ({ initialValues, type }: FormDialogModalProps) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const form = useForm<FormValues>({
    defaultValues: initialValues ?? {
      id: generateRandomId(),
      clientName: "",
      clientEmail: "",
      createdAt: "",
      paymentDue: "",
      description: "",
      paymentTerms: 1,
      clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      items: [
        {
          ...initialItems,
        },
      ],
      status: "",
      total: 0,
    },
    mode: "onTouched",
  });
  const {
    register,
    control,
    handleSubmit,
    setError,
    getValues,
    reset,
    formState: { errors, isValid, isDirty },
  } = form;
  const { fields, append, remove } = useFieldArray({
    name: "items",
    control,
  });

  const calculateItemsTotal = (items: ItemType[]) => {
    return items.map((item: ItemType) => ({
      ...item,
      total: Number((item?.price * item?.quantity).toFixed(2)),
    }));
  };

  const calculateTotal = (items: ItemType[]) => {
    return items.reduce((total, item: ItemType) => total + item.total, 0);
  };

  const onSubmit = (data: FormValues) => {
    if (!data.items.length) {
      setError("items", {
        type: "manual",
        message: "At least one item is required.",
      });
      return;
    }

    data.status = "pending";
    data.items = calculateItemsTotal(data.items);
    data.total = calculateTotal(data.items);
    data.paymentDue = calculatePaymentDue(data.createdAt, data.paymentTerms);

    dispatch(addInvoice(data));
    if (loading === "success") dispatch(toggleModal("showFormDialog"));
  };

  const onSaveDraft = () => {
    const data: FormValues = getValues();
    data.status = "draft";
    data.items = calculateItemsTotal(data.items);
    data.total = calculateTotal(data.items);
    data.paymentDue =
      data.createdAt && data.paymentTerms
        ? calculatePaymentDue(data.createdAt, data.paymentTerms)
        : "";
    dispatch(addInvoice(data));

    if (loading === "success") dispatch(toggleModal("showFormDialog"));
  };

  const onDiscard = () => {
    reset();
    dispatch(toggleModal("showFormDialog"));
  };

  const { description } = (errors as Errors) ?? {};
  return (
    <DialogContainer>
      <Dialog
        className={`form-dialog `}
        variant={"primary"}
        radius={"rounded-lg"}
        size={"md"}
      >
        <FormProvider {...form}>
          <Form onSubmit={handleSubmit(onSubmit)} className={"form"}>
            <div className={"form-info"}>
              <Button
                className="go-back"
                type={"button"}
                onClick={() => dispatch(toggleModal("showFormDialog"))}
              >
                <Icon
                  icon={arrowLeftIcon}
                  description={"arrow left"}
                  size={"xs"}
                />
                <Text bold={true}>Go back</Text>
              </Button>
              {type === "newInvoice" ? (
                <Headline variant={"h2"}>New Invoice</Headline>
              ) : (
                <Headline variant={"h2"}>
                  Edit <span>#</span>
                  {initialValues?.id}
                </Headline>
              )}

              <div className={"bill-from"}>
                <Text bold={true}>Bill From</Text>
                <FormAddress field={"senderAddress"} />
              </div>

              <BillTo />

              <DateTerms />

              <div>
                <label htmlFor="description" className={description && "error"}>
                  Project Description{" "}
                  <Text size={"sm"}>{description?.message}</Text>{" "}
                </label>
                <input
                  id={"description"}
                  className={description && "error"}
                  type="text"
                  {...register("description", {
                    required: "can't be empty",
                  })}
                />
              </div>

              <Items fields={fields} append={append} remove={remove} />

              <div>
                {!!Object.keys(errors).length && (
                  <Text size={"sm"} className={"error"}>
                    -All fields must be added
                  </Text>
                )}
                {!getValues("items").length && (
                  <Text size={"sm"} className={"error"}>
                    -An item must be added
                  </Text>
                )}
              </div>
            </div>
            <div className={"form-dialog__buttons"}>
              {type === "newInvoice" ? (
                <>
                  <Button
                    type={"button"}
                    radius={"rounded-full"}
                    variant={"tertiary"}
                    className={"discard__button"}
                    onClick={onDiscard}
                    disabled={loading === "loading"}
                  >
                    Discard
                  </Button>
                  <Button
                    type={"button"}
                    radius={"rounded-full"}
                    variant={"secondary"}
                    onClick={onSaveDraft}
                    disabled={loading === "loading"}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    radius={"rounded-full"}
                    variant={"primary"}
                    disabled={
                      !isValid ||
                      !isDirty ||
                      !getValues("items").length ||
                      loading === "loading"
                    }
                  >
                    Save & Send
                  </Button>{" "}
                </>
              ) : (
                <>
                  <Button
                    type={"button"}
                    radius={"rounded-full"}
                    variant={"secondary"}
                    onClick={onDiscard}
                    disabled={loading === "loading"}
                  >
                    Cancel
                  </Button>
                  <Button
                    radius={"rounded-full"}
                    variant={"primary"}
                    disabled={
                      !isValid ||
                      !getValues("items").length ||
                      loading === "loading"
                    }
                  >
                    Save changes
                  </Button>
                </>
              )}
            </div>
          </Form>
        </FormProvider>
      </Dialog>
    </DialogContainer>
  );
};

export default FormDialogModal;
