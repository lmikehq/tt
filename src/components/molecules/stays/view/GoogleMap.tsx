import Flex from '@/components/templates/flex';
import React, { CSSProperties } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";
import { ttColors } from '@/lib/theme/colors';
import { IconBaseProps } from 'react-icons';
import Text from '@/components/atoms/text';
import { GoogleMap as RGoogleMap, useLoadScript, Marker as RMarker, Libraries } from '@react-google-maps/api';
const libraries: Libraries = ['places'];


interface MarkerProps extends IconBaseProps {
    lat: number;
    lng: number;
    text: string;
}
function Marker({ text, color, size, lat, lng }: MarkerProps) {
    return (
        <Flex>
            <Text text={text} type='p' weight={500} />
            <FaMapMarkerAlt color={color ?? ttColors.primary} size={size ?? '2rem'} />
        </Flex>
    )
}


interface GoogleMapProps {
    lat?: string | number;
    lng?: string | number;
    address?: string;
    zoom?: number;
    containerStyles?: CSSProperties; 
}
function GoogleMap({ lat, lng, zoom, containerStyles }: GoogleMapProps) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAIrP6A0thEsQLUjz7bhVh0OH9_VNqspTg',
        libraries,
    });
    const center = { lat: Number(lat), lng: Number(lng) }

    return (!isLoaded ? (
        <div>Loading maps</div>
    ) : (
        <Flex width='100%' height='400px' styles={containerStyles}>
            <RGoogleMap
                mapContainerStyle={{ }}
                zoom={zoom ?? 10}
                center={center}
            >
                <RMarker position={center} />
            </RGoogleMap>
        </Flex>
    ))
}

export default GoogleMap