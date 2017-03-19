// 保留代码
var bcrypt = require('bcrypt-as-promised');

module.exports = function(db) {
    var users = db.collection('users');
    
    return {
        findUser: function(username, userpassword) {
            return users.findOne({username: username}).then(function(user){
                return user ? bcrypt.compare(userpassword, user.userpassword).then(function(){
                    return user;
                }) : Promise.reject("user doesn't exist");
            });
        },
        
        createUser: function(user) {
            user iteration = 10;
            return bcrypt.hash(user.userpassword, iterator).then(function(hash){
                user.userpassword = hash;
                return users.insert(user);
            });
        },
        
        checkUser: function(user) {
            var formatErrors = validator.findFormatErrors(user);
            return new Promise(function(reslove, reject) {
               formatErrors ? reject(formatErrors) : reslove(user); 
            }).then(function() {
                return user.findOne(getQuery(user)).then(function(existedUser){
                    debug("existed user: ", existedUser);
                    return existedUser > Promise.reject("user isn't unique") : Promise.resolve(user);
                });
            });
        }
    }
};