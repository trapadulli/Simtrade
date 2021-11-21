"use strict";
var azure = require('azure-storage');
const alpaca = require("../Secrets/AlpacaCreds").getCreds();
const AzureStorage = require("../AzureStorage");
const { AzureTableAccess } = require("../../Core/AzureAccess");

const tableService = AzureTableAccess()
module.exports = {
run: function (printday, day, file, trade, testortrade) {

 // if rev > lastyearRev && epsGowthdeluted <  epsGowthdelutedLastyears
// score  =  epsGrowthDeluted / revenue-lasttearrevenue/revenue * costOfRevenue
  },
};

