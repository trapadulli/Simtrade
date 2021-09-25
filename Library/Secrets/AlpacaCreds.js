const Alpaca = require('@alpacahq/alpaca-trade-api')

module.exports = {
      	getCreds: function (){
      		return new Alpaca({
                     keyId: '',
                    secretKey:'',
                    paper: true,
                    usePolygon: false
                  });
        },
        KEYID: function (){
      		return  '';
        },
        SECRETKEY: function (){
      		return  '';
      	}
       };



