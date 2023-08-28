'use client'

import CustomTab from '@atom/tabs';
import React from 'react'
import { styled } from 'styled-components';
import Application from './components/application';
import PaymentHistory from './components/payment';
import Referrals from './components/referral';
import Account from './components/account';


const Wrapper = styled.div`
  margin-top: 250px;
 

  @media screen and (max-width: 900px) {
    margin-top: 155px;
  }

  .MuiBox-root.css-1gsv261 {
    box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
    border-radius: 12px;
  }
  .MuiButtonBase-root {
    width: 16.6666%;

    .flex__FlexWrapper-sc-996d4228-0 {
      justify-content: center;
    }

    .flex__FlexWrapper-sc-54bd3624-0 {
      justify-content: center;
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
          content: <Referrals />,
        },

        {
          label: "Notifications",
          value: 3,
          content: <Referrals />,
        },
        {
          label: "Referral",
          value: 4,
          content: <Referrals />,
        },

        {
          label: "Account",
          value: 5,
          content: <Account />,
        },
      ];
  return (
    <Wrapper>
      <CustomTab shadowShow tabItems={tabItems} />
    </Wrapper>
  );
}

export default DashboardTabs