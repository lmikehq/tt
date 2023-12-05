import { ComponentType } from "react";

interface HocProps {
    // Props definition for the HOC
}

function withLikeHotel<P extends object>(WrappedComponent: ComponentType<P>) {
    return function EnhancedComponent(props: P & HocProps) {
        const handleLikeHotel = () => {};

        // Additional logic and functionality of the HOC
        // You can access props of the wrapped component and the HOC's own props here

        return (
            <WrappedComponent {...props} handlelikeHotel={handleLikeHotel} />
        );
    };
}

export default withLikeHotel;
