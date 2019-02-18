  function appendFace(face) {
    parent.document.post.body.value=parent.document.post.body.value+face;
  }

  function openFace() {
    showModalDialog('/faces.html',parent,'dialogHeight:170px;dialogWidth:200px;status:no');
  }

  function openJRFace(obj) {
    showModalDialog('/jrfaces.jsp',obj,'dialogHeight:670px;dialogWidth:600px;status:no');
  }
  function textCounter(field, countfield, maxlimit) {
    if (field.value.length > maxlimit) 
      field.value = field.value.substring(0, maxlimit);
    else 
      countfield.value = maxlimit - field.value.length;
  }
  
  function selectAll(name) {
    var obj=document.all[name];
    if (obj&&obj.length) {
      for (i=0;i<obj.length;i++) {
        obj[i].checked=true;
      }
      return;
    }
    if (obj) {
      obj.checked=true;
    }
  }

  function clearAll(name) {
    var obj=document.all[name];
    if (obj&&obj.length) {
      for (i=0;i<obj.length;i++) {
        obj[i].checked=false;
      }
      return;
    }
    if (obj) {
      obj.checked=false;
    }
  }
  
