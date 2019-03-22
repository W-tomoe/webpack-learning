module.exports = {
    dev: {
        NODE_ENV: '"development"',
        devtool: 'cheap-module-eval-source-map',
        server: {
            hot: true,
            prot: 8089,
            host: 'localhost',
        },
        assetsDir: 'static',
        assetsPath: './',
    },
    build: {
        NODE_ENV: '"development"',
        mode: 'production',
        // devtool: 'source-map',
    }
}