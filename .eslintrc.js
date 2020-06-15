module.exports = {
    extends: 'airbnb-base',
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es6: true,
        mocha: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        indent: ['error', 4],
        semi: ['error', 'always'],
        'padded-blocks': 'off',
        'space-before-function-paren': ['error', 'always'],
    },
};
