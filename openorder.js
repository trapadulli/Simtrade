var _ = require('lodash');
var chalk = require('chalk');

var ib = new (require('ib'))({
   clientId: 3,
   host: '127.0.0.1',
   port: 7496
}).on('error', function (err) {
  console.error(chalk.red(err.message));
}).on('result', function (event, args) {
  if (!_.includes(['nextValidId', 'openOrder', 'openOrderEnd', 'orderStatus'], event)) {
    console.log('%s %s', chalk.yellow(event + ':'), JSON.stringify(args));
  }
}).on('nextValidId', function (orderId) {
  console.log(
    '%s %s%d',
    chalk.cyan('[nextValidId]'),
    chalk.bold('orderId='), orderId
  );
}).on('openOrder', function (orderId, contract, order, orderState) {
  console.log(
    '%s %s%d %s%s %s%s %s%s',
    chalk.cyan('[openOrder]'),
    chalk.bold('orderId='), orderId,
    chalk.bold('contract='), JSON.stringify(contract),
    chalk.bold('order='), JSON.stringify(order),
    chalk.bold('orderState='), JSON.stringify(orderState)
  );
}).on('openOrderEnd', function () {
  console.log(chalk.cyan('[openOrderEnd]'));
}).on('orderStatus', function (id, status, filled, remaining, avgFillPrice, permId,
                               parentId, lastFillPrice, clientId, whyHeld) {
  console.log(
    '%s %s%d %s%s %s%d %s%d %s%d %s%d %s%d %s%d %s%d %s%s',
    chalk.cyan('[orderStatus]'),
    chalk.bold('id='), id,
    chalk.bold('status='), status,
    chalk.bold('filled='), filled,
    chalk.bold('remaining='), remaining,
    chalk.bold('avgFillPrice='), avgFillPrice,
    chalk.bold('permId='), permId,
    chalk.bold('parentId='), parentId,
    chalk.bold('lastFillPrice='), lastFillPrice,
    chalk.bold('clientId='), clientId,
    chalk.bold('whyHeld='), whyHeld
  );
});

ib.once('nextValidId', function (orderId) {
  console.log(chalk.yellow('Placing orders...'));

  // Place orders
  ib.placeOrder(orderId, ib.contract.stock('AAPL'), ib.order.limit('BUY', 1, 165.02));
 // ib.placeOrder(orderId + 1, ib.contract.stock('GOOG'), ib.order.limit('SELL', 1, 9999));
  //ib.placeOrder(orderId + 2, ib.contract.stock('FB'), ib.order.limit('BUY', 1, 0.01));

  // Check open orders
  ib.reqOpenOrders();

  // Check next orderId
  ib.reqIds(1);

  // Cancel orders after 5 seconds.
  setTimeout(function () {
    console.log(chalk.yellow('Cancelling orders...'));
    // ib.cancelOrder(orderId);
    // ib.cancelOrder(orderId + 1);
    // ib.cancelOrder(orderId + 2);

    ib.once('openOrderEnd', function () {
      console.log(chalk.yellow('Disconnecting...'));
      ib.disconnect();
    });

    ib.reqAllOpenOrders();
  }, 5000);
});

ib.connect()
  .reqIds(1);