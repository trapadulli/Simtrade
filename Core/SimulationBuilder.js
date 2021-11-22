/////////////////////////////////////////////////// DEPENDENCIES //////////////////////////////////////////////////////////////
"use strict";
const { lookback } = require("../Core/lookback");

function SimulationBuilder(file, indexAdder, incrementer, method, back) {
  var year = 2250;
  var daysback = indexAdder + year;
  console.log("_________"+file+"_____________");
//  console.log("indexAdder: " + indexAdder);
  for (var i = 0; i  <= indexAdder; i++) {
    (function (i) {
      setTimeout(
        function () {
          console.log("____________| Daysback: " + (i ));
          var dateTime = new Date();
          var howFar = dateTime.setDate(dateTime.getDate() - (i ));
          var day = new Date(howFar).toJSON().slice(0, 10);

         // console.log(day);
          if (i > year) {
            //dont run longer than a year for performance data leaks
          //  console.log("indexer: " + (i + indexAdder));
            console.log("date: " + day);
            throw "done";
          }
          lookback(day, file, method, false, back);
        },
        indexAdder == i ? 1 : (indexAdder-i) * incrementer
      );
    })(i);
  }
}
exports.SimulationBuilder = SimulationBuilder;
