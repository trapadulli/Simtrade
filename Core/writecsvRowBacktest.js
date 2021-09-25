"use strict";
var fs = require("fs");

function writecsvRowBacktest(
  backDate,
  returns,
  growth,
  sharpe,
  sortino,
  beta,
  longs,
  shorts,
  maxDrawdown,
  gainToPain,
  sectors,
  file,
  columns
) {
  var rowValues = backDate +
    "," +
    returns +
    "," +
    growth +
    "," +
    sharpe +
    "," +
    sortino +
    "," +
    beta +
    "," +
    longs +
    "," +
    shorts +
    "," +
    maxDrawdown +
    "," +
    gainToPain;

  if (Object.entries(sectors) != null) {
    for (const [key, value] of Object.entries(sectors)) {
      if (!isNaN(value) && key != undefined) {
        rowValues += "," + value;
        columns += "," + key;
      }
    }
  }

  var newLine = "\r\n";
  var csv = rowValues + newLine;
  var fields = columns + newLine;

  fs.stat(file, function (err, stat) {
    if (err == null) {
      fs.appendFile(file, csv, function (err) {
        if (err)
          throw err;
      });
    } else {
      fs.writeFile(file, fields, function (err) {
        if (err)
          throw err;
      });
      fs.appendFile(file, csv, function (err) {
        if (err)
          throw err;
      });
    }
  });
}
exports.writecsvRowBacktest = writecsvRowBacktest;
