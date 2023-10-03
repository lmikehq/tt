"use client";

import FlightBookingProgress from "@/components/molecules/FormProgress/FlightBookingProgress";
import Section from "@/components/molecules/section";
import PriceSummary from "@/components/organisms/flight/booking/side-menus/PriceSummary";
import ChooseTicketFare from "@/components/organisms/flight/booking/steps/ChooseTicketFare";
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
            setStep={function ({ step }: { step: number }): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Section>
        <MultiStepWithSideMenu
          sideMenu={(() => {
            switch (step) {
              case 2:
              case 3:
                return <PriceSummary />;
              case 4:
                return;
            }
          })()}
        >
          <>
            {(() => {
              switch (step) {
                case 2:
                  return <TripSummary />;
                case 3:
                  return <ChooseTicketFare />;
                case 4:
                  return;
              }
            })()}
          </>
        </MultiStepWithSideMenu>
      </SectionLayout>
    </Section>
  );
};

export default FlightBookingPage;
