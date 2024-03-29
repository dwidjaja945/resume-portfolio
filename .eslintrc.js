module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/vue3-essential", "@vue/airbnb", "@vue/typescript/recommended"],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "import/prefer-default-export": "off",
    "no-extra-semi": "off",
    indent: ["warn", 2],
    "no-useless-escape": "warn",
    "implicit-arrow-linebreak": "off",
    "arrow-parens": "off",
    "no-useless-escape": "warn",
    eqeqeq: "off",
    "@typescript-eslint/camelcase": "off",
    "comma-dangle": "off",
    "symbol-description": "off",
    quotes: "off",
    "operator-linebreak": ["warn", "before"],
    "@typescript-eslint/no-explicit-any": "off"
  }
};
