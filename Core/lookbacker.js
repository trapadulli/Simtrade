/////////////////////////////////////////////////// DEPENDENCIES //////////////////////////////////////////////////////////////
"use strict";
const Order = require("../Library/Order");

function lookbacker(day, callback) {
  try {
    Order.GetCalendar(day, function (isTradingDay) {
      if (isTradingDay) {
        
        var d = new Date(day);
        d.setDate(d.getDate() - 1);
        day = d.toJSON().slice(0, 10);
        Order.GetCalendar(day, function (isTradingDay) {
          if (isTradingDay) {
            console.log("adjusted 1 dayback");
            callback(day)

          } else {
            d = new Date(day);
            d.setDate(d.getDate() - 1);
            day = d.toJSON().slice(0, 10);
            Order.GetCalendar(day, function (isTradingDay) {
              if (isTradingDay) {
                console.log("adjusted 2 daysback");
                callback(day)
              } else {
                d = new Date(day);
                d.setDate(d.getDate() - 1);
                day = d.toJSON().slice(0, 10);
                Order.GetCalendar(day, function (isTradingDay) {
                  if (isTradingDay) {
                    console.log("adjusted 3 daysback");
                    callback(day)
                  } else {
                    d = new Date(day);
                    d.setDate(d.getDate() - 1);
                    day = d.toJSON().slice(0, 10);
                    Order.GetCalendar(day, function (isTradingDay) {
                      if (isTradingDay) {
                        console.log("adjusted 4 daysback");
                        callback(day)
                      } else {
                        d = new Date(day);
                        d.setDate(d.getDate() - 1);
                        day = d.toJSON().slice(0, 10);
                        Order.GetCalendar(day, function (isTradingDay) {
                          if (isTradingDay) {
                            console.log("adjusted 5 daysback");
                            callback(day)
                          } else {
                            d = new Date(day);
                            d.setDate(d.getDate() - 1);
                            day = d.toJSON().slice(0, 10);
                            Order.GetCalendar(day, function (isTradingDay) {
                              if (isTradingDay) {
                                console.log("adjusted 6 daysback");
                                callback(day)
                              } else {
                                console.log("adjusted 7 daysback ***********************");

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
