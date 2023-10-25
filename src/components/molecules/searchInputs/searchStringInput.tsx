import Flex from "@components/templates/flex";
import { SearchInputAsString } from "@organism/searchInput";
import Text from "@atom/text";
import { CSSProperties, ReactNode } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { IconType } from "react-icons";
import { error } from "console";
interface SearchStringInputProps {
    value?: string;
    placeholder: string;
    onChange: (x: any) => void;
    options: any[];
    size?: CSSProperties["fontSize"];
    border?: string;
    error?: boolean;
    cursor?: CSSProperties['cursor'];
    icon?: ReactNode;
}

const SearchStringInput = ({
    value,
    placeholder,
    onChange,
    options,
    size,
    error,
    border,
    cursor,
    icon
}: SearchStringInputProps) => {
    return (
        <SearchInputAsString
            value={value}
            options={options}
            height="45px"
            onChange={onChange}
            border={border}
            error={error}
            cursor={cursor}
        >
            <Flex justify="space-between" cursor="pointer">
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
                    icon ? icon : <AiOutlineCheck color="#3BB98E" />
                ) : (
                    <IoIosArrowDown size={20} />
                )}
            </Flex>
        </SearchInputAsString>
    );
};

export default SearchStringInput;
