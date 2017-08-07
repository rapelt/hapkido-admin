var webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV'])
    ]
};