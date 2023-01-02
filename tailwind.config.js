module.exports = {
    content: [
        './src/**/*.{js,vue}'
    ],
    plugins: [
        require('@tailwindcss/forms')
    ],
    theme: {
        fontFamily: {
            sans: ['Inter-var', 'sans-serif']
        }
    }
}