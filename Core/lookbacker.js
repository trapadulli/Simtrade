/////////////////////////////////////////////////// DEPENDENCIES //////////////////////////////////////////////////////////////
"use strict";
const Order = require("../Library/Order");

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
            console.log("adjusted 1 dayback from "+date);
            callback(day)

          } else {
            d = new Date(day);
            d.setDate(d.getDate() - 1);
            day = d.toJSON().slice(0, 10);
            Order.GetCalendar(day, function (isTradingDay) {
              if (isTradingDay) {
                console.log("adjusted 2 daysback from "+date);
                callback(day)
              } else {
                d = new Date(day);
                d.setDate(d.getDate() - 1);
                day = d.toJSON().slice(0, 10);
                Order.GetCalendar(day, function (isTradingDay) {
                  if (isTradingDay) {
                    console.log("adjusted 3 daysback from "+date);
                    callback(day)
                  } else {
                    d = new Date(day);
                    d.setDate(d.getDate() - 1);
                    day = d.toJSON().slice(0, 10);
                    Order.GetCalendar(day, function (isTradingDay) {
                      if (isTradingDay) {
                        console.log("adjusted 4 daysback from "+date);
                        callback(day)
                      } else {
                        d = new Date(day);
                        d.setDate(d.getDate() - 1);
                        day = d.toJSON().slice(0, 10);
                        Order.GetCalendar(day, function (isTradingDay) {
                          if (isTradingDay) {
                            console.log("adjusted 5 daysback from "+date);
                            callback(day)
                          } else {
                            d = new Date(day);
                            d.setDate(d.getDate() - 1);
                            day = d.toJSON().slice(0, 10);
                            Order.GetCalendar(day, function (isTradingDay) {
                              if (isTradingDay) {
                                console.log("adjusted 6 daysback from "+date);
                                callback(day)
                              } else {
                                console.log("adjusted 7 daysback from "+date+"**************")

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
exports.lookbacker = lookbacker;
