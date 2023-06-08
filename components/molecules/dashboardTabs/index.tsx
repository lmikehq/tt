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

  .MuiBox-root.css-1gsv261 {
    box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
    border-radius: 12px;
  }
  .MuiButtonBase-root {
    width: 25%;

    .flex__FlexWrapper-sc-996d4228-0 {
      justify-content: center;
    }
  }
`;


function DashboardTabs() {
      const tabItems = [
        {
          label: "Applications",
          value: 0,
          content: <Application />,
        },
        {
          label: "Payment history",
          value: 1,
          content: <PaymentHistory />,
        },
        {
          label: "Referral",
          value: 2,
          content: <Referrals />,
        },

        {
          label: "Account",
          value: 3,
          content: <Account />,
        },
      ];
  return (
    <Wrapper>
      <CustomTab tabItems={tabItems} />
    </Wrapper>
  );
}

export default DashboardTabs