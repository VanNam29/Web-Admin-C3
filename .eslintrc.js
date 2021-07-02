// module.exports = {
//     "env": {
//         "browser": true,
//         "commonjs": true,
//         "es2021": true
//     },
//     "extends": [
//         "eslint:recommended",
//         "plugin:react/recommended",
//         "plugin:@typescript-eslint/recommended"
//     ],
//     "parser": "@typescript-eslint/parser",
//     "parserOptions": {
//         "ecmaFeatures": {
//             "jsx": true
//         },
//         "ecmaVersion": 12
//     },
//     "plugins": [
//         "react",
//         "@typescript-eslint"
//     ],
//     "rules": {
//     }
// };



module.exports = {
    env: {
      browser: true,
      es2021: true,
      jest: true,
      node: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: "module",
    },
    plugins: ["react", "prettier"],
    rules: {
      "array-bracket-spacing": [2, "never"],
      "arrow-parens": [2, "as-needed"],
      "arrow-spacing": [2],
      "block-spacing": [2, "always"],
      "brace-style": [2, "stroustrup", { allowSingleLine: true }],
      camelcase: [0, { properties: "always" }],
      "comma-dangle": [2, "always-multiline"],
      "comma-spacing": [2, { before: false, after: true }],
      "comma-style": [2, "last"],
      "computed-property-spacing": [2, "never"],
      "dot-location": [2, "property"],
      "eol-last": 2,
      eqeqeq: [2, "smart"],
      "func-call-spacing": 2,
      "func-style": [2, "declaration", { allowArrowFunctions: true }],
      indent: [2, 2, { SwitchCase: 1 }],
      "key-spacing": [2, { beforeColon: false, afterColon: true }],
      "keyword-spacing": [2, { before: true, after: true }],
      "max-len": ["error", { code: 100, tabWidth: 2, ignoreUrls: true }],
      "no-array-constructor": 2,
      "no-cond-assign": 2,
      "no-console": [1, { allow: ["info", "warn", "error"] }],
      "no-const-assign": 2,
      "no-constant-condition": 2,
      "no-debugger": 2,
      "no-dupe-args": 2,
      "no-dupe-keys": 2,
      "no-duplicate-case": 2,
      "no-eval": 2,
      "no-ex-assign": 2,
      "no-extend-native": 2,
      "no-else-return": 2,
      "no-floating-decimal": 2,
      "no-invalid-regexp": 2,
      "no-irregular-whitespace": 2,
      "no-lonely-if": 2,
      "no-mixed-spaces-and-tabs": 2,
      "no-multi-spaces": 2,
      "no-multiple-empty-lines": [2, { max: 3 }],
      "no-nested-ternary": 2,
      "no-new-wrappers": 2,
      "no-param-reassign": 2,
      "no-proto": 2,
      "no-return-assign": 2,
      "no-throw-literal": 2,
      "no-trailing-spaces": 2,
      "no-undef": 2,
      "no-undef-init": 2,
      "no-unneeded-ternary": 2,
      "no-unused-expressions": 2,
      "no-unused-vars": [2, { vars: "all", args: "after-used" }],
      "no-var": 2,
      "no-void": 2,
      "no-whitespace-before-property": 2,
      "object-curly-spacing": [2, "always", { objectsInObjects: false }],
      "object-shorthand": [2, "always"],
      "operator-assignment": [2, "always"],
      "operator-linebreak": [2, "after", { overrides: { "?": "before", ":": "before" }}],
      "prefer-const": 2,
      "quote-props": [2, "as-needed"],
      quotes: [2, "double", { avoidEscape: true }],
      "rest-spread-spacing": [2, "never"],
      semi: [2, "always"],
      "semi-spacing": [2, { before: false, after: true }],
      "space-before-blocks": [2, "always"],
      "space-before-function-paren": [
        2,
        { anonymous: "always", named: "never", asyncArrow: "always" },
      ],
      "space-in-parens": [2, "never"],
      "space-infix-ops": [2, { int32Hint: false }],
      "space-unary-ops": [2, { words: true, nonwords: false }],
      "spaced-comment": [2, "always"],
      strict: [2, "never"],
      "switch-colon-spacing": 2,
      "template-curly-spacing": [2, "never"],
      "template-tag-spacing": 2,
      "wrap-iife": [2, "inside"],
      yoda: [2, "never", { exceptRange: true }],
      "react/prop-types": 0,
    },
  };
  