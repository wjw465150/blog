
 setDefaultQuery('javaart');
 

var emailAbstract = "This report presents information and examples for handling national language strings with the Java Native Interface (JNI) for 32-bit Windows platforms."; 


Spry.Utils.addLoadListener(function() {

/*
 * ajaxInclude makes a call to the url and render the results in the div tag specified in divId
 */
function ajaxInclude(url, divId) { 
 var req = newXMLHttpRequest(); 
 if (req) { 
   req.onreadystatechange = getReadyStateHandler(req, 
	function (result) {  
           var contents = document.getElementById(divId);  
           if (result != null && result.length > 0 && contents != null) {
	     contents.innerHTML = result;  
           }
        }); 
   req.open("GET", url, true);
   req.send("");
 }
}


 
 ajaxInclude("/developerworks/niagara/jsp/getNiagaraContent.jsp?url="+window.location.href,"nextsteps");



document.write('<tr valign="top"><td width="8"><img src="c.gif" width="8" height="1" alt=""/></td><td width="16"><img alt="Set printer orientation to landscape mode" height="16" src="printer.gif" width="16" vspace="3" /></td><td width="122"><p><b><a class="smallplainlink" href="javascript:print()">Print this page</a></b></p></td></tr>');


 5.6 10/24 llk: added cdata around the subdirectory path of email gif<!--
document.write('<tr valign="top"><td width="8"><img src="c.gif" width="8" height="1" alt=""/></td><td width="16"><img src="em.gif" height="16" width="16" vspace="3" alt="Email this page" /></td><td width="122"><p><a class="smallplainlink" href="javascript:void%20newWindow()"><b>E-mail this page</b></a></p></td></tr>');
//-->



if (document.referrer&&document.referrer!="") { 
   // document.write(document.referrer);
   var q = document.referrer;
   var engine = q;
   var isG = engine.search(/google\.com/i);
   var searchTerms;
   //var searchTermsForDisplay;
   if (isG != -1) { 
	   var i = q.search(/q=/);
	   var q2 = q.substring(i+2);
	   var j = q2.search(/&/);
	   j = (j == -1)?q2.length:j;
	   searchTerms = q.substring(i+2,i+2+j);
	   if (searchTerms.length != 0) {
	       searchQuery(searchTerms);
	       document.write("<div id=\"contents\"></div>");
	   }
   } 
}


document.write('<input type="hidden" name="url" value="'+location.href+'" />');

});
