"use strict";
const alpaca = require("./Secrets/AlpacaCreds").getCreds();

function alpacaTradable(positions, calback) {
  var weights = {};
  var checklist = [];
  positions.forEach((position) => {
    weights[position.symbol] = position.score;
    checklist.push(position.symbol);
  });

  alpaca.getAssets().then((assets) => {
    var positionsPrime = [];
    assets.forEach(function (asset) {
      if (asset.tradable && checklist.includes(asset.symbol)) {
        if (weights[asset.symbol] < 0) {
          if (asset.easy_to_borrow || asset.shortable) {
            positionsPrime.push({
              symbol: asset.symbol,
              score: weights[asset.symbol],
            });
          }
        } else {
          positionsPrime.push({
            symbol: asset.symbol,
            score: weights[asset.symbol],
          });
        }
        
      }
    });
    calback(positionsPrime);
  });
}
exports.alpacaTradable = alpacaTradable;