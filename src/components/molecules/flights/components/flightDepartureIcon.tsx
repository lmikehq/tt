import Image from "@/components/atoms/image";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";

export default function FlightDepartureIcon({
    reverse,
    horizontal,
    rotate,
    width,
    height,
    stops = 0,
}: {
    reverse?: boolean;
    horizontal?: boolean;
    rotate?: string;
    width?: number;
    height?: number;
    stops?: number;
}) {
    // const theStops = stops === 0 ? 0 : 0
    const stopDots = Array.from({ length: (stops > 3 ? 3 : stops)})
    
    return (
        <Flex
            styles={{
                height: horizontal ? "80px" : "60%",
                width: horizontal ? width : '30px',
                alignSelf: horizontal ? "inherit" : "flex-end",
                position: 'relative',
                justifyContent: horizontal ? "center" : "",
                alignItems: horizontal ? "center" : "flex-end"
            }}
        >
            {stops > 0 &&
                <Flex
                    width="100%"
                    height={horizontal ? "100%" : "100%"}
                    direction={horizontal ? "row" : "column"}
                    position="absolute"
                    styles={{ top: (horizontal || !reverse) ? 0 : '6%', bottom: !reverse ? "6%" : 0, left: horizontal ? "-6%" : 0, zIndex: 1 }}
                    align="center"
                    justify="center"
                    gap="1rem"
                >
                    {stopDots.map((e, index) => 
                        <Flex
                            width="12px"
                            height="12px"
                            borderRadius="50%"
                            background={ttColors.red}
                            key={`dot-${index}`}
                        />
                    )}
                </Flex>
            }
            <Image
                src="/assets/icons/plane-route.svg"
                alt="flight departure"
                width={height}
                height={width}
                styles={{
                    transform: horizontal ? `rotateZ(${reverse ? '90deg' : '-90deg'})` : reverse ? "rotateZ(180deg)" : "",
                    transformOrigin: 'center',
                    objectFit: "contain",
                }}
            />
        </Flex>
    );
}
