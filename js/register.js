$(function () {
    $(".mui-button-row button").on("tap", function () {
        var check = true;
        mui(".mui-input-row input").each(function () {
            //若当前input为空，则alert提醒 
            if (!this.value || this.value.trim() == "") {
                var label = this.previousElementSibling;
                mui.alert(label.innerText + "不允许为空");
                check = false;
                return false;
            }
        }); //校验通过，继续执行业务逻辑 
        if (check) {
            var info = {};
            info.name = $(".name").val();
            if($(".password").val()==$(".repassword").val()){
                info.password = $(".password").val();
            }else{
                mui.alert("两次密码不一致！");
                return false;
            }
            if ((/^1[34578]\d{9}$/.test($(".tel").val()))){
                info.tel = $(".tel").val();
            }else{
                mui.alert("手机号码格式不正确！");
                return false;
            }
            if ((/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test($(".email").val()))){
                info.email = $(".email").val();
            }else{
                mui.alert("邮箱格式不正确！");
                return false;
            }
            // console.log(info);
            localStorage.setItem("info",JSON.stringify(info));
        }
    })
})