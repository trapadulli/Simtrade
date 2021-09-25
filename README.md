# Simtrade
## sim - trade - backtest
### Ex. Run a function from commandline by having a MyAlgo.js file in the ./Library/Models to run commandline...
#### Simtrade/> node process.js trade 0 MyAlgo
#### this will trade the MyAlgo model in alpaca if your alpaca secrets are in the ./Library/Secrets folder
#### and you have an Azure SAS secrets in ./Library/Secrets 
#####(contact me for necessary file config and token for Azure Tablestorage data connection)
#### <backtest> relies on a preliminary run of <sim>
#### running <sim> will create a ./Output/MyAlgo/MyAlgo_sim.csv
#### running <backtest> will create a ./Output/MyAlgo/MyAlgo_sim.csv
##### specifics of model.js creation is all Algo Developers need to consern themselve with
##### with this tool you can simulate a model, backtest that simulation for analysis, and trade
###### trading can be scheduled by running nodel commandline in windows task scheduler
