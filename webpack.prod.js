import merge from 'webpack-merge';
import { resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import shtmlWP from 'script-ext-html-webpack-plugin';
import postcssModulesValues from 'postcss-modules-values';
import common from './webpack.common';

export default merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: '[name].[id].bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parellel: true
            }),
            new OptimizeCssAssetsPlugin({})
        ],
        runtimeChunk: 'single',
        splitChunks: {
            // Chunks management
            chunks: 'all',
            minSize: 0,
            maxInitialRequests: Infinity,
            cacheGroups: {
                lodash: {
                    test: /[\\/]node_modules[\\/]lodash[\\/]/,
                    name: 'lodash'
                },
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'react'
                },
                mobx: {
                    test: /[\\/]node_modules[\\/](mobx|mobx-react)[\\/]/,
                    name: 'mobx'
                },
                router5: {
                    test: /[\\/]node_modules[\\/](router5|router5-plugin-browser)[\\/]/,
                    name: 'router5'
                }
            },
        }, 
    },
    performance: {
        hints: 'error', // Max build size to test
        maxEntrypointSize: 2000000 // Max size for all builds, each one < 250kB (default)
    },
    devtool: false,
    module: {
        rules: [
          // CSS configuration
          {
            test: /\.css$/,
            include: resolve(__dirname, 'src/client'),
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        url: /** @arg {string} url */ url => url.includes('assets'),
                        modules: {
                            localIdentName: '[hash:base64:5]'
                        }
                    }
                }
            ]
          },
          {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [postcssModulesValues]
                }
            }
          }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css'
        }),
        new shtmlWP({
            defaultAttribute: 'async' // Overrides built index.html with async attributes for any ressources
        })
    ]
});