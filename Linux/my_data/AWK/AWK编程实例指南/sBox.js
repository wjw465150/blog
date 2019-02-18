/**
 * 弹出层类
 * @author 沈建宏 2008-9-6 ZOL-tech
 */

function _get(id) {
	if( typeof id == 'string' ){
		return document.getElementById(id);
	}else{
		return false;
	}
}	
function sBox(type,src){
		//初始化参数
		this.s_title		= "小提示";	//窗口标题
		this.s_content		= "";	//窗口内容
		this.s_width		= 450;		//窗口宽度
		this.s_height		= 100;		//窗口高度
		if( type=="" ){
			this.s_type		= 0;
		}else{
			this.s_type			= type;		//0:消息提示窗口
											//1：带IFrame的窗口
											//2：confirm窗口
	 										//3：prompt窗口
		}

    	this.s_bg_touming	= 0.4		//背景透明度0~1
    	this.s_bg_color		= "#EEEEEE"	//蒙板颜色
    
    	this.s_iframe_src	= src;		//iframe窗口链接
    	this.s_top			= 100;		//弹出层距顶部高度
		this.set_title	  	= 1;		//是否有标题
		

		//初始化
		this.init  			= function (){
			
			var base_index	= 10002;
			var title_height= 26;
			var bg_height	= document.body.scrollHeight?document.body.scrollHeight:document.documentElement.clientHeight;	//蒙布的高度
			var bg_width	= document.body.scrollWidth?document.body.scrollWidth:document.documentElement.clientWidth;	//蒙布的宽度
			this.s_height		= this.s_height-title_height;
	       	this.s_top			= (document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop)+this.s_top;   //弹出层距顶部高度
			//用以提高弹出层显示优先级的iframe
			var high_iframe= '<iframe src="" style="position:absolute; visibility:inherit; top:0px; left:0px; width:'+bg_height+'px; height:'+bg_width+'px; z-index:-1;filter='+"'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'"+';" frameborder="0"></iframe>';
			//关闭按钮
			var close_button = '<img src="close.gif" style="float:right;cursor:pointer" onclick="" id="close_img" title="关闭" />';
			//蒙版
			this.bg_div		= '<div id="bg_div" style="position:absolute;top:0px;left:0px;width:100%;height:'+bg_height+'px;z-index:'+base_index+';background-color:'+this.s_bg_color+';filter:alpha(opacity='+this.s_bg_touming*100+');opacity:'+this.s_bg_touming+';display:none;" unselectable="on">'+high_iframe+'</div>';
			//弹出窗口浮动层
			this.float_div	= '<div id="float_div" style="top:'+this.s_top+'px;position:absolute;left:'+(bg_width-this.s_width)/2+'px;width:'+this.width+'px;z-index:'+(base_index+2)+';background:#E3F4FC; auto;float:none;" unselectable="on">';
			//外框
			this.float_div += '<table width="'+this.s_width+'"  cellpadding="0" cellspacing="1" bgcolor="#000000" unselectable="on">';
			//标题区
			if( this.set_title==1 ){
				this.float_div += '<tr><td  unselectable="on"><table width="100%" border="0" cellspacing="0" cellpadding="0" unselectable="on"><tr style="line-height:'+title_height+'px;"><td width="2">&nbsp;</td><td style="color: #FFFFFF;font-weight: bold;font-size: 14px" unselectable="on"><span class="STYLE2" unselectable="on">'+this.s_title+'</span></td><td width="10"><span style="clear:both;padding:8px 0">'+close_button+'</span></td><td width="2">&nbsp;</td></tr></table></td></tr>';
			}
			//内容区
			
			switch(this.s_type){
				case 0://消息提示窗口
					break;
				case 1://1：带IFrame的窗口
					//alert(this.s_iframe_src);
					if( this.s_iframe_src!="" ){
						var iframe = '<iframe id="sBox_iframe" name="sBox_iframe"  width="'+this.s_width+'" height="'+this.s_height+'" frameborder="0" src="'+this.s_iframe_src+'"   scrolling="no" ></iframe>';
						this.s_content	+= iframe;
					}else{
						this.s_content = "请初始化src1";
					}

					break;
				case 2://2：confirm窗口
					break;
				case 3://3：prompt窗口
					break;
				default ://

			}
			
			this.float_div += '<tr><td bgcolor="#FFFFFF" style="height:'+this.s_height+'">'+this.s_content+'</td></tr></table></div><div id="dialogBoxShadow" style="display:none;z-index:'+(base_index-2)+';"></div>';
			
			this.initBody();								//初始化底部span标签
			this.show();
		}
		
		
	//加载底部基层
	this.initBody 		= function (){	
		_get('body_span')?_get('body_span').parentNode.removeChild(_get('body_span')):"";
		var oDiv=document.createElement('span');
		oDiv.id='body_span';
		document.body.appendChild(oDiv);
	}
	//显示弹出层
	this.show			= function(){
			document.getElementById('body_span').innerHTML = this.bg_div+this.float_div;
			document.getElementById('bg_div').style.display= "";
			if( this.set_title==1 ){
				//为关闭按钮绑定事件
				if( _get("close_img").addEventListener ){//ff下
					_get("close_img").addEventListener("click", this.close, false);
				}else{//IE下
					_get("close_img").attachEvent("onclick", this.close);
				}
			}
	}
	//关闭
	this.close			= function (){
		_get('body_span').parentNode.removeChild(_get('body_span'));
	}
	//getElementById方法

	
}

