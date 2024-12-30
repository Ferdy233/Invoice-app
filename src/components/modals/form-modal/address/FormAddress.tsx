import { useFormContext } from "react-hook-form";
import "./formaddress.styles.css";
import Text from "../../../ui/typography/text/Text.tsx";
import { Errors } from "../../../../types/form.types.ts";

interface FormAddressProps {
  field: string;
}

const FormAddress = ({ field }: FormAddressProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { street, postCode, city, country } = (errors[field] as Errors) ?? {};

  return (
    <div className={"form-address"}>
      <div>
        <label
          htmlFor={field + "streetAddress"}
          className={street ? "error" : ""}
        >
          Street Address
          {street && (
            <Text size={"sm"} type={"span"}>
              {street?.message}
            </Text>
          )}
        </label>
        <input
          className={street ? "error" : ""}
          id={field + "streetAddress"}
          type="text"
          {...register(`${field}.street`, {
            required: "can't be empty",
          })}
        />
      </div>
      <div className={"form-address__info"}>
        <div className={"form-address__info-left"}>
          <div>
            <label htmlFor={field + "city"} className={city ? "error" : ""}>
              City
            </label>
            <input
              className={city ? "error" : ""}
              id={field + "city"}
              type="text"
              {...register(`${field}.city`, {
                required: "required",
              })}
            />
          </div>
          <div>
            <label
              htmlFor={field + "postalCode"}
              className={postCode ? "error" : ""}
            >
              Postal Code
            </label>
            <input
              className={postCode ? "error" : ""}
              id={field + "postalCode"}
              type="text"
              {...register(`${field}.postCode`, {
                required: "required",
              })}
            />
          </div>
        </div>
        <div className={"form-address__info-country"}>
          <label htmlFor={field + "country"} className={country ? "error" : ""}>
            Country
          </label>
          <input
            className={country ? "error" : ""}
            id={field + "country"}
            type="text"
            {...register(`${field}.country`, {
              required: "required",
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default FormAddress;
