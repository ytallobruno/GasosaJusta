'use client';

import { useState } from 'react';
import { GasFormDetails } from '@/features/trip/types/trip.types';
import { formatInputValue, handleEmptyInput, parseFloatWithComma } from '@/lib/formatters';

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

export function useGasForm() {
    const [state, setState] = useState<GasFormDetails>(gasFormDefaultValues);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCalculateTotal();
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

    return {
        state,
        isLoading,
        handleChange,
        handleSwitchChange,
        handleCalculateTotal,
        handleKeyPress,
        handleClearInputs,
    };
}
