/////////////////////////////////////////////////// DEPENDENCIES //////////////////////////////////////////////////////////////
"use strict";
const Order = require("../Library/Order");
const colors = require("colors/safe");

function lookbacker(day, callback) {
  var date = day
  try {
    Order.GetCalendar(day, function (isTradingDay) {
      if (isTradingDay) {
        
        var d = new Date(day);
        d.setDate(d.getDate() - 1);
        day = d.toJSON().slice(0, 10);
        Order.GetCalendar(day, function (isTradingDay) {
          if (isTradingDay) {
            //console.log(colors.italic("adjusted 1 dayback"));
            callback(day)

          } else {
            d = new Date(day);
            d.setDate(d.getDate() - 1);
            day = d.toJSON().slice(0, 10);
            Order.GetCalendar(day, function (isTradingDay) {
              if (isTradingDay) {
                //console.log(colors.italic("adjusted 2 daysback"));
                callback(day)
              } else {
                d = new Date(day);
                d.setDate(d.getDate() - 1);
                day = d.toJSON().slice(0, 10);
                Order.GetCalendar(day, function (isTradingDay) {
                  if (isTradingDay) {
                   // console.log(colors.italic("adjusted 3 daysback"));
                    callback(day)
                  } else {
                    d = new Date(day);
                    d.setDate(d.getDate() - 1);
                    day = d.toJSON().slice(0, 10);
                    Order.GetCalendar(day, function (isTradingDay) {
                      if (isTradingDay) {
                        //console.log(colors.italic("adjusted 4 daysback"));
                        callback(day)
                      } else {
                        d = new Date(day);
                        d.setDate(d.getDate() - 1);
                        day = d.toJSON().slice(0, 10);
                        Order.GetCalendar(day, function (isTradingDay) {
                          if (isTradingDay) {
                           // console.log(colors.italic("adjusted 5 daysback"));
                            callback(day)
                          } else {
                            d = new Date(day);
                            d.setDate(d.getDate() - 1);
                            day = d.toJSON().slice(0, 10);
                            Order.GetCalendar(day, function (isTradingDay) {
                              if (isTradingDay) {
                               // console.log(colors.italic("adjusted 6 daysback"));
                                callback(day)
                              } else {
                                console.log(colors.italic("adjusted 7 daysback **************"))

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
        console.log("")
        console.log("")
        console.log("")
      } else {
        console.log("not trading today: " + day);
      }
    });
  } catch {
    console.log("runsector no data");
  }
}
exports.lookbacker = lookbacker;
