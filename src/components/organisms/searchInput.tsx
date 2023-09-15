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
import Image from "@atom/image";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { ttColors } from "@lib/theme/colors";

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
    height: "auto",
    maxHeight: "300px",
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
export const RoundFlag = styled("div")(({ flag }: { flag: string }) => ({
  width: " 28px",
  height: "28px",
  borderRadius: "50%",
  backgroundImage: `url(${flag})`,
}));

interface SearchProps {
  legend?: string;
  children?: React.ReactNode;
  placeholder?: string;
  height?: string;
  padding?: string;
  options: any[];
  value?: any;
  border?: string;
  disabled?: boolean;
  error?: boolean;
  onChange: (x: any) => void;
}

export default function SearchInput({
  placeholder,
  children,
  options,
  legend,
  value,
  height,
  padding,
  error,
  onChange,
  disabled = false,
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
            "& .MuiInputAdornment-root": {
              position: "absolute",
              top: "50%",
              display: "flex",
              justifyContent: "center",
              width: "92%",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: `${ttColors.primary} !important`,
            },
            "&:hover .MuiInputBase-root": {
              color: `${ttColors.primary} !important`,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: error ? "red" : "",
            },
            "& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root": {
              display: "block!important",
            },
            "& label": {
              fontSize: "16px!important",
            },
            "& input": {
              height: height || "45px",
              padding: padding || "0px",
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
      {disabled ? null : (
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
                    <Flex align="center" margin=".4rem .6rem" gap="1.5rem">
                      {option.flag && <RoundFlag flag={option.flag.src} />}
                      {option.code ? (
                        <Text
                          type="p"
                          text={`${option.code} - ${option.name}`}
                          weight={300}
                        />
                      ) : (
                        <Text type="p" text={`${option.name}`} weight={300} />
                      )}
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
      )}
    </>
  );
}

export function SearchInputAsString({
  placeholder,
  children,
  options,
  legend,
  value,
  error,
  onChange,
  height,
  padding,
  border,
}: SearchProps) {
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
      <Box
        ref={ref}
        sx={{
          border: 0,
        }}
      >
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
              // color: "inherit !important",
            },
            "& fieldset": {
              border: border === "bottom" ? "none" : border,
            },
            "& svg": {
              position: "absolute",
              right: "25px",
              bottom: "-10px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: `${ttColors.primary} !important`,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: error ? "red" : "",
            },
            "&:hover .MuiInputBase-root": {
              color: `${ttColors.primary} !important`,
            },
            "& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root": {
              display: "block!important",
              position: "relative",
              // color: "inherit !important",
              borderBottom: border === "bottom" ? "1px solid #E7E7E7" : "",
              borderRadius: border === "bottom" ? "0" : "4px",
            },
            "& label": {
              fontSize: "16px!important",
              // color: "inherit !important",
            },
            "& input": {
              height: height || "45px",
              padding: padding || "0px",
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
          placeholder={placeholder}
        />
      </Box>
      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        sx={{
          width: getWidth(),
          zIndex: "32456789",
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
                    <Text type="p" text={`${option}`} weight={300} />
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
