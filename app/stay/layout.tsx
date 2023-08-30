import { FlightProvider } from "context";

interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Rent your rooms",
  description: "Rent a room here"
};

export default function FlightLayout({ children }: layoutProps) {
  return (
    <FlightProvider>
      {children}
    </FlightProvider>
  );
}
