'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GasFormDetails } from '@/types/GasFormDetails.interface';
import { formatInputValue, handleEmptyInput, parseFloatWithComma } from '@/lib/helpers';
import FuelCost from './FuelCost';
import Switch from './ui/Switch';

const gasFormDefaultValues: GasFormDetails = {
    mainDetails: {
        distance: 0,
        consume: 0,
        price: 0,
        people: 2,
        hasToll: false,
        tollValue: 0,
        showResult: false,
        calculatedOnce: false,
    },
    tempValues: {
        tempDistance: '0',
        tempConsume: '0',
        tempPrice: '0,00',
        tempPeople: '2',
        tempTollValue: '0,00',
    },
    errors: {
        distance: false,
        consume: false,
        price: false,
    },
};

export default function GasForm(): React.ReactElement {
    const [state, setState] = useState<GasFormDetails>(gasFormDefaultValues);
    const [isLoading, setIsLoading] = useState(false);
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (state.mainDetails.showResult && resultsRef.current) {
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest',
                });
            }, 200);
        }
    }, [state.mainDetails.showResult]);

    const updateState = (name: string, finalValue: string, parsedValue: number) => {
        setState((prevState) => ({
            ...prevState,
            tempValues: {
                ...prevState.tempValues,
                [`temp${name.charAt(0).toUpperCase() + name.slice(1)}`]: finalValue,
            },
            ...(prevState.mainDetails.calculatedOnce && {
                mainDetails: {
                    ...prevState.mainDetails,
                    [name]: parsedValue,
                },
            }),
            errors: {
                ...prevState.errors,
                [name]: parsedValue <= 0,
            },
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const formattedValue = formatInputValue(name, value);
        const finalValue = handleEmptyInput(formattedValue);
        const parsedValue = parseFloatWithComma(finalValue);

        if (parsedValue < 0) {
            return;
        }

        updateState(name, finalValue, parsedValue);
    };

    const handleSwitchChange = () => {
        setState((prevState) => ({
            ...prevState,
            mainDetails: {
                ...prevState.mainDetails,
                hasToll: !prevState.mainDetails.hasToll,
            },
        }));
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCalculateTotal();
        }
    };

    const validateInputs = () => {
        const { tempDistance, tempConsume, tempPrice, tempPeople } = state.tempValues;
        const errors = {
            distance: parseFloat(tempDistance) <= 0,
            consume: parseFloat(tempConsume) <= 0,
            price: parseFloatWithComma(tempPrice) <= 0,
            people: parseFloat(tempPeople) < 1,
        };
        setState((prevState) => ({ ...prevState, errors }));
        return !errors.distance && !errors.consume && !errors.price && !errors.people;
    };

    const handleCalculateTotal = () => {
        if (validateInputs()) {
            setIsLoading(true);

            setTimeout(() => {
                setState((prevState) => ({
                    ...prevState,
                    mainDetails: {
                        ...prevState.mainDetails,
                        distance: parseFloat(prevState.tempValues.tempDistance),
                        consume: parseFloat(prevState.tempValues.tempConsume),
                        price: parseFloatWithComma(prevState.tempValues.tempPrice),
                        people: parseFloat(prevState.tempValues.tempPeople),
                        tollValue: parseFloatWithComma(prevState.tempValues.tempTollValue),
                        showResult: true,
                        calculatedOnce: true,
                    },
                }));
                setIsLoading(false);
            }, 1000);
        }
    };

    const handleClearInputs = () => {
        setState((prevState) => ({
            ...prevState,
            mainDetails: {
                ...prevState.mainDetails,
                showResult: false,
            },
            tempValues: {
                tempDistance: '0',
                tempConsume: '0',
                tempPrice: '0,00',
                tempPeople: '2',
                tempTollValue: '0,00',
            },
        }));
    };

    const setBorderColor = (fieldName: keyof GasFormDetails['errors']) => {
        return state.errors[fieldName] ? 'red' : undefined;
    };

    const {
        mainDetails: { distance, consume, price, people, hasToll, tollValue, showResult },
        tempValues: { tempDistance, tempConsume, tempPrice, tempPeople, tempTollValue },
    } = state;

    return (
        <div className="mx-auto w-full max-w-lg rounded-2xl bg-white p-10 shadow-card-lg transition-all">
            <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-primary">Gasosa Justa ⛽</h1>
            <p className="mb-8 text-center text-base font-normal text-text-secondary">
                Calcule o custo de combustível da sua viagem de forma simples e rápida
            </p>
            <div>
                <div className="flex flex-col space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-semibold tracking-tight text-text-primary">
                            Distância da viagem
                        </label>
                        <div
                            className={`flex overflow-hidden rounded-lg border-2 transition-all focus-within:ring-4 focus-within:ring-primary/10 hover:border-gray-300 ${
                                state.errors.distance ? 'border-red-500' : 'border-border'
                            }`}
                        >
                            <input
                                type="number"
                                placeholder="0"
                                name="distance"
                                value={tempDistance}
                                onChange={handleChange}
                                onKeyDown={handleKeyPress}
                                autoFocus
                                className="flex-1 px-4 py-2.5 text-base font-medium text-text-primary placeholder-gray-400 outline-none"
                            />
                            <span className="flex items-center bg-gray-50 px-4 py-2.5 text-sm font-semibold text-text-secondary">
                                km
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold tracking-tight text-text-primary">
                            Consumo do veículo
                        </label>
                        <div
                            className={`flex overflow-hidden rounded-lg border-2 transition-all focus-within:ring-4 focus-within:ring-primary/10 hover:border-gray-300 ${
                                state.errors.consume ? 'border-red-500' : 'border-border'
                            }`}
                        >
                            <input
                                type="number"
                                placeholder="0"
                                name="consume"
                                value={tempConsume}
                                onChange={handleChange}
                                onKeyDown={handleKeyPress}
                                className="flex-1 px-4 py-2.5 text-base font-medium text-text-primary placeholder-gray-400 outline-none"
                            />
                            <span className="flex items-center bg-gray-50 px-4 py-2.5 text-sm font-semibold text-text-secondary">
                                km/L
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold tracking-tight text-text-primary">
                            Preço da gasolina
                        </label>
                        <div
                            className={`flex overflow-hidden rounded-lg border-2 transition-all focus-within:ring-4 focus-within:ring-primary/10 hover:border-gray-300 ${
                                state.errors.price ? 'border-red-500' : 'border-border'
                            }`}
                        >
                            <span className="flex items-center bg-gray-50 px-3 py-2.5 text-sm font-semibold text-text-secondary">
                                R$
                            </span>
                            <input
                                type="text"
                                placeholder="00,00"
                                name="price"
                                value={tempPrice}
                                onChange={handleChange}
                                onKeyDown={handleKeyPress}
                                className="min-w-0 flex-1 px-3 py-2.5 text-base font-medium text-text-primary placeholder-gray-400 outline-none"
                            />
                            <span className="flex items-center whitespace-nowrap bg-gray-50 px-3 py-2.5 text-sm font-semibold text-text-secondary">
                                por L
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold tracking-tight text-text-primary">
                            Quantidade de pessoas
                        </label>
                        <div className="flex overflow-hidden rounded-lg border-2 border-border transition-all focus-within:ring-4 focus-within:ring-primary/10 hover:border-gray-300">
                            <input
                                type="number"
                                name="people"
                                min="1"
                                value={tempPeople}
                                onChange={handleChange}
                                onKeyDown={handleKeyPress}
                                className="flex-1 px-4 py-2.5 text-base font-medium text-text-primary placeholder-gray-400 outline-none"
                            />
                            <span className="flex items-center bg-gray-50 px-4 py-2.5 text-sm font-semibold text-text-secondary">
                                pessoas
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold tracking-tight text-text-primary">
                            Incluir pedágio?
                        </label>
                        <Switch isChecked={hasToll} onChange={handleSwitchChange} />
                    </div>

                    {hasToll && (
                        <div className="flex overflow-hidden rounded-lg border-2 border-border transition-all focus-within:ring-4 focus-within:ring-primary/10 hover:border-gray-300">
                            <span className="flex items-center bg-gray-50 px-4 py-2.5 text-sm font-semibold text-text-secondary">
                                R$
                            </span>
                            <input
                                type="text"
                                placeholder="00,00"
                                name="tollValue"
                                value={tempTollValue}
                                onChange={handleChange}
                                onKeyDown={handleKeyPress}
                                className="flex-1 px-4 py-2.5 text-base font-medium text-text-primary placeholder-gray-400 outline-none"
                            />
                        </div>
                    )}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                    <button
                        onClick={handleCalculateTotal}
                        disabled={isLoading}
                        className="relative flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-8 py-3 text-base font-semibold tracking-tight text-white transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-button-hover active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:transform-none"
                    >
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-2"
                                >
                                    <svg
                                        className="h-5 w-5 animate-spin"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Calculando...
                                </motion.div>
                            ) : (
                                <motion.span
                                    key="calculate"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Calcular
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                    <button
                        onClick={handleClearInputs}
                        className="cursor-pointer rounded-lg border-2 border-border bg-transparent px-8 py-3 text-base font-semibold tracking-tight text-text-primary transition-all hover:-translate-y-0.5 hover:border-primary-light hover:bg-primary-light hover:text-white hover:shadow-button-hover-outline active:scale-95"
                    >
                        Limpar
                    </button>
                </div>
            </div>

            {showResult && !isLoading && (
                <div ref={resultsRef}>
                    <FuelCost
                        key={`${distance}-${consume}-${price}-${people}`}
                        distance={distance}
                        consume={consume}
                        price={price}
                        people={people}
                        hasToll={hasToll}
                        tollValue={tollValue}
                    />
                </div>
            )}
        </div>
    );
}
