import { describe, it, expect } from 'vitest';
import {
    handleEmptyInput,
    formatPrice,
    formatInputValue,
    parseFloatWithComma,
} from '@/lib/formatters';

describe('handleEmptyInput', () => {
    it('retorna "0" para string vazia', () => {
        expect(handleEmptyInput('')).toBe('0');
    });

    it('mantém valor quando não está vazio', () => {
        expect(handleEmptyInput('150')).toBe('150');
        expect(handleEmptyInput('0')).toBe('0');
        expect(handleEmptyInput('6,50')).toBe('6,50');
    });
});

describe('formatPrice', () => {
    it('formata centavos para o padrão brasileiro', () => {
        expect(formatPrice('650')).toBe('6,50');
    });

    it('formata valor inteiro corretamente', () => {
        expect(formatPrice('600')).toBe('6,00');
    });

    it('formata zero corretamente', () => {
        expect(formatPrice('0')).toBe('0,00');
    });

    it('remove caracteres não numéricos antes de formatar', () => {
        // '6,50' → remove não-dígitos → '650' → 650/100 = 6.50 → '6,50'
        expect(formatPrice('6,50')).toBe('6,50');
    });

    it('formata valores grandes corretamente', () => {
        expect(formatPrice('10000')).toBe('100,00');
    });
});

describe('formatInputValue', () => {
    it('aplica formatPrice para campo "price"', () => {
        expect(formatInputValue('price', '650')).toBe('6,50');
    });

    it('aplica formatPrice para campo "tollValue"', () => {
        expect(formatInputValue('tollValue', '2000')).toBe('20,00');
    });

    it('remove zeros à esquerda para outros campos', () => {
        expect(formatInputValue('distance', '0150')).toBe('150');
        expect(formatInputValue('consume', '010')).toBe('10');
    });

    it('mantém "0" sozinho para outros campos', () => {
        expect(formatInputValue('distance', '0')).toBe('0');
    });

    it('mantém valores normais sem zeros à esquerda', () => {
        expect(formatInputValue('distance', '100')).toBe('100');
    });
});

describe('parseFloatWithComma', () => {
    it('converte string com vírgula para float', () => {
        expect(parseFloatWithComma('6,50')).toBe(6.5);
    });

    it('converte string com ponto para float', () => {
        expect(parseFloatWithComma('6.50')).toBe(6.5);
    });

    it('converte inteiro string para float', () => {
        expect(parseFloatWithComma('100')).toBe(100);
    });

    it('converte zero corretamente', () => {
        expect(parseFloatWithComma('0,00')).toBe(0);
    });

    it('converte valor grande com vírgula', () => {
        expect(parseFloatWithComma('1234,56')).toBe(1234.56);
    });
});
