# Simtrade
## sim - trade - backtest
##### Create Equity Market Trading Portfolio Models
##### Quantitative algorithmic equity portfolio modeling r&d, management and deployment, using node.js
##### Develop your model, then simulate a trade history and backtest that simulation for performance analysis
##### Deploy your model to trade in your Alpaca brokerage account
##### Automated trading schedules can then be managed through Windows Task Scheduler
#
## EXAMPLES
### Create
##### ./Library/Models/MyAlgo.js
### Run
##### your_directory/Simtrade/> node process.js backtest 2500 MyAlgo
##### your_directory/Simtrade/> node process.js trade 0 MyAlgo
###### (Azure SAS and Alpaca Key are required in ./Library/Secrets
###### Contact me for necessary config settings and 'how-to conform to Simtrade' necessary coding standard)
#
### For Research and Development
##### Running a backtest first time will copy version of ./Library/Models/MyAlgo.js
##### and create ./Output/MyAlgo/MyAlgo_1.js and ./Output/MyAlgo/MyAlgo_1_sim.csv
##### and ./Output/MyAlgo/MyAlgo_1_backtest.csv
##### iterating the number on each run
