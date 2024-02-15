import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { ChangeEvent } from "react";

interface FavouriteCheckBoxProps {
  checked?: boolean;
  onChange?: () => void;
}

const FavouriteCheckBox = ({ checked, onChange }: FavouriteCheckBoxProps) => {
  return (
    <Checkbox
      inputProps={{ "aria-label": "favourite-checkbox" }}
      icon={<FavoriteBorder />}
      checkedIcon={
        <Favorite
          style={{
            color: "var(--color-favorite)",
          }}
        />
      }
      disableRipple
      disableTouchRipple
      disableFocusRipple
      sx={{
        "& .MuiSvgIcon-root": {
          fontSize: 28,
          padding: 0,
        },
      }}
      checked={checked}
      onChange={onChange}
      id="favorite-hotels-checkbox"
    />
  );
};

export default FavouriteCheckBox;
