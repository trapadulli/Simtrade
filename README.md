# Simtrade
## sim - trade - backtest
##### Create Equity Market Trading Portfolio Models
##### Quantitative algorithmic equities portfolio modeling r&d, management and deployment, using node.js
##### With this tool you can simulate a model, backtest that simulation for analysis (generating .csv's), and trade that model in your Alpaca brokerage account
##### Automated trading can be scheduled by running node commandline in Windows Task Scheduler
# 
## EXAMPLES
### Create
##### MyAlgo.js file in ./Library/Models
### Run
##### your_directory/Simtrade/> node process.js trade 0 MyAlgo
###### (This will trade the MyAlgo model in alpaca if you have secrets and model
###### Azure SAS and Alpaca Key are required in ./Library/Secrets
###### Contact me for necessary config settings)
#
### For Research and Development
###### (A backtest depends on a preliminary run of sim first)
##### Running sim will create a ./Output/MyAlgo/MyAlgo_sim.csv
##### Running backtest will create a ./Output/MyAlgo/MyAlgo_sim.csv

