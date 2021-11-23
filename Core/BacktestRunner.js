"use strict"
const colors = require("colors/safe");
const Order = require("../Library/Order");

function BacktestRunner(indexAdder, incrementer, path, file, method,writecsvRowBacktest) {
  var returns = 0;
  var low = 0;
  var maxDrawdown = 0;
  var pain = 0;
  var high = 0;
  var diff = 0;
  var variance = 0;
  var sortinoVariance = 0;
  var downsideStdDev = 0;
  var sortino = 0;
  var numDays = 1;
  var downDays = 1;
  var j = 1;
  for (var i = indexAdder; i > 0; i--) {
    (function (i) {
      setTimeout(
        function () {
          var dateTime = new Date();
          var howFar = dateTime.setDate(dateTime.getDate() - i);
          var backDate = new Date(howFar).toJSON().slice(0, 10);
          try {
           
            Order.GetCalendar(backDate, function (isTradingDay) {
              if (isTradingDay) {
                
                method(backDate, file, function (daily, beta, sectors,longs,shorts) {
                  var growth = Number(Number(daily).toFixed(4));
                  variance += (growth - diff) ** 2;
                  if (growth - diff < 0) {
                    sortinoVariance += (growth - diff) ** 2;
                    downsideStdDev = sortinoVariance / downDays++;
                  }
                  var stdDev = variance / numDays++;

                  var sharpe = Number(
                    Number((returns / stdDev) * 0.01).toFixed(4)
                  );
                  sortino = Number(
                    Number(
                      ((returns / downsideStdDev) * 0.01) / Math.sqrt(2)
                    ).toFixed(4)
                  );
                  returns += growth;
                 
                  if (growth < 0) {
                    pain += growth;
                  }
                  var gainToPain = Number(
                    Number(returns / Math.abs(pain)).toFixed(3)
                  );
                  if (returns < high) {
                    low = returns;
                    var drawdown = Math.abs(high - returns).toFixed(3);
                    maxDrawdown =
                      drawdown > maxDrawdown ? drawdown : maxDrawdown;
                  } else {
                    high = returns;
                  }

                  /** symbol, weight, day, file, columns */
                  writecsvRowBacktest(
                    backDate,
                    returns,
                    growth,
                    sharpe,
                    sortino,
                    beta,
                    longs,
                    shorts,
                    -maxDrawdown,
                    gainToPain,
                    sectors,
                    path,
                    "day,returns,growth,sharpe,sqRtSortino,beta,longs,shorts,maxDrawdown,gainToPain"
                  );
                  diff = growth;
                  var tradingStatement = {
                    TotalReturns: Number(returns).toFixed(3) + "%",
                    MaxDrawdown: -maxDrawdown + "%",
                    Sharpe: sharpe,
                    SqRtSortino: sortino,
                    GainToPain: gainToPain,
                  };

                  for (const key in tradingStatement) {
                    var value = tradingStatement[key]
                    console.log(colors.bold(key)+
                    ` : ${colors.dim(value)}`);
                }
                  console.log("")
                  console.log("")
                });
              }
            });
          } catch (ex){
            console.log(ex);
            console.log("\nrun has no data");
          }
        },
        i == 0 ? 1 : j++ * incrementer
      );
    })(i);
  }
}
exports.BacktestRunner = BacktestRunner;