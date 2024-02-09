import { create } from 'zustand';

interface CheckoutInfo {
  receiept_url: string;
  reference: string;
  price: number;
}
interface State {
  dependantCheckoutInfo: CheckoutInfo;
}

interface Actions {
  setCheckoutDependantInfo: (payload: CheckoutInfo) => void;
}

export const accompanyStore = create<State & Actions>((set): Actions & State => ({
  dependantCheckoutInfo: { receiept_url: "", reference: "", price: 0 },
  setCheckoutDependantInfo({ receiept_url, price, reference }: CheckoutInfo) {
    set((state) => ({
      dependantCheckoutInfo: {
        price: price,
        receiept_url: receiept_url,
        reference: reference
      }
    }));
  }
}))

