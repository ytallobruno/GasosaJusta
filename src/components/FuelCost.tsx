import { Text } from "@chakra-ui/react";

interface FuelCostProps {
  distance: number;
  consume: number;
  price: number;
  people: number;
  hasToll: boolean;
  tollValue: number;
}

export default function FuelCost({
  distance,
  consume,
  price,
  people,
  hasToll,
  tollValue,
}: FuelCostProps) {
  const calculateFuelCost = (
    distance: number,
    consume: number,
    price: number
  ): number => {
    return (distance / consume) * price;
  };

  const getTotalFuelCost = (): number => {
    let totalCost = calculateFuelCost(distance, consume, price);

    if (hasToll) {
      totalCost += tollValue;
    }
    return totalCost;
  };

  const calculateCostPerPerson = (): number => {
    const totalFuelCost = getTotalFuelCost();
    return totalFuelCost / people;
  };

  const totalFuelCost = getTotalFuelCost().toFixed(2);
  const costPerPerson = calculateCostPerPerson().toFixed(2);

  return (
    <>
      <Text>
        O custo total da viagem foi <Text as="b">R$ {totalFuelCost}</Text>.
      </Text>
      <Text>
        O gasto por pessoa será de <Text as="b">R$ {costPerPerson}</Text>.
      </Text>
    </>
  );
}
