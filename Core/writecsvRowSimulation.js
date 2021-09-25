"use strict";
var fs = require("fs");

function writecsvRowSimulation(symbol, weight, day, file, columns) {
  var objstr = symbol + "," + weight + "," + day;
  var newLine = "\r\n";
  var csv = objstr + newLine;
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
exports.writecsvRowSimulation = writecsvRowSimulation;