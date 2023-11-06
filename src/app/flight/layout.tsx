
interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Book your flights",
  description: "Book your flights here",
};

export default function FlightLayout({ children }: layoutProps) {
  return children;
}
