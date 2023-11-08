export default function FlightDepartureIcon({ reverse }: { reverse?: boolean }) {
  return (
    <img
        src={"/assets/images/flights/departure.png"}
        alt="flight departure"
        width="18px"
        height="70%"
        style={{ transform: reverse ? "rotateZ(180deg)" : "" }}
    />
  );
}
