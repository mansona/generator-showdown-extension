module.exports = {
  env: {
    node: true
  },
  rules: {
    'import/no-unresolved': [2, { ignore: ['showdown'] }]
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
      "arrow-body-style": 0,
      'no-param-reassign': 0,
    }
  }]
}
