/************************************************
    验证各种数据格式
*************************************************/

//为数字添加,
function formatNum(v){
    var reg = /(?=(?!\b)(\d\d\d)+(?!\d))/g;
    return v.replace(reg,',');
}

//验证主机名
function c_host(v){
    if(v=='@'||v=='*'||v=='') return true;
    var reg = /^(?:[0-9a-z]+[-\.])*[a-z0-9_]+$/i;
    return reg.test(v);
}

//长度非0（全空格也视为有效）
function notnull(v){
    return v.length > 0;
}

//验证浮点数(必须是完整浮点数或整数, 如1.0或1, 而不能是.1或1.)
function c_float(v){
    var reg = /^\d+(\.\d+)?$/;
    return reg.test(v);
}

//验证IP(首尾不能为0,各数字不能大于255)
//同样适用于ipv6
function c_ip(v){
    //    var reg = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|[1-9])(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){2}\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|[1-9])$/;
    var reg = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|[1-9])(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){2,4}\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|[0-9])$/;
    if(!reg.test(v)) return false;
    var temp = v.split('.');
    return temp.length!=5;
}

//验证远程IP
function c_remote_ip(v){
    if(v == '127.0.0.1') return false;
    if(!c_ip(v)) return false;
    var arr = v.split('.');
    if(arr[0]==192 && arr[1]==168) return false;
    return true;
}

//验证整数
function c_int(v){
    var reg = /^\d+$/;
    return reg.test(v);
}

//验证长度大于1的中文
function c_chinese(v){
    var reg = /^[\u4E00-\u9FA5]+$/;
    return reg.test(v);
}

//验证邮箱
function c_mail(v){
    var reg = /^\w+((\-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return reg.test(v);
}

//注:因为网站上区号和电话号码是两个区域,因此这个函数只验证电话号码部分
//区号不在此列.因为区号可能小于4位
//验证座机号码，可有多个由数字分隔的－，如028-12345678-123
function c_tel(v){
    var reg = /^\d{7,8}(-\d+)?$/;
    if(!(reg.test(v))) return false;

    var temp = v.split('-');
    if(temp.length>1) v = temp[1];
    reg = /^(\d)\1+$/;
    var reg1 = /^1234(?:5|56|567|5678|56789)?$/;
    return !(reg.test(v)||reg1.test(v));
}

//验证路径(liunx下)
function c_path(v){
    if(v.length > 100) return false;
    var reg = /^(\/\w+){1,30}\/$/;
    return reg.test(v);
}

//验证域名
function c_zone(v,c_cn){
    var arr = v.split('.');
    var sld = arr.shift();
    var tld = arr.join('.');
    if(sld.length<3) return false;
    if(c_cn===undefined){
        if(/\bcn\b/i.test(tld)&&/(?:64|89|sex)/i.test(sld)) return false;
    }
    var reg = /^(?:[0-9a-z]+(?:-[0-9a-z]+)*\.)+[a-z]{2,4}$/;
    return reg.test(v);
}

function c_zhzone(v,c_cn){
    var arr = v.split('.');
    var sld = arr.shift();
    var tld = arr.join('.');
    if(sld.length<1) return false; //可以1个汉字
    if(c_cn===undefined){
        if(/\bcn\b/i.test(tld)&&/(?:64|89|sex)/i.test(sld)) return false;
    }
    var reg = /^(?:[\u4E00-\u9FA50-9a-z]+(?:-[\u4E00-\u9FA50-9a-z]+)*\.)+[\u4E00-\u9FA5a-z]{2,4}$/;
    return reg.test(v);
}

//验证二级域名
function c_second_zone(v){
    return /^(?!bbs\b|mails\b|mail\b|forum\b|ns1\b|ns2\b|[0-9a-z]*www[0-9a-z]*\b)[0-9a-z]{4,8}$/i.test(v);
}

//验证http://格式的url
function c_url(v){
    return /^http:\/\/([^\/:]+)(:(\d+))?(\/.*)?$/i.test(v);
}

//只能由数字、字母、下划线组成
//通常用来验证用户名及密码
function c_text(v){
    var reg = /^[a-z0-9]{6,16}$/i;
    return reg.test(v);
}


//验证手机号码,是移动或联通号码
function c_mobile(v){
    //    return c_liantong(v)||c_yidong(v)||c_dianxin(v); wanhua 20100226注释此行
    return /^\d{11,16}$/.test(v);
}



//验证邮编，由6位数字组成
function c_postalcode(v){
    return /^\d{6}$/.test(v);
}

//简单验证身份证
function c_sfz(v){
	return isIdCardNo(v)? true:false;
    //return /^(?:\d{15}|\d{18}|\d{17}[a-zA-Z])$/.test(v);
}

//验证中文地址,必须包含5个以上的中文
function c_chaddress(v){
    var num = 0;
    v.replace(/[\u4E00-\u9FA5]/g,function(){++num;});
    return num>=3;
}

//验证英文地址,为非中文以空格分隔的字符串
function c_enaddress(v){
    return /^(?:[^\x80-\xff ]+ )*[^\x80-\xff ]{2,}$/i.test(v);
}

//验证码
function c_validatecode(v){
    return /^\w{4}$/.test(v);
}

//联通号码
function c_liantong(v){
    return /^0?(?:13[0-3]|15[1-35-6]|186)\d{8}$/.test(v);
}

//移动号码
function c_yidong(v){
    return /^0?(?:13[4-9]|15[07-9]|18[789])\d{8}$/.test(v);
}

//电信手机号码
function c_dianxin(v){
    return /^0?(?:189)\d{8}$/.test(v);
}

//验证"2008-01-01"格式的字符串
function c_datestr(val){
    if(val == "") return true;  //生日不是必填项
    
    var reg = /^\d{4}-\d{1,2}-\d{1,2}$/;
	if(!reg.test(val)) return false;
	
	var y,m,d;
	var date_list = val.split("-");
	y = eval(date_list[0]);
	m = eval(date_list[1]);
	d = eval(date_list[2]);
	if(y<1 || m<1 || m>12 || d<1 || y>2900 || y<1903)	return false;
	
	var month_day = [0,31,28,31,30,31,30,31,31,30,31,30,31];
	
	if(d>month_day[m]){
		if(m==2){
			if(((y%100!=0 && y%4==0) || y%400==0) && d<30)	
                return true;
		}else{
		    return false;
		}
	}else return true;
}

function c_timestr(v){
    var reg = /^(\d\d)?:(\d\d?)(?::(\d\d?))?$/;
    if(!reg.test(v)) return false;
    var ma = v.match(/(\d+)/g);
    h = Math.floor(ma[0]);
    m = Math.floor(ma[1]);
    s = Math.floor(ma[2]);
    return h>=0 && h<=24 &&
        m>=0 && m<=59 &&
        (s>=0 && s<=59 || ma[2]===undefined);
}

//验证公司中文名
function c_chorganize(v){
    return c_chinese(v);
}

//验证公司英文名(数字/字母/中横线组成,由空格分开)
function c_enorganize(v){
    return /^(?:[-0-9a-z]+ )*[-a-z0-9]+$/i.test(v);
}


//检查汉字字数
function c_ChineseCount(str,n){
    var reg = /[\u4E00-\u9FA5]/ig;
    var num = 0;
    str.replace(reg,function func(m){num++;});
    return num>=n;   
}

//检查字母字数
function c_LetterCount(str,n){
    var reg = /[a-z]/ig;
    var num = 0;
    str.replace(reg,function func(m){num++;});
    return num>=n;
}

//验证英文,必须包含n个字母且不能包含中文
function c_e_LetterCount(str,n){
    return (!c_ChineseCount(str,1))&&c_LetterCount(str,n);
}
