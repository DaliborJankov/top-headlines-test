module.exports = {
  comments: true,
  plugins: ["react-refresh/babel"],
  presets: [
    ["react-app", { typescript: true }],
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    // "@babel/preset-react",
    "@babel/preset-typescript",
  ],
};
