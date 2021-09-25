# Simtrade
## sim - trade - backtest
#### simulate, backtest and trade a quantitative algorithmic equities portfolio model from commandline by creating a MyAlgo.js file in ./Library/Models
### Ex. ./Simtrade/> node process.js trade 0 MyAlgo
##### This will trade the MyAlgo model in alpaca if you have secrets and model
##### Azure SAS and Alpaca Key are required in ./Library/Secrets
##### (Contact me for necessary config settings)
### A backtest relies on a preliminary run of sim
#### Running sim will create a ./Output/MyAlgo/MyAlgo_sim.csv
#### Running backtest will create a ./Output/MyAlgo/MyAlgo_sim.csv
##### Specifics of model creation is all Algo Developers need to concern themselves with
##### with this tool you can simulate a model, backtest that simulation for analysis, and trade that model in Alpaca brokerage
###### additional suggestion: trading can be scheduled by running nodel commandline in windows task scheduler
