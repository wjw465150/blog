var globalQuery;

/*
 * Adds the specified item to the shopping cart, via Ajax call
 * itemCode - product code of the item to add
 */
function searchQuery(query) {
 globalQuery = query;           
 var req = newXMLHttpRequest(); 
if (req) {
   req.onreadystatechange = getReadyStateHandler(req, processSearchResults);
   req.open("GET", "/developerworks/search/SearchRouter.jsp?query=" + query, true);
   req.send("");
 }
}


/*
 * Update shopping-cart area of page to reflect contents of cart
 * described in XML document.
 */
function processSearchResults(result) {
   var contents = document.getElementById("contents"); 
   if (result != null && result > 0 && contents != null) { 
      var displayQuery = globalQuery;
      displayQuery = displayQuery.replace(/\+/g, " ");
      displayQuery = unescape(displayQuery);
      contents.innerHTML = "<table width=\"75%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr valign=\"top\"><td bgcolor=\"#f6f6f6\" width=\"16\"><img src=https://www.ibm.com/"//www.ibm.com/i/v14/icons/fw_bold.gif\" height=\"16\" width=\"16\" border=\"0\" vspace=\"3\" alt=\"\" /></td><td align=\"left\" bgcolor=\"#f6f6f6\" width=\"*\"><p><a class=\"fbox\" width=\"70%\" href=https://www.ibm.com/"http://www.ibm.com/developerworks/search/searchResults.jsp?source=google&searchType=1&searchSite=dW&searchScope=dW&query="+globalQuery+"\">More dW content related to: <b>"+displayQuery+"</b></a></p></td><td bgcolor=\"#f6f6f6\" width=\"3\"><img src=https://www.ibm.com/"//www.ibm.com/i/c.gif\" height=\"1\" width=\"3\" border=\"0\" alt=\"\" /></td></tr></table>";
   }
}


