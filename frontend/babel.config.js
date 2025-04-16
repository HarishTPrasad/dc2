module.exports = {
    presets: [
      // ... other presets ...
      ['@babel/preset-react', { runtime: 'automatic' }], // If you're using React
    ],
    plugins: [
      // ... other plugins ...
      ['@babel/plugin-proposal-decorators', { version: '2023-05' }], // Add this
    ],
  };
  