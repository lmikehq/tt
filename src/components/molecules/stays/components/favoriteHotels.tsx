import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";
import Section from "../../section";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const label = { inputProps: { "aria-label": "Checkbox demo" } };


export default function FavoriteHotels() {
    const router = useRouter()
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <Section>
        <Link href='/dashboard' style={{ textDecoration: 'none' }}>
            <Box
                width={"100%"}
                bgcolor={checked ? ttColors.dark : ttColors.grayishAsh}
                padding={"2.5rem 1.5rem"}
                border={"1px solid var(--color-border)"}
                marginBottom={"20px"}
                borderRadius={"10px"}
            >
                <Flex gap="10px" align='flex-start' justify="space-between">
                    <Box
                        style={{ color: checked ? ttColors.defaultColor : ttColors.dark }}
                    >
                        <label>
                        <Text
                            weight={"bold"}
                            type="h4"
                            text="My Favourite Hotels"
                            styles={{ marginBottom: "5px" }}
                        />
                        </label>
                        <Text
                            type="p"
                            text={
                                checked
                                ? "Click to Cancel Filter"
                                : "Click to find your liked hotels."
                            }
                            size={14}
                        />
                    </Box>
                            
                    <Checkbox
                        {...label}
                        icon={<FavoriteBorder />}
                        checkedIcon={
                            <Favorite
                                style={{
                                color: checked ? ttColors.defaultColor : ttColors.dark,
                                }}
                            />
                        }
                        disableRipple
                        disableTouchRipple
                        disableFocusRipple
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 24, padding: 0 } }}
                        checked={checked}
                        onChange={handleCheckboxChange}
                        id="favorite-hotels-checkbox"
                    />
                </Flex>
            </Box>
        </Link>
    </Section>
  );
}
