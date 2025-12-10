"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GasFormDetails } from "@/types/GasFormDetails.interface";
import {
  formatInputValue,
  handleEmptyInput,
  parseFloatWithComma,
} from "@/lib/helpers";
import FuelCost from "./FuelCost";
import Switch from "./ui/Switch";

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
    tempDistance: "0",
    tempConsume: "0",
    tempPrice: "0,00",
    tempPeople: "2",
    tempTollValue: "0,00",
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
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }, 200);
    }
  }, [state.mainDetails.showResult]);

  const updateState = (
    name: string,
    finalValue: string,
    parsedValue: number
  ) => {
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
    if (e.key === "Enter") {
      e.preventDefault();
      handleCalculateTotal();
    }
  };

  const validateInputs = () => {
    const { tempDistance, tempConsume, tempPrice, tempPeople } =
      state.tempValues;
    const errors = {
      distance: parseFloat(tempDistance) <= 0,
      consume: parseFloat(tempConsume) <= 0,
      price: parseFloatWithComma(tempPrice) <= 0,
      people: parseFloat(tempPeople) < 1,
    };
    setState((prevState) => ({ ...prevState, errors }));
    return (
      !errors.distance && !errors.consume && !errors.price && !errors.people
    );
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
        tempDistance: "0",
        tempConsume: "0",
        tempPrice: "0,00",
        tempPeople: "2",
        tempTollValue: "0,00",
      },
    }));
  };

  const setBorderColor = (fieldName: keyof GasFormDetails["errors"]) => {
    return state.errors[fieldName] ? "red" : undefined;
  };

  const {
    mainDetails: {
      distance,
      consume,
      price,
      people,
      hasToll,
      tollValue,
      showResult,
    },
    tempValues: {
      tempDistance,
      tempConsume,
      tempPrice,
      tempPeople,
      tempTollValue,
    },
  } = state;

  return (
    <div className="w-full max-w-lg mx-auto p-10 bg-white rounded-2xl shadow-card-lg transition-all">
      <h1 className="text-3xl font-bold text-primary mb-2 text-center tracking-tight">
        Gasosa Justa ⛽
      </h1>
      <p className="text-text-secondary text-base mb-8 text-center font-normal">
        Calcule o custo de combustível da sua viagem de forma simples e rápida
      </p>
      <div>
        <div className="flex flex-col space-y-6">
          <div>
            <label className="block font-semibold text-text-primary text-sm tracking-tight mb-2">
              Distância da viagem
            </label>
            <div
              className={`flex rounded-lg overflow-hidden border-2 transition-all hover:border-gray-300 focus-within:ring-4 focus-within:ring-primary/10 ${
                state.errors.distance ? "border-red-500" : "border-border"
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
              <span className="bg-gray-50 text-text-secondary px-4 py-2.5 text-sm font-semibold flex items-center">
                km
              </span>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-text-primary text-sm tracking-tight mb-2">
              Consumo do veículo
            </label>
            <div
              className={`flex rounded-lg overflow-hidden border-2 transition-all hover:border-gray-300 focus-within:ring-4 focus-within:ring-primary/10 ${
                state.errors.consume ? "border-red-500" : "border-border"
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
              <span className="bg-gray-50 text-text-secondary px-4 py-2.5 text-sm font-semibold flex items-center">
                km/L
              </span>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-text-primary text-sm tracking-tight mb-2">
              Preço da gasolina
            </label>
            <div
              className={`flex rounded-lg overflow-hidden border-2 transition-all hover:border-gray-300 focus-within:ring-4 focus-within:ring-primary/10 ${
                state.errors.price ? "border-red-500" : "border-border"
              }`}
            >
              <span className="bg-gray-50 text-text-secondary px-3 py-2.5 text-sm font-semibold flex items-center">
                R$
              </span>
              <input
                type="text"
                placeholder="00,00"
                name="price"
                value={tempPrice}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                className="flex-1 px-3 py-2.5 text-base font-medium text-text-primary placeholder-gray-400 outline-none min-w-0"
              />
              <span className="bg-gray-50 text-text-secondary px-3 py-2.5 text-sm font-semibold flex items-center whitespace-nowrap">
                por L
              </span>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-text-primary text-sm tracking-tight mb-2">
              Quantidade de pessoas
            </label>
            <div className="flex rounded-lg overflow-hidden border-2 border-border transition-all hover:border-gray-300 focus-within:ring-4 focus-within:ring-primary/10">
              <input
                type="number"
                name="people"
                min="1"
                value={tempPeople}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                className="flex-1 px-4 py-2.5 text-base font-medium text-text-primary placeholder-gray-400 outline-none"
              />
              <span className="bg-gray-50 text-text-secondary px-4 py-2.5 text-sm font-semibold flex items-center">
                pessoas
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="font-semibold text-text-primary text-sm tracking-tight">
              Incluir pedágio?
            </label>
            <Switch isChecked={hasToll} onChange={handleSwitchChange} />
          </div>

          {hasToll && (
            <div className="flex rounded-lg overflow-hidden border-2 border-border transition-all hover:border-gray-300 focus-within:ring-4 focus-within:ring-primary/10">
              <span className="bg-gray-50 text-text-secondary px-4 py-2.5 text-sm font-semibold flex items-center">
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

        <div className="grid grid-cols-2 gap-4 mt-8">
          <button
            onClick={handleCalculateTotal}
            disabled={isLoading}
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold text-base tracking-tight transition-all hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-button-hover active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center gap-2 relative overflow-hidden"
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
                    className="animate-spin h-5 w-5"
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
            className="bg-transparent text-text-primary px-8 py-3 rounded-lg font-semibold text-base tracking-tight border-2 border-border transition-all hover:bg-primary-light hover:text-white hover:border-primary-light hover:-translate-y-0.5 hover:shadow-button-hover-outline active:scale-95 cursor-pointer"
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
