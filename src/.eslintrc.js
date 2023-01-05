module.exports = {
  rules: {
    "no-duplicate-imports": "off",
    "@typescript-eslint/no-duplicate-imports": "warn",
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],

  parser: "@typescript-eslint/parser",

  plugins: ["@typescript-eslint"],

  root: true,
};
