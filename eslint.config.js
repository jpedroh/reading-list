// @ts-check

const eslint = require("@eslint/js");
const nxPlugin = require("@nx/eslint-plugin");
const reactPlugin = require("eslint-plugin-react");
const tseslint = require("typescript-eslint");
const nextOnPages = require("eslint-plugin-next-on-pages");

module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
  reactPlugin.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "18.3.1",
      },
    },
  },
  reactPlugin.configs.flat["jsx-runtime"],
  { plugins: { "@nx": nxPlugin } },
  { plugins: { "next-on-pages": nextOnPages } },
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
  { ignores: ["*.js", "*.ts", ".next/**/*", ".nx/**/*", ".vercel/**/*", "src/modules/**/*"] },
);
