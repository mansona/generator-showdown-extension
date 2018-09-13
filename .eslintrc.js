module.exports = {
  env: {
    node: true
  },
  extends: "airbnb-base",
  overrides: [{
    files: [
      'test/**/*.js'
    ],
    env: {
      mocha: true
    },
    rules: {
      "arrow-body-style": 0
    }
  }]
}
