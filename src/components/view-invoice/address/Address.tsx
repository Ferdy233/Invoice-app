import Text from "../../ui/typography/text/Text.tsx";

interface AddressProps {
  street: string;
  city: string;
  postCode: string;
  country: string;
  className?: string;
}

const Address = ({
  street,
  city,
  postCode,
  country,
  className,
}: AddressProps) => {
  const address: string[] = [street, city, postCode, country];
  return (
    <div className={`address ${className ?? ""}`}>
      {address.map((location: string, index) => (
        <Text key={location + index} size={"sm"}>
          {location ?? ""}
        </Text>
      ))}
    </div>
  );
};

export default Address;
