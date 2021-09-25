/////////////////////////////////////////////////// DEPENDENCIES //////////////////////////////////////////////////////////////
"use strict";
const Builder = require("../Library/Builder");

function lookbacker(day, callback) {
  try {
    Builder.GetCalendar(day, function (isTradingDay) {
      if (isTradingDay) {
        console.log("tradingDay: " + day);
        var d = new Date(day);
        d.setDate(d.getDate() - 1);
        day = d.toJSON().slice(0, 10);
        Builder.GetCalendar(day, function (isTradingDay) {
          if (isTradingDay) {
            console.log("in 1");
            callback(day)

          } else {
            d = new Date(day);
            d.setDate(d.getDate() - 1);
            day = d.toJSON().slice(0, 10);
            Builder.GetCalendar(day, function (isTradingDay) {
              if (isTradingDay) {
                console.log("in 2");
                callback(day)
              } else {
                d = new Date(day);
                d.setDate(d.getDate() - 1);
                day = d.toJSON().slice(0, 10);
                Builder.GetCalendar(day, function (isTradingDay) {
                  if (isTradingDay) {
                    console.log("in 3");
                    callback(day)
                  } else {
                    d = new Date(day);
                    d.setDate(d.getDate() - 1);
                    day = d.toJSON().slice(0, 10);
                    Builder.GetCalendar(day, function (isTradingDay) {
                      if (isTradingDay) {
                        console.log("in 4");
                        callback(day)
                      } else {
                        d = new Date(day);
                        d.setDate(d.getDate() - 1);
                        day = d.toJSON().slice(0, 10);
                        Builder.GetCalendar(day, function (isTradingDay) {
                          if (isTradingDay) {
                            console.log("in 5");
                            callback(day)
                          } else {
                            d = new Date(day);
                            d.setDate(d.getDate() - 1);
                            day = d.toJSON().slice(0, 10);
                            Builder.GetCalendar(day, function (isTradingDay) {
                              if (isTradingDay) {
                                console.log("in 6");
                                callback(day)
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
exports.lookbacker = lookbacker;
