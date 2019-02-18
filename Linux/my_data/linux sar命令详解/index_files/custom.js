// 滑动特效
$(function() {
	$("#featured .item").hover(function(){
		$(this).find(".boxCaption").stop().animate({
			top:0
		}, 150);
		}, function(){
		$(this).find(".boxCaption").stop().animate({
			top:160
		}, 600);
	});
});
// 滚屏
jQuery(document).ready(function($){
$('.scroll_t').click(function(){$('html,body').animate({scrollTop: '0px'}, 800);}); 
$('.scroll_c').click(function(){$('html,body').animate({scrollTop:$('.ct').offset().top}, 800);});
$('.scroll_b').click(function(){$('html,body').animate({scrollTop:$('.footer_bottom,.footer_bottom_a').offset().top}, 800);});
});

$(document).ready(function(){ 
    $("ul.scroll li").hover(function() {
        $(this).find("div").stop()
        .animate({right: "0", opacity:1}, "fast")
        .css("display","block")
    }, function() {
        $(this).find("div").stop()
        .animate({right: "0", opacity: 0}, "fast")
    });  
});
// context
$(document).ready(function(){
$('.entry_box_s ').hover(
	function() {
		$(this).find('.context_t').stop(true,true).fadeIn();
	},
	function() {
		$(this).find('.context_t').stop(true,true).fadeOut();
	}
);
});

// 头像
$(document).ready(function(){
$('#respond').hover(
	function() {
		$(this).find('.set_avatar').stop(true,true).fadeIn();
	},
	function() {
		$(this).find('.set_avatar').stop(true,true).fadeOut();
	}
);
});

 // 链接复制
function copy_code(text) {
  if (window.clipboardData) {
    window.clipboardData.setData("Text", text)
	alert("已经成功将原文链接复制到剪贴板！");
  } else {
	var x=prompt('你的浏览器可能不能正常复制\n请您手动进行：',text);
  }
}

// 评论贴图
function embedImage() {
  var URL = prompt('请输入图片 URL 地址:', 'http://');
  if (URL) {
    document.getElementById('comment').value = document.getElementById('comment').value + '[img]' + URL + '[/img]';
  }
}
// 控制贴图大小
$(document).ready(function() {
    var maxwidth=500;
    $(".commentlist img").each(function(){
        if (this.width>maxwidth)
         this.width = maxwidth;
    });
});
 // 关闭
function turnoff(obj){
document.getElementById(obj).style.display="none";
}
 // 文字滚动
    (function($){
    $.fn.extend({
    Scroll:function(opt,callback){
    if(!opt) var opt={};
    var _this=this.eq(0).find("ul:first");
    var        lineH=_this.find("li:first").height(),
    line=opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10),
    speed=opt.speed?parseInt(opt.speed,10):7000, //卷动速度，数值越大，速度越慢（毫秒）
    timer=opt.timer?parseInt(opt.timer,10):7000; //滚动的时间间隔（毫秒）
    if(line==0) line=1;
    var upHeight=0-line*lineH;
    scrollUp=function(){
    _this.animate({
    marginTop:upHeight
    },speed,function(){
    for(i=1;i<=line;i++){
    _this.find("li:first").appendTo(_this);
    }
    _this.css({marginTop:0});
    });
    }
    _this.hover(function(){
    clearInterval(timerID);
    },function(){
    timerID=setInterval("scrollUp()",timer);
    }).mouseout();
    }
    })
    })(jQuery);
    $(document).ready(function(){
    $(".bulletin").Scroll({line:1,speed:1000,timer:5000});//修改此数字调整滚动时间
    });

//引用
$(function(){
    $("h4.backs").bind("click",function(){
	    var $content = $(this).next("div.track");
	    if($content.is(":visible")){
			$content.hide("200");
		}else{
			$content.show("200");
		}
	})
})

//提示
 var sweetTitles = {
 x : 10, // @Number: x pixel value of current cursor position
 y : 20, // @Number: y pixel value of current cursor position
 tipElements : ".cat_post_box a,.slider_image a,.v_content_list a", // @Array: Allowable elements that can have the toolTip,split with ","
 noTitle : true, //if this value is false,when the elements has no title,it will not be show
 init : function() {
 var noTitle = this.noTitle;
 $(this.tipElements).each(function(){
 $(this).mouseover(function(e){
 if(noTitle){
 isTitle = true;
 }else{
 isTitle = $.trim(this.title) != '';
 }
 if(isTitle){
 this.myTitle = this.title;
 this.title = "";
 var tooltip = "<div id='tooltip'><p>"+this.myTitle+"</p></div>";
 $('body').append(tooltip);
 $('#tooltip')
 .css({
 "top" :( e.pageY+20)+"px",
 "left" :( e.pageX+10)+"px"
 }).show('fast');
 }
 }).mouseout(function(){
 if(this.myTitle != null){
 this.title = this.myTitle;
 $('#tooltip').remove();
 }
 }).mousemove(function(e){
 $('#tooltip')
 .css({
 "top" :( e.pageY+20)+"px",
 "left" :( e.pageX+10)+"px"
 });
 });
 });
 }
 };
 $(function(){
 sweetTitles.init();
 });
//Comments
$(document).ready(function(){
// 当鼠标聚焦
if($('#comment').val()==""){
$('#comment').val('留言是种美德，写点什么...').css({color:"#666"});}
$('#comment').focus(
function() {
if($(this).val() == '留言是种美德，写点什么...') {
$(this).val('').css({color:"#222"});
}
}
// 当鼠标失去焦点
).blur(
function(){
if($(this).val() == '') {
$(this).val('留言是种美德，写点什么...').css({color:"#666"});
}
}
);
});