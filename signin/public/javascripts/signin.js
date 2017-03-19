$(function() {   
    $("#submit").click(function() {
        if ($("#username").val() === '') {
            $("#error").text('请输入用户名');
            return false;
        } else if ($("#userpassword").val() === '') {
            $("#error").text('请输入密码');
            return false;
        } else {
            $("#error").text('');
        }
    });
});