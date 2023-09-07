import { useScreenResolution } from "@lib/hook/useScreenResolution";
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
            size={isMobile ? 32 : 50}
            onClick={handleClick}
            cursor="pointer"
          />
        </>
      ) : (
        <>
          <BsPlusCircleFill
            color="#3C3C4380"
            size={isMobile ? 32 : 45}
            onClick={handleClick}
            cursor="pointer"
          />
        </>
      )}
    </div>
  );
}
