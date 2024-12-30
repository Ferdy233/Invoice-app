import Text from "../ui/typography/text/Text.tsx";

interface InvoiceTitleProps {
  title: string;
}

const InvoiceTitle = ({ title }: InvoiceTitleProps) => {
  return <Text className={"invoice-title"}>{title}</Text>;
};

export default InvoiceTitle;
