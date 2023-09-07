import Flex from "@components/templates/flex";
import { SearchInputAsString } from "@organism/searchInput";
import Text from "@atom/text";
import { CSSProperties } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
interface SearchStringInputProps {
  value?: string;
  placeholder: string;
  onChange: (x: any) => void;
  options: any[];
  size?: CSSProperties["fontSize"];
  border?: string;
}

const SearchStringInput = ({
  value,
  placeholder,
  onChange,
  options,
  size,
  border,
}: SearchStringInputProps) => {
  return (
    <SearchInputAsString
      value={value}
      options={options}
      height="45px"
      onChange={onChange}
      border={border}
    >
      <Flex justify="space-between">
        <Text
          type="p"
          text={value ? value : placeholder}
          color={value ? "#1C1B1F" : "#929292"}
          weight={400}
          size={size}
          styles={{
            cursor: "pointer",
            maxWidth: "80%",
            textOverflow: "clip",
            overflow: "hidden",
          }}
        />
        {value ? (
          <AiOutlineCheck color="#3BB98E" />
        ) : (
          <IoIosArrowDown size={20} />
        )}
      </Flex>
    </SearchInputAsString>
  );
};

export default SearchStringInput;
