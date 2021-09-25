/////////////////////////////////////////////////// DEPENDENCIES //////////////////////////////////////////////////////////////
"use strict";
const { lookback } = require("../Core/lookback");

function SimulationBuilder(file, indexAdder, incrementer, method, back) {
  var year = 300;
  var daysback = indexAdder + year;
  console.log("daysback: " + daysback);
  console.log("indexAdder: " + indexAdder);
  for (var i = 0; i + indexAdder < daysback; i++) {
    (function (i) {
      setTimeout(
        function () {
          console.log("____________| Daysback: " + (i + indexAdder));
          var dateTime = new Date();
          var howFar = dateTime.setDate(dateTime.getDate() - (i + indexAdder));
          var day = new Date(howFar).toJSON().slice(0, 10);

          console.log(day);
          if (i > year) {
            //dont run longer than a year for performance data leaks
            console.log("indexer: " + (i + indexAdder));
            console.log("date: " + day);
            throw "done";
          }
          lookback(day, file, method, false, back);
        },
        i == 0 ? 1 : i * incrementer
      );
    })(i);
  }
}
exports.SimulationBuilder = SimulationBuilder;
