/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  return {
    postcssPlugin: "equilibrium-css",
    Once(root) {
      console.log("Processing CSS with Equilibrium CSS...");
      console.log(root.toString());
    },
    OnceExit(root) {
      console.log("Finished processing CSS with Equilibrium CSS.");
    },
    AtRule(atRule) {
      if (atRule.name === "equilibrium") {
        console.log("Processing Equilibrium at-rule:", atRule.params);
      }
    },
  };
};

module.exports.postcss = true;
