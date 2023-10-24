export interface FilterData {
  bags: {
    cabin: number;
    checked: number;
  };
  stops: string;
  airlines: string[];
  times: {
    depart: {
      min: string;
      max: string;
    };
    arrival: {
      min: string;
      max: string;
    };
  };
  alliance: string[];
  duration: {
    stops: {
      min: number;
      max: number;
    };
  };
  price: number;
  cabin: string[];
}
