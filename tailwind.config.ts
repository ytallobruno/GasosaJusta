import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#ff5a00', // Laranja vibrante retro
                    light: '#ff8a4c',
                    dark: '#cc4800',
                },
                retro: {
                    yellow: '#ffde00',
                    green: '#00d084',
                    blue: '#00c3ff',
                    pink: '#ff007f',
                    bg: '#f4f0ec',
                },
                text: {
                    primary: '#000000',
                    secondary: '#333333',
                },
                card: {
                    bg: '#ffffff',
                },
                border: {
                    DEFAULT: '#000000',
                },
            },
            fontFamily: {
                mono: ['Space Mono', 'monospace'],
                sans: ['Space Mono', 'sans-serif'],
            },
            boxShadow: {
                retro: '4px 4px 0px 0px rgba(0,0,0,1)',
                'retro-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
                'retro-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
            },
            animation: {
                retroPop: 'retroPop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
            },
            keyframes: {
                retroPop: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};
export default config;
