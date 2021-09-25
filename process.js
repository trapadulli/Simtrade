#!/usr/bin/env node
/////////////////////////////////////////////////// DEPENDENCIES //////////////////////////////////////////////////////////////
"use strict";
/* Backtest runner
 * node --max-old-space-size=4096 process.js RunEquities_Backtest
 */
process.env.UV_THREADPOOL_SIZE = 1028;
var RunAlgo = require("./Library/RunAlgo");
const ModelRunner = require("./Library/ModelRunner.js");
const Builder = require("./Library/Builder");
const { BacktestRunner } = require("./Core/BacktestRunner");
const { writecsvRowBacktest } = require("./Core/writecsvRowBacktest");
const { SimulationBuilder } = require("./Core/SimulationBuilder");
const { lookback } = require("./Core/lookback");
const outputDirectory = __dirname + "/Output/"+process.argv[4]+"/"
const modelPath = __dirname + "/Library/Models/"+process.argv[4]+".js"
var fs = require('fs');


if (process.argv[2]&&process.argv[3]&&process.argv[4]) {
  if ((!fs.existsSync(outputDirectory))&&fs.existsSync(modelPath)){
    fs.mkdirSync(outputDirectory);
}
  
   if ("trade" == process.argv[2]) {
    
    var input = Number(process.argv[3] != undefined ? process.argv[3] : 0);
    var day = new Date().toJSON().slice(0, 10);
    var d = new Date(day);
    d.setDate(d.getDate() - input);
    var day = d.toJSON().slice(0, 10);
    var file =   "simulations/_trade";
    Builder.GetCalendar(day, function (isTradingDay) {
      if (isTradingDay) {
        lookback(day,file,RunAlgo.Model,true, 1)
        
      }else{
        console.log("not trading on "+day)
      }
    });
  }
  else if ("sim" == process.argv[2]) {
    var input = Number(process.argv[3] != undefined ? process.argv[3] : 0);
    SimulationBuilder( outputDirectory+process.argv[4]+"_sim.csv",
      input,
      12000,
      RunAlgo.Model,
      1
    );
  } 
  else if ("backtest" == process.argv[2]) {
    var input = Number(process.argv[3] != undefined ? process.argv[3] : 0);
    BacktestRunner(
      input,
      10000,
      outputDirectory+process.argv[4]+"_backtest.csv",
      outputDirectory+process.argv[4]+"_sim.csv",
      ModelRunner.BacktestResults,
      writecsvRowBacktest
    );
  } 
  
  else {
    console.log("no known call....");
  }
  
}


