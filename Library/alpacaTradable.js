"use strict";
const alpaca = require("./Secrets/AlpacaCreds").getCreds();

function alpacaTradable(positions, calback) {
  var weights = {};
  var checklist = [];
  positions.forEach((position) => {
   
    weights[position.symbol] = position.weight;
    checklist.push(position.symbol);
  });
  
  alpaca.getAssets().then((assets) => {
    var positionsPrime = [];
    var shortPrimeDict = {}
    var longPrimeDict = {}
    var shortCount = 0
    var longCount = 0
    var shortSum = 0
    var longSum = 0
    var finalchecklist = []
    assets.forEach(function (asset) {
      if (asset.tradable && checklist.includes(asset.symbol)) {
        finalchecklist.push(asset.symbol)
        if (weights[asset.symbol] < 0) {
          if (asset.easy_to_borrow || asset.shortable) {
            shortPrimeDict[asset.symbol]= weights[asset.symbol]
            shortSum+=Math.abs(weights[asset.symbol])
            shortCount++
          }
        } else {
          longPrimeDict[asset.symbol]=weights[asset.symbol]
          longSum+=Math.abs(weights[asset.symbol])
          longCount++
        }
       
      }
    });
   
    assets.forEach(asset=>{
     
      if (asset.tradable && checklist.includes(asset.symbol)&& finalchecklist.includes(asset.symbol)) {
        var score = weights[asset.symbol]>0?
        (longCount>100?weights[asset.symbol]/longSum:1/100):
        (shortCount>10?-.3/shortCount:-.5/10)
        positionsPrime.push({
            symbol: asset.symbol,
            weight: score,
          });
      }   
    })
    calback(positionsPrime);
  });
}
exports.alpacaTradable = alpacaTradable;