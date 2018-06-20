const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const project = require('./aurelia_project/aurelia.json');
const {AureliaPlugin, ModuleDependenciesPlugin} = require('aurelia-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

// config helpers:
const ensureArray = (config) => config && (Array.isArray(config) ? config : [config]) || [];
const when = (condition, config, negativeConfig) =>
  condition ? ensureArray(config) : ensureArray(negativeConfig);

// primary config:
const title = 'Photographer Alena Filippova';
const rootDir = path.resolve();
const outDir = path.resolve(__dirname, project.platform.output);
const srcDir = path.resolve(__dirname, 'src');
const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const baseUrl = '/';

const cssRules = [
  {loader: 'css-loader'},
];

module.exports = ({production, server, extractCss, coverage, analyze} = {}) => ({
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        exclude: /\/node_modules/,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  resolve: {
    extensions: ['.js'],
    modules: [srcDir, 'node_modules'],
  },
  entry: {
    app: ['aurelia-bootstrapper'],
    vendor: ['bluebird'],
  },
  mode: production ? 'production' : 'development',
  output: {
    path: outDir,
    publicPath: baseUrl,
    filename: production ? '[name].[chunkhash].bundle.js' : '[name].[hash].bundle.js',
    sourceMapFilename: production ? '[name].[chunkhash].bundle.map' : '[name].[hash].bundle.map',
    chunkFilename: production ? '[name].[chunkhash].chunk.js' : '[name].[hash].chunk.js'
  },
  performance: {hints: false},
  devServer: {
    port: 7100,
    contentBase: outDir,
    // serve index.html for all 404 (required for push-state)
    historyApiFallback: true,
    proxy: {
      [`/**`]: {
        target: 'http://localhost:12002',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
      }
    }
//      {
//      '/api': {
//        target: 'http://localhost:12002',
//        pathRewrite: {'^/api' : ''}
//      }
//    }
  },
  // stats: 'verbose',
  devtool: production ? 'source-map' : 'inline-source-map',
  module: {
    rules: [
      // CSS required in JS/TS files should use the style-loader that auto-injects it into the website
      // only when the issuer is a .js/.ts file, so the loaders are not applied inside html templates
      {
        test: /\.css$/i,
        issuer: [{not: [{test: /\.html$/i}]}],
        // use: extractCss ? ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: cssRules
        // }) : ['style-loader', ...cssRules],
        use: extractCss ? MiniCssExtractPlugin.loader : ['style-loader', ...cssRules],
      },
      {
        test: /\.css$/i,
        issuer: [{test: /\.html$/i}],
        // CSS required in templates cannot be extracted safely
        // because Aurelia would try to require it again in runtime
        use: cssRules
      },
      {
        test: /\.scss$/,
        use: [production ? MiniCssExtractPlugin.loader : 'style-loader'
          , 'css-loader'
          , 'sass-loader']
        , issuer: /\.[tj]s$/i
      }
      ,
      {
        test: /\.scss$/
        , use: [
          'css-loader'
          , 'sass-loader'
        ]
        , issuer: /\.html?$/i
      }
      ,
      {
        test: /\.html$/i
        , loader: 'html-loader'
      }
      ,
      {
//        test: /\.js$/i
// , loader: 'babel-loader'
// , exclude: nodeModulesDir
// ,
        test: /\.js$/i
        , loader: 'babel-loader'
        , exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/
        ,

        options: coverage ? {
          sourceMap: 'inline'
          , plugins: ['istanbul']
        } : {}
        ,
      }
      ,
      {
        test: /\.json$/i
        , loader: 'json-loader'
      }
      ,
      // use Bluebird as the global Promise implementation:
      {
        test: /[\/\\]node_modules[\/\\]bluebird[\/\\].+\.js$/
        , loader: 'expose-loader?Promise'
      }
      ,
      // embed small images and fonts as Data Urls and larger ones as files:
      {
        test: /\.(png|gif|jpg|cur)$/i
        , loader: 'url-loader'
        , options: {limit: 8192}
      }
      ,
      {
        test: /\.(ico)$/i
        , loader: 'file-loader?name=[name].[ext]'
      }
      ,
      {
        test: /\.json$/
        , loader: 'json-loader'
      }
      ,
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i
        ,
        loader: 'url-loader'
        ,
        options: {
          limit: 10000
          , mimetype: 'application/font-woff2'
        }
      }
      ,
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i
        ,
        loader: 'url-loader'
        ,
        options: {
          limit: 10000
          , mimetype: 'application/font-woff'
        }
      }
      ,
      // load these fonts normally
      // , as files:
      {
        test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i
        , loader: 'file-loader'
      }
      ,
    ]
  }
  ,
  plugins: [
    new CleanWebpackPlugin()
    ,
    new Visualizer(),
    new AureliaPlugin(),
    new webpack.ProvidePlugin({
      'Promise': 'bluebird'
    }),
    new ModuleDependenciesPlugin({
      'aurelia-testing': ['./compile-spy', './view-spy']
    }),
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      favicon: 'src/images/favicon (5).ico',
      minify: production ? {
        removeComments: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        minifyCSS: true,
        minifyJS: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        ignoreCustomFragments: [/\${.*?}/g]
      } : undefined,
      metadata: {
        // available in index.ejs //
        title, server, baseUrl
      }
    }),
    ...when(extractCss, new MiniCssExtractPlugin({
      filename: production ? '[hash].css' : '[id].css',
      // allChunks: true
    })),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CopyWebpackPlugin([
      {from: `${rootDir}/locales/`, to: `${outDir}/locales`}
    ]),
    // ...when(extractCss, new ExtractTextPlugin({
    //   filename: production ? '[contenthash].css' : '[id].css',
    //   allChunks: true
    // })),
    ...when(production
      , [
        // new CopyWebpackPlugin([
        //   {from: 'static/favicon.ico', to: 'favicon.ico'}
        // ]),
        new webpack.LoaderOptionsPlugin({
          minimize: true
        }),
        new CompressionPlugin(),
      ]
    ),
    ...when(analyze, new BundleAnalyzerPlugin())
  ]
});
