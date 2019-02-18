function show_login_form(username,logintext,logouttext,where) {

  if (where == "top") {
    if (username!='guest') {
      document.write('<div style="text-align:right;">Logged in as<br><a href="http://gceclub.sun.com.cn/servlets/StartPage" style="color:#ffffff;"><b>' + username + '</b></a><br>');
      document.write('<a href="http://gceclub.sun.com.cn/servlets/TLogout"><img src="btn_logout2.gif" alt="" width="46" height="15" border="0" style="margin-top:5px;"></a></div>');
    } else {
      document.write('<form action="/servlets/TLogin" method="post" style="display:inline"><table border="0" cellspacing="0" cellpadding="0">');
      document.write('<tr><td><img src="hd_uname.gif" alt="" width="49" height="5" border="0"></td><td rowspan="4" style="vertical-align:bottom">&nbsp;<input type="submit" name="Button" value="' + logintext + '"></td></tr>');
      document.write('<tr><td><input type="text" name="loginID" id="loginID" maxlength="32" class="toplogininp"></td></tr>');
      document.write('<tr><td><img src="hd_pass.gif" alt="" width="49" height="5" border="0" style="margin-top:4px;"></td></tr>');
      document.write('<tr><td><input type="password" name="password" id="password" maxlength="32" class="toplogininp" style="margin-bottom:2px;"></td></tr></table></form>');
    }

  } else {
    if (username!='guest') {
      document.write('<div id="logout">Logged in as <a href="http://gceclub.sun.com.cn/servlets/StartPage"><b>' + username + '</b></a>');
      document.write('<br><div class="logoutbtn"><a href="http://gceclub.sun.com.cn/servlets/TLogout"><img src="btn_logout.gif" alt="" width="44" height="13" border="0"></a></div></div>');
    } else {
      document.write('<div id="login"><form action="/servlets/TLogin" method="post" id="loginform"><table border="0" cellspacing="0" cellpadding="3">');
      document.write('<tr><td>Username</td><td><input type="text" name="loginID" id="loginID" maxlength="32" class="logininp"></td></tr>');
      document.write('<tr><td>Password</td><td><input type="password" name="password" id="password" maxlength="32" class="logininp"></td><td><input type="image" name="Button" id="Button" value="Login" src="btn_login.gif" class="loginsub"></td></tr></table></form></div>');
    }
  }
}
