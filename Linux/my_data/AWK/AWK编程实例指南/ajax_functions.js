//创建对象
function create_obj(){
    var http_request = false;

    //开始初始化XMLHttpRequest对象
    if(window.XMLHttpRequest) { //Mozilla 浏览器
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {//设置MiME类别
            http_request.overrideMimeType("text/xml");
        }
    }
    else if (window.ActiveXObject) { // IE浏览器
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) { // 异常，创建对象实例失败
        return false;
    }

    return http_request;
}
function send_request(http_request,url,postStr) {
    // 确定发送请求的方式和URL以及是否同步执行下段代码
    http_request.open("POST", url, true);
    http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
    http_request.send(postStr);
}
