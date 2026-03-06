'use client';

import React, { useRef, useEffect } from 'react';
import FuelCost from './FuelCost';
import Switch from './ui/Switch';
import { useGasForm } from '@/hooks/useGasForm';

export default function GasForm(): React.ReactElement {
    const {
        state,
        isLoading,
        handleChange,
        handleSwitchChange,
        handleCalculateTotal,
        handleKeyPress,
        handleClearInputs,
    } = useGasForm();

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

    const {
        mainDetails: { distance, consume, price, people, hasToll, tollValue, showResult },
        tempValues: { tempDistance, tempConsume, tempPrice, tempPeople, tempTollValue },
    } = state;

    return (
        <div className="neo-border neo-shadow mx-auto w-full max-w-lg bg-[#ffffff] p-8">
            <h1 className="mb-2 text-center text-5xl font-bold uppercase tracking-tighter text-black">
                Gasosa Justa ⛽
            </h1>
            <p className="mb-8 text-center text-sm font-bold uppercase tracking-wider text-text-secondary">
                Calcule o custo de combustível da sua viagem
            </p>
            <div>
                <div className="flex flex-col space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-bold uppercase tracking-wider text-black">
                            Distância da viagem
                        </label>
                        <div
                            className={`neo-border flex overflow-hidden transition-all focus-within:bg-retro-yellow ${
                                state.errors.distance ? 'bg-retro-pink' : 'bg-white'
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
                                className="w-full min-w-0 flex-1 bg-transparent px-2 py-3 text-base font-bold text-black placeholder-gray-400 outline-none sm:px-4 sm:text-lg"
                            />
                            <span className="flex shrink-0 items-center border-l-[3px] border-black bg-gray-100 px-2 py-3 text-xs font-bold uppercase text-black sm:px-4 sm:text-sm">
                                km
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-bold uppercase tracking-wider text-black">
                            Consumo do veículo
                        </label>
                        <div
                            className={`neo-border flex overflow-hidden transition-all focus-within:bg-retro-yellow ${
                                state.errors.consume ? 'bg-retro-pink' : 'bg-white'
                            }`}
                        >
                            <input
                                type="number"
                                placeholder="0"
                                name="consume"
                                value={tempConsume}
                                onChange={handleChange}
                                onKeyDown={handleKeyPress}
                                className="w-full min-w-0 flex-1 bg-transparent px-2 py-3 text-base font-bold text-black placeholder-gray-400 outline-none sm:px-4 sm:text-lg"
                            />
                            <span className="flex shrink-0 items-center border-l-[3px] border-black bg-gray-100 px-2 py-3 text-xs font-bold uppercase text-black sm:px-4 sm:text-sm">
                                km/L
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-bold uppercase tracking-wider text-black">
                            Preço da gasolina
                        </label>
                        <div
                            className={`neo-border flex overflow-hidden transition-all focus-within:bg-retro-yellow ${
                                state.errors.price ? 'bg-retro-pink' : 'bg-white'
                            }`}
                        >
                            <span className="flex shrink-0 items-center border-r-[3px] border-black bg-gray-100 px-2 py-3 text-xs font-bold uppercase text-black sm:px-3 sm:text-sm">
                                R$
                            </span>
                            <input
                                type="text"
                                placeholder="00,00"
                                name="price"
                                value={tempPrice}
                                onChange={handleChange}
                                onKeyDown={handleKeyPress}
                                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base font-bold text-black placeholder-gray-400 outline-none sm:px-3 sm:text-lg"
                            />
                            <span className="flex shrink-0 items-center whitespace-nowrap border-l-[3px] border-black bg-gray-100 px-2 py-3 text-xs font-bold uppercase text-black sm:px-3 sm:text-sm">
                                por L
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-bold uppercase tracking-wider text-black">
                            Quantidade de pessoas
                        </label>
                        <div className="neo-border flex overflow-hidden bg-white transition-all focus-within:bg-retro-yellow">
                            <input
                                type="number"
                                name="people"
                                min="1"
                                value={tempPeople}
                                onChange={handleChange}
                                onKeyDown={handleKeyPress}
                                className="w-full min-w-0 flex-1 bg-transparent px-2 py-3 text-base font-bold text-black placeholder-gray-400 outline-none sm:px-4 sm:text-lg"
                            />
                            <span className="flex shrink-0 items-center border-l-[3px] border-black bg-gray-100 px-2 py-3 text-xs font-bold uppercase text-black sm:px-4 sm:text-sm">
                                pessoas
                            </span>
                        </div>
                    </div>

                    <div className="neo-border flex items-center justify-between bg-gray-100 p-4">
                        <label className="mt-1 text-sm font-bold uppercase tracking-wider text-black">
                            Incluir pedágio?
                        </label>
                        <Switch isChecked={hasToll} onChange={handleSwitchChange} />
                    </div>

                    {hasToll && (
                        <div className="neo-border flex animate-retroPop overflow-hidden bg-white transition-all focus-within:bg-retro-yellow">
                            <span className="flex shrink-0 items-center border-r-[3px] border-black bg-gray-100 px-2 py-3 text-xs font-bold uppercase text-black sm:px-4 sm:text-sm">
                                R$
                            </span>
                            <input
                                type="text"
                                placeholder="00,00"
                                name="tollValue"
                                value={tempTollValue}
                                onChange={handleChange}
                                onKeyDown={handleKeyPress}
                                className="w-full min-w-0 flex-1 bg-transparent px-2 py-3 text-base font-bold text-black placeholder-gray-400 outline-none sm:px-4 sm:text-lg"
                            />
                        </div>
                    )}
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <button
                        onClick={handleCalculateTotal}
                        disabled={isLoading}
                        className="neo-border neo-shadow relative flex cursor-pointer items-center justify-center gap-2 bg-primary px-8 py-3 text-lg font-bold uppercase tracking-wider text-white transition-all hover:bg-primary-light active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none disabled:active:translate-x-0 disabled:active:translate-y-0"
                    >
                        {isLoading ? 'Calculando...' : 'Calcular'}
                    </button>
                    <button
                        onClick={handleClearInputs}
                        className="neo-border neo-shadow cursor-pointer bg-white px-8 py-3 text-lg font-bold uppercase tracking-wider text-black transition-all hover:bg-gray-100 active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
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
