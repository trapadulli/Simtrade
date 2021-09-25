# Simtrade
## sim - trade - backtest
##### Specifics of model creation is all Algo Developers need to concern themselves with
##### With this tool you can simulate a model, backtest that simulation for analysis (generating .csv's), and trade that model in you Alpaca brokerage account
##### Trading can be scheduled by running you models commandline with Windows Task Scheduler
#
#### This tool can simulate, backtest and trade a quantitative algorithmic equities portfolio model
#### from commandline by creating a MyAlgo.js file in ./Library/Models
### Example: your_directory/Simtrade/> node process.js trade 0 MyAlgo
##### This will trade the MyAlgo model in alpaca if you have secrets and model
##### Azure SAS and Alpaca Key are required in ./Library/Secrets
##### (Contact me for necessary config settings)
### A backtest relies on a preliminary run of sim
### Running sim will create a ./Output/MyAlgo/MyAlgo_sim.csv
### Running backtest will create a ./Output/MyAlgo/MyAlgo_sim.csv

