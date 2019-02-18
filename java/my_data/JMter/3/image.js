var imgMaxWidth=600;
var imgMaxHeight=450;
function imgLoad(obj)
{
	//	setTimeout("resizeImage(this)", 2000);
	obj.resized=0;
	if(obj.width>imgMaxWidth) 
	{
		obj.width=imgMaxWidth;
		obj.resized=1;		
	}
	if(obj.height>imgMaxHeight)
	{
		obj.width = obj.width*imgMaxHeight/obj.height;	
		obj.height=imgMaxHeight;
		obj.resized=1;		
	}
	//alert("obj.height = " + obj.height + ", obj.width = " + obj.width);
}

function resizeImage(obj){
	obj.resized=0;
	if(obj.width>imgMaxWidth) 
	{
		obj.width=imgMaxWidth;
		obj.resized=1;		
	}
	if(obj.height>imgMaxHeight)
	{
		obj.width = obj.width*imgMaxHeight/obj.height;	
		obj.height=imgMaxHeight;
		obj.resized=1;		
	}
	alert("obj.height = " + obj.height + ", obj.width = " + obj.width);
}

function imgClick(obj)
{
	if (obj.resized==1 && obj.parentElement.tagName!="A")
		window.open(obj.src);
}

function imgShowTip(obj)
{
	if (obj.resized==1 && obj.parentElement.tagName!="A")
		obj.alt="resized image";
	else
		obj.alt="";
}
