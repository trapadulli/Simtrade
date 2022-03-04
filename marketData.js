var util = require('util');

var _ = require('lodash');
var chalk = require('chalk');

var ib = new (require('ib'))({
    clientId: 3,
    host: '127.0.0.1',
    port: 7496
}).on('error', function (err) {
  console.error(chalk.red(err.message));
}).on('result', function (event, args) {
  if (!_.includes(['tickEFP', 'tickGeneric', 'tickOptionComputation', 'tickPrice',
        'tickSize', 'tickString'], event)) {
  //  console.log('%s %s', chalk.yellow(event + ':'), JSON.stringify(args));
  }
}).on('tickEFP', function (tickerId, tickType, basisPoints, formattedBasisPoints,
                           impliedFuturesPrice, holdDays, futureExpiry, dividendImpact,
                           dividendsToExpiry) {
//   console.log(
//     '%s %s%d %s%d %s%s %s%d %s%d %s%s %s%d %s%d',
//     chalk.cyan(util.format('[%s]', ib.util.tickTypeToString(tickType))),
//     chalk.bold('tickerId='), tickerId,
//     chalk.bold('basisPoints='), basisPoints,
//     chalk.bold('formattedBasisPoints='), formattedBasisPoints,
//     chalk.bold('impliedFuturesPrice='), impliedFuturesPrice,
//     chalk.bold('holdDays='), holdDays,
//     chalk.bold('futureExpiry='), futureExpiry,
//     chalk.bold('dividendImpact='), dividendImpact,
//     chalk.bold('dividendsToExpiry='), dividendsToExpiry
//   );
}).on('tickGeneric', function (tickerId, tickType, value) {
//   console.log(
//     '%s %s%d %s%d',
//     chalk.cyan(util.format('[%s]', ib.util.tickTypeToString(tickType))),
//     chalk.bold('tickerId='), tickerId,
//     chalk.bold('value='), value
//   );
// }).on('tickOptionComputation', function (tickerId, tickType, impliedVol, delta, optPrice,
//                                          pvDividend, gamma, vega, theta, undPrice) {
//   console.log(
//     '%s %s%d %s%s %s%s %s%s %s%d %s%s %s%s %s%s %s%d',
//     chalk.cyan(util.format('[%s]', ib.util.tickTypeToString(tickType))),
//     chalk.bold('tickerId='), tickerId,
//     chalk.bold('impliedVol='), ib.util.numberToString(impliedVol),
//     chalk.bold('delta='), ib.util.numberToString(delta),
//     chalk.bold('optPrice='), ib.util.numberToString(optPrice),
//     chalk.bold('pvDividend='), pvDividend,
//     chalk.bold('gamma='), ib.util.numberToString(gamma),
//     chalk.bold('vega='), ib.util.numberToString(vega),
//     chalk.bold('theta='), ib.util.numberToString(theta),
//     chalk.bold('undPrice='), undPrice
//   );
}).on('tickPrice', function (tickerId, tickType, price, canAutoExecute) {
//   console.log(
//     '%s %s%d %s%d %s%s',
//     chalk.cyan(util.format('[%s]', ib.util.tickTypeToString(tickType))),
//     chalk.bold('tickerId='), tickerId,
//     chalk.bold('price='), price,
//     chalk.bold('canAutoExecute='), canAutoExecute
//   );
}).on('tickSize', function (tickerId, sizeTickType, size) {
//   console.log(
//     '%s %s%d %s%d',
//     chalk.cyan(util.format('[%s]', ib.util.tickTypeToString(sizeTickType))),
//     chalk.bold('tickerId:'), tickerId,
//     chalk.bold('size:'), size
//   );
}).on('tickString', function (tickerId, tickType, value) {
  console.log(
    '%s %s%d %s%s',
    chalk.cyan(util.format('[%s]', ib.util.tickTypeToString(tickType))),
    chalk.bold('tickerId='), tickerId,
    chalk.bold('value='), value
  );
});

ib.connect();



// Stock
ib.reqMktData(11, ib.contract.stock('AAPL'), '', false, false);
// ib.reqMktData(12, ib.contract.stock('AMZN'), '', false, false);
// ib.reqMktData(13, ib.contract.stock('GOOG'), '', false, false);
// ib.reqMktData(14, ib.contract.stock('FB'), '', false, false);


// Disconnect after 7 seconds.
setTimeout(function () {
  console.log(chalk.yellow('Cancelling market data subscription...'));

  // Forex
  
  //Stock
  ib.cancelMktData(1);
//   ib.cancelMktData(2);
//   ib.cancelMktData(3);
//   ib.cancelMktData(4);

  // Option

  ib.disconnect();
}, 7000);