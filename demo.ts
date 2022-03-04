/* Example: Print all portfolio positions to console. */

import { IBApi, EventName, ErrorCode, Contract, Order, OrderAction, OrderType, SecType } from "@stoqey/ib";

// create IBApi object

const ib = new IBApi({
   clientId: 2,
   host: '127.0.0.1',
  port: 7496,
});

// register event handler

let positionsCount = 0;

ib.on(EventName.error, (err: Error, code: ErrorCode, reqId: number) => {
  console.error(`${err.message} - code: ${code} - reqId: ${reqId}`);
})
  .on(
    EventName.position,
    (account: string, contract: Contract, pos: number, avgCost?: number) => {
      console.log(`${account}: ${pos} x ${contract.symbol} @ ${avgCost}`);
      positionsCount++;
    }
  )
  .once(EventName.positionEnd, () => {
    console.log(`Total: ${positionsCount} positions.`);
    ib.disconnect();
  });

// call API functions
ib.once(EventName.nextValidId, (orderId: number) => {
  const contract: Contract = {
    symbol: "AMD",
    exchange: "SMART",
    currency: "USD",
    secType: SecType.STK,
  };

  const order: Order = {
    orderType: OrderType.LMT,
    action: OrderAction.BUY,
    lmtPrice: 120.22,
    orderId,
    totalQuantity: 1,
    account: "DU4255013",
  };

  ib.placeOrder(orderId, contract, order);
});

ib.connect();
ib.reqIds();