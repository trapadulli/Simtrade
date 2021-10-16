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
        type:x.order_type,
        side:x.side,
        time_in_force:x.time_in_force,
        limit_price:x.side=="sell"? Number(x.limit_price)-.01:Number(x.limit_price)+.01
      })
    })
      
      alpaca.cancelAllOrders().then((x) => {
      
        for (var i = 0; i < reorders.length; i++) {
          (function (i) {
            setTimeout(function () {
              console.log(reorders[i])
                Order.ReOrder(
                  reorders[i]
                );
            }, 500 * i);
          })(i);
        }
      })
    });
}
exports.alpacaReplaceOrders = alpacaReplaceOrders;
