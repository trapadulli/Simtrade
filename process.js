#!/usr/bin/env node
/////////////////////////////////////////////////// DEPENDENCIES //////////////////////////////////////////////////////////////
"use strict";
/* Backtest runner
 * node --max-old-space-size=4096 process.js RunEquities_Backtest
 */
process.env.UV_THREADPOOL_SIZE = 1028;
var RunAlgo = require("./Library/RunAlgo");
const ModelRunner = require("./Library/ModelRunner.js");
const Order = require("./Library/Order");
const { BacktestRunner } = require("./Core/BacktestRunner");
const { writecsvRowBacktest } = require("./Core/writecsvRowBacktest");
const { SimulationBuilder } = require("./Core/SimulationBuilder");
const { lookback } = require("./Core/lookback");
const outputDirectory = __dirname + "/Output/";
const testDir = __dirname + "/Output/" + process.argv[4] + "/";
//const modelPath = __dirname + "/Library/Models/"+process.argv[4]+".js"
var fs = require("fs");

const output = "/Output/";
const models = "/Library/Models/";
const shortOutputDirectory = output + process.argv[4];
const shortModelDirectory = models + process.argv[4] + ".js";
const outputPath = __dirname + shortOutputDirectory;
var outputModel = outputPath + "/" + process.argv[4] + ".js";
const modelPath = __dirname + shortModelDirectory;

var fs = require("fs");
function getCurrentFilenames() {
  console.log("\nCurrent filenames:");
  fs.readdirSync(__dirname).forEach((file) => {
    console.log(file);
  });
}

if (process.argv[2] && process.argv[3] && process.argv[4]) {
  if (!fs.existsSync(outputPath) && fs.existsSync(modelPath)) {
    fs.mkdirSync(outputPath);
  }
  if (!fs.existsSync(outputPath) && fs.existsSync(modelPath)) {
    fs.mkdirSync(outputPath);
  }

  if ("trade" == process.argv[2]) {
    console.log("trade today")
    var input = Number(process.argv[3] != undefined ? process.argv[3] : 0);
    var day = new Date().toJSON().slice(0, 10);
    var d = new Date(day);
    d.setDate(d.getDate() - input);
    var day = d.toJSON().slice(0, 10);
    var file = "simulations/_trade";
    Order.GetCalendar(day, function (isTradingDay) {
      if (isTradingDay) {
        lookback(day, file, RunAlgo.Model, true, 1);
      } else {
        console.log("not trading on " + day);
      }
    });
  } 
  if ("prep" == process.argv[2]) {
    var input = Number(process.argv[3] != undefined ? process.argv[3] : 0);
    var day = new Date().toJSON().slice(0, 10);
    var d = new Date(day);
    d.setDate(d.getDate() - input);
    var day = d.toJSON().slice(0, 10);
    var file = "_trade.txt";
    Order.GetCalendar(day, function (isTradingDay) {
      if (isTradingDay) {

        lookback(day, file, RunAlgo.Model, false, 1);
      } else {
        console.log("not trading on " + day);
      }
    });
  } 
  else if ("backtest" == process.argv[2]) {

      var i = 0;
      outputModel = outputPath + "/" + process.argv[4] + "_" + ++i + "_model.js";
      while (fs.existsSync(outputModel)) {
        outputModel = outputPath + "/" + process.argv[4] + "_" + ++i + "_model.js";
      }
      fs.copyFileSync(modelPath, outputModel);
    var sim = testDir + process.argv[4] +"_"+i+ "_sim.csv"
    var input = Number(process.argv[3] != undefined ? process.argv[3] : 0);
    SimulationBuilder(
      sim,
      input,
      20000,
      RunAlgo.Model,
      1
    );
    setTimeout(function(){
    BacktestRunner(
      input,
      20000,
      testDir + process.argv[4]+"_"+i+ "_backtest.csv",
      sim,
      ModelRunner.BacktestResults,
      writecsvRowBacktest
    );
    }
    ,20000)
  } else {
    console.log("no known call....");
  }
}
