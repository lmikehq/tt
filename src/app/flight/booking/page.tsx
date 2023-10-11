"use client";

import FlightBookingProgress from "@/components/molecules/FormProgress/FlightBookingProgress";
import Section from "@/components/molecules/section";
import { OverviewHeader, SeatHeader } from "@/components/organisms/flight/booking/headers";
import OverviewSystem from "@/components/organisms/flight/booking/side-menus/OverviewSystem";
import PriceSummary from "@/components/organisms/flight/booking/side-menus/PriceSummary";
import SeatSelectionMenu from "@/components/organisms/flight/booking/side-menus/SeatSelectionMenu";
import ChooseTicketFare from "@/components/organisms/flight/booking/steps/ChooseTicketFare";
import OverviewAndPayment from "@/components/organisms/flight/booking/steps/OverviewAndPayment";
import SeatSelection from "@/components/organisms/flight/booking/steps/SeatSelection";
import TripSummary from "@/components/organisms/flight/booking/steps/TripSummary";
import MultiStepWithSideMenu from "@/components/templates/MultiStepWithSideMenu";
import SectionLayout from "@/components/templates/SectionLayout";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";

const FlightBookingPage = () => {
  const { step, setStep, prevStep, highestStep } = useFlightBookingStore(
    (state) => state
  );
  return (
    <Section>
      <SectionLayout>
        <Section styles={{ paddingTop: "34px", paddingBottom: "99px" }}>
          <FlightBookingProgress
            phase={step}
            highestPhase={highestStep}
            setStep={setStep}
          />
        </Section>
        <MultiStepWithSideMenu
          header={(() => {
            switch (step) {
              case 4:
                return <SeatHeader/>
              case 5:
                return <OverviewHeader/>;
            }
          })()}
          sideMenu={(() => {
            switch (step) {
              case 2:
              case 3:
                return <PriceSummary />;
              case 5:
                return <OverviewSystem/>;
              case 4:
                return <SeatSelectionMenu />;
            }
          })()}
        >
          <>
            {(() => {
              switch (step) {
                case 2:
                  return <TripSummary/>;
                case 3:
                  return <ChooseTicketFare />;
                case 5:
                  return <OverviewAndPayment/>;
                case 4:
                  return <SeatSelection />;
              }
            })()}
          </>
        </MultiStepWithSideMenu>
      </SectionLayout>
    </Section>
  );
};

export default FlightBookingPage;
