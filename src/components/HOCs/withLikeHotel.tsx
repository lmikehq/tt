import { useLikeHotel } from "@/lib/hooks/stay/index.hook";
import { ComponentType, useState } from "react";
import toast from "react-hot-toast";

interface HocProps {
  id: string;
}

function withLikeHotel<P extends object>(WrappedComponent: ComponentType<P>) {
  return function EnhancedComponent(props: P & HocProps) {
    const { id } = props;
    const [hotelLiked, setHotelLiked] = useState(false);
    const { isLoading, mutate } = useLikeHotel({
      onSuccess: () => {
        setHotelLiked(true);
        toast.success("Hotel liked");
      },
    });

    const handleLikeHotel = () => {
      mutate({ id });
    };

    return (
      <WrappedComponent
        {...props}
        checked={hotelLiked}
        onChange={handleLikeHotel}
      />
    );
  };
}

export default withLikeHotel;
