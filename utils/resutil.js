var errorForCode = require('./error').errorForCode;

var genErrorJSON = function (errorCode) {
    var message = errorForCode(errorCode);
    var result = {message:message, code: errorCode};
    return result;
//    return JSON.stringify(result);
}

exports.genErrorJSON = genErrorJSON;

exports.genJSON = function (data, code) {
    if (code) {
        return genErrorJSON(code);
    } else {
        var result = {code: 0};
        if (data) {
            result.data = data;
        }
        return result;
//        return JSON.stringify(result);
    }
}


exports.genSuccessJSON = function () {
    return {code: 0};
}

