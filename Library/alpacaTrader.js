"use strict";
const Order = require("./Order");
const alpaca = require("./Secrets/AlpacaCreds").getCreds();
/**
 * makes calls to alpaca brokerage
 * @param {*} positions 
 */

function alpacaTrader(positions) {
  var weights = {};
  var checklist = [];
  positions.forEach((position) => {
    weights[position.symbol] = position.weight;
    checklist.push(position.symbol);
  });

  alpaca.getAssets().then((assets) => {
    var positionsPrime = [];
    var shortSum = 0;
    var longSum = 0;
    assets.forEach(function (asset) {
      if (asset.tradable && checklist.includes(asset.symbol)) {
        if (weights[asset.symbol] < 0) {
          if (asset.easy_to_borrow || asset.shortable) {
            positionsPrime.push({
              symbol: asset.symbol,
              weight: weights[asset.symbol],
            });
            shortSum += Math.abs(weights[asset.symbol]);
          }
        } else {
          positionsPrime.push({
            symbol: asset.symbol,
            weight: weights[asset.symbol],
          });
          longSum += weights[asset.symbol];
        }
      }
    });
    alpaca.getPositions().then((portfolio) => {
      alpaca.getAccount().then((account) => {
        var cash = Number(account.equity);
        var portfolioSymbols = [];
        var portfolioSharesDictionary = {};
        var orderSymbols = [];
        var data = [];
        positionsPrime.forEach(function (x) {
          orderSymbols.push(x.symbol);
          data.push(x);
        });
        portfolio.forEach(function (x) {
          portfolioSymbols.push(x.symbol);
          portfolioSharesDictionary[x.symbol] = x.qty;
        });

        for (var i = 0; i < portfolioSymbols.length; i++) {
          (function (i) {
            setTimeout(function () {
              if (!orderSymbols.includes(portfolioSymbols[i])) {
                Order.SubmitOrder(
                  portfolioSymbols[i],
                  0,
                  portfolioSharesDictionary[portfolioSymbols[i]],
                  function () { }
                );
              }
            }, i * portfolioSymbols.length);
          })(i);
        }
        for (var i = 0; i < data.length; i++) {
          (function (i) {
            setTimeout(function () {
              var shares = 0;
              if (portfolioSymbols.includes(data[i].symbol)) {
                shares = portfolioSharesDictionary[data[i].symbol];
              }
              
              var weight = data[i].weight > 0
                ? (data[i].weight)// / longSum
                : (data[i].weight)// / shortSum;
              weight = weight * cash;
                Order.SubmitOrder(
                  data[i].symbol,
                  weight,
                  shares,
                  function () { }
                );
            }, 500 * i);
          })(i);
        }
      });
    });
  });
}
exports.alpacaTrader = alpacaTrader;
