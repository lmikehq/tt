import { SeatRowInterface } from "./booking.type";

interface SeatOffer {
  is_final: boolean;
  quick_options: QuickOption[];
  seatmap: SeatMap;
  segment_code: string;
}

interface QuickOption {
  option: string;
  price: {
    amount: string;
    base: string;
    currency: string;
    merchant: string;
    service: string;
    service_flat: string;
  };
}

interface SeatMap {
  sections: SeatSection[];
}

interface SeatSection {
  deck: string;
  rows: SeatRowInterface[];
  section_class: string;
}

interface SeatGroup {
  column: string;
  features: string[];
  name: string;
  price: {
    amount: string;
    base: string;
    currency: string;
    merchant: string;
    service: string;
    service_flat: string;
  };
  seat_class: string;
  state: string;
  type: string;
}

export interface CheckSeatingResponse {
  seating: {
    offers: SeatOffer[];
    status: string;
    ttl: number;
  };
  session_id: string;
}
