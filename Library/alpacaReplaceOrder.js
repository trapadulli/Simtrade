"use strict";
const Order = require("./Order");
const alpaca = require("./Secrets/AlpacaCreds").getCreds();


function alpacaReplaceOrders() {
  var reorders = []
  alpaca.getOrders({
    status: 'open',
  }).then((orders) => {
       orders.forEach(x=>{reorders.push({
        symbol:x.symbol,
        qty:x.qty,
      })
    })
      
      alpaca.cancelAllOrders().then((x) => {
      
        for (var i = 0; i < reorders.length; i++) {
          (function (i) {
            setTimeout(function () {
                Order.SubmitOrder(reorders[i].symbol, 0, -reorders[i].qty, function(){})
            }, 500 * i);
          })(i);
        }
      })
    });
}
exports.alpacaReplaceOrders = alpacaReplaceOrders;
