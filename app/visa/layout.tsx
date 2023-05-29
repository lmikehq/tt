interface layoutProps {
  children: React.ReactNode;
}

export default async function VisaLayout({ children }: layoutProps) {
  return <>{children}</>;
}
