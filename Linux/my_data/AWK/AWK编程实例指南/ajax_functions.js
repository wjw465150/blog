//��������
function create_obj(){
    var http_request = false;

    //��ʼ��ʼ��XMLHttpRequest����
    if(window.XMLHttpRequest) { //Mozilla �����
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {//����MiME���
            http_request.overrideMimeType("text/xml");
        }
    }
    else if (window.ActiveXObject) { // IE�����
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) { // �쳣����������ʵ��ʧ��
        return false;
    }

    return http_request;
}
function send_request(http_request,url,postStr) {
    // ȷ����������ķ�ʽ��URL�Լ��Ƿ�ͬ��ִ���¶δ���
    http_request.open("POST", url, true);
    http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
    http_request.send(postStr);
}
