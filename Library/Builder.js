"use strict";
const { AzureTableAccess } = require("../Core/AzureAccess");
var azure = require('azure-storage');
const AzureStorage = require("./AzureStorage");
const tableService = AzureTableAccess()


module.exports = {

  GetMonster: function (day, callback) {

    var query = new azure.TableQuery().where("PartitionKey eq ?", day);
    AzureStorage.GetDaily("PickList5000", tableService, query, function (obj) {
       GetShortVolume(day, function(data){
         var sum = 0
         var dict = []
        data.forEach(x=>{
          dict[x.symbol]=x.shortScore
          sum+=x.shortScore
        })
        var monster = []
        obj.forEach(company => {
          if(
         !isNaN(Net_IncomeDelta(company))){
            monster.push(
              {
                altman:altmanScore(company),
                symbol: objectValues(company.RowKey),
                netDelta: Net_IncomeDelta(company),
                peDelta: isNaN(peDeltaScore(company))?0:peDeltaScore(company),
                shortV: isNaN(dict[objectValues(company.RowKey)])?0:dict[objectValues(company.RowKey)]
              }
            )
          }   
        })
        callback(monster)
       })      
    })
  },

  GetDelta: function (day, callback) {
    var query = new azure.TableQuery().where("PartitionKey eq ?", day);
    AzureStorage.GetDaily("PickList5000", tableService, query, function (obj) {
      var turnover = [];
      obj.forEach(function (company) {
        turnover.push({
          symbol: objectValues(company.RowKey),
          score: topDeltas(company),
          zScore: altmanScore(company)
        });
      });
      callback(turnover);
    });
  },
  ta: function (day, callback) {
    console.log("ta lookback: " + day);
    var query = new azure.TableQuery().where("PartitionKey eq ?", day);
    AzureStorage.GetDaily(
      "ShortVolume",
      tableService,
      query,
      function (shortVolume) {
        AzureStorage.GetDaily(
          "BBandsDaily",
          tableService,
          query,
          function (bbandsDaily) {
            AzureStorage.GetDaily(
              "ADDaily",
              tableService,
              query,
              function (addaily) {
                AzureStorage.GetDaily(
                  "CCI20Day",
                  tableService,
                  query,
                  function (cci20) {
                    var addailydic = {};
                    var cci = {};

                    var array = [];
                    addaily.forEach((company) => {
                      addailydic[objectValues(company.RowKey)] = addVol(company);

                      array.push(objectValues(company.RowKey));
                    });
                    cci20.forEach((company) => {
                      cci[objectValues(company.RowKey)] = cci20day(company);
                      array.push(objectValues(company.RowKey));
                    });
                    var shortVolSort = [];
                    var bbandSort = [];
                    var shortvolDict = {};
                    shortVolume.forEach((company) => {
                      shortVolSort.push({
                        symbol: objectValues(company.RowKey),
                        growthDiff: shortV(company).growthDiff,
                        isShortBull: shortV(company).isShortBull,
                      });
                      shortvolDict[objectValues(company.RowKey)] =
                        shortV(company).growthDiff;
                      array.push(objectValues(company.RowKey));
                    });

                    bbandsDaily.forEach((company) => {
                      bbandSort.push({
                        symbol: objectValues(company.RowKey),
                        score: bbandvol(company),
                      });
                      array.push(objectValues(company.RowKey));
                    });
                    var keeplong = [];
                    var keepshort = [];
                    var shortInterestGrowthSorted = shortVolSort.sort(function (
                      a,
                      b
                    ) {
                      return b.growthDiff - a.growthDiff;
                    });
                    var bbandVolSorted = bbandSort.sort(function (a, b) {
                      return a.score - b.score;
                    });

                    var top = bbandVolSorted.slice(
                      0,
                      Math.round(bbandSort.length * 0.3)
                    );
                    var bottom = shortInterestGrowthSorted.slice(
                      Math.round(shortVolSort.length * 0.8),
                      shortVolSort.length
                    );
                    var winners = [];
                    var losers = [];
                    top.forEach((x) => {
                      if (true) {
                        winners.push(x.symbol);
                      }
                    });
                    bottom.forEach((x) => {
                      if (x.isShortBull == true) {
                        losers.push(x.symbol);
                      }
                    });

                    var distinct = array.sort().filter(onlyUnique);
                    distinct.forEach((symbol) => {
                      if (
                        // winners.includes(symbol)&&
                        !losers.includes(symbol) &&
                        shortvolDict[symbol] < 0
                      ) {
                        keeplong.push({
                          symbol: symbol,
                          score: Math.abs(addailydic[symbol]), //
                        });
                      }
                      if (
                        losers.includes(symbol) &&
                        cci[symbol] < 0 &&
                        addailydic[symbol] < 0
                      ) {
                        keepshort.push({
                          symbol: symbol,
                          score: addailydic[symbol] * cci[symbol],
                        });
                      }
                    });

                    callback(keeplong, keepshort);
                  }
                );
              }
            );
          }
        );
      }
    );
  },





};
function cotcalc(day) {
  console.log("cot lookback: " + day);
  var d = new Date(day);
  d.setDate(d.getDate() - 30);
  var weekback = d.toJSON().slice(0, 10);
  var query = new azure.TableQuery()
    .where("PartitionKey le ?", day)
    .and("PartitionKey ge ?", weekback);
  AzureStorage.GetDaily("COT", tableService, query, function (cot) {
    return (cotScore(cot[cot.length - 1]));
  });
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
function topDeltas(company) {
  var peDelta = Number(
    objectValues(company.P_E_ratio) / objectValues(company.P_E_ratio_LastYear)
  );
  var assetTurnoverDelta = Number(
    objectValues(company.Asset_Turnover) /
    objectValues(company.Asset_Turnover_LastYear)
  );
  var financingDelta = Number(
    objectValues(company.Financing_cash_flow) /
    objectValues(company.Financing_cash_flow_LastYear)
  );
  var evDelta = Number(
    objectValues(company.Enterprise_Value) /
    objectValues(company.Enterprise_Value_LastYear)
  );
  //  var revenueDelta =   Number(objectValues(company.Revenue) / objectValues(company.Revenue_LastYear))
  var marketCapDelta = Number(
    objectValues(company.Market_Cap) / objectValues(company.Market_Cap_LastYear)
  );
  var saleDelta = Number(
    (objectValues(company.EV_Sales) * objectValues(company.Enterprise_Value)) /
    (objectValues(company.EV_Sales_LastYear) *
      objectValues(company.Enterprise_Value_LastYear))
  );

  var deltas =
    Number(isNaN(marketCapDelta) ? 0 : marketCapDelta) -
    Number(isNaN(financingDelta) ? 0 : financingDelta);

  return deltas;
}
function objectValues(metric) {
  var result =
    (Object.values(metric != undefined && metric != null ? metric : {})[0] ==
      "Edm.Double") |
      (Object.values(metric != undefined && metric != null ? metric : {})[0] ==
        "Edm.String")
      ? Object.values(metric != undefined && metric != null ? metric : {})[1]
      : Object.values(metric != undefined && metric != null ? metric : {})[0];
  return result;
}
function sma(company) {
  return Number(Number(objectValues(company.SMA)).toFixed(2));
}

function bbandvol(company) {
  var lower = Number(objectValues(company.Real_Lower_Band));
  var upper = Number(objectValues(company.Real_Upper_Band));
  var middle = Number(objectValues(company.Real_Middle_Band));

  var abs = (upper - middle + middle - lower) / 2 / middle;
  return abs;
}
function macroScore(company) {
  var presentPMI = Number(objectValues(company.presentPMI));
  var vixAvg = Number(objectValues(company.vixAvg));
  return { presentPMI: presentPMI, vixAvg: vixAvg };
}
function cotScore(company) {
  var BondsScore = Number(objectValues(company.BondsScore));
  var NasdaqScore = Number(objectValues(company.NasdaqScore));
  var dowScore = Number(objectValues(company.dowScore));
  return {
    BondsScore: BondsScore,
    NasdaqScore: NasdaqScore,
    dowScore: dowScore,
  };
}

function GetShortVolumeTableFilterGrowth(tableService, day, callback) {

  var list = []
  var filter = {}
  var query = new azure.TableQuery()
    .where('PartitionKey eq ?', day);
  AzureStorage.GetDaily('ShortVolume', tableService, query,
    function (shortVolume) {
      AzureStorage.GetDaily('StocksMonthlyGrowth', tableService, query,
        function (stockGrowth) {
          stockGrowth.forEach(function (x) {
            filter[objectValues(x.RowKey)] = objectValues(x.growth)
          })
          shortVolume.forEach(function (item) {
            var growthscore = filter[objectValues(item.RowKey)]
            list.push({
              'symbol': objectValues(item.RowKey),
              'shortScore': objectValues(item.growthDiff)
            })
          })
          callback(list)
        })
    }
  )
}
function peDeltaScore(company) {
  var result = (
      (objectValues(company.P_E_ratio) -
      objectValues(company.P_E_ratio_LastYear))/objectValues(company.P_E_ratio_LastYear))
  return result;
}
function piotroskiScore(company) {
  var PositiveNetIncome = objectValues(company.Net_Income) > 0 ? 1 : 0;
  var PositiveReturnOnAssets = objectValues(company.Net_Income) / objectValues(company.Total_Assets) > 0 ? 1 : 0;
  var PositiveOperatingCashFlow = objectValues(company.Operating_Cash_Flow) > 0 ? 1 : 0;
  var CashFlowGreaterThanNetIncome = objectValues(company.Operating_Cash_Flow) > objectValues(company.Net_Income) > 0 ? 1 : 0;
  var LoweredRatioOfLongTermDebt = objectValues(company.Long_Term_Debt_Total) < objectValues(company.Long_Term_Debt_Total_LastYear) ? 1 : 0;
  var HigherCurrentRatio = objectValues(company.Total_current_assets) > objectValues(company.Total_current_assets) ? 1 : 0;
  var HigherGrossMargin = objectValues(company.Gross_Margin) > objectValues(company.Gross_Margin_LastYear) ? 1 : 0;
  var HigherAssetTurnover = objectValues(company.Asset_Turnover) > objectValues(company.Asset_Turnover_lastYear) ? 1 : 0;
  var piotroski = HigherAssetTurnover + HigherGrossMargin + HigherCurrentRatio + LoweredRatioOfLongTermDebt
    + CashFlowGreaterThanNetIncome + PositiveOperatingCashFlow + PositiveReturnOnAssets + PositiveNetIncome

  return piotroski
}
function altmanScore(company) {
  var A = Number(objectValues(company.Total_current_assets_LastYear) / objectValues(company.Total_current_liabilities_LastYear) / objectValues(company.Total_Assets_LastYear)).toFixed(2)
  var B = Number(objectValues(company.Retained_Earnings_LastYear) / objectValues(company.Total_Assets_LastYear)).toFixed(2)
  var C = Number(objectValues(company.EBIT_LastYear) / objectValues(company.Total_Assets)).toFixed(2)
  var D = Number(objectValues(company.Market_Cap_LastYear) / objectValues(company.Total_liabilities_LastYear)).toFixed(2)
  var E = Number(objectValues(company.EV_Sales_LastYear) * objectValues(company.EV_EBIT_LastYear) * objectValues(company.EBIT_LastYear) / objectValues(company.Total_Assets)).toFixed(2)
  var ZScore = Number(1.2 * A + 1.4 * B + 3.3 * C + 0.6 * D + 1.0 * E).toFixed(2)
  return Number(ZScore)
}
function shortV(company) {
  var growthDiff = Number(objectValues(company.growthDiff));
  var shortDay = Number(objectValues(company.shortDay));
  var shortWeekAvg = Number(objectValues(company.shortWeekAvg));
  var isShortBull = shortDay > shortWeekAvg;
  return { growthDiff: growthDiff, isShortBull: isShortBull };
}
function cci20day(company) {
  var CCI = Number(objectValues(company.CCI));

  return CCI;
}
function addVol(company) {
  return Number(objectValues(company.AD_Line));
}

function GetSectorSharpeDaily(tableService, day, callback) {
  var list = [];
  var query = new azure.TableQuery().where("PartitionKey eq ?", day);
  AzureStorage.GetDaily("SectorSharpe", tableService, query, function (data) {
    data.forEach(function (data) {
      list.push({
        XLB: objectValues(data.XLB),
        XLY: objectValues(data.XLY),
        XLP: objectValues(data.XLP),
        XLE: objectValues(data.XLE),
        XLF: objectValues(data.XLF),
        XLI: objectValues(data.XLI),
        XLK: objectValues(data.XLK),
        XLU: objectValues(data.XLU),
        XLV: objectValues(data.XLV),
        VOX: objectValues(data.VOX),
        VNQ: objectValues(data.VNQ),
        GLD: objectValues(data.GLD),
        TLT: objectValues(data.TLT),
        SPY: objectValues(data.SPY),
      });
    });

    callback(list);
  });
}
function GetMacroTable(tableService, day, callback) {
  var list = [];

  var query = new azure.TableQuery().where("PartitionKey eq ?", day);
  AzureStorage.GetDaily("Macro", tableService, query, function (data) {
    data.forEach(function (data) {
      list.push({
        presentPMI: objectValues(data.presentPMI),
        pastPMI: objectValues(data.pastPMI),
        vixAvg: objectValues(data.vixAvg),
      });
    });

    callback(list);
  });
}

function discountedFuctureCashFlowsScore(company) {
  var years = 5;
  var growth =
    Number(objectValues(company.EPS_Growth_diluted)) +
    Number(objectValues(company.EPS_Growth_diluted_LastYear)) / 2;
  var total = 0;
  var discount = 0.9;
  var cashFlows =
    (Number(objectValues(company.Gross_Margin_LastYear)) -
      Number(objectValues(company.Gross_Margin))) * // Number(objectValues(company.Operating_Cash_Flow)) *
    (Number(objectValues(company.EPS_Growth_diluted)) +
      Number(objectValues(company.EPS_Growth_diluted_LastYear)) / 2) *
    discount;

  for (years; years > 0; years--) {
    if (years < 2) {
      growth = growth / 2;
    }
    total += cashFlows * Math.pow(1 + growth, years);
  }
  return total;
}
function Net_IncomeDelta(company) {
  var Net_IncomeDelta =
    (objectValues(company.Net_Income) -
      objectValues(company.Net_Income_LastYear)) /
    objectValues(company.Net_Income_LastYear)
  return Net_IncomeDelta;
}

function GetDCFTable(tableService, day, callback) {
  var query = new azure.TableQuery().where("PartitionKey eq ?", day);
  var dcfLong = [];
  var dcfShort = [];
  //get sectors

  AzureStorage.GetDaily("PickList", tableService, query, function (data) {
    data.forEach(function (company) {
      var symbol = objectValues(company.RowKey);
      var dcfScore = discountedFuctureCashFlowsScore(company);
      var altmanFactor = altmanScore(company);
      if (dcfScore < 0) {
        //altmanFactor < .2 &&
        dcfShort.push({
          symbol: symbol,
          dcfScore: dcfScore,
        });
      } else if (dcfScore > 0 && altmanFactor > 2) {
        dcfLong.push({
          symbol: symbol,
          dcfScore: dcfScore,
        });
      }
    });
    //  console.log("LONG PIOTROSKI _________________ ")
    var sortedLongDcf = dcfLong
      .sort(function (a, b) {
        return a.dcfScore - b.dcfScore;
      })
      .slice(0, dcfShort.length > 10 ? 10 : Math.round(dcfLong.length * 0.1));
    //  console.log("LONG PIOTROSKI _________________ ")
    var sortedShortDcf = dcfShort
      .sort(function (a, b) {
        return a.dcfScore - b.dcfScore;
      })
      .slice(
        dcfShort.length > 5
          ? dcfShort.length - 5
          : Math.round(dcfShort.length * 0.5),
        dcfShort.length
      );
    callback(sortedShortDcf, sortedLongDcf);
  });
}

function GetShortVolume( day, callback) {
  var list = [];
  var filter = {};
  var query = new azure.TableQuery().where("PartitionKey eq ?", day);
  AzureStorage.GetTable(
    "ShortVolume",
    tableService,
    query,
    function (shortVolume) {
      shortVolume.forEach(function (item) {
        {
          list.push({
            symbol: objectValues(item.RowKey),
            shortScore: Math.abs(objectValues(item.growthDiff)),
          });
        }
      });
      callback(list);
    }
  );
}