module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": "airbnb",
  "plugins": [
    "react"
  ],
  "rules": {
    "import/no-extraneous-dependencies": 0,
    "import/extensions": 0,
    "class-methods-use-this": 1,
    "no-console": [1, { "allow": ["warn", "error"] }],
    "react/prop-types": [2, {"ignore": ["children"]}],
    "react/prefer-stateless-function": 0,
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to" ]
    }]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  }
}
