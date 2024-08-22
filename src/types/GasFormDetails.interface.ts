interface TempValues {
  tempDistance: string;
  tempConsume: string;
  tempPrice: string;
  tempPeople: string;
  tempTollValue: string;
}

interface Errors {
  distance: boolean;
  consume: boolean;
  price: boolean;
}

interface MainDetails {
  distance: number;
  consume: number;
  price: number;
  people: number;
  hasToll: boolean;
  tollValue: number;
  showResult: boolean;
  calculatedOnce: boolean;
}

export interface GasFormDetails {
  mainDetails: MainDetails;
  tempValues: TempValues;
  errors: Errors;
}