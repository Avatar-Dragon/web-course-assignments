$(function() {
    remind();
});

function remind() {
    $("#form div input:not(#reset, #submit)").blur(function() {
        if (validator.isFieldValid(this.id, $(this).val())) {
            $("#error").text("");
        } else {
            $("#error").text(validator.form[this.id].errorMessage).show();
            $(".error").text("");
        }
    });
    
    $("#submit").click(function() {
        $("#form div input:not(#reset, #submit)").blur();
        if (!validator.isFormValid()) return false;
    });
}