var resUtil = require('../utils/response_util');

exports.collections = require('../settings/mongo_config');

exports.ErrorCode = require('../utils/error').ErrorCode;
exports.genJSON = resUtil.genJSON;
exports.genErrorJSON = resUtil.genErrorJSON;
exports.successJSON = resUtil.genSuccessJSON();
exports.ObjectID = require('mongoskin').ObjectID