var validator = {
    form: {
        username: {
            status: false,
            errorMessage: "用户名6~18位英文字母、数字或下划线，必须以英文字母开头"
        },
        usernumber: {
            status: false,
            errorMessage: "学号8位数字，不能以0开头"
        },
        userphone: {
            status: false,
            errorMessage: "电话11位数字，不能以0开头"
        },
        useremail: {
            status: false,
            errorMessage: "邮箱格式:***@***.com，*只能是英文字母或者_\-"
        },
        userpassword: {
            status: false,
            errorMessage: "密码为6~12位数字、大小写字母、中划线、下划线"
        },
        repeatpassword: {
            status: false,
            errorMessage: "重复输入的密码应与前面的密码一致"
        }
    },
    
    // 保留代码
    findFormatErrors: function(user) {
        var errorMessages = [];
        for (var key in user) {
            if (user.hasOwnProperty(key)) {
                if (!validator.isFieldVaild(key, user[key])) errorMessage.push(validator.form[key].errorMessage);
            }
        }
        errorMessages.length > 0 ? new Error(errorMessages.join('<br />')) : null;
    },
    
    isUsernameValid: function (username) {
        return this.form.username.status = /^[a-zA-Z][a-zA-Z_0-9]{5,18}$/.test(username);
    },
    
    isUsernumberValid: function (usernumber) {
        return this.form.usernumber.status = /^[1-9]\d{7}$/.test(usernumber);
    },
    
    isUserphoneValid: function (userphone) {
        return this.form.userphone.status = /^[1-9]\d{10}$/.test(userphone);
    },
    
    isUseremailValid: function (useremail) {
        return this.form.useremail.status = /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/.test(useremail);
    },
    
    isUserpasswordValid: function (userpassword) {
        this.password = userpassword;
        return this.form.userpassword.status = /^[a-zA-Z_0-9_\-_\_]{6,12}$/.test(userpassword);
    },
    
    isRepeatpasswordValid: function (repeatpassword) {
        return this.form.repeatpassword.status = (repeatpassword === this.password);
    },
    
    isFieldValid: function (fieldname, value) {
        var CapFieldname = fieldname[0].toUpperCase() + fieldname.slice(1, fieldname.length);
        return this["is" + CapFieldname + "Valid"](value);
    },
    
    isFormValid: function () {
        return this.form.username.status && this.form.usernumber.status && this.form.userphone.status && this.form.useremail.status && this.form.userpassword.status && this.form.repeatpassword.status;
    },
    
    getErrorMessage: function(fieldName) {
        return this.form[fieldName].errorMessage;
    },
    
    isAttrValueUnique: function(registry, user, attr) {
        for (var key in registry) {
            if (registry.hasOwnProperty(key) && registry[key][attr] === user[attr]) return false;
        }
        return true;
    }
}

if (typeof module === 'object') {
    module.exports = validator
}