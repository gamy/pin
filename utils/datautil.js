/**
 *
 * @param obj is an Object
 * @param callback pass (key, value)
 */
var enumKV = function (obj, callback) {
    if (obj) {
        for (var key in obj) {
            var value = obj[key];
            callback(key, value);
        }
    }
}


/**
 *
 * @param list an array
 * @param callback pass (element)
 */
var enumList = function (list, callback) {
    if (list) {
        for (var i = 0; i < list.length; ++i) {
            callback(list[i]);
        }
    }
}


/**
 *
 * @param list
 * @param element
 * @returns {boolean}
 */
var hasElement = function (list, element) {
    if (list) {
        for (var i = 0; i < list.length; ++i) {
            if (element == list[i]) {
                return true;
            }
        }
    }
    return false;
}


var deleteAttibutesInObject = function (obj, attributes) {
    if (obj) {
        for (var i = 0; i < attributes.length; ++i) {
            var attr = attributes[i];
            if (obj[attr]) {
                delete obj[attr];
            }
        }
    }
}

var deleteAttributesForObjectList = function (objList, attributes){
    if(objList){
        for(var i = 0; i < objList.length; ++ i){
            var obj = objList[i];
            deleteAttibutesInObject(obj, attributes);
        }
    }
}

exports.deleteAttibutesInObject = deleteAttibutesInObject;
exports.deleteAttributesForObjectList = deleteAttributesForObjectList;

exports.hasElement = hasElement;
exports.enumList = enumList;
exports.enumKV = enumKV;