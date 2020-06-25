import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

export default [
    {
        input: 'src/promise-timeout/promise-timeout.js',
        output: {
            file: 'dist/promise-timeout.cjs.js',
            name: 'TimedPromise',
            format: 'cjs',
            exports: 'auto',
        },
        plugins: [
            commonjs(),
        ],
    },
    {
        input: 'src/index.js',
        output: {
            file: 'dist/promise-utils.esm.js',
            name: 'promise-utils',
            format: 'umd',
            exports: 'named',
        },
        plugins: [
            commonjs(),
            babel({
                babelHelpers: 'bundled',
                babelrc: false,
                presets: [
                    ['@babel/preset-env'],
                ],
            }),
        ],
    },
];
