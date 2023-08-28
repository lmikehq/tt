import { BiSolidMinusCircle } from "react-icons/bi";
import { BsPlusCircleFill } from "react-icons/bs";

interface showProps {
  active: boolean;
  handleClick: (e: any) => void;
}

export default function ShowButton({ active, handleClick }: showProps) {
  return (
    <div>
      {active ? (
        <>
          <BiSolidMinusCircle
            color="#6092A7"
            size={50}
            onClick={handleClick}
            cursor="pointer"
          />
        </>
      ) : (
        <>
          <BsPlusCircleFill
            color="#3C3C4380"
            size={45}
            onClick={handleClick}
            cursor="pointer"
          />
        </>
      )}
    </div>
  );
}
