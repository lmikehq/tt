"use client";

import CustomTab from "@atom/tabs";
import React from "react";
import { styled } from "styled-components";
import Application from "./components/application";
import PaymentHistory from "./components/payment";
import Account from "./components/account";
import Favourite from "./components/favourite";
import Notification from "./components/notification";
import RTQueryClient from "@components/templates/rtqWrapper";
import Referrals from "./components/referral";

const Wrapper = styled.div`
  margin-top: 10px;

  .MuiBox-root.css-1gsv261 {
    box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
    border-radius: 12px;
  }
  .MuiButtonBase-root {
    width: 16.6666667%;

    .flex__FlexWrapper-sc-996d4228-0 {
      justify-content: center;
    }

    .flex__FlexWrapper-sc-54bd3624-0 {
      justify-content: center;
    }

    @media screen and (max-width: 900px) {
      width: 50%;
    }
  }

 
`;

function DashboardTabs() {

  const tabItems = [
    {
      label: "All Applications",
      value: 0,
      content: <Application />,
    },
    {
      label: "Payment History",
      value: 1,
      content: <PaymentHistory />,
    },
    {
      label: "Favourites",
      value: 2,
      content: <Favourite />,
    },

    {
      label: "Notifications",
      value: 3,
      content: <Notification />,
    },

    {
      label: "Account",
      value: 4,
      content: <Account />,
    },
    {
      label: "Referral",
      value: 5,
      content: <Referrals />,
    }
  ];

  return (
    <Wrapper>
      <RTQueryClient>
        <CustomTab shadowShow tabItems={tabItems} />
      </RTQueryClient>
    </Wrapper>
  );
}

export default DashboardTabs;
