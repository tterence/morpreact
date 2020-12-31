import merge from 'webpack-merge';
import { resolve } from 'path';
import { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } from 'webpack';
import postcssModulesValues from 'postcss-modules-values';
import common from './webpack.common';

export default merge(common, {
    mode: 'development',
    entry: {
        app: [
            'webpack-hot-middleware/client?path=/__what&timeout=2000',
            './src/server/index.js'
        ]
    },
    performance: {
        hints: 'warning'
    },
    module: {
        rules: [
          // CSS configuration
          {
              test: /\.css$/,
              include: resolve(__dirname, 'src/client'),
              use: [
                  {
                      loader: 'style-loader',
                      options: {
                          esModule: true
                      },
                  },
                  {
                      loader: 'css-loader',
                      options: {
                          importLoaders: 1,
                          url: /** @arg {string} url */ url => url.includes('assets'),
                          modules: {
                              localIdentName: '[name]__[local]--[hash:basse64:5]'
                          }
                      }
                  }
              ]
          }  
        ],
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new NoEmitOnErrorsPlugin()
    ]
});