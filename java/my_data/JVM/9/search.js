function show_search_form(searchtext,gotext,where) {
  if (where == "top") {
    document.write('<form action="/servlets/Search" method="get">');
    document.write('  <a href="http://gceclub.sun.com.cn/servlets/Search?mode=advanced" style="color:white;">' + searchtext + '</a>');
    document.write('    <input type="hidden" name="scope" value="domain">');
    document.write('    <input type="hidden" name="resultsPerPage" value="40" />');
    document.write('    <input type="text" name="query" class="toplogininp" size="10" />');
    document.write('    <input type="submit" name="Button" value="' + gotext + '" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
    document.write('</form>');
  } else if (where=="left") {
    document.write('<form action="/servlets/Search" method="get">');
    document.write('<div class="va" style="padding-left:6px;">');
    document.write('&nbsp;<a href="http://gceclub.sun.com.cn/servlets/Search?mode=advanced">' + searchtext + '</a>');
    document.write('<input type="hidden" name="scope" value="domain">');
    document.write('<input type="hidden" name="resultsPerPage" value="40" />');
    document.write('<br><input type="text" name="query" size="8" class="searchinp" />');
    document.write('<input type="image" name="Button" src="btn_go.gif" class="searchsub" alt="Search netbeans.org" />');
    document.write('</div>');
    document.write('</form>');
  } else if (where=="right") {
    document.write('<form action="/servlets/Search" method="get">');
    document.write('<div class="va">');
    document.write('&nbsp;<a href="http://gceclub.sun.com.cn/servlets/Search?mode=advanced">' + searchtext + '&nbsp;</a>');
    document.write('<input type="hidden" name="scope" value="domain">');
    document.write('<input type="hidden" name="resultsPerPage" value="40" />');
    document.write('<input type="text" name="query" size="8" class="searchinp" />');
    document.write('&nbsp;<input type="image" name="Button" src="btn_go.gif" class="searchsub" alt="Search netbeans.org" />');
    document.write('</div>');
    document.write('</form>');
  }
}
