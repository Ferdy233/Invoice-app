import Headline from "../../../ui/typography/headline/Headline.tsx";
import Button from "../../../ui/button/button.tsx";
import "./items.styles.css";
import Icon from "../../../ui/icon/Icon.tsx";
import plusIcon from "../../../../assets/images/icon-plus.svg";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";
import {
  FormValues,
  initialItems,
  ItemType,
} from "../../../../types/form.types.ts";
import Text from "../../../ui/typography/text/Text.tsx";

interface ItemsProps {
  fields: FieldArrayWithId<ItemType>[];
  append: UseFieldArrayAppend<FormValues, "items">;
  remove: UseFieldArrayRemove;
}
const Items = ({ remove, fields, append }: ItemsProps) => {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={"items"}>
      <Headline variant={"h3"}>Item List</Headline>
      <div className={"items__list"}>
        {fields.map((field, index) => {
          const qty = watch(`items.${index}.quantity`) || 0; // Default to 0 if undefined
          const prc = watch(`items.${index}.price`) || 0;
          return (
            <div className={"items__list-item"} key={field.id}>
              <div className={"item__name"}>
                <label htmlFor={"itemName" + index}>Item Name</label>
                <input
                  id={"itemName" + index}
                  className={
                    Array.isArray(errors.items) && errors.items[index]?.name
                      ? "error"
                      : ""
                  }
                  type="text"
                  {...register(`items.${index}.name`, {
                    required: "Item name is required",
                    pattern: {
                      value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                      message:
                        "Item name cannot contain numbers or invalid characters",
                    },
                  })}
                />
              </div>
              <div className={"items__list-item__details"}>
                <div className={"item__qty"}>
                  <label htmlFor={"itemQty" + index}>Qty</label>
                  <input
                    className={
                      Array.isArray(errors.items) &&
                      errors.items[index]?.quantity
                        ? "error"
                        : ""
                    }
                    type="number"
                    id={"itemQty" + index}
                    {...register(`items.${index}.quantity`, {
                      required: "Quantity is required",
                      // valueAsNumber: true,
                      pattern: {
                        value: /^\d+$/,
                        message: "must be a number",
                      } as const,
                    })}
                  />
                </div>
                <div className={"item__price"}>
                  <label htmlFor={"itemPrice" + index}>Price</label>
                  <input
                    className={
                      Array.isArray(errors.items) && errors.items[index]?.price
                        ? "error"
                        : ""
                    }
                    type="number"
                    id={"itemPrice" + index}
                    {...register(`items.${index}.price`, {
                      required: "Price is required",
                      // valueAsNumber: true,
                      pattern: {
                        value: /^\d+(\.\d{1,2})?$/,
                        message: "Price must be a valid number",
                      } as const,
                    })}
                  />
                </div>
                <div className={"item__total"}>
                  <label htmlFor="">Total</label>
                  <Text size={"sm"} bold>
                    {(qty * prc).toFixed(2)}
                  </Text>
                </div>

                <Button
                  className={"delete-item__button"}
                  onClick={() => remove(index)}
                >
                  <svg
                    width="13"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                      fill="#888EB0"
                      fill-rule="nonzero"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <Button
        type={"button"}
        variant={"tertiary"}
        className={"add-item__button"}
        radius={"rounded-full"}
        onClick={() => append(initialItems)}
      >
        <Icon icon={plusIcon} size={"xs"} description={"add icon"} />
        add new item
      </Button>
    </div>
  );
};

export default Items;
