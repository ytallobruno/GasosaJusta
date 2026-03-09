import { describe, it, expect } from 'vitest';
import {
    calculateFuelCost,
    getTotalFuelCost,
    calculateCostPerPerson,
} from '@/features/calc/services/fuelCalculator';

describe('calculateFuelCost', () => {
    it('calcula o custo de combustível corretamente', () => {
        // 100km / 10km/L * R$6,00/L = R$60,00
        expect(calculateFuelCost(100, 10, 6)).toBe(60);
    });

    it('retorna 0 quando distância é 0', () => {
        expect(calculateFuelCost(0, 10, 6)).toBe(0);
    });

    it('lida com consumo alto (veículo econômico)', () => {
        // 300km / 20km/L * R$5,50/L = R$82,50
        expect(calculateFuelCost(300, 20, 5.5)).toBe(82.5);
    });
});

describe('getTotalFuelCost', () => {
    it('retorna apenas o custo de combustível quando não há pedágio', () => {
        expect(getTotalFuelCost(100, 10, 6, false, 0)).toBe(60);
    });

    it('soma o pedágio ao custo total quando hasToll é true', () => {
        // Combustível: 60 + Pedágio: 20 = 80
        expect(getTotalFuelCost(100, 10, 6, true, 20)).toBe(80);
    });

    it('ignora o valor do pedágio quando hasToll é false', () => {
        expect(getTotalFuelCost(100, 10, 6, false, 50)).toBe(60);
    });

    it('lida com pedágio zero quando hasToll é true', () => {
        expect(getTotalFuelCost(100, 10, 6, true, 0)).toBe(60);
    });
});

describe('calculateCostPerPerson', () => {
    it('divide o custo total igualmente entre pessoas', () => {
        // Total: 80 / 2 pessoas = R$40 por pessoa
        expect(calculateCostPerPerson(100, 10, 6, 2, true, 20)).toBe(40);
    });

    it('custo total para uma única pessoa', () => {
        expect(calculateCostPerPerson(100, 10, 6, 1, false, 0)).toBe(60);
    });

    it('divide entre muitas pessoas', () => {
        // Total: 60 / 5 pessoas = R$12 por pessoa
        expect(calculateCostPerPerson(100, 10, 6, 5, false, 0)).toBe(12);
    });

    it('cenário real: viagem de 500km com pedágio', () => {
        // 500km / 12km/L * R$6,20/L = R$258,33... + R$40 pedágio = R$298,33... / 4 pessoas
        const result = calculateCostPerPerson(500, 12, 6.2, 4, true, 40);
        expect(result).toBeCloseTo(74.58, 1);
    });
});
