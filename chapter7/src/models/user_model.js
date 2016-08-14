var crypto = require('crypto');
var collection = require('./index');
var users = collection.users;

var passwordValid = exports.passwordValid = function(passwordInput,passwordDb) {
    return crypto.createHash('sha256').update(passwordInput).digest('base64') === passwordDb;
}

exports.loginCheck = function(username,password,callback) {
    users.findOne({account:username},function(err,item) {
        if (err) {
            console.error('查询用户时失败',err);
            return callback('查询用户时失败');
        }
        if (!item) {
            return callback('当前用户不存在');
        }
        if (!passwordValid(password,item.passwd)) {
            return callback('用户名或者密码错误');
        }
        item.passwd = undefined;
        callback(false,item);
    });
};