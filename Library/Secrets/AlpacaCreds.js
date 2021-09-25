const Alpaca = require('@alpacahq/alpaca-trade-api')

module.exports = {
      	getCreds: function (){
      		return new Alpaca({
                     keyId: 'PKNTYOVQBM9Y1IVA9FM1',
                    secretKey:'yqyUr31ziXFep3n4HrMUaPUqfh8xFKOkhuh4YZwN',
                    paper: true,
                    usePolygon: false
                  });
        },
        KEYID: function (){
      		return  'PKNTYOVQBM9Y1IVA9FM1';
        },
        SECRETKEY: function (){
      		return  'yqyUr31ziXFep3n4HrMUaPUqfh8xFKOkhuh4YZwN';
      	}
       };



