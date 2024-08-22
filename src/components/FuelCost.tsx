import { Component } from "react";

interface FuelCostProps {
  distance: number;
  consume: number;
  price: number;
  people: number;
  toll: boolean;
  tollValue: number;
}

interface FuelCostState {
  distance: number;
  consume: number;
  price: number;
  people: number;
}

export default class FuelCost extends Component<FuelCostProps, FuelCostState> {
  getTotalFuelCost = () => {
    const { distance, consume, price, toll, tollValue } = this.props;
    let totalCost = (distance / consume) * price;
    if (toll) {
      totalCost += tollValue;
    }
    return totalCost;
  };

  calculateCostPerPerson = () => {
    const { people } = this.props;
    const totalFuelCost = this.getTotalFuelCost();
    return totalFuelCost / people;
  };

  render() {
    const totalFuelCost = this.getTotalFuelCost().toFixed(2);
    const costPerPerson = this.calculateCostPerPerson().toFixed(2);
    return (
      <>
        <div>O custo total da viagem foi R$ {totalFuelCost}.</div>
        <div>O gasto por pessoa será de R$ {costPerPerson}.</div>
      </>
    );
  }
}
