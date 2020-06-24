import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default [
    {
        input: 'src/promise-timeout/index.js',
        output: {
            file: 'dist/promise-timeout.cjs.js',
            name: 'promise-timeout',
            format: 'cjs',
            exports: 'named',
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
                babelrc: false,
                presets: [
                    ['@babel/preset-env'],
                ],
            }),
        ],
    },
];
