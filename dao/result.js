var jsonutil = require('../utils/response_util');
var errorForCode = require('../utils/error').errorForCode;

function Result (errorCode, res){
	this.errorCode = errorCode;
	this.res = res;
}


Result.prototype.handleMongoResult = function(err, items){

	if(err){
		console.error('<handleMongoResult> error = ' + err);
		response = genErrorJSON(errorForCode(this.errorCode));
	}else{
		response = jsonutil.genJSON(null, items);		
	}
	this.res.send(response);
};

module.exports = Result;