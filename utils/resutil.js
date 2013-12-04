


var errorForCode = require('./error').errorForCode;

var genErrorJSON = function (errorCode) {
    var message = errorForCode(errorCode);
    var result = {};
    result.code = errorCode;
    result.msg = message;
    console.info('genErrorJSON: ' + 'code = ' + errorCode + ', msg =' + message);
    return result;
}

exports.genErrorJSON = genErrorJSON;

exports.genJSON = function (data, code) {
    if(code){
        return genErrorJSON(code);
    }else{
        var result = {code: 0, data: data};
        result.code = 0;
        result.data = data;
        return result;
    }
}


exports.genSuccessJSON = function () {
    var result = {code: 0};
    return result;
}

