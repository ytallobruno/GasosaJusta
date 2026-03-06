'use client';

import { motion } from 'framer-motion';

import { getTotalFuelCost, calculateCostPerPerson } from '@/lib/calculations';

interface FuelCostProps {
    distance: number;
    consume: number;
    price: number;
    people: number;
    hasToll: boolean;
    tollValue: number;
}

export default function FuelCost({ distance, consume, price, people, hasToll, tollValue }: FuelCostProps) {
    const totalFuelCost = getTotalFuelCost(distance, consume, price, hasToll, tollValue).toFixed(2);
    const costPerPerson = calculateCostPerPerson(distance, consume, price, people, hasToll, tollValue).toFixed(2);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-8 border-t-[3px] border-black pt-8"
        >
            <div className="neo-border neo-shadow mb-4 bg-retro-yellow p-6 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <p className="mb-2 text-sm font-bold uppercase tracking-wider text-black">Custo total da viagem</p>
                <p className="text-4xl font-bold tracking-tight text-black">R$ {totalFuelCost}</p>
            </div>
            <div className="neo-border neo-shadow bg-retro-blue p-6 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <p className="mb-2 text-sm font-bold uppercase tracking-wider text-black">Valor por pessoa</p>
                <p className="text-4xl font-bold tracking-tight text-black">R$ {costPerPerson}</p>
            </div>
        </motion.div>
    );
}
