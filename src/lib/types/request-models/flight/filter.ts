export interface FilterData {
  bags: {
    cabin: number;
    checked: number;
  };
  stops: string;
  airlines: string[];
  departTimes: {
    depart: {
      min: string;
      max: string;
    };
    arrival: {
      min: string;
      max: string;
    };
  };
  returnTimes: {
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
        min: number,
        max: number
    };
  cabin: string;
}
