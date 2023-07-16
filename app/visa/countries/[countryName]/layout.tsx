interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Explore ",
  description:
    "We're your dedicated travel partner, helping you navigate your journey to the West with ease. ",
};

export default async function CountryLayout({ children }: layoutProps) {
  return <>{children}</>;
}
