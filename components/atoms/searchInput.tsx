import { StaticImageData } from "next/image";
import { useState } from "react";

interface SearchProps {
  legend?: string;
  children?: React.ReactNode;
  placeholder?: string;
  options: OptionsType[];
}
interface OptionsType {
  name: string;
  flag?: StaticImageData;
}
export default function SearchInput({
  legend,
  children,
  placeholder,
  options,
}: SearchProps) {
     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
     const [value, setValue] = useState<OptionsType>();
     console.log("alue: ", value);

     const handleClick = (event: React.MouseEvent<HTMLElement>) => {
       // setValue(value);
       setAnchorEl(event.currentTarget);
     };

     const handleClose = () => {
       if (anchorEl) {
         anchorEl.focus();
       }
       setAnchorEl(null);
     };

     const open = Boolean(anchorEl);
     const id = open ? "search-inputs" : undefined;
  return <div>
    search
  </div>;
}
