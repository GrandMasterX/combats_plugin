<html><head></head><body>function InitRuinsFrame() {
	var html_head = top.frames["plfr"].document.getElementsByTagName("head")[0];
	var fmap = top.frames["plfr"].document.createElement("link");
	fmap.setAttribute("type", "text/css");
	fmap.setAttribute("rel", "stylesheet");
	fmap.setAttribute("href", "http://old-mercenaries.ru/plugins/main.css");
	html_head.appendChild(fmap);
	fmap = top.frames["plfr"].document.createElement("link");
	fmap.setAttribute("type", "text/css");
	fmap.setAttribute("rel", "stylesheet");
	fmap.setAttribute("href", "http://old-mercenaries.ru/plugins/ruins.css");
	html_head.appendChild(fmap);
	fmap = top.frames["plfr"].document.createElement("script");
	fmap.setAttribute("type", "text/javascript");
	fmap.setAttribute("src", "http://old-mercenaries.ru/plugins/js/showthing.js");
	fmap.setAttribute("charset", "utf-8");
	html_head.appendChild(fmap);
	fmap = top.frames["plfr"].document.createElement("script");
	fmap.setAttribute("type", "text/javascript");
	fmap.text = "var PluginFrame = null;\n" +
		"if (typeof(top.frames['plugin']) == 'undefined') {\n" +
		"	if (typeof(top.frames[0]) != 'undefined') {\n" +
		"		if (typeof(top.frames[0].window.PM) != 'undefined') {\n" +
		"			PluginFrame = top.frames[0].window;\n" +
		"		}\n" +
		"	}\n" +
		"} else {\n" +
		"	PluginFrame = top.frames['plugin'].window;\n" +
		"}\n" +
		"var PluginRuins = PluginFrame.PM.plugins['Ruins'];\n" +
		"var map = {a1:{name:'������ �����', trap:false, shackles:false, fight:false, logins:'', color:'#bbb'},\n" +
		"	a2:{name:'�������� �������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a3:{name:'����������� �������� �����', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a4:{name:'�������� �������������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a5:{name:'�������� �����', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a6:{name:'������������ ������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a7:{name:'������� ���', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a8:{name:'��������� ��������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a9:{name:'���������� ����', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a10:{name:'������������ ������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a11:{name:'������� ������ ����������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a12:{name:'������� ����', trap:false, shackles:false, fight:false, logins:'', color:'#fbb'},\n" +
		"	b2:{name:'�������� �����', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	b3:{name:'���������� ������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	b4:{name:'����� ����������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	b5:{name:'�������� ����', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	b6:{name:'������ �������� �����', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	b7:{name:'��������� ���������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	b8:{name:'������ ���������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	b9:{name:'��������� ���', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	b10:{name:'������� ������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	b11:{name:'�������� ������ ����������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c2:{name:'�������� �����', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c3:{name:'������� ������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c4:{name:'�������� �����������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c5:{name:'��������� �������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c6:{name:'��������� ������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c7:{name:'������� ����', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c8:{name:'����������� ������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c9:{name:'��������� ������ ����������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c10:{name:'����� �������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c11:{name:'������� �������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	d4:{name:'�������� �����������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	d5:{name:'�������� ������� ��������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	d7:{name:'�������� �����������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	d9:{name:'��������� ������� ��������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	e2:{name:'����� �������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	e3:{name:'�������� �����������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	e4:{name:'�������� ������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	graveyard:{name:'��������', trap:false, shackles:false, fight:false, logins:'', color:'#bfb'},\n" +
		"	e9:{name:'������������ �����', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	e10:{name:'����������� ���������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	e11:{name:'������ ������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	f4:{name:'�������� ������� ��������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	f5:{name:'����� �����������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	f7:{name:'����� ������� ��������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	f9:{name:'��������� �����������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g2:{name:'���� �������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g3:{name:'����� ����������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g4:{name:'������� ������� ���������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g5:{name:'������������ �����', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g6:{name:'��������� ������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g7:{name:'���������� ����', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g8:{name:'��������� �������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g9:{name:'���� �����������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g10:{name:'������ �����', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g11:{name:'���� � ���������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h2:{name:'�������� ������ ���������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h3:{name:'�������� �������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h4:{name:'���������� ������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h5:{name:'����������� �������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h6:{name:'������� ������� ��������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h7:{name:'���������� �����', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h8:{name:'�������� �������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h9:{name:'����� �����', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h10:{name:'���������� ���������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h11:{name:'��������� ������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i1:{name:'����� ����', trap:false, shackles:false, fight:false, logins:'', color:'#bbf'},\n" +
		"	i2:{name:'������� ������ ���������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i3:{name:'��������� ����� �����', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i4:{name:'�������� �������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i5:{name:'������������� ���', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i6:{name:'������� ������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i7:{name:'����� ���������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i8:{name:'��������� �����', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i9:{name:'���������� ������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i10:{name:'����������� ����� �����', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i11:{name:'������� ���������', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i12:{name:'����� �����', trap:false, shackles:false, fight:false, logins:'', color:'#fff'}};\n" +
		"function Check(p, cell) {\n" +
		"	if (cell.tagName != 'TD') {\n" +
		"		cell = cell.parentNode;\n" +
		"	}\n" +
		"	var s = cell.innerHTML;\n" +
		"	var xy, el;\n" +
		"	if (p == 'T') {\n" +
		"		if (map[cell.id].trap) {\n" +
		"			cell.removeChild(document.getElementById('T' + cell.id));\n" +
		"			\n" +
		"		} else {\n" +
		"			xy = cell.getBoundingClientRect();\n" +
		"			el = document.createElement('div');\n" +
		"			el.id = 'T' + cell.id;\n" +
		"			el.style.position = 'absolute';\n" +
		"			el.style.top = (xy.top + 1) + 'px';\n" +
		"			el.style.left = (xy.left + 1) + 'px';\n" +
		"			el.style.width = '10px';\n" +
		"			el.style.height = '9px';\n" +
		"			el.style.backgroundColor = '#bff';\n" +
		"			el.style.color = '#000';\n" +
		"			el.style.fontSize = '5pt';\n" +
		"			el.innerHTML = 'T';\n" +
		"			cell.appendChild(el);\n" +
		"			\n" +
		"		}\n" +
		"		map[cell.id].trap = !map[cell.id].trap;\n" +
		"	}\n" +
		"	if (p == 'E') {\n" +
		"		if (map[cell.id].shackles) {\n" +
		"			cell.removeChild(document.getElementById('E' + cell.id));\n" +
		"			/*if (PluginRuins.options.loc) {\n" +
		"				PluginFrame.$.getScript('http://oldbk.6ml.ru/plugins/php/ruins_map.php?rid=' + PluginRuins.options.map + '&amp;uid=' + PluginRuins.master.user.id + '&amp;del_enemy=' + cell.id + '&amp;loc=fight');\n" +
		"			}*/\n" +
		"		} else {\n" +
		"			xy = cell.getBoundingClientRect();\n" +
		"			el = document.createElement('div');\n" +
		"			el.id = 'E' + cell.id;\n" +
		"			el.style.position = 'absolute';\n" +
		"			el.style.top = (xy.bottom - 10) + 'px';\n" +
		"			el.style.left = (xy.left + 1) + 'px';\n" +
		"			el.style.width = '10px';\n" +
		"			el.style.height = '9px';\n" +
		"			el.style.backgroundColor = '#ffb';\n" +
		"			el.style.color = '#000';\n" +
		"			el.style.fontSize = '5pt';\n" +
		"			el.innerHTML = 'E';\n" +
		"			cell.appendChild(el);\n" +
		"			\n" +
		"		}\n" +
		"		map[cell.id].shackles = !map[cell.id].shackles;\n" +
		"	}\n" +
		"	if (p == 'F') {\n" +
		"		if (map[cell.id].fight) {\n" +
		"			cell.removeChild(document.getElementById('F' + cell.id));\n" +
		"			\n" +
		"		} else {\n" +
		"			xy = cell.getBoundingClientRect();\n" +
		"			el = document.createElement('div');\n" +
		"			el.id = 'F' + cell.id;\n" +
		"			el.style.position = 'absolute';\n" +
		"			el.style.top = (xy.top + 1) + 'px';\n" +
		"			el.style.left = (xy.right - 11) + 'px';\n" +
		"			el.style.width = '10px';\n" +
		"			el.style.height = '9px';\n" +
		"			el.style.backgroundColor = '#f66';\n" +
		"			el.style.color = '#000';\n" +
		"			el.style.fontSize = '5pt';\n" +
		"			el.innerHTML = 'F';\n" +
		"			cell.appendChild(el);\n" +
		"			/*if (PluginRuins.options.loc) {\n" +
		"				PluginFrame.$.getScript('http://oldbk.6ml.ru/plugins/php/ruins_map.php?rid=' + PluginRuins.options.map + '&amp;uid=' + PluginRuins.master.user.id + '&amp;add_fight=' + cell.id + '&amp;loc=fight');\n" +
		"			}*/\n" +
		"		}\n" +
		"		map[cell.id].fight = !map[cell.id].fight;\n" +
		"	}\n" +
		"	el = null;\n" +
		"}\n" +
		"function defPosition(event) {\n" +
		"	var x = y = 0;\n" +
		"	if (document.attachEvent != null) { // Internet Explorer &amp; Opera\n" +
		"		x = window.event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);\n" +
		"		y = window.event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);\n" +
		"		if (window.event.clientY + 10 &gt; document.body.clientHeight) { y-=6 } else { y-=2 }\n" +
		"	} else if (!document.attachEvent &amp;&amp; document.addEventListener) { // Gecko\n" +
		"		x = event.clientX + window.scrollX;\n" +
		"		y = event.clientY + window.scrollY;\n" +
		"		if (event.clientY + 10 &gt; document.body.clientHeight) { y-=6 } else { y-=2 }\n" +
		"	} else {\n" +
		"		// Do nothing\n" +
		"	}\n" +
		"	return {x:x, y:y};\n" +
		"}\n" +
		"function OpenMenu(evt, level) {\n" +
		"	evt = evt || window.event;\n" +
		"	evt.cancelBubble = true;\n" +
		"	// ���������� ����������� ����������� ����\n" +
		"	var menu = document.getElementById('oMenu');\n" +
		"	var html = '';\n" +
		"	cell = (evt.target || evt.srcElement);\n" +
		"	html  = '<a href="\&quot;javascript:void(0)\&quot;" class="\&quot;menuItem\&quot;" onclick="\&quot;Check(\\\'T\\\'," cell);="" cmenu();\"="">�������</a><br>' +\n" +
		"	'<a href="\&quot;javascript:void(0)\&quot;" class="\&quot;menuItem\&quot;" onclick="\&quot;Check(\\\'E\\\'," cell);="" cmenu();\"="">���� � �����</a><br>' +\n" +
		"	'<a href="\&quot;javascript:void(0)\&quot;" class="\&quot;menuItem\&quot;" onclick="\&quot;Check(\\\'F\\\'," cell);="" cmenu();\"="">���� ���</a><br>' +\n" +
		"	'<a href="\&quot;javascript:void(0)\&quot;" class="\&quot;menuItem\&quot;" onclick="\&quot;cMenu();\&quot;">������</a>';\n" +
		"	// ���� ���� ��� �������� - ����������\n" +
		"	if (html) {\n" +
		"		menu.innerHTML = html;\n" +
		"		posx = defPosition(evt).y;\n" +
		"		posy = defPosition(evt).x;\n" +
		"		if (posy &gt; 120) {\n" +
		"			if (document.body.offsetWidth - posy &lt; 100) posy = posy - 103;\n" +
		"		}\n" +
		"		menu.style.top = posx + 'px';\n" +
		"		menu.style.left = posy + 'px';\n" +
		"		menu.style.display = '';\n" +
		"	}\n" +
		"	// ��������� ���������� ������������ ����������� ����\n" +
		"	return false;\n" +
		"}\n" +
		"function cMenu() {\n" +
		"	document.getElementById('oMenu').style.display = 'none';\n" +
		"}\n" +
		"function ShowInfo(el, y) {\n" +
		"	var shift = 0;\n" +
		"	if (!y) y = 0;\n" +
		"	var info = '<b>' + map[el.id].name + '</b>';\n" +
		"	if (map[el.id].logins != '') {\n" +
		"		info += '<br>------<br>' + map[el.id].logins.replace(',', '<br>');\n" +
		"	}\n" +
		"	if (parseInt(el.id.substr(1)) &gt; 9) {\n" +
		"		ShowThing(el, 42, 27 + y, info, 1);\n" +
		"	} else {\n" +
		"		ShowThing(el, 2, 27 + y, info);\n" +
		"	}\n" +
		"}\n" +
		"function resize_map() {\n" +
		"	if (top.document.getElementById('plfs').cols == '*,400') {\n" +
		"		document.getElementById('m').style.display = 'none';\n" +
		"		top.document.getElementById('plfs').cols = '*,16';\n" +
		"	} else {\n" +
		"		document.getElementById('m').style.display = 'block';\n" +
		"		top.document.getElementById('plfs').cols = '*,400';\n" +
		"	}\n" +
		"}\n" +
		"function FindLoc(txt) {\n" +
		"	for (var id in map) {\n" +
		"		if (txt.length &gt; 0 &amp;&amp; map[id].name.toLowerCase().indexOf(txt.toLowerCase()) &gt;= 0) {\n" +
		"			document.getElementById(id).style.color = '#f00';\n" +
		"			document.getElementById(id).style.fontWeight = 'bold';\n" +
		"		} else {\n" +
		"			document.getElementById(id).style.color = '#000';\n" +
		"			document.getElementById(id).style.fontWeight = 'normal';\n" +
		"		}\n" +
		"	}\n" +
		"}\n" +
		"function SayGo(direction) {\n" +
		"	alert(direction);\n" +
		"}\n" +
		"function RefreshMap(loc) {\n" +
		"	for (var id in map) {\n" +
		"		var cell = document.getElementById(id);\n" +
		"		if (!map[id].trap &amp;&amp; document.getElementById('T' + id) != null) {\n" +
		"			cell.removeChild(document.getElementById('T' + id));\n" +
		"		} else if (map[id].trap &amp;&amp; document.getElementById('T' + id) == null) {\n" +
		"			xy = cell.getBoundingClientRect();\n" +
		"			el = document.createElement('div');\n" +
		"			el.id = 'T' + id;\n" +
		"			el.style.position = 'absolute';\n" +
		"			el.style.top = (xy.top + 1) + 'px';\n" +
		"			el.style.left = (xy.left + 1) + 'px';\n" +
		"			el.style.width = '10px';\n" +
		"			el.style.height = '9px';\n" +
		"			el.style.backgroundColor = '#bff';\n" +
		"			el.style.color = '#000';\n" +
		"			el.style.fontSize = '5pt';\n" +
		"			el.innerHTML = 'T';\n" +
		"			cell.appendChild(el);\n" +
		"		}\n" +
		"		if (!map[id].shackles &amp;&amp; document.getElementById('E' + id) != null) {\n" +
		"			cell.removeChild(document.getElementById('E' + id));\n" +
		"		} else if (map[id].shackles &amp;&amp; document.getElementById('E' + id) == null) {\n" +
		"			xy = cell.getBoundingClientRect();\n" +
		"			el = document.createElement('div');\n" +
		"			el.id = 'E' + id;\n" +
		"			el.style.position = 'absolute';\n" +
		"			el.style.top = (xy.bottom - 10) + 'px';\n" +
		"			el.style.left = (xy.left + 1) + 'px';\n" +
		"			el.style.width = '10px';\n" +
		"			el.style.height = '9px';\n" +
		"			el.style.backgroundColor = '#ffb';\n" +
		"			el.style.color = '#000';\n" +
		"			el.style.fontSize = '5pt';\n" +
		"			el.innerHTML = 'E';\n" +
		"			cell.appendChild(el);\n" +
		"		}\n" +
		"		if (!map[id].fight &amp;&amp; document.getElementById('F' + id) != null) {\n" +
		"			cell.removeChild(document.getElementById('F' + id));\n" +
		"		} else if (map[id].fight &amp;&amp; document.getElementById('F' + id) == null) {\n" +
		"			xy = cell.getBoundingClientRect();\n" +
		"			el = document.createElement('div');\n" +
		"			el.id = 'F' + id;\n" +
		"			el.style.position = 'absolute';\n" +
		"			el.style.top = (xy.top + 1) + 'px';\n" +
		"			el.style.left = (xy.right - 11) + 'px';\n" +
		"			el.style.width = '10px';\n" +
		"			el.style.height = '9px';\n" +
		"			el.style.backgroundColor = '#f66';\n" +
		"			el.style.color = '#000';\n" +
		"			el.style.fontSize = '5pt';\n" +
		"			el.innerHTML = 'F';\n" +
		"			cell.appendChild(el);\n" +
		"		}\n" +
		"		if (map[id].logins == '' &amp;&amp; document.getElementById('P' + id) != null) {\n" +
		"			cell.removeChild(document.getElementById('P' + id));\n" +
		"		} else if (map[id].logins != '' &amp;&amp; document.getElementById('P' + id) == null) {\n" +
		"			xy = cell.getBoundingClientRect();\n" +
		"			el = document.createElement('div');\n" +
		"			el.id = 'P' + id;\n" +
		"			el.style.position = 'absolute';\n" +
		"			el.style.top = (xy.bottom - 10) + 'px';\n" +
		"			el.style.left = (xy.right - 11) + 'px';\n" +
		"			el.style.width = '10px';\n" +
		"			el.style.height = '9px';\n" +
		"			el.style.backgroundColor = '#6f6';\n" +
		"			el.style.color = '#00f';\n" +
		"			el.style.fontSize = '5pt';\n" +
		"			el.innerHTML = map[id].logins.split(',').length;\n" +
		"			cell.appendChild(el);\n" +
		"		}\n" +
		"		if (loc != 'fight') {\n" +
		"			if (map[id].name.toLowerCase() == loc.toLowerCase()) {\n" +
		"				document.getElementById(id).style.backgroundColor = '#faf';\n" +
		"			} else {\n" +
		"				document.getElementById(id).style.backgroundColor = (map[id].color || '#d7d7d7');\n" +
		"			}\n" +
		"		}\n" +
		"	}\n" +
		"}";
	html_head.appendChild(fmap);
	top.frames["plfr"].document.body.innerHTML = "<div id="m">\n" +
		"	\n" +
		"		\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"		\n" +
		"		\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"		\n" +
		"		\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"		\n" +
		"		\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"		\n" +
		"		\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"		\n" +
		"		\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"		\n" +
		"		\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"		\n" +
		"		\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"		\n" +
		"		\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"			\n" +
		"		\n" +
		"	<table cellspacing="0" cellpadding="0" style="text-align: center;"><tbody><tr><td id="a1" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-tlb" style="background-color: #bbb">�1</td><td id="a2" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�2</td><td id="a3" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�3</td><td id="a4" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�4</td><td id="a5" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�5</td><td id="a6" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�6</td><td id="a7" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�7</td><td id="a8" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�8</td><td id="a9" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�9</td><td id="a10" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�10</td><td id="a11" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�11</td><td id="a12" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-trb" style="background-color: #fbb">�12</td></tr><tr><td></td><td id="b2" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-l">�2</td><td id="b3" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�3</td><td id="b4" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�4</td><td id="b5" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�5</td><td id="b6" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�6</td><td id="b7" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�7</td><td id="b8" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�8</td><td id="b9" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�9</td><td id="b10" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�10</td><td id="b11" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-r">�11</td><td></td></tr><tr><td></td><td id="c2" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-l">�2</td><td id="c3" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�3</td><td id="c4" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�4</td><td id="c5" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�5</td><td id="c6" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�6</td><td id="c7" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�7</td><td id="c8" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�8</td><td id="c9" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�9</td><td id="c10" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�10</td><td id="c11" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-r">�11</td><td></td></tr><tr><td></td><td id="e2" onmouseout="HideThing(this)" onmouseover="ShowInfo(this, 60)" oncontextmenu="return OpenMenu(event, 9)" rowspan="3" class="r-l">�2</td><td id="e3" onmouseout="HideThing(this)" onmouseover="ShowInfo(this, 60)" oncontextmenu="return OpenMenu(event, 9)" rowspan="3" class="r">�3</td><td id="d4" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-l">�4</td><td id="d5" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" colspan="2" class="r-t">�5</td><td id="d7" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" colspan="2" class="r-t">�7</td><td id="d9" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-r">�9</td><td id="e10" onmouseout="HideThing(this)" onmouseover="ShowInfo(this, 60)" oncontextmenu="return OpenMenu(event, 9)" rowspan="3" class="r1">�10</td><td id="e11" onmouseout="HideThing(this)" onmouseover="ShowInfo(this, 60)" oncontextmenu="return OpenMenu(event, 9)" rowspan="3" class="r-r">�11</td><td></td></tr><tr><td></td><td id="e4" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-r">�4</td><td id="graveyard" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return false;" colspan="4" class="r-r1" style="background-color: #bfb">������</td><td id="e9" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-l">�9</td><td></td></tr><tr><td></td><td id="f4" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-l">�4</td><td id="f5" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" colspan="2" class="r">�5</td><td id="f7" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" colspan="2" class="r">�7</td><td id="f9" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-r">�9</td><td></td></tr><tr><td></td><td id="g2" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-l">�2</td><td id="g3" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�3</td><td id="g4" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�4</td><td id="g5" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�5</td><td id="g6" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�6</td><td id="g7" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�7</td><td id="g8" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�8</td><td id="g9" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�9</td><td id="g10" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�10</td><td id="g11" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-r">�11</td><td></td></tr><tr><td></td><td id="h2" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-l">�2</td><td id="h3" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�3</td><td id="h4" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�4</td><td id="h5" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�5</td><td id="h6" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�6</td><td id="h7" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�7</td><td id="h8" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">�8</td><td id="h9" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�9</td><td id="h10" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">�10</td><td id="h11" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-r">�11</td><td></td></tr><tr><td id="i1" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-tlb" style="background-color: #bbf">�1</td><td id="i2" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-b">�2</td><td id="i3" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-b">�3</td><td id="i4" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-bt">�4</td><td id="i5" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-b">�5</td><td id="i6" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-bt">�6</td><td id="i7" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-bt">�7</td><td id="i8" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-b">�8</td><td id="i9" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-bt">�9</td><td id="i10" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-b">�10</td><td id="i11" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-b">�11</td><td id="i12" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-trb" style="background-color: #fff">�12</td></tr></tbody></table>\n" +
		"	<br>\n" +
		"	����� �������: <input id="floc" type="text" ondrop="FindLoc(event.dataTransfer.getData(\&quot;text\&quot;))" onkeyup="FindLoc(this.value)">&nbsp;<input type="button" value="��������" onclick="document.getElementById(\&quot;floc\&quot;).value = \&quot;\&quot;; FindLoc(\&quot;\&quot;);"><br><br>\n" +
		"	\n" +
		"		\n" +
		"			\n" +
		"		\n" +
		"	<table border="0" cellspacing="0" cellpadding="0" width="100%"><tbody><tr><td style="cursor: default">\n" +
		"				<div class="rdiv" style="background-color: #f66">F</div> - ���� ���<br>\n" +
		"				<div class="rdiv" style="background-color: #bff">T</div> - �������<br>\n" +
		"				<div class="rdiv" style="background-color: #ffb">E</div> - ���� � �����<br>\n" +
		"				<div class="rdiv" style="background-color: #6f6">0</div> - ���������� ��������� � �������<br>\n" +
		"			</td><td align="center" style="cursor: default;">\n" +
		"				<input type="button" value="^" onclick="SayGo(\&quot;�����\&quot;)"><br>\n" +
		"				<input type="button" value="<" onclick="SayGo(\&quot;�����\&quot;)"><input type="button" value=">" onclick="SayGo(\&quot;������\&quot;)"><br>\n" +
		"				<input type="button" value="v" onclick="SayGo(\&quot;����\&quot;)">\n" +
		"			</td></tr></tbody></table>\n" +
		"</div>\n" +
		"<div style="border: 1px solid #000; width: 1em; line-height: 1em; position: absolute; left: 1px; bottom: 1px; cursor: pointer; text-align: center; background-color: #fcc" onclick="resize_map();">� � � � �</div><br>\n" +
		"<div id="oMenu" style="position:absolute; border:1px solid #666; background-color:#CCC; display:none; padding-left: 3px; padding-right: 3px;"></div>";
	fmap = top.frames["plfr"].document.createElement("script");
	fmap.setAttribute("type", "text/javascript");
	fmap.text = "RefreshMap('');";
	html_head.appendChild(fmap);
}

var PanelHTML = top.frames[0].document.body.innerHTML.toLowerCase();
InitRuinsFrame();
</body></html>