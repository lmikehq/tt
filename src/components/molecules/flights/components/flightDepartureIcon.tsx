import Image from "@/components/atoms/image";
import Section from "../../section";

export default function FlightDepartureIcon({
    reverse,
}: {
    reverse?: boolean;
}) {
    return (
        <Section
            styles={{ height: "60%", width: '30px', flex: "none", alignSelf: "flex-end" }}
        >
            <Image
                src="/assets/images/flights/departure.png"
                alt="flight departure"
                styles={{
                    transform: reverse ? "rotateZ(180deg)" : "",
                    objectFit: "contain",
                }}
            />
        </Section>
    );
}
