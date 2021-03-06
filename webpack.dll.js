/**
 * Created by z on 2017/5/31.
 */
const path = require('path');
const webpack = require('webpack');

const DllPlugin = webpack.DllPlugin;

const threeModule = path.join(__dirname, '/node_modules/three/');

const TrackballControls = path.join(threeModule, 'examples/js/controls/TrackballControls.js');
const EffectComposer = path.join(threeModule, 'examples/js/postprocessing/EffectComposer.js');
const RenderPass = path.join(threeModule, 'examples/js/postprocessing/RenderPass.js');
const ShaderPass = path.join(threeModule, 'examples/js/postprocessing/ShaderPass.js');
const MaskPass = path.join(threeModule, 'examples/js/postprocessing/MaskPass.js');
const CopyShader = path.join(threeModule, 'examples/js/shaders/CopyShader.js');

module.exports = {
    entry: {
        vendor: ['three', TrackballControls, EffectComposer, RenderPass, ShaderPass, MaskPass, CopyShader],
    },
    output: {
        path: '.',
        filename: './dist/js/[name].js',
        library: '[name]_library'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|dist)/,
                loaders: ['babel-loader', 'eslint-loader']
            },
            {
                test: /TrackballControls\.js/,
                loader: 'imports?THREE=three!exports?THREE.TrackballControls'
            },
            {
                test: /EffectComposer\.js/,
                loader: 'imports?THREE=three!exports?THREE.EffectComposer'
            },
            {
                test: /RenderPass\.js/,
                loader: 'imports?THREE=three!exports?THREE.RenderPass'
            },
            {
                test: /ShaderPass\.js/,
                loader: 'imports?THREE=three!exports?THREE.ShaderPass'
            },
            {
                test: /MaskPass\.js/,
                loader: 'imports?THREE=three!exports?THREE.MaskPass'
            },
            {
                test: /CopyShader\.js/,
                loader: 'imports?THREE=three!exports?THREE.CopyShader'
            }
        ]
    },
    resolve: {
        alias: {
            'TrackballControls': TrackballControls,
            'EffectComposer': EffectComposer,
            'RenderPass': RenderPass,
            'ShaderPass': ShaderPass,
            'MaskPass': MaskPass,
            'CopyShader': CopyShader,
        }
    },
    plugins: [
        new DllPlugin({
            path: 'manifest.json',
            name: '[name]_library',
            context: __dirname,
        }),
    ]
};