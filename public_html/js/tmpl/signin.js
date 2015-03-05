define("signinTmpl", [], function() { return function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_htmlchars=/[&<>"]/g,__fest_htmlchars_test=/[&<>"]/,__fest_short_tags = {"area":true,"base":true,"br":true,"col":true,"command":true,"embed":true,"hr":true,"img":true,"input":true,"keygen":true,"link":true,"meta":true,"param":true,"source":true,"wbr":true},__fest_element_stack = [],__fest_htmlhash={"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"},__fest_jschars=/[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test=/[\\'"\/\n\r\t\b\f<>]/,__fest_jshash={"\"":"\\\"","\\":"\\\\","/":"\\/","\n":"\\n","\r":"\\r","\t":"\\t","\b":"\\b","\f":"\\f","'":"\\'","<":"\\u003C",">":"\\u003E"},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_replaceHTML(chr){return __fest_htmlhash[chr]}function __fest_replaceJS(chr){return __fest_jshash[chr]}function __fest_extend(dest, src){for(var i in src)if(src.hasOwnProperty(i))dest[i]=src[i];}function __fest_param(fn){fn.param=true;return fn}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}function __fest_escapeJS(s){if (typeof s==="string") {if (__fest_jschars_test.test(s))return s.replace(__fest_jschars,__fest_replaceJS);} else if (typeof s==="undefined")return "";return s;}function __fest_escapeHTML(s){if (typeof s==="string") {if (__fest_htmlchars_test.test(s))return s.replace(__fest_htmlchars,__fest_replaceHTML);} else if (typeof s==="undefined")return "";return s;}var json=__fest_context;__fest_buf+=("<div id=\"content\"><div class=\"row\"><div class=\"col-md-10\"><div class=\"login\"><form class=\"login-form form-inline\" action=\"\/signin\" method=\"POST\" name=\"ValidationForm\" onsubmit=\"return checkForm()\"><div class=\"form-group\"><div class=\"input-group\"><div class=\"input-group-addon\"><span class=\"glyphicon glyphicon-user\"></span></div><input type=\"text\" class=\"form-control\" placeholder=\"Username\" aria-describedby=\"sizing-addon1\" id=\"username\"/></div><p class=\"help-block\" id=\"userhelp\"></p></div><div class=\"form-group\"><div class=\"input-group\"><div class=\"input-group-addon\"><span class=\"glyphicon glyphicon-envelope\"></span></div><input type=\"email\" class=\"form-control\" placeholder=\"Email\" aria-describedby=\"sizing-addon1\" id=\"email\"/></div><p class=\"help-block\" id=\"emailhelp\"></p></div><div class=\"form-group\"><div class=\"input-group\"><div class=\"input-group-addon\"><span class=\"glyphicon glyphicon-lock\"></span></div><input type=\"password\" class=\"form-control\" placeholder=\"Password\" id=\"password\" aria-describedby=\"sizing-addon1\"/></div><p class=\"help-block\" id=\"passhelp\"></p></div><p><div class=\"btn-group btn-group-justified\"><div class=\"btn-group\"><button type=\"submit\" class=\"btn  btn-success\">SignIn!</button></div><div class=\"btn-group\"><a id=\"backBtn\" href=\"#main\" class=\"btn btn-default\">Back</a></div></div></p></form></div></div></div></div><script type=\"text\/javascript\"><![CDATA[\n  $(\"#password\").on(\"change\", checkPassword);\n  $(\"#email\").on(\"change\", checkEmail);\n  $(\"#username\").on(\"change\", checkUsername);\n  function checkForm() {\n    cu = checkUsername()\n    ce = checkEmail()\n    cp = checkPassword()\n    return cu && ce && cp;\n  }\n  function checkPassword()\n  { \/\/ at least one number, one lowercase and one uppercase letter\n    \/\/ at least six characters\n    var str = document.getElementById(\"password\").value;\n    var re = \/(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}\/;\n    if(!re.test(str)) {\n      $(\"#passhelp\").html(\"Password should include \"+\n                          \"at least one number, \"+\n                          \"one lowercase and one uppercase letter \"+\n                          \"and at least six characters\");\n      $(\"#password\").css({\"box-shadow\":\"0 0 2pt 1pt red\"})\n      return false;\n    }\n    $(\"#passhelp\").empty()\n    $(\"#password\").css({\"box-shadow\":\"0 0 2pt 1pt green\"})\n    return true;\n  }\n  function checkEmail(){\n    var str = document.getElementById(\"email\").value;\n\n    if(str.search(\'@\') \u003C= 0) {\n      $(\"#emailhelp\").html(\"Email should contain @ character\");\n      $(\"#email\").css({\"box-shadow\":\"0 0 2pt 1pt red\"});\n      return false;\n    }\n    $(\"#emailhelp\").empty()\n    $(\"#email\").css({\"box-shadow\":\"0 0 2pt 1pt green\"})\n    return true\n  }\n  function checkUsername()\n  {\n    var str = document.getElementById(\"username\").value;\n    var reg1 = \/^[a-zA-Z0-9]*$\/\n    var reg2 = \/^[a-zA-Z0-9][a-zA-Z0-9]*$\/\n    if(!reg1.test(str)){\n      $(\"#userhelp\").html(\"Username can contain only letters or digits\");\n      $(\"#username\").css({\"box-shadow\":\"0 0 2pt 1pt red\"});\n      return false;\n    } else if(!reg2.test(str)) {\n      $(\"#userhelp\").html(\"Username cannot be empty\");\n      $(\"#username\").css({\"box-shadow\":\"0 0 2pt 1pt red\"});\n      return false;\n    } else {\n      $(\"#userhelp\").empty()\n      $(\"#username\").css({\"box-shadow\":\"0 0 2pt 1pt green\"})\n      return true;\n    }\n  }\n  ]]></script>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}} ;});