// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import prettierConfig from "eslint-config-prettier";

export default withNuxt(
  {
    rules: {
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "vue/block-order": ["error", { order: ["script", "template", "style"] }],
      "vue/block-lang": ["error", { script: { lang: "ts" } }],
    },
  },
  prettierConfig,
);
