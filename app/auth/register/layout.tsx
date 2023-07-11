import RTQueryClient from "@components/layouts/rtqWrapper";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <RTQueryClient>{children}</RTQueryClient>;
}
