var AzureStorage = require("./AzureStorage");
var Order = require("./Order");
var azure = require("azure-storage");
const colors = require("colors/safe");
const fs = require("fs");
const { lookbacker } = require("../Core/lookbacker");
const { AzureTableAccess } = require("../Core/AzureAccess");

const tableService = AzureTableAccess()

module.exports = {
  BacktestResults: function (daysback, file, callback) {
    var day = new Date(daysback).toJSON().slice(0, 10);
    BacktestResults(day, file, callback);
  }
};
async function BacktestResults(date, file, callback) {
  try {
    var daybackDict = {}
    var daytradeDict = {}
    var query = new azure.TableQuery().where("PartitionKey eq ?", date);
    lookbacker(date, function (date2) {
      var query2 = new azure.TableQuery().where("PartitionKey eq ?", date2);
      AzureStorage.GetTable(
        "StocksDailyBacktester",
        tableService,
        query,
        function (firstDayData) {
          AzureStorage.GetTable(
            "StocksDailyBacktester",
            tableService,
            query2,
            function (dataz) {
              firstDayData.forEach(x=>{
                if (x.adjustedClose != undefined){
                  daytradeDict[Object.values(x.RowKey)[1]] = Object.values(x.adjustedClose)[0]
                }  
               })
              dataz.forEach(x=>{
               if (x.adjustedClose != undefined){
                daybackDict[Object.values(x.RowKey)[1]] = Object.values(x.adjustedClose)[0]
               }  
              })
              
              var backtest = fs.readFileSync(file, "utf8");

              backtest = backtest.split("\n");
              backtest.shift();
              var buildArray = [];

              Order.BetaSector_Report(backtest, function (exposure) {
                backtest.forEach(function (x) {
                  var push = x.replace("\r", "").split(",");
                  if (
                    push[2] != undefined &&
                    push[2].slice(0, 10) == date.slice(0, 10)
                  ) {
                    buildArray.push(push);
                  }
                });
                var returns = 0;
                var betaScore = 0;
                var sortArray = [];
                var sectorDict = {
                  "Communication Services": 0,
                  "Basic Materials": 0,
                  "Consumer Cyclical": 0,
                  "Consumer Defensive": 0,
                  Energy: 0,
                  "Financial Services": 0,
                  Healthcare: 0,
                  Industrials: 0,
                  "Real Estate": 0,
                  Technology: 0,
                  Utilities: 0,
                };
                buildArray.forEach((x) =>
                  sortArray.push({ symbol: x[0], weight: x[1] })
                );

                var dailyPicks = sortArray.sort((a, b) =>
                  a.symbol > b.symbol ? 1 : -1
                );
                var longs = 0;
                var shorts = 0;
                var positions = "";
             
                console.log(
                  colors.bold("Backtest date: "+date))
                dailyPicks.forEach(function (ea) {
                  var positionReturn = 0;
                  var positionBeta = 0;
                  
                  firstDayData.forEach((element) => {
                    try {
                      if (ea.symbol == Object.values(element.RowKey)[1]) {
                      
                        var sector = exposure[ea.symbol].sector;
                        var beta = Number(exposure[ea.symbol].beta).toFixed(2);
                        var weight = Number(ea.weight);
                        var open = Number(
                          daybackDict[ea.symbol]
                        ).toFixed(3);
                        var close = Number(
                          daytradeDict[ea.symbol]
                        ).toFixed(3);
                        var diff = Number((close - open) / open).toFixed(3);
                        if(isNaN(diff)){
                          diff = 0
                        }
                        positions += ea.symbol + " " + diff + ",";
                        var sym = ea.symbol;
                        var space = "";
                        var spaces = "";
                        if (sym.length == 3) {
                          spaces = " ";
                        } else if (sym.length == 2) {
                          spaces = "  ";
                        } else if (sym.length == 1) {
                          spaces = "   ";
                        }
                        if (sum < 0) {
                          spaces = spaces.slice(0, -3);
                        } else {
                          space = spaces; //.slice(0,-3)
                        }
                        if (weight >= 0) {
                          longs += 1;
                        } else {
                          shorts += 1;
                        }
                        weight = weight.toFixed(3)
                        var sum = Number(Number(weight) * Number(diff)); //.toFixed(4)
                        var percent = (sum * 100).toFixed(2);
                        
                        console.log(
                          space +
                            colors.yellow(sym) +
                            ": " +
                            (Number(sum) > 0
                              ? colors.green(" " + percent + "%")
                              : colors.red("-" + Math.abs(percent) + "%")) +
                            (Math.abs(percent).toString().length == 1
                              ? "   "
                              : "") +
                            " O: " +
                            colors.blue(open) +
                            " C: " +
                            colors.blue(close) +
                            " W: " +
                            colors.blue(weight) +
                            " b: " +
                            colors.blue(beta) +
                            " s: " +
                            colors.blue(sector)
                        );
                        var w = Number(Number(weight).toFixed(4));
                        sectorDict[sector] = Number(
                          (sectorDict[sector] + Number(w)).toFixed(4)
                        );
                        positionBeta +=
                          beta < 0 || beta > 0 ? beta * Number(w) : 0;
                        positionReturn += sum;
                      }
                    } catch (ex) {
                      console.log(ex);
                      console.log("Backtest failed for a position");
                    }
                  });
                  betaScore += positionBeta;
                  returns += positionReturn;
                });
                console.log(
                  colors.bold(
                    "Daily: ") +
                      ((returns * 100).toFixed(2)) +
                      "%, "+ colors.bold("Beta: ") +
                      (betaScore.toFixed(4)) +
                      ", "+ colors.bold("Longs: ") +
                      (longs) +
                      ", "+colors.bold("Shorts: ") +
                      (shorts)
                );

                callback(
                  (returns * 100).toFixed(4),
                  betaScore,
                  sectorDict,
                  longs,
                  shorts
                );
              });
            }
          );
        }
      );
    });
  } catch (ex) {
    console.log(ex);
  }
}

