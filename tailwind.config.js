const colors = require("tailwindcss/colors");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        ...colors,
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#6BCEBB",
                },
                secundary: {
                    DEFAULT: "#B3B3B3",
                },
                red: {
                    DEFAULT: "#DD8DAF",
                },
                green: {
                    DEFAULT: "#8DDDB2",
                },
            },
        },
    },
    plugins: [],
};
