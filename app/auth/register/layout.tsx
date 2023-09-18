import RTQueryClient from "@components/layouts/rtqWrapper";

export const metadata = {
  title: "Register your travels account",
  description: "Register your travels account",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RTQueryClient>{children}</RTQueryClient>;
}
