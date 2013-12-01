exports.genJSON = function (data) {
    var result = {code: 0, data: data};
    result.code = 0;
    result.data = data;
    return result;
}

var errorForCode = require('./error').errorForCode;

exports.genErrorJSON = function (errorCode) {
    var message = errorForCode(errorCode);
    var result = {};
    result.code = errorCode;
    result.msg = message;
    console.info('genErrorJSON: ' + 'code = ' + errorCode + ', msg =' + message);
    return result;
}

exports.genSuccessJSON = function () {
    var result = {code: 0};
    return result;
}

