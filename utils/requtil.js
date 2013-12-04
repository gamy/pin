
var datautil = require('./datautil');

exports.parseBody = function(body, filterAttributes){
    var result = {};
    datautil.enumKV(body, function(key, value){
       if(datautil.hasElement(filterAttributes, key)){
           result[key] = value;
       }
    });
    return result;
}