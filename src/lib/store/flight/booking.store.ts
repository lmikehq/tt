import { Mode } from "@lib/types";
import { create } from "zustand";

interface State {
  highestStep: number;
  step: number;
  mode: Mode;
}
interface Actions {
  prevStep: () => void;
  setStep: (params: { step: number }) => void;
}

export const useFlightBookingStore = create<State & Actions>(
  (set): State & Actions => ({
    step: 4,
    highestStep: 4,
    mode: Mode.init,

    prevStep: () => {
      set((state) => ({
        step:
          state.mode == Mode.loading || state.step == 2
            ? state.step
            : state.step - 1,
      }));
    },

    setStep: ({ step }: { step: number }) => {
      set({ step });
    },
  })
);
