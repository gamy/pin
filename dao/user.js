var userCollection = require('../settings/mongo_config').userCollection;



//获取用户详细信息                                                                                                
exports.detail = function(req, res){
	res.send('user detail');

}

//更新用户 信息在body中
exports.update = function(req, res){

}