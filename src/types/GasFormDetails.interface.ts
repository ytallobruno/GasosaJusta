export interface GasFormDetails {
  distance: number;
  consume: number;
  price: number;
  people: number;
  toll: boolean;
  tollValue: number;
  showResult: boolean;
  tempDistance: string;
  tempConsume: string;
  tempPrice: string;
  tempPeople: string;
  tempTollValue: string;
  calculatedOnce: boolean;
  errors: {
    distance: boolean;
    consume: boolean;
    price: boolean;
  };
};