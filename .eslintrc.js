module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ["@nx", "next-on-pages"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:next-on-pages/recommended",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
      rules: {
        "@nx/enforce-module-boundaries": [
          "error",
          {
            allow: [],
            depConstraints: [
              {
                sourceTag: "*",
                onlyDependOnLibsWithTags: ["*"],
              },
              {
                sourceTag: "type:feature",
                onlyDependOnLibsWithTags: ["type:shared"],
              },
              {
                sourceTag: "type:shared",
                onlyDependOnLibsWithTags: ["type:shared"],
              },
            ],
          },
        ],
      },
    },
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
};
