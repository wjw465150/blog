//�������Ӻ���ajax��
var vote_http_request	= create_obj();
//������ͶƱ
function change_vote(subcatid,bookid,vote){
	if( !subcatid || !bookid || !vote ){
		alert('�Բ��𣬲�������');
		return false;
	}
	
	var url="/tips/book_vote.php?subcatid="+subcatid+"&bookid="+bookid+"&vote="+vote+"&xx="+Math.random();
	vote_http_request.open("GET", url, true);//�����true�������첽����
	vote_http_request.onreadystatechange = vote_callback;
	vote_http_request.send(null);
}
function vote_callback(){

   if (vote_http_request.readyState == 4) {
     if (vote_http_request.status == 200) { 	
		var response 	= vote_http_request.responseText;
		var re_arr		=response.split('|');
		if( re_arr[0]==0 ){
			//�ɹ�
			var div_handle	= document.getElementById('vote_content');
			div_handle.className	= 'art2';
			div_handle.innerHTML	= re_arr[1];
			alert('лл����ͶƱ��');
		}else{
			//ʧ��
			alert(re_arr[1]);
		}
     }
   }
}
