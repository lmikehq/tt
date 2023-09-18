
interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Apply for your visa ",
  description: "Apply for your visa here",
};

export default async function VisaLayout({ children }: layoutProps) {
  return <main>{children}</main>;
}
