interface layoutProps {
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: {
    countryName: string;
  };
}) {
  const country =
    params.countryName.charAt(0).toLocaleUpperCase() +
    params.countryName.slice(1);
  return {
    title: `${country} Visa | Get ${country} visa with Thrillers Travels`,
    description:
      `Thrillers Travels can help you to process ${country} visa, and also provide all the necessary documents.`,
  };
}

export default async function CountryLayout({ children }: layoutProps) {
  return <>{children}</>;
}
