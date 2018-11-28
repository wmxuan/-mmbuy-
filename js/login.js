$(function () {
    $(".checkin").on("tap", function () {
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
            var info = JSON.parse(localStorage.getItem("info") || "");
            // mui.alert('验证通过!')
            if(info.name==$(".name").val()&&info.password==$(".password").val()){
            mui.alert('验证通过!',function () { 
                location = "../index.html";
             })
            }else{
            mui.alert("登陆信息错误！");
            }
        }
    })
    $(".register").on("tap", function () {
        location = "../register.html";
     })
})