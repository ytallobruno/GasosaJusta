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
                isChecked ? 'bg-primary' : 'bg-gray-300'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
        >
            <span
                className={`${
                    isChecked ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
        </HeadlessSwitch>
    );
}
