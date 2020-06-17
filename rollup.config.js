import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

export default [
    {
        input: 'src/index.js',
        output: {
            file: 'dist/promise-utils.js',
            name: 'promise-utils',
            format: 'umd',
            exports: 'named',
        },
        plugins: [
            commonjs(),
            uglify(),
            babel({
                babelrc: false,
                presets: [
                    ['@babel/preset-env'],
                ],
            }),
        ],
    },
];