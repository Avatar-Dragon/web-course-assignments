var express = require('express');
var router = express.Router();
var validator = require('../public/javascripts/validator');
var debug = require('debug')('signin:index');
var path = require("path");

var users = {};
var flat = false;

// 保留代码
//router.all("*", function (req, res, next) {
//    req.session.user ? next() : res.redirect('/signin'); 
//});

module.exports = function(db) {
// 保留代码
//    var users = db.collection('users');
//    debug("users collection setup as: ", users);
    //var userManager = require('../models/user')(db);
    
    /* GET detail page. */
    router.get('/regist', function(req, res, next) {
        //console.log("regist");
        res.render('regist', { title: '注册', css: 'regist.css', user: {} });
    });
    
    router.get('/toregist', function(req, res, next) {
        //console.log("regist");
        res.redirect('/regist');
    });

    router.get('/detail', function(req, res, next) {
        //console.log("detail");
        if (req.session.user !== undefined && req.session.user !== {} && flat === true) {
            //console.log(req.session.user);
            //console.log("detail users");
            //console.log(users[req.session.user.username]);
            res.render('detail', { title: '详情', css: 'details.css', user:  users[req.session.user.username]});
        } else {
            res.redirect('/signin');
        }
    });

    router.get('/signin', function(req, res, next) {
        res.render('signin', { title: '登录', css: 'signin.css', user: {} });
    });
    
    router.post('/detail2', function(req, res, next) {
        delete req.session.user;
        flat = false;
        //console.log("signout");
        //console.log(req.session.user);
        res.redirect('/signin');
    });
    
    router.post('/detail', function(req, res, next) {
        //console.log("detail");
        res.render('detail', { title: '详情', css: 'details.css', user:  users[req.session.user.username]});
    });
  
    router.get('/togame', function(req, res, next) {
        res.render('gameArea', {css: 'index.css'});
    });
  
    router.get('/tocss', function(req, res, next) {
        res.sendFile(path.join(__dirname+'/../public/html/ringButton.html'));
    });
  
    router.get('/tologin', function(req, res, next) {
        res.redirect('/signin');
    });
  
    router.get('/tohtml', function(req, res, next) {
        //console.log('tohtml success');
        res.render('staticHtmls', {css: 'index.css'});
    });
	
	router.get('/index', function(req, res, next) {
        res.render('index', {css: 'index.css'});
    });
    
	
    router.get('/', function(req, res, next) {
        var queryName = req.query.username;
        //console.log(queryName);
        //console.log(req.query);
        if (queryName === undefined) {
            if (req.session.user !== undefined && flat === true) {
                res.redirect('/detail');
            } else {
                res.redirect('/signin');
            }
        } else {
            if (req.session.user !== undefined && flat === true) {
                if (req.session.user.username === queryName) {
                    res.redirect('/detail');
                } else {
                    res.render('detail', { title: '详情', css: 'details.css', user:  req.session.user, error: "只能够访问自己的数据"});
                }
            } else {
                res.redirect('/signin');
            }
        }
    });
	

    router.post('/regist', function(req, res, next) {
        //console.log("post regist");
        var user = req.body;
        try {
            checkUser(user);
            req.session.user = users[user.username] = user;
            flat = true;
            //console.log(req.session.user);
            res.redirect('/detail');
        } catch (error) {
            res.render('regist', { title: '注册', css: 'regist.css', user: user, error: error.message });
        }
        
// 保留代码
//        userManager.checkUser(user)
//            .then(userManager.createUser)
//            .then(function(){
//                req.session.user = user;
//                res.redirect('/detail');
//        })
//        .catch(function(error){
//            res.render('regist', { title: '注册', css: 'regist.css', user: user, error: error.message });
//        })
        
    });

    router.post('/signin', function(req, res, next) {
        //console.log("post signin");
        var user = req.body;
        try {
            verifyUser(user);
            req.session.user = user;
            flat = true;
            //console.log(req.session.user);
            res.redirect('/detail');
        } catch (error) {
            res.render('signin', { title: '登录', css: 'signin.css', user: user, error: error.message });
        }

// 保留代码
//        userManager.findUser(user.username, user.userpassword)
//            .then(function(user){
//                req.session.user = user;
//                res.redirect('/detail');
//        })
//        .catch(function(error){
//            res.render('signin', { title: '登录', css: 'signin.css', user: user, error: error.message });
//        });
        
    });
    
    router.post('/', function(req, res, next) {
        //delete req.session.user;
        var queryName = req.query.username;
        //console.log(queryName);
        //console.log(req.query);
        //res.redirect('/signin');
        if (queryName === undefined) {
            res.redirect('/signin');
        } else {
            res.redirect('/detail');
        }
    });
	
	router.get(/.*\.html$/, function (req, res, next) {
		console.log(req.url);
		res.sendFile(path.join(__dirname+'/../public/html' + req.url));
	});
	
//	router.all("*", function (req, res, next) {
//		console.log(req.Url);
//	});
    
    return router;
}
    
    //router;

function checkUser(user) {
    var errorMessage = [];
    for (var key in user) {
        if (!validator.isFieldValid(key, user[key])) {
            errorMessage.push(validator.form[key].errorMessage);
        }
        if (!validator.isAttrValueUnique(users, user, key) && key !== 'userpassword' && key !== "repeatpassword") {
            errorMessage.push(key + ": " + user[key] + " 重复了");
        }
    }
    if (errorMessage.length > 0) {
        throw new Error(errorMessage.join('<br />'));
    }
}

function verifyUser(user) {
    var errorMessage = [];
    for (var key in users) {
        if (users.hasOwnProperty(key) && users[key]["username"] === user["username"]) {
            if (users[key]["userpassword"] !== user["userpassword"]) {
                errorMessage.push("密码错误");
                throw new Error(errorMessage.join('<br />'));
            }
            return;
        }
    }
    errorMessage.push("用户名不存在");
    throw new Error(errorMessage.join('<br />'));
}