/*******************************************************

    多数网页都有这个登录头，因此不能将一些初始化工作放在
    window.onload里。js文件是放在body末尾部分的，因此
    将代码裸露在外也不会有问题。

*******************************************************/

//----------- 以下是函数部分 ----------------
function check_userlogin(f){
    //以前曾经允许注册5位的用户名.而现在至少有6位.
    //因此登录和注册时的验证不一样.
    var reg = /^[a-z0-9]+$/i;
    if(!(reg.test(f.username.value))){
        alert('用户名格式错误');
        f.username.focus();
        return false;
    }
    if(!(reg.test(f.userpass.value))){
        alert('密码格式错误');
        f.userpass.focus()
        return false;
    }
    if(!c_validatecode(f.validateCode.value)){
        alert('验证码格式错误');
        f.validateCode.focus();
        return false;
    }
    return true;
}