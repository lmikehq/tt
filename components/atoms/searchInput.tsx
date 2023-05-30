import { LabelType } from "@molecule/serviceTabs/components/visa";
import { InputAdornment, TextField } from "@mui/material";
import Autocomplete, {
  AutocompleteCloseReason,
  autocompleteClasses,
} from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import InputBase from "@mui/material/InputBase";
import Popper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Text from "./text";
import Flex from "./flex";
import { IoIosArrowDown } from "react-icons/io";

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

const StyledAutocompletePopper = styled("div")(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: "none",
    margin: 0,
    color: "inherit",
    fontSize: 16,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: "#fff",
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: "auto",
      alignItems: "flex-start",
      padding: 8,
      borderBottom: `1px solid #eaecef`,
      '&[aria-selected="true"]': {
        backgroundColor: "transparent",
      },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: "relative",
  },
}));

function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

const StyledPopper = styled(Popper)(() => ({
  border: `1px solid #e1e4e8`,
  borderRadius: 6,
  fontSize: 16,
  backgroundColor: "#fff",
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: "100%",
  borderBottom: `1px solid #eaecef`,
  "& input": {
    borderRadius: 4,
    backgroundColor: "#fff",
    padding: 8,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    border: `1px solid #eaecef`,
    fontSize: 16,
  },
}));

interface SearchProps {
  legend?: string;
  children?: React.ReactNode;
  placeholder?: string;
  options: LabelType[];
  value?: LabelType;
  onChange: (x: any) => void;
}

export default function SearchInput({
  children,
  options,
  legend,
  value,
  onChange,
}: SearchProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [inputValue, setInputValue] = useState("");
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const ref = useRef<HTMLDivElement>(null);
  const getWidth = (): number => {
    if (ref.current) {
      const width = ref.current.clientWidth;
      return width;
    }
    return 0;
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "select-service" : undefined;
  useEffect(() => {}, [inputValue]);
  return (
    <>
      <Box ref={ref}>
        <TextField
          sx={{
            width: "100%",
            fontSize: 16,
            "& .MuiInputAdornment-root.MuiInputAdornment-positionStart.MuiInputAdornment-outlined.MuiInputAdornment-sizeMedium.css-ittuaa-MuiInputAdornment-root":
              {
                position: "absolute",
                top: "50%",
                display: "flex",
                justifyContent: "center",
                width: "86%",
              },
            "& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root": {
              display: "block!important",
            },
          }}
          onClick={handleClick}
          label={legend}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box sx={{ width: "100%" }}>{children}</Box>
                <IoIosArrowDown size={20} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        sx={{
          width: getWidth(),
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Autocomplete
              open
              onClose={(
                _event: React.ChangeEvent<{}>,
                reason: AutocompleteCloseReason
              ) => {
                if (reason === "escape") {
                  handleClose();
                }
              }}
              value={value}
              onChange={(event, newValue, reason) => {
                if (reason === "clear") {
                  return;
                }
                if (
                  event.type === "keydown" &&
                  (event as React.KeyboardEvent).key === "Backspace" &&
                  reason === "removeOption"
                ) {
                  return;
                }
                if (newValue !== null) onChange(newValue);
                handleClose();
              }}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No matches found"
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Flex align="center" margin=".4rem .6rem" gap=".6rem">
                    <Image src={option.flag} width={16} height={16} alt="" />
                    <Text type="p" text={`${option.name} - ${option.code}`} />
                  </Flex>
                  <br />
                </li>
              )}
              options={[...options].filter((x) =>
                x.name.toLowerCase().includes(inputValue.toLowerCase())
              )}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  placeholder=""
                  autoFocus
                  onChange={(e) => setInputValue(e.target.value)}
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </>
  );
}
