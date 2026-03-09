export const calculateFuelCost = (distance: number, consume: number, price: number): number => {
    return (distance / consume) * price;
};

export const getTotalFuelCost = (
    distance: number,
    consume: number,
    price: number,
    hasToll: boolean,
    tollValue: number,
): number => {
    let totalCost = calculateFuelCost(distance, consume, price);

    if (hasToll) {
        totalCost += tollValue;
    }
    return totalCost;
};

export const calculateCostPerPerson = (
    distance: number,
    consume: number,
    price: number,
    people: number,
    hasToll: boolean,
    tollValue: number,
): number => {
    const totalFuelCost = getTotalFuelCost(distance, consume, price, hasToll, tollValue);
    return totalFuelCost / people;
};
