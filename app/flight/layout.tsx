interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "flights",
};

export default async function FlightLayout({ children }: layoutProps) {
  return <>{children}</>;
}
