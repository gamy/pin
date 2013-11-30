
exports.genJSON = function(error, data){
    var result = {};
    if(error){
        result.code = error.code;
        result.msg = error.message;
    }else{
        result.code = 0;
        result.data = data;
    }
    return result;
}

var errorForCode = require('./error').errorForCode;

exports.genErrorJSON = function(errorCode){
	var error = errorForCode(errorCode);
    var result = {};
    result.code = error.code;
    result.msg = error.message;
    return result;
}


