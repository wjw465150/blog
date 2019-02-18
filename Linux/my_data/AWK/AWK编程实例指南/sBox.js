/**
 * ��������
 * @author �򽨺� 2008-9-6 ZOL-tech
 */

function _get(id) {
	if( typeof id == 'string' ){
		return document.getElementById(id);
	}else{
		return false;
	}
}	
function sBox(type,src){
		//��ʼ������
		this.s_title		= "С��ʾ";	//���ڱ���
		this.s_content		= "";	//��������
		this.s_width		= 450;		//���ڿ��
		this.s_height		= 100;		//���ڸ߶�
		if( type=="" ){
			this.s_type		= 0;
		}else{
			this.s_type			= type;		//0:��Ϣ��ʾ����
											//1����IFrame�Ĵ���
											//2��confirm����
	 										//3��prompt����
		}

    	this.s_bg_touming	= 0.4		//����͸����0~1
    	this.s_bg_color		= "#EEEEEE"	//�ɰ���ɫ
    
    	this.s_iframe_src	= src;		//iframe��������
    	this.s_top			= 100;		//������ඥ���߶�
		this.set_title	  	= 1;		//�Ƿ��б���
		

		//��ʼ��
		this.init  			= function (){
			
			var base_index	= 10002;
			var title_height= 26;
			var bg_height	= document.body.scrollHeight?document.body.scrollHeight:document.documentElement.clientHeight;	//�ɲ��ĸ߶�
			var bg_width	= document.body.scrollWidth?document.body.scrollWidth:document.documentElement.clientWidth;	//�ɲ��Ŀ��
			this.s_height		= this.s_height-title_height;
	       	this.s_top			= (document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop)+this.s_top;   //������ඥ���߶�
			//������ߵ�������ʾ���ȼ���iframe
			var high_iframe= '<iframe src="" style="position:absolute; visibility:inherit; top:0px; left:0px; width:'+bg_height+'px; height:'+bg_width+'px; z-index:-1;filter='+"'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'"+';" frameborder="0"></iframe>';
			//�رհ�ť
			var close_button = '<img src="close.gif" style="float:right;cursor:pointer" onclick="" id="close_img" title="�ر�" />';
			//�ɰ�
			this.bg_div		= '<div id="bg_div" style="position:absolute;top:0px;left:0px;width:100%;height:'+bg_height+'px;z-index:'+base_index+';background-color:'+this.s_bg_color+';filter:alpha(opacity='+this.s_bg_touming*100+');opacity:'+this.s_bg_touming+';display:none;" unselectable="on">'+high_iframe+'</div>';
			//�������ڸ�����
			this.float_div	= '<div id="float_div" style="top:'+this.s_top+'px;position:absolute;left:'+(bg_width-this.s_width)/2+'px;width:'+this.width+'px;z-index:'+(base_index+2)+';background:#E3F4FC; auto;float:none;" unselectable="on">';
			//���
			this.float_div += '<table width="'+this.s_width+'"  cellpadding="0" cellspacing="1" bgcolor="#000000" unselectable="on">';
			//������
			if( this.set_title==1 ){
				this.float_div += '<tr><td  unselectable="on"><table width="100%" border="0" cellspacing="0" cellpadding="0" unselectable="on"><tr style="line-height:'+title_height+'px;"><td width="2">&nbsp;</td><td style="color: #FFFFFF;font-weight: bold;font-size: 14px" unselectable="on"><span class="STYLE2" unselectable="on">'+this.s_title+'</span></td><td width="10"><span style="clear:both;padding:8px 0">'+close_button+'</span></td><td width="2">&nbsp;</td></tr></table></td></tr>';
			}
			//������
			
			switch(this.s_type){
				case 0://��Ϣ��ʾ����
					break;
				case 1://1����IFrame�Ĵ���
					//alert(this.s_iframe_src);
					if( this.s_iframe_src!="" ){
						var iframe = '<iframe id="sBox_iframe" name="sBox_iframe"  width="'+this.s_width+'" height="'+this.s_height+'" frameborder="0" src="'+this.s_iframe_src+'"   scrolling="no" ></iframe>';
						this.s_content	+= iframe;
					}else{
						this.s_content = "���ʼ��src1";
					}

					break;
				case 2://2��confirm����
					break;
				case 3://3��prompt����
					break;
				default ://

			}
			
			this.float_div += '<tr><td bgcolor="#FFFFFF" style="height:'+this.s_height+'">'+this.s_content+'</td></tr></table></div><div id="dialogBoxShadow" style="display:none;z-index:'+(base_index-2)+';"></div>';
			
			this.initBody();								//��ʼ���ײ�span��ǩ
			this.show();
		}
		
		
	//���صײ�����
	this.initBody 		= function (){	
		_get('body_span')?_get('body_span').parentNode.removeChild(_get('body_span')):"";
		var oDiv=document.createElement('span');
		oDiv.id='body_span';
		document.body.appendChild(oDiv);
	}
	//��ʾ������
	this.show			= function(){
			document.getElementById('body_span').innerHTML = this.bg_div+this.float_div;
			document.getElementById('bg_div').style.display= "";
			if( this.set_title==1 ){
				//Ϊ�رհ�ť���¼�
				if( _get("close_img").addEventListener ){//ff��
					_get("close_img").addEventListener("click", this.close, false);
				}else{//IE��
					_get("close_img").attachEvent("onclick", this.close);
				}
			}
	}
	//�ر�
	this.close			= function (){
		_get('body_span').parentNode.removeChild(_get('body_span'));
	}
	//getElementById����

	
}

