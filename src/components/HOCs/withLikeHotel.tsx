import { useLikeHotel } from "@/lib/hooks/stay/index.hook";
import { capCase } from "@/lib/utilFns";
import { ComponentType, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../molecules/icons/spinner";
import { useUserStore } from "@/lib/store/useStore";

interface HocProps {
    id: string;
    liked?: boolean;
}

function withLikeHotel<P extends object>(WrappedComponent: ComponentType<P>) {
    return function EnhancedComponent(props: P & HocProps) {
        const { user, setAuthModal } = useUserStore()
        const { id, liked } = props;
        const [hotelLiked, setHotelLiked] = useState(liked ?? false);
        const { isLoading, mutateAsync } = useLikeHotel({
            onSuccess: (res) => {
                setHotelLiked(res?.msg === 'hotel liked' ? true : false);
                toast.success(capCase(res?.msg));
            },
        });
        

        const handleLikeHotel = () => {
            if (user?._id) {
                mutateAsync({ id });
            } else {
                setAuthModal(true)
                toast.error("Sign up or Log in to like hotels")
            }
        };

        return (isLoading ? (
            <Spinner size="45px" />
        ) : (
            <WrappedComponent
                {...props}
                checked={hotelLiked}
                onChange={handleLikeHotel}
            />
        ));
    };
};

export default withLikeHotel;
