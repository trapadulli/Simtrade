from ib_insync import *

ib = IB()
ib.connect('127.0.0.1', 7496, clientId=1)

contract = Stock('AAPL','SMART','USD')
m_data = ib.reqMktData(contract)
while m_data.last != m_data.last: ib.sleep(0.01) #Wait until data is in. 
ib.cancelMktData(contract)

print (m_data.last)

# # contract = Forex('EURUSD')
# # bars = ib.reqHistoricalData(contract, endDateTime='', durationStr='30 D',
# #         barSizeSetting='1 hour', whatToShow='MIDPOINT', useRTH=True)

# # # convert to pandas dataframe:
# # df = util.df(bars)
# # print(df[['date', 'open', 'high', 'low', 'close']])

# from ib_insync import *
# # util.startLoop()  # uncomment this line when in a notebook

# ib = IB()
# ib.connect('127.0.0.1', 7496, clientId=1)

# # contract = Stock('AMD','SMART','USD')
# # bars = ib.reqHistoricalData(
# #     contract, endDateTime='', durationStr='30 D',
# #     barSizeSetting='1 hour', whatToShow='MIDPOINT', useRTH=True)

# # # convert to pandas dataframe:
# # df = util.df(bars)
# # print(bars)
# contract = Stock('TSLA', 'SMART', 'USD')
# ib.reqHeadTimeStamp(contract, whatToShow='TRADES', useRTH=False)
# positions = ib.positions()
# # m_data = ib.reqMktData(contract)
# # while m_data.last != m_data.last: ib.sleep(0.01) #Wait until data is in. 
# # ib.cancelMktData(contract)

# #print (m_data.last)
# contract = Stock('AMD', 'SMART', 'USD')
# contract1 = ib.qualifyContracts(contract)
# a = ib.reqMktData(*contract1)
# while a.last != a.last: 
#    ib.sleep(0.01)
# ib.cancelMktData(*contract1)
# print(a.last)
# # bars = ib.reqHistoricalData(
# #         contract,
# #         endDateTime='',
# #         durationStr='60 D',
# #         barSizeSetting='1 hour',
# #         whatToShow='TRADES',
# #         useRTH=True,
# #         formatDate=1)

# #df = util.df(bars)

# #print(df.head())
# #print(positions)

# import numpy as np
# def get_sd(t, d, x='SMART', y='USD'):
#     '''Gets a 30-day standard devaition of a ticker
#     Args:
#        t = ticker (text)
#        d = days to expiry (int)
#        x = exchange (text <SMART>)
#        y = currency (text <USD>)
#     Output:
#        daily_sd  = daily standard deviation as a numeric'''
    
#     dte = str(d)+' D'
#     stock = Stock(t, x, y)

#     bars = ib.reqHistoricalData(contract=stock, endDateTime='', durationStr=dte, 
#                                     barSizeSetting='1 DAY', whatToShow='Trades', 
#                                     useRTH=False)

#     daily_sd = np.std([b.close for b in bars], ddof=1)    

#     return daily_sd 

# get_sd('aapl', 45, 'SMART', 'USD')