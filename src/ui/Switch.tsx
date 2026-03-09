'use client';

import { Switch as HeadlessSwitch } from '@headlessui/react';

interface SwitchProps {
    isChecked: boolean;
    onChange: () => void;
}

export default function Switch({ isChecked, onChange }: SwitchProps) {
    return (
        <HeadlessSwitch
            checked={isChecked}
            onChange={onChange}
            className={`${
                isChecked ? 'bg-retro-green' : 'bg-gray-300'
            } neo-border relative inline-flex h-8 w-16 items-center px-1 transition-colors focus:outline-none`}
        >
            <span
                className={`${
                    isChecked ? 'translate-x-8' : 'translate-x-0'
                } neo-border inline-block h-5 w-5 transform bg-white transition-transform`}
            />
        </HeadlessSwitch>
    );
}
