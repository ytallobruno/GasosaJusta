'use client';

import { motion } from 'framer-motion';

interface FuelCostProps {
    distance: number;
    consume: number;
    price: number;
    people: number;
    hasToll: boolean;
    tollValue: number;
}

export default function FuelCost({ distance, consume, price, people, hasToll, tollValue }: FuelCostProps) {
    const calculateFuelCost = (distance: number, consume: number, price: number): number => {
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
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mt-8 border-t-2 border-border pt-8"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
                whileHover={{ x: 4, borderColor: 'rgba(255, 107, 53, 0.4)' }}
                className="mb-4 rounded-xl border border-primary/20 bg-gradient-result p-5 transition-all duration-300 hover:shadow-lg"
            >
                <p className="mb-1 text-sm font-medium text-text-secondary">Custo total da viagem</p>
                <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
                    className="text-2xl font-bold tracking-tight text-primary"
                >
                    R$ {totalFuelCost}
                </motion.p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
                whileHover={{ x: 4, borderColor: 'rgba(255, 107, 53, 0.4)' }}
                className="rounded-xl border border-primary/20 bg-gradient-result p-5 transition-all duration-300 hover:shadow-lg"
            >
                <p className="mb-1 text-sm font-medium text-text-secondary">Valor por pessoa</p>
                <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4, ease: 'easeOut' }}
                    className="text-2xl font-bold tracking-tight text-primary"
                >
                    R$ {costPerPerson}
                </motion.p>
            </motion.div>
        </motion.div>
    );
}
