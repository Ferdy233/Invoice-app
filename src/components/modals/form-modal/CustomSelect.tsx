const Options = [
  {
    value: 1,
    description: "Net 1 Day",
  },
  {
    value: 7,
    description: "Net 7 Days",
  },
  {
    value: 14,
    description: "Net 14 Days",
  },
  {
    value: 30,
    description: "Net 30 Days",
  },
];

interface CustomSelectProps {
  handleSelectOption: (value: number) => void;
}
const CustomSelect = ({ handleSelectOption }: CustomSelectProps) => {
  return (
    <ul className={"custom-select"}>
      {Options.map((option) => (
        <li
          key={option.description}
          onClick={() => handleSelectOption(option.value)}
        >
          {option.description}
        </li>
      ))}
    </ul>
  );
};

export default CustomSelect;
