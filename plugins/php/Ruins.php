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
		"var map = {a1:{name:'Черная башня', trap:false, shackles:false, fight:false, logins:'', color:'#bbb'},\n" +
		"	a2:{name:'Северные чертоги', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a3:{name:'Разрушенная северная башня', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a4:{name:'Высохшее водохранилище', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a5:{name:'Северный обрыв', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a6:{name:'Таинственное логово', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a7:{name:'Угрюмый лес', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a8:{name:'Сгоревший частокол', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a9:{name:'Гигантская нора', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a10:{name:'Непроходимый бурьян', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a11:{name:'Часовня темных побуждений', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	a12:{name:'Красный трон', trap:false, shackles:false, fight:false, logins:'', color:'#fbb'},\n" +
		"	b2:{name:'Западный склон', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	b3:{name:'Подземелье смерти', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	b4:{name:'Ручей безвольных', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	b5:{name:'Незримые топи', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	b6:{name:'Хижина болотных ведьм', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	b7:{name:'Сгоревшая лесопилка', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	b8:{name:'Хижина лесничего', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	b9:{name:'Сломанный дуб', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	b10:{name:'Забытые ворота', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	b11:{name:'Лестница темных побуждений', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c2:{name:'Западный тупик', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c3:{name:'Забытый алтарь', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c4:{name:'Лабиринт отступников', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c5:{name:'Проклятая часовня', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c6:{name:'Зловонные каналы', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c7:{name:'Скрытый грот', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c8:{name:'Заброшенный огород', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c9:{name:'Развалины старой колокольни', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c10:{name:'Башня дракона', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	c11:{name:'Кузница дьявола', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	d4:{name:'Западные захоронения', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	d5:{name:'Северная окраина кладбища', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	d7:{name:'Северные захоронения', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	d9:{name:'Восточная окраина кладбища', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	e2:{name:'Овраг мучений', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	e3:{name:'Кровавый перекресток', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	e4:{name:'Одинокая могила', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	graveyard:{name:'Кладбище', trap:false, shackles:false, fight:false, logins:'', color:'#bfb'},\n" +
		"	e9:{name:'Таинственный склеп', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	e10:{name:'Перекресток проклятых', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	e11:{name:'Черная заводь', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	f4:{name:'Западная окраина кладбища', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	f5:{name:'Южные захоронения', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	f7:{name:'Южная окраина кладбища', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	f9:{name:'Восточные захоронения', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g2:{name:'Утес безумия', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g3:{name:'Дворы повешенных', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g4:{name:'Тоннель оживших мертвецов', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g5:{name:'Бесформенный завал', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g6:{name:'Секретный проход', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g7:{name:'Подворотня слез', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g8:{name:'Сгоревшие конюшни', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g9:{name:'Холм висельников', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g10:{name:'Старый сарай', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	g11:{name:'Вход в катакомбы', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h2:{name:'Лестница благих намерений', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h3:{name:'Рыночная площадь', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h4:{name:'Подворотня страха', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h5:{name:'Разрушенная казарма', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h6:{name:'Площадь забытых мастеров', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h7:{name:'Заброшеный склад', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h8:{name:'Ратушная площадь', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h9:{name:'Южный тупик', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h10:{name:'Опустевшее хранилище', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	h11:{name:'Восточные ворота', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i1:{name:'Синий трон', trap:false, shackles:false, fight:false, logins:'', color:'#bbf'},\n" +
		"	i2:{name:'Часовня благих намерений', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i3:{name:'Развалины южных ворот', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i4:{name:'Зловещие провалы', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i5:{name:'Оградительный вал', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i6:{name:'Главные ворота', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i7:{name:'Южные развалины', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i8:{name:'Проклятое место', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i9:{name:'Сумеречный провал', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i10:{name:'Разрушенная южная башня', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i11:{name:'Бойница стойкости', trap:false, shackles:false, fight:false, logins:''},\n" +
		"	i12:{name:'Белая башня', trap:false, shackles:false, fight:false, logins:'', color:'#fff'}};\n" +
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
		"	// Показываем собственное контекстное меню\n" +
		"	var menu = document.getElementById('oMenu');\n" +
		"	var html = '';\n" +
		"	cell = (evt.target || evt.srcElement);\n" +
		"	html  = '<a href="\&quot;javascript:void(0)\&quot;" class="\&quot;menuItem\&quot;" onclick="\&quot;Check(\\\'T\\\'," cell);="" cmenu();\"="">Ловушка</a><br>' +\n" +
		"	'<a href="\&quot;javascript:void(0)\&quot;" class="\&quot;menuItem\&quot;" onclick="\&quot;Check(\\\'E\\\'," cell);="" cmenu();\"="">Враг в путах</a><br>' +\n" +
		"	'<a href="\&quot;javascript:void(0)\&quot;" class="\&quot;menuItem\&quot;" onclick="\&quot;Check(\\\'F\\\'," cell);="" cmenu();\"="">Идут бои</a><br>' +\n" +
		"	'<a href="\&quot;javascript:void(0)\&quot;" class="\&quot;menuItem\&quot;" onclick="\&quot;cMenu();\&quot;">Отмена</a>';\n" +
		"	// Если есть что показать - показываем\n" +
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
		"	// Блокируем всплывание стандартного браузерного меню\n" +
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
		"	<table cellspacing="0" cellpadding="0" style="text-align: center;"><tbody><tr><td id="a1" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-tlb" style="background-color: #bbb">а1</td><td id="a2" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">а2</td><td id="a3" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">а3</td><td id="a4" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">а4</td><td id="a5" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">а5</td><td id="a6" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">а6</td><td id="a7" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">а7</td><td id="a8" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">а8</td><td id="a9" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">а9</td><td id="a10" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">а10</td><td id="a11" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">а11</td><td id="a12" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-trb" style="background-color: #fbb">а12</td></tr><tr><td></td><td id="b2" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-l">б2</td><td id="b3" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">б3</td><td id="b4" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">б4</td><td id="b5" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">б5</td><td id="b6" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">б6</td><td id="b7" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">б7</td><td id="b8" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">б8</td><td id="b9" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">б9</td><td id="b10" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">б10</td><td id="b11" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-r">б11</td><td></td></tr><tr><td></td><td id="c2" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-l">в2</td><td id="c3" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">в3</td><td id="c4" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">в4</td><td id="c5" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">в5</td><td id="c6" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">в6</td><td id="c7" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">в7</td><td id="c8" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">в8</td><td id="c9" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">в9</td><td id="c10" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">в10</td><td id="c11" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-r">в11</td><td></td></tr><tr><td></td><td id="e2" onmouseout="HideThing(this)" onmouseover="ShowInfo(this, 60)" oncontextmenu="return OpenMenu(event, 9)" rowspan="3" class="r-l">д2</td><td id="e3" onmouseout="HideThing(this)" onmouseover="ShowInfo(this, 60)" oncontextmenu="return OpenMenu(event, 9)" rowspan="3" class="r">д3</td><td id="d4" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-l">г4</td><td id="d5" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" colspan="2" class="r-t">г5</td><td id="d7" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" colspan="2" class="r-t">г7</td><td id="d9" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-r">г9</td><td id="e10" onmouseout="HideThing(this)" onmouseover="ShowInfo(this, 60)" oncontextmenu="return OpenMenu(event, 9)" rowspan="3" class="r1">д10</td><td id="e11" onmouseout="HideThing(this)" onmouseover="ShowInfo(this, 60)" oncontextmenu="return OpenMenu(event, 9)" rowspan="3" class="r-r">д11</td><td></td></tr><tr><td></td><td id="e4" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-r">д4</td><td id="graveyard" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return false;" colspan="4" class="r-r1" style="background-color: #bfb">кладка</td><td id="e9" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-l">д9</td><td></td></tr><tr><td></td><td id="f4" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-l">е4</td><td id="f5" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" colspan="2" class="r">е5</td><td id="f7" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" colspan="2" class="r">е7</td><td id="f9" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-r">е9</td><td></td></tr><tr><td></td><td id="g2" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-l">ж2</td><td id="g3" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">ж3</td><td id="g4" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">ж4</td><td id="g5" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">ж5</td><td id="g6" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">ж6</td><td id="g7" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">ж7</td><td id="g8" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">ж8</td><td id="g9" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">ж9</td><td id="g10" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">ж10</td><td id="g11" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-r">ж11</td><td></td></tr><tr><td></td><td id="h2" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-l">з2</td><td id="h3" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">з3</td><td id="h4" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">з4</td><td id="h5" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">з5</td><td id="h6" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">з6</td><td id="h7" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">з7</td><td id="h8" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-t">з8</td><td id="h9" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">з9</td><td id="h10" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r">з10</td><td id="h11" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-r">з11</td><td></td></tr><tr><td id="i1" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-tlb" style="background-color: #bbf">и1</td><td id="i2" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-b">и2</td><td id="i3" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-b">и3</td><td id="i4" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-bt">и4</td><td id="i5" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-b">и5</td><td id="i6" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-bt">и6</td><td id="i7" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-bt">и7</td><td id="i8" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-b">и8</td><td id="i9" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-bt">и9</td><td id="i10" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-b">и10</td><td id="i11" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-b">и11</td><td id="i12" onmouseout="HideThing(this)" onmouseover="ShowInfo(this)" oncontextmenu="return OpenMenu(event, 9)" class="r-trb" style="background-color: #fff">и12</td></tr></tbody></table>\n" +
		"	<br>\n" +
		"	Поиск локации: <input id="floc" type="text" ondrop="FindLoc(event.dataTransfer.getData(\&quot;text\&quot;))" onkeyup="FindLoc(this.value)">&nbsp;<input type="button" value="Очистить" onclick="document.getElementById(\&quot;floc\&quot;).value = \&quot;\&quot;; FindLoc(\&quot;\&quot;);"><br><br>\n" +
		"	\n" +
		"		\n" +
		"			\n" +
		"		\n" +
		"	<table border="0" cellspacing="0" cellpadding="0" width="100%"><tbody><tr><td style="cursor: default">\n" +
		"				<div class="rdiv" style="background-color: #f66">F</div> - идут бои<br>\n" +
		"				<div class="rdiv" style="background-color: #bff">T</div> - ловушка<br>\n" +
		"				<div class="rdiv" style="background-color: #ffb">E</div> - враг в путах<br>\n" +
		"				<div class="rdiv" style="background-color: #6f6">0</div> - количество союзников в локации<br>\n" +
		"			</td><td align="center" style="cursor: default;">\n" +
		"				<input type="button" value="^" onclick="SayGo(\&quot;вверх\&quot;)"><br>\n" +
		"				<input type="button" value="<" onclick="SayGo(\&quot;влево\&quot;)"><input type="button" value=">" onclick="SayGo(\&quot;вправо\&quot;)"><br>\n" +
		"				<input type="button" value="v" onclick="SayGo(\&quot;вниз\&quot;)">\n" +
		"			</td></tr></tbody></table>\n" +
		"</div>\n" +
		"<div style="border: 1px solid #000; width: 1em; line-height: 1em; position: absolute; left: 1px; bottom: 1px; cursor: pointer; text-align: center; background-color: #fcc" onclick="resize_map();">К а р т а</div><br>\n" +
		"<div id="oMenu" style="position:absolute; border:1px solid #666; background-color:#CCC; display:none; padding-left: 3px; padding-right: 3px;"></div>";
	fmap = top.frames["plfr"].document.createElement("script");
	fmap.setAttribute("type", "text/javascript");
	fmap.text = "RefreshMap('');";
	html_head.appendChild(fmap);
}

var PanelHTML = top.frames[0].document.body.innerHTML.toLowerCase();
InitRuinsFrame();
</body></html>