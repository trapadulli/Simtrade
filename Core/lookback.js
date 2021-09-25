/////////////////////////////////////////////////// DEPENDENCIES //////////////////////////////////////////////////////////////
"use strict";
const Builder = require("../Library/Builder");

function lookback(day, file, method, trade, back) {
  var printday = day;
  try {
    Builder.GetCalendar(day, function (isTradingDay) {
      var back = 1;
      if (isTradingDay) {
        console.log("tradingDay: " + day);
        var d = new Date(day);
        d.setDate(d.getDate() - 1);
        day = d.toJSON().slice(0, 10);
        Builder.GetCalendar(day, function (isTradingDay) {
          if (isTradingDay) {
            console.log("in 1");
            method(printday, day, file, trade, function () {
              console.log(" done building daily trade positions");
            });

          } else {
            d = new Date(day);
            d.setDate(d.getDate() - 1);
            day = d.toJSON().slice(0, 10);
            Builder.GetCalendar(day, function (isTradingDay) {
              if (isTradingDay) {
                console.log("in 2");
                method(printday, day, file, trade, function () {
                  console.log(" done building daily trade positions");
                });
              } else {
                d = new Date(day);
                d.setDate(d.getDate() - 1);
                day = d.toJSON().slice(0, 10);
                Builder.GetCalendar(day, function (isTradingDay) {
                  if (isTradingDay) {
                    console.log("in 3");
                    method(printday, day, file, trade, function () {
                      console.log(" done building daily trade positions");
                    });
                  } else {
                    d = new Date(day);
                    d.setDate(d.getDate() - 1);
                    day = d.toJSON().slice(0, 10);
                    Builder.GetCalendar(day, function (isTradingDay) {
                      if (isTradingDay) {
                        console.log("in 4");
                        method(printday, day, file, trade, function () {
                          console.log(" done building daily trade positions");
                        });
                      } else {
                        d = new Date(day);
                        d.setDate(d.getDate() - 1);
                        day = d.toJSON().slice(0, 10);
                        Builder.GetCalendar(day, function (isTradingDay) {
                          if (isTradingDay) {
                            console.log("in 5");
                            method(printday, day, file, trade, function () {
                              console.log(" done building daily trade positions");
                            });
                          } else {
                            d = new Date(day);
                            d.setDate(d.getDate() - 1);
                            day = d.toJSON().slice(0, 10);
                            Builder.GetCalendar(day, function (isTradingDay) {
                              if (isTradingDay) {
                                console.log("in 6");
                                method(printday, day, file, trade, function () {
                                  console.log(" done building daily trade positions");
                                });
                              } else {
                                console.log("in 7 ***********************");

                              }
                            });

                          }
                        });

                      }
                    });
                  }
                });
              }
            });
          }
        });

      } else {
        console.log("not trading today: " + day);
      }
    });
  } catch {
    console.log("runsector no data");
  }
}
exports.lookback = lookback;
