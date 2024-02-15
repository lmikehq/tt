import Flex from "@components/templates/flex";
import SearchInput from "@organism/searchInput";
import Text from "@atom/text";
import { COUNTRY_FLAGS } from "@lib/extensions/data/COUNTRY_FLAGS";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { CSSProperties } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
interface SearchFlagInputProps {
  value?: any;
  placeholder: string;
  options: any[];
  onChange: (x: any) => void;
  size?: CSSProperties["fontSize"];
  disabled?: boolean;
  error?: boolean;
}

const SearchFlagInput = ({
  value,
  placeholder,
  onChange,
  options,
  size,
  error,
  disabled,
}: SearchFlagInputProps) => {
  return (
    <SearchInput
      value={value}
      options={options}
      height="45px"
      onChange={onChange}
      disabled={disabled}
      error={error}
    >
      <Flex justify="space-between" cursor="pointer" align="center" width="100%">
        <Text
          type="p"
          text={value?.name ? value.name : placeholder}
          color={value?.name ? "#1C1B1F" : "#929292"}
          weight={400}
          size={size}
          styles={{
            cursor: "pointer",
            maxWidth: "85%",
            textOverflow: "clip",
            overflow: "hidden",
          }}
        />
        {value?.name ? (
          <IoIosArrowDown size={18} />
          //   <AiOutlineCheck color="#3BB98E" />
        ) : (
          <IoIosArrowDown size={18} />
        )}
      </Flex>
    </SearchInput>
  );
};

export default SearchFlagInput;
