module.exports = {
    purge: [
        // './src/**/*.html',
        // './src/**/*.vue',
        // './src/**/*.js',
        // './src/main.js',
        // './src/App.vue',
    ],
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('@tailwindcss/ui'),
    ],
}
