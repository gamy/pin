//read and write session


var helper = require('./helper');

var userCollection = helper.collections.userCollection;


var createBasicUserInfo = function (name, password) {
    var _id = new helper.ObjectID();
    console.info("new a oid = " + _id);
    var info = {
        _id: _id,
        name: name,
        password: password,
        signup_date: new Date(),
        signin_date: new Date()
    }
    return info;
}


var updateSigninDate = function (uid) {
//    console.log('<updateSigninDate> uid = ' + uid);
    userCollection.updateById(uid, {'$set': { signin_date: new Date()}});
}

var updateLogoutDate = function (uid) {
//    console.log('<updateLogoutDate> uid = ' + uid);
    userCollection.updateById(uid, {'$set': { logout_date: new Date()}});
}


exports.signup = function (req, res) {
    var name = req.body.name;
    var password = req.body.password;
    console.info("<signup>name = " + name + ", pw = " + password);
    userCollection.findOne({name: name}, function (error, cursor) {
        if (error) {
            var result = helper.genErrorJSON(helper.ErrorCode.SystemError);
        } else {
            if (cursor) {
                var result = helper.genErrorJSON(helper.ErrorCode.NameExits);
                res.send(result);
            } else {
                var info = createBasicUserInfo(name, password);
                userCollection.insert(info, function (err) {
                    req.session.name = name;
                    req.session.uid = info._id;

                    info.password = undefined;
                    res.send(helper.genJSON(info));
                });
            }
        }
    });

}

exports.signin = function (req, res) {
    var name = req.body.name;
    var password = req.body.password;

    if (!req.session.name) {
        userCollection.findOne({name: name, password: password}, function (error, cursor) {
            if (error) {
                var result = helper.genErrorJSON(helper.ErrorCode.SystemError);
                req.session.destroy();
            } else {
                if (!cursor) {
                    var result = helper.genErrorJSON(helper.ErrorCode.PasswordWrong);
                    req.session.destroy();
                    res.send(result);
                } else {
                    req.session.name = name;
                    req.session.uid = cursor._id;
                    cursor.password = undefined;
                    res.send(helper.genJSON(cursor));

                    console.info("<signin>name = " + name + ', sid = ' + req.sessionID + ', uid = ' + req.session.uid);
                    updateSigninDate(cursor._id);
                }
            }
        });
    } else {
        console.info('<signup>' + name + ' already signup!!');
        res.send(helper.successJSON);
    }
}

exports.logout = function (req, res) {
    var uid = req.session.uid;
    console.info('<logout> name = ' + req.session.name + ', uid =' + req.session.uid);
    updateLogoutDate(uid);
    req.session.destroy();
    res.send(helper.successJSON);

}


exports.requireAuthentication = function (req, res, next) {
    if(req.session.uid){
        console.info('<requireAuthentication> pass! name = ' + req.session.name);
        next();
    }else{
        res.send(helper.genErrorJSON(helper.ErrorCode.NotSignUp));
        console.info('<requireAuthentication> fail!');
    }
}