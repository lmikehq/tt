import CustomTab from "@atom/tabs";

const DashboardPage: React.FC = () => {
  const tabItems = [
    {
      label: "Passport",
      value: 0,
      content: <p>hello world</p>,
    },
    {
      label: "payment history",
      value: 1,
      content: <p>history bro</p>,
    },
    {
      label: "anything",
      value: 2,
      content: <p>yoiu can be abytibg</p>,
    },
  ];
  return (
    <div>
      <CustomTab tabItems={tabItems} />
    </div>
  );
};

export default DashboardPage;
