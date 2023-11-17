"use client";
import * as React from "react";
import Menu, { MenuProps } from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled, alpha } from "@mui/material/styles";
import { ttColors } from "@lib/theme/colors";
import Button from "@atom/button";
import Text from "@/components/atoms/text";

interface DropdownButtonProps {
  children: React.ReactNode;
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  backgroundColor?: string;
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function DropdownButton({
  title,
  children,
  leftIcon,
  rightIcon = <KeyboardArrowDownIcon />,
  backgroundColor = ttColors.grayishAsh,
}: DropdownButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="dropdown-opener"
        aria-controls={open ? "dropdown-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        width={"auto"}
        height={"auto"}
        padding="0.5rem 1rem"
        fontWeight="medium"
        onClick={handleClick}
        color={ttColors.blackishBlue}
        startIcon={leftIcon}
        endIcon={rightIcon}
        background={backgroundColor}
        borderRadius="6px"
      >
        <Text text={title} type="p" size={14} weight="medium" />
      </Button>
      <StyledMenu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "dropdown-opener",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {children}
      </StyledMenu>
    </div>
  );
}
