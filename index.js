/* eslint-env node */
// The main file that is included when you run `require("whammy-iv-drip")`.
"use strict";
var fluid = require("infusion");

// Register our content so it can be used with calls like fluid.module.resolvePath("%whammy-iv-drip/path/to/content.js");
fluid.module.register("whammy-iv-drip", __dirname, require);
