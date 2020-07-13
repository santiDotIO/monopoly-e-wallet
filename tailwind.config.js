module.exports = {
    purge: [
        './src/**/*.html',
        './src/**/*.vue',
        './src/**/*.js',
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
