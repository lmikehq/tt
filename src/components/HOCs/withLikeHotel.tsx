import { useLikeHotel } from "@/lib/hooks/stay/index.hook";
import { ComponentType, useState } from "react";
import toast from "react-hot-toast";
import { RefetchProp } from "types";

interface HocProps {
  id: string;
  refetch?: RefetchProp;
}

function withLikeHotel<P extends object>(WrappedComponent: ComponentType<P>) {
  return function EnhancedComponent(props: P & HocProps) {
    const { id, refetch } = props;
    const [hotelLiked, setHotelLiked] = useState(false);
    const { isLoading, mutate } = useLikeHotel({
      onSuccess: (data) => {
        if (data?.msg === 'hotel liked') {
          setHotelLiked(data?.success);
          toast.success(data?.msg);
        } else if (data?.msg === 'hotel disliked') {
          setHotelLiked(false);
          toast.success(data?.msg);
          if (refetch) {
            refetch();
          }
        }
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
