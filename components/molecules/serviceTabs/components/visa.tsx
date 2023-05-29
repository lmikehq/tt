import { AutoComplete, TextField } from "@atom/input";
import SearchInput from "@atom/searchInput";
import Text from "@atom/text";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
function Visa() {
  return (
    <div>
      <TextField legend="Home Country" placeholder="Nigerian - NG" />
      <AutoComplete />
      <SearchInput
        placeholder=""
        options={[
          { name: "Nigerian - NG" },
          { name: "Nigerian - NG" },
          { name: "Nigerian - NG" },
          { name: "Nigerian - NG" },
          { name: "Nigerian - NG" },
        ]}
      >
        <Text type="p" text="Nigerian - NG" />
        <IoIosArrowDown />
      </SearchInput>
    </div>
  );
}

export default Visa;
