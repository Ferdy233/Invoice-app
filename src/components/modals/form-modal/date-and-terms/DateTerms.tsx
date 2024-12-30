import { useFormContext } from "react-hook-form";
import {
  selectPaymentTerms,
  toggleModal,
} from "../../../../features/modal/modal.slice.tsx";
import Icon from "../../../ui/icon/Icon.tsx";
import arrowDownIcon from "../../../../assets/images/icon-arrow-down.svg";
import Button from "../../../ui/button/button.tsx";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useRedux.ts";
import { Errors } from "../../../../types/form.types.ts";
import Text from "../../../ui/typography/text/Text.tsx";
import CustomSelect from "../CustomSelect.tsx";
import { useState } from "react";
import "./dateterms.styles.css";

const DateTerms = () => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const dispatch = useAppDispatch();
  const showPaymentTerms = useAppSelector(selectPaymentTerms);
  const { createdAt, paymentTerms } = (errors as Errors) ?? {};
  const [option, setOption] = useState<number>(getValues("paymentTerms"));

  const handleSelectOption = (value: number) => {
    setOption(value);
    setValue("paymentTerms", value);
    dispatch(toggleModal("showPaymentTerms"));
  };
  return (
    <div className={"date-term"}>
      <div>
        <label htmlFor={"date"} className={createdAt && "error"}>
          Invoice Date
          {createdAt && <Text type={"span"}>{createdAt?.message}</Text>}
        </label>
        <input
          className={createdAt && "error"}
          id={"date"}
          type={"date"}
          {...register("createdAt", {
            required: "required",
          })}
        />
      </div>
      <div className={`payment-terms`}>
        <label className={paymentTerms ? "error" : ""}>Payment Terms</label>
        <Button
          className={`${showPaymentTerms ? "active" : ""}`}
          type={"button"}
          onClick={() => dispatch(toggleModal("showPaymentTerms"))}
        >
          Net {option} Day{option > 1 && "s"}
          <Icon
            className={showPaymentTerms ? "rotate180" : ""}
            size={"sm"}
            icon={arrowDownIcon}
            description={"dropdown arrow"}
          />
        </Button>

        {showPaymentTerms && (
          <>
            <div
              className={"overlay"}
              onClick={() => dispatch(toggleModal("showPaymentTerms"))}
            ></div>
            <CustomSelect handleSelectOption={handleSelectOption} />
          </>
        )}
      </div>
    </div>
  );
};

export default DateTerms;
