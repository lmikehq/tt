interface layoutProps {
  children: React.ReactNode;
}

export default async function CountryLayout({ children }: layoutProps) {
  return <>{children}</>;
}
