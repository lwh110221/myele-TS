const { CLIEngine } = require("eslint");

// for explanation
const cli = new CLIEngine({});

module.exports = {
  "*.{js,ts,tsx}": files => {
    return (
      "eslint --max-warnings=0 --fix " + files.filter(file => !cli.isPathIgnored(file)).join(" ")
    );
  },
  "*.{css,scss,json,md,html,yml}": ["prettier --write"],
};
