module.exports = {
  context: __dirname + "/app",

  entry: {
    javascript: "./app.jsx",
    html: "./index.html",
  },

  output: {
    path: __dirname + "/dist",
    filename: "app.js"
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      }
    ]
  }
};
