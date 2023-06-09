import { InputAdornment, TextField } from "@mui/material";
import Autocomplete, {
  AutocompleteCloseReason,
  autocompleteClasses,
} from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import InputBase from "@mui/material/InputBase";
import Popper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Flex from "./flex";
import Text from "./text";

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
    height: "300px",
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
  options: any[];
  value?: any;

  onChange: (x: any) => void;
}

export default function SearchInput({
  children,
  options,
  legend,
  value,
  onChange,
}: // anchorEl,
// setAnchorEl,
SearchProps) {
  const [_inputValue, setInputValue] = useState("");
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const ref = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [searchOptions, setSearchOptions] = useState<any[]>(options);
  const getWidth = (): number => {
    if (ref.current) {
      const width = ref.current.clientWidth;
      return width;
    }
    return 0;
  };
  const handleClose = () => {
    setAnchorEl(null);
    setInputValue("");
  };

  const open = Boolean(anchorEl);
  const id = open ? "select-service" : undefined;
  return (
    <>
      <Box ref={ref}>
        <TextField
          sx={{
            width: "100%",
            fontSize: 16,
            color: "#1C1B1F",
            "& .MuiInputAdornment-root.MuiInputAdornment-positionStart.MuiInputAdornment-outlined.MuiInputAdornment-sizeMedium.css-ittuaa-MuiInputAdornment-root":
              {
                position: "absolute",
                top: "50%",
                display: "flex",
                justifyContent: "center",
                width: "92%",
              },
            "& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root": {
              display: "block!important",
            },
            "& label": {
              color: "#1C1B1F!important",
              fontSize: "16px!important",
            },
            "& input": {
              height: "18px",
            },
          }}
          onClick={handleClick}
          label={legend}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box sx={{ width: "100%" }}>{children}</Box>
                {/* <IoIosArrowDown size={20} /> */}
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
                if (newValue !== null) {
                  //*** refactoring */
                  // the function should run before dropdown modal closes which is not the case currently!
                  handleClose();
                  onChange(newValue);
                }
              }}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No matches found"
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Flex align="center" margin=".4rem .6rem" gap=".6rem">
                    <Image src={option.flag} width={16} height={16} alt="" />
                    <Text
                      type="p"
                      text={`${option.name} - ${option.code}`}
                      weight={100}
                    />
                  </Flex>
                  <br />
                </li>
              )}
              options={options}
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
export function SearchInputAsString({
  children,
  options,
  legend,
  value,
  onChange,
}: SearchProps) {
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [inputValue, setInputValue] = useState("");
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const ref = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
            "& .MuiInputAdornment-root": {
              position: "absolute",
              top: "50%",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            },
            "& svg": {
              position: "absolute",
              right: "25px",
              bottom: "-10px",
            },
            "& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root": {
              display: "block!important",
            },
            "& label": {
              color: "#1C1B1F!important",
              fontSize: "16px!important",
            },
            "& input": {
              height: "18px",
            },
          }}
          onClick={handleClick}
          label={legend}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box sx={{ width: "100%" }}>{children}</Box>
                {/* <IoIosArrowDown size={20} /> */}
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
                if (newValue !== null) {
                  handleClose();
                  onChange(newValue);
                }
              }}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No matches found"
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Flex align="center" margin=".4rem .6rem" gap=".6rem">
                    {/* <Image src={option.flag} width={16} height={16} alt="" /> */}
                    <Text type="p" text={`${option}`} weight={100} />
                  </Flex>
                  <br />
                </li>
              )}
              options={[...options]}
              getOptionLabel={(option) => option}
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
