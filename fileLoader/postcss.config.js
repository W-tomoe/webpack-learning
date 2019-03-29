module.exports = {
    plugins: [
        require('autoprefixer')(),
        require('postcss-sprites')({
            // spritePath: 'dist/static/images/sprites',
            retina: true
        })
    ]
}