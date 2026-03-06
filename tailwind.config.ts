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
                    DEFAULT: '#ff6b35',
                    light: '#ff8c5f',
                    dark: '#e55a2b',
                },
                text: {
                    primary: '#2d3748',
                    secondary: '#718096',
                },
                card: {
                    bg: '#ffffff',
                },
                border: {
                    DEFAULT: '#e2e8f0',
                },
            },
            backgroundImage: {
                'gradient-main': 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
                'gradient-result': 'linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%)',
            },
            boxShadow: {
                card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'card-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                'button-hover': '0 4px 12px rgba(255, 107, 53, 0.3)',
                'button-hover-outline': '0 4px 12px rgba(255, 107, 53, 0.2)',
            },
            animation: {
                fadeIn: 'fadeIn 0.5s ease-out',
                slideUp: 'slideUp 0.5s ease-out',
                scaleIn: 'scaleIn 0.4s ease-out',
                pulse: 'pulse 0.6s ease-in-out',
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: '0', transform: 'translateY(10px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    from: { opacity: '0', transform: 'translateY(30px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    from: { opacity: '0', transform: 'scale(0.95)' },
                    to: { opacity: '1', transform: 'scale(1)' },
                },
                pulse: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.02)' },
                },
            },
        },
    },
    plugins: [],
};
export default config;
