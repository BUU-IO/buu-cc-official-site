module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                purple: {
                    950: '#aa31f1',
                    900: '#974cf6',
                    800: '#8c5bf7',
                    700: '#816afb',
                    600: '#7973fd'
                }
            }
        }
    },
    plugins: [require('@tailwindcss/forms')]
}