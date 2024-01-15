import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { BiSolidMinusCircle } from "react-icons/bi";
import { BsPlusCircleFill } from "react-icons/bs";

interface showProps {
  active: boolean;
  handleClick: (e: any) => void;
}

export default function ShowButton({ active, handleClick }: showProps) {
  const { isMobile } = useScreenResolution();
  return (
    <div>
      {active ? (
        <>
          <BiSolidMinusCircle
            color="#6092A7"
            size={isMobile ? 28 : 42}
            onClick={handleClick}
            cursor="pointer"
          />
        </>
      ) : (
        <>
          <BsPlusCircleFill
            color="#3C3C4380"
            size={isMobile ? 28 : 35}
            onClick={handleClick}
            cursor="pointer"
          />
        </>
      )}
    </div>
  );
}
