function changSelect_radio(info){  
    var single = $('single');
    var more = $('more');
    var multiid = $('multiid');
    var singleid = $('singleid');
    
    var display = window.attachEvent ? '' : 'table-row';

	if(info=='多个'){
		single.style.display='none'; 
		more.style.display=display;
		multiid.className="default";
		singleid.className="other";
	}
	if(info=='单个'){
		more.style.display='none';
		single.style.display=display;
		multiid.className="multi";
		singleid.className="current";
	}
}

var newsID = '';
function news(id){
	var newsObj = document.getElementById('a' + newsID);
		if(newsObj){
			newsObj.style.display = 'none';
			document.getElementById('b' + newsID).className = 'option2';
		}
		var obj = document.getElementById('a' + id);
		document.getElementById('b' + id).className = 'option1';
		obj.style.display = '';
		newsID = id;
}

//
var aID=0;
function ShowTabs1(ID){
	if(ID!=aID){
	TabTitle1[aID].className="option2";
	TabTitle1[ID].className="option1";
	Tabs1[aID].style.display="none";
	Tabs1[ID].style.display="";
	aID=ID;
	}
}

function changePreview(tabNumber) {
      var tabNames = ['onlydomain','buyhost','buyvps','buyserver','temp1','temp2'];
      
      for (i = 1; i <= tabNames.length; i++) {
        document.getElementById('infotable' + i).style.display = 'none';
      }
      document.getElementById('infotable' + tabNumber).style.display = '';

      tds = document.getElementById('infotable').getElementsByTagName('td');
      for(i = 0; i < tds.length; i++) {
        if (tds[i].className == 'active menu')
          tds[i].className = 'menu';
      }
      document.getElementById('tab' + tabNumber).className = 'active menu';
    }
	
function showPhonenumber(show,event,number){
    var ele = $('phonenumber_pop');
    if(!show){
        ele.style.display = 'none';
        return;
    }
    var e = event || window.event;
    var point = Event.pointer(e);
    ele.innerHTML = number;
    document.body.appendChild(ele);
    Element.setStyle('phonenumber_pop',{display:'block',left:(point['x']-180)+'px',top:(point['y']+10)+'px'});
}
	//-->