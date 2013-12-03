function Error(code, message){
	this.code = code;
	this.message = message;
};

// module.exports = Error;


var codeDict = {
	ErrorAPI : 10000,
	NotSignUp : 10001,
	SystemError : 10002,
	PasswordWrong : 10003,
    NameExits: 10004,
    UpdateUserError : 10005
}


exports.ErrorCode = codeDict;

exports.errorForCode = function(code){
	switch(code){
		case codeDict.ErrorAPI:
			return '调用了错误的接口';
		case codeDict.NotSignUp:
			return '未登录';
	    case codeDict.SystemError:
	    	return '系统错误';
	    case codeDict.PasswordWrong:
	    	return '密码错误';
        case codeDict.NameExits:
            return '用户名被注册了';
        case UpdateUserError:
            return '更新用户发生错误';
	    default:
	    	return '未知错误';
	}

}

exports.Error = Error;
