"use strict";
/**
 * Place your model file with .run method in Models folder
 * Call it by file name in command line
 * like:
    node process.js <function> <days> <fileName>
    node process.js trade 0 MyFile
    node process.js sim 0 MyFile
    node process.js backtest 300 MyFile
 */
const model = require("./Models/"+process.argv[4]);
const { testortrade } = require("./testortrade");

module.exports = {
  Model: function (printday, day, file, trade) {
    model.run(printday, day, file, trade, testortrade)
  }
};
