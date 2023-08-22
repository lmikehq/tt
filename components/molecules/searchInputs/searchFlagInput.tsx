import Flex from "@atom/flex";
import SearchInput from "@atom/searchInput";
import Text from "@atom/text";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import { useScreenResolution } from "hook/useScreenResolution";
import { CSSProperties } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
interface SearchFlagInputProps {
  value?: string;
  placeholder: string;
  options: any[];
  onChange: (x: any) => void;
  size?: CSSProperties["fontSize"];
  disabled?: boolean;
}

const SearchFlagInput = ({
  value,
  placeholder,
  onChange,
  options,
  size,
  disabled,
}: SearchFlagInputProps) => {
  const { isMobile } = useScreenResolution();

  return (
    <SearchInput
      // value={value}
      options={options}
      height="45px"
      onChange={onChange}
      disabled={disabled}
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
            maxWidth: "85%",
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
    </SearchInput>
  );
};

export default SearchFlagInput;
