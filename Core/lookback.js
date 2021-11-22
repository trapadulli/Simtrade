/////////////////////////////////////////////////// DEPENDENCIES //////////////////////////////////////////////////////////////
"use strict";
const Order = require("../Library/Order");

function lookback(day, file, method, trade, back) {
  var printday = day;
  try {
    Order.GetCalendar(day, function (isTradingDay) {
      var back = 1;
      if (isTradingDay) {
        console.log("tradingDay: " + day);
        var d = new Date(day);
        d.setDate(d.getDate() - 1);
        day = d.toJSON().slice(0, 10);
        Order.GetCalendar(day, function (isTradingDay) {
          if (isTradingDay) {
            console.log("analysis 1 dayback");
            method(printday, day, file, trade, function () {
              console.log(" done building daily trade positions");
            });

          } else {
            d = new Date(day);
            d.setDate(d.getDate() - 1);
            day = d.toJSON().slice(0, 10);
            Order.GetCalendar(day, function (isTradingDay) {
              if (isTradingDay) {
                console.log("analysis 2 daysback");
                method(printday, day, file, trade, function () {
                  console.log(" done building daily trade positions");
                });
              } else {
                d = new Date(day);
                d.setDate(d.getDate() - 1);
                day = d.toJSON().slice(0, 10);
                Order.GetCalendar(day, function (isTradingDay) {
                  if (isTradingDay) {
                    console.log("analysis 3 daysback");
                    method(printday, day, file, trade, function () {
                      console.log(" done building daily trade positions");
                    });
                  } else {
                    d = new Date(day);
                    d.setDate(d.getDate() - 1);
                    day = d.toJSON().slice(0, 10);
                    Order.GetCalendar(day, function (isTradingDay) {
                      if (isTradingDay) {
                        console.log("analysis 4 daysback");
                        method(printday, day, file, trade, function () {
                          console.log(" done building daily trade positions");
                        });
                      } else {
                        d = new Date(day);
                        d.setDate(d.getDate() - 1);
                        day = d.toJSON().slice(0, 10);
                        Order.GetCalendar(day, function (isTradingDay) {
                          if (isTradingDay) {
                            console.log("analysis 5 daysback");
                            method(printday, day, file, trade, function () {
                              console.log(" done building daily trade positions");
                            });
                          } else {
                            d = new Date(day);
                            d.setDate(d.getDate() - 1);
                            day = d.toJSON().slice(0, 10);
                            Order.GetCalendar(day, function (isTradingDay) {
                              if (isTradingDay) {
                                console.log("analysis 6 daysback");
                                method(printday, day, file, trade, function () {
                                  console.log(" done building daily trade positions");
                                });
                              } else {
                                console.log("analysis 7 daysback ***********************");

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
