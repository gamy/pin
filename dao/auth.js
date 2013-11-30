
//read and write session

exports.signup = function(req, res){

} 

exports.signin = function(req, res){

}

exports.logout = function(req, res){

} 


exports.failedAuthentication = function(req, res, next) {

}

exports.checkAuthentication = function(req) {
	return true;
}

exports.requireAuthentication = function(req, res, next) {
	switch(req.method){
		case 'GET':
			console.log('the method is GET, skip to check the auth!'); 
			break;
		default:
			console.log('the method is '+req.method + 'required to check!');			
			if (!checkAuthentication(req)) {
				failedAuthentication(req, res, next);
				return;
			};
			break;
	}
	next();
}

exports.notfound = function(req, res) {
	console.info('page not found, url = ' + req.url);
	res.send(404, 'Sorry, we cannot find that!');
}