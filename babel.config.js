// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current', // Define o target para a versão atual do Node.js
        },
      },
    ],
  ],
};
