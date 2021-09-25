"use strict";
const { alpacaTrader } = require("./alpacaTrader");
const { writecsvRowSimulation } = require("../Core/writecsvRowSimulation");

function testortrade(printday, positions, file, trade) {
  if (trade) {
    alpacaTrader(positions);
  } else {
    console.log("positions: " + positions.length);
    positions.forEach(function (x) {
      
      writecsvRowSimulation(
        x.symbol,
        x.weight,
        printday + " 14:30:00Z",
        file,
        "Ticker,position_dollars,time"
      );
    });
  }
}
exports.testortrade = testortrade;
