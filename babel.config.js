module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        corejs: 3,
        modules: 'commonjs',
        // TODO - figure it out how to make it work on test
        // modules: false,
        useBuiltIns: false
      }
    ]
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            corejs: 3,
            useBuiltIns: 'usage',
          }
        ],
        '@babel/preset-react'
      ],
      plugins: ['@babel/plugin-proposal-class-properties']
    }
  }
};
