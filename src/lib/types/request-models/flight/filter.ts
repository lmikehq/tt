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
    stopOver: {
      min: number;
      max: number;
    };
    travelTime: {
      min: number;
      max: number;
    };
  };
    price: {
        min: 0,
        max: 40000
    };
  cabin: string[];
}
