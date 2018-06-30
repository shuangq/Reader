const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: 'development',
    entry: ['babel-polyfill','./src/client/app/index.js'],
    output: {
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, './src/client/dist'),
        publicPath: '/',
    },
    optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0 // This is example is too small to create commons chunks
				},
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					priority: 10,
					enforce: true
				}
			}
		}
	},
    watch: true,
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: "babel-loader"
            },
            {
                test: /\.s?css$/,
                // when chaining loaders, they execute from right to left
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('postcss-import')({root: loader.resourcePath}),
                                require('autoprefixer')(),
                            ]
                        }
                    },
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        contentBase: path.resolve(__dirname, './src/client/dist'),
        compress: true,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({template: 'src/client/index.html'}),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new DashboardPlugin(),
        new BundleAnalyzerPlugin(),
    ]
};