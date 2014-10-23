var Bind = function(e, d, f) {
	try {
		if (d.addEventListener) {
			d.addEventListener(e, f, false)
		} else {
			d.attachEvent("on" + e, f)
		}
	} catch (ex) {
	}
};
(function($) {
	$.toJSON			= function(o) {
		if (typeof(JSON) == 'object' && JSON.stringify)
			return JSON.stringify(o);
		var type = typeof(o);
		if (o === null)
			return"null";
		if (type == "undefined")
			return undefined;
		if (type == "number" || type == "boolean")
			return o + "";
		if (type == "string")
			return $.quoteString(o);
		if (type == 'object') {
			if (typeof o.toJSON == "function")
				return $.toJSON(o.toJSON());
			if (o.constructor === Date) {
				var month = o.getUTCMonth() + 1;
				if (month < 10)month = '0' + month;
				var day = o.getUTCDate();
				if (day < 10)day = '0' + day;
				var year = o.getUTCFullYear();
				var hours = o.getUTCHours();
				if (hours < 10)hours = '0' + hours;
				var minutes = o.getUTCMinutes();
				if (minutes < 10)minutes = '0' + minutes;
				var seconds = o.getUTCSeconds();
				if (seconds < 10)seconds = '0' + seconds;
				var milli = o.getUTCMilliseconds();
				if (milli < 100)milli = '0' + milli;
				if (milli < 10)milli = '0' + milli;
				return'"' + year + '-' + month + '-' + day + 'T' +
					hours + ':' + minutes + ':' + seconds + '.' + milli + 'Z"';
			}
			if (o.constructor === Array) {
				var ret = [];
				for (var i = 0; i < o.length; i++)
					ret.push($.toJSON(o[i]) || "null");
				return"[" + ret.join(",") + "]";
			}
			var pairs = [];
			for (var k in o) {
				var name;
				var type = typeof k;
				if (type == "number")
					name = '"' + k + '"'; else if (type == "string")
					name = $.quoteString(k); else
					continue;
				if (typeof o[k] == "function")
					continue;
				var val = $.toJSON(o[k]);
				pairs.push(name + ":" + val);
			}
			return"{" + pairs.join(", ") + "}";
		}
	};
	$.evalJSON			= function(src) {
		if (typeof(JSON) == 'object' && JSON.parse)
			return JSON.parse(src);
		return eval("(" + src + ")");
	};
	$.secureEvalJSON	= function(src) {
		if (typeof(JSON) == 'object' && JSON.parse)
			return JSON.parse(src);
		var filtered = src;
		filtered = filtered.replace(/\\["\\\/bfnrtu]/g, '@');
		filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
		filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
		if (/^[\],:{}\s]*$/.test(filtered))
			return eval("(" + src + ")"); else
			throw new SyntaxError("Error parsing JSON, source is not valid.");
	};
	$.quoteString		= function(string) {
		if (string.match(_escapeable)) {
			return'"' + string.replace(_escapeable, function (a) {
				var c = _meta[a];
				if (typeof c === 'string')return c;
				c = a.charCodeAt();
				return'\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
			}) + '"';
		}
		return'"' + string + '"';
	};
	var _escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
	var _meta = {'\b':'\\b', '\t':'\\t', '\n':'\\n', '\f':'\\f', '\r':'\\r', '"':'\\"', '\\':'\\\\'};
})(jQuery);
jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') {
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString();
		}
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};

var NastroikaPl = function() {
	this.help			= "";
	this.name			= "РќР°СЃС‚СЂРѕР№РєРё";
	this.id				= "Nastroika";
	this.master			= null;
	this.created		= false;
	this.enabled		= true;
	this.menuitem		= null;
	this.options		= {};
	this.contentHTML	= '<table id="nastroika" cellpadding="0"><tr><td style="width:5px;"><td style="width:50px">РџР»Р°РіРёРЅС‹:</td></tr></table>';
	this.Start			= function(win) {
	}
	this.ApplyOptions	= function() {
		var This = this;
		if (this.master != null) {
			$(this.master.global_options).each(function () {
				if (this.id == This.id) {
					if (!$.isEmptyObject(this.value))
						This.options = this.value;
					else
						This.options = {};
				}
			})
		}
	}
	this.Enable			= function() {
	}
	this.Disable		= function() {
	}
	this.MenuItem		= function() {
		if (this.master != null && this.menuitem == null) {
			var This = this;
			This.mid = this.master.menu_id;
			This.cid = this.master.content_id;
			var menu_item = $('<input type="button" value="РќР°СЃС‚СЂРѕР№РєРё"/>');
			menu_item.bind('click', function () {
				if (This.master.Current != This) {
					This.master.Current.Dispose();
				}
				This.master.Current = This;
				This.ToggleContent();
			})
			this.menuitem = $(menu_item);
			return this.menuitem;
		}
		else
			return this.menuitem;
	}
	this.ToggleContent	= function() {
		var This = this;
		if (!this.created) {
			$(this.cid).html(this.contentHTML);
			var i = 0;
			var td = $("<td valign='top' style=' text-align:left'></td>");
			$("#nastroika tr").append(td);
			$(this.master.plugins).each(function () {
				if (this.id == This.id)
					return true;
				if (i == 2) {
					i = 0;
					td = $("<td valign='top' style='text-align:left'></td>");
					$("#nastroika tr").append(td);
				}
				var Sid01 = "";
				Sid01 = this.id;
				if (Sid01 == "AutoUdar")
					Sid01 = " class='example_au_check' id='au_check'";
				else {
					if (Sid01 == "AutoUdarOld")
						Sid01 = " class='example_auo_check' id='auo_check'";
					else
						Sid01 = " class='example_all_check'";
				}
				var check_input = $("<input type='checkbox'" +  Sid01 + "/>");
				var This2 = this;
				check_input.change(function () {
					if (This2.enabled)
						This2.Disable();
					else {
						if (This2.id == "AutoUdar") {
							ASO.Disable();
							ASO.master.SaveOptions();
							$("#auo_check").attr("checked", false);
						}
						else {
							if (This2.id == "AutoUdarOld") {
								AS.Disable();
								AS.master.SaveOptions();
								$("#au_check").attr("checked", false);
							}
						}
						This2.Enable();
					}
					This2.master.SaveOptions();
				});
				if (this.enabled) {
					check_input.attr("checked", "checked");
				}
				td.append(check_input).append(" " + this.name + " ").append("<br/>");
				i++;
			});
			this.created = true;
		}
		else {
			$("#nastroika").toggle();
		}
		this.master.ResizeFrame();
	}
	this.Dispose		= function() {
		this.created = false;
	}
}
var AutoUdarPl = function() {
	this.help			= "#";
	this.name			= "РђРІС‚РѕР’РµР»РёРє";
	this.id				= "AutoUdar";
	this.master			= null;
	this.menuitem		= null;
	this.created		= false;
	this.mid			= null;
	this.cid			= null;
	this.started		= false;
	this.enabled		= false;
	this.RefreshCounter	= 0;
	this.BattleID		= 0;
	this.BattleOrder	= 0;
	this.AutoTime		= {};
	this.teams			= {};
	this.teams_frend	= [];
	this.LifeLimit		= 0;
	this.BattleWin		= null;
	this.TimeOut		= 0;
	this.last_strike	= -1;
	this.handle_time	= null;
	this.AutoBegin		= false;
	this.options		= {areas:{hit:[1, 2, 3, 4], block:[1, 2, 3, 4]}, 
						 life:0, time:0, auto:0, settings:0,
						 autoanswer:1, answertime:40, lvl_answer:1,
						 scan_team:1,
						 tank_ak:1, mint_aklevel:0, maxt_aklevel:0,
						 tank_au:1, mint_aulevel:0, maxt_aulevel:0,
						 uvorot:1, minulevel:0, maxulevel:0,
						 uvorot_au:1, minu_aulevel:0, maxu_aulevel:0,
						 uvorot_ak:1, minu_aklevel:0, maxu_aklevel:0,
						 krit:1, minklevel:0, maxklevel:0,
						 krit_au:1, mink_aulevel:0, maxk_aulevel:0,
						 krit_ak:1, mink_aklevel:0, maxk_aklevel:0,
						 lvl_info:1, color_frend_team:0, rentgen:0, fast:0, mini_read_classpers:0,
						 nevid:0};
	this.RunsNameArray	= [];
	this.RunsParamArray	= [];
	this.RingsNameArray	= [];
	this.RingsParamArray	= [];	
	this.AmuletNameArray	= [];
	this.AmuletParamArray	= [];
	this.ClipNameArray	= [];
	this.ClipParamArray	= [];
	this.SchitNameArray	= [];
	this.SchitParamArray	= [];
	this.RuggoNameArray	= [];
	this.RuggoParamArray	= [];
	this.BootsNameArray	= [];
	this.BootsParamArray	= [];
	this.NaruchNameArray	= [];
	this.NaruchParamArray	= [];
	this.ShapkaNameArray	= [];
	this.ShapkaParamArray	= [];
	this.PlashNameArray	= [];
	this.PlashParamArray	= [];					 
	this.contentHTML	= '<table id="auto_udar" cellpadding="0"><tr valign="top">'+
						'<td style="width:2px">'+
						'</td><td style=" text-align:left; width:108px">'+
						'<input id="auto_udar_start" type="button" value="РЎС‚Р°СЂС‚" style="width:46px"/>'+
						'<input id="auto_udar_options" type="button" value="РћРїС†РёРё" style="width:46px"/>'+
						'<div id="auto_udar_add_opt">'+
						'РђРІС‚РѕРЎС‚Р°СЂС‚&nbsp;&nbsp;<input style="margin-top:2px" id="a_u_attack_auto" class="auto_udar_opt_box" type="checkbox"/><br/>'+
						'РњР°СЂРёРЅР°Рґ (СЃРµРє.):&nbsp;<input id="a_u_time" class="auto_udar_textbox" type="text" value="0" style="width:21px"/><br/>'+
						'<input id="a_u_scan_team" class="auto_udar_opt_box" type="checkbox"/>&nbsp;РЎРєР°РЅ С‚РёРјС‹ СЃРЅРёР·Сѓ<br/>'+
						'</div>'+
						'</td><td style="width:1px;display:none"></td>'+
						'<td style="display:none; width:67px">'+
						'<input id="a_u_attack_1" class="auto_udar_opt_box" type="checkbox"/>&nbsp;Р’ РіРѕР»РѕРІСѓ<br/>'+
						'<input id="a_u_attack_2" class="auto_udar_opt_box" type="checkbox"/>&nbsp;Р’ РєРѕСЂРїСѓСЃ<br/>'+
						'<input id="a_u_attack_3" class="auto_udar_opt_box" type="checkbox"/>&nbsp;Р’ РїРѕСЏСЃ<br/>'+
						'<input id="a_u_attack_4" class="auto_udar_opt_box" type="checkbox"/>&nbsp;Р’ РЅРѕРіРё<br/>'+
						'<input id="a_u_fast" class="auto_udar_opt_box" type="checkbox"/>&nbsp;РћС‚РјРµРЅРёС‚СЊ<br/>'+
						'</td><td style="width:1px;display:none"></td>'+
						'<td style="display:none; width:56px">'+
						'<input id="a_u_defend_1" class="auto_udar_opt_box" type="checkbox"/>&nbsp;Р“РѕР»РѕРІСѓ<br/>'+
						'<input id="a_u_defend_2" class="auto_udar_opt_box" type="checkbox"/>&nbsp;РљРѕСЂРїСѓСЃ<br/>'+
						'<input id="a_u_defend_3" class="auto_udar_opt_box" type="checkbox"/>&nbsp;РџРѕСЏСЃ<br/>'+
						'<input id="a_u_defend_4" class="auto_udar_opt_box" type="checkbox"/>&nbsp;РќРѕРіРё<br/>'+
						'РєСЂР°СЃРѕС‚С‹<input id="a_u_disign" class="auto_udar_opt_box" type="checkbox" style="opacity:0" disabled/><br/>'+
						'</td><td style="width:1px;display:none"></td>'+
						'<td valign="top" style="display:none; width:210px">'+
						'РЎС‚РѕРї РїСЂРё HP РјРµРЅРµРµ:&nbsp;<input id="a_u_life" class="auto_udar_textbox" type="text" value="0" style="width:27px"/>&nbsp;* 0 - СѓРјРёСЂР°С‚СЊ<br/>'+
						'<input id="a_u_auto_answer" class="auto_udar_opt_box" type="checkbox"/>&nbsp;Р’РєР». Р°РІС‚РѕРѕС‚РІРµС‚ РїРѕСЃР»Рµ'+
						'&nbsp;<input id="a_u_answer_time" class="auto_udar_textbox" type="text" value="40" style="width:14px"/>СЃРµРє.'+
						'&nbsp;В±&nbsp;<input id="a_u_lvl_answer" class="auto_udar_textbox" type="text" value="1" style="width:8px"/>Р»РІР»<br/>'+
						'<input id="a_u_settings" class="auto_udar_opt_box" type="checkbox"/>&nbsp;Р’С‹Р±РѕСЂ СЂР°Р·РјРµРЅРѕРІ РІСЂСѓС‡РЅСѓСЋ' +
						'&nbsp;<input id="a_u_mini_read_classpers" class="auto_udar_opt_box" type="checkbox"/>&nbsp;4 РєР»Р°СЃСЃР°' +
						'<br/>'+
						'</td><td style="width:1px;display:none">'+
						'</td><td valign="top" style="display:none; width:560px">'+ 
						'<table border="0" cellspacing="0" cellpadding="0">'+
						'<tr><td><font style="background-color:#bf9dfe">РўР°РЅРє РђРљ:</font>&nbsp;</td>'+
						'<td><input id="a_u_tank_ak" class="auto_udar_opt_box" type="checkbox"/>'+
						'&nbsp;РјРёРЅ.СѓСЂ<input id="a_u_minT_aklevel" class="auto_udar_textbox" type="text" value="0" style="width:14px"/>'+
						'&nbsp;РјР°РєСЃ.СѓСЂ<input id="a_u_maxT_aklevel" class="auto_udar_textbox" type="text" value="0" style="width:14px"/>'+
						'&nbsp;<font style="background-color:#e7a8ff">РўР°РЅРє РђРЈ:</font>&nbsp;</td>'+
						'<td><input id="a_u_tank_au" class="auto_udar_opt_box" type="checkbox"/>'+
						'&nbsp;РјРёРЅ.СѓСЂ<input id="a_u_minT_aulevel" class="auto_udar_textbox" type="text" value="0" style="width:14px"/>'+
						'&nbsp;РјР°РєСЃ.СѓСЂ<input id="a_u_maxT_aulevel" class="auto_udar_textbox" type="text" value="0" style="width:14px"/>'+
						'&nbsp;<input id="a_u_lvl_info" class="auto_udar_opt_box" type="checkbox"/>'+
						'&nbsp;+ [Р»РІР»]&nbsp;</td>'+
						'<td><input id="a_u_color_frend_team" class="auto_udar_opt_box" type="checkbox"/>'+
						'&nbsp;Р Р°СЃРєСЂР°СЃРёС‚СЊ СЃРІРѕСЋ С‚РёРјСѓ</td>'+
						'</tr>'+
						'<tr><td><font style="background-color:#c6f660">РЈРІРѕСЂРѕС‚:</font>&nbsp;</td>'+
						'<td><input id="a_u_uvorot" class="auto_udar_opt_box" type="checkbox"/>'+
						'&nbsp;РјРёРЅ.СѓСЂ<input id="a_u_minUlevel" class="auto_udar_textbox" type="text" value="0" style="width:14px"/>'+
						'&nbsp;РјР°РєСЃ.СѓСЂ<input id="a_u_maxUlevel" class="auto_udar_textbox" type="text" value="0" style="width:14px"/>'+
						'&nbsp;<font id="a_u_font_uvorot_au" style="opacity:1; background-color:#62f34e">РЈРІРѕСЂРѕС‚ РђРЈ:</font>&nbsp;</td>'+
						'<td><input id="a_u_uvorot_au" class="auto_udar_opt_box" type="checkbox" style="opacity:1"/>'+
						'&nbsp;<font id="a_u_font_uvorot_au_min" style="opacity:1">РјРёРЅ.СѓСЂ</font>' +
						'<input id="a_u_minU_aulevel" class="auto_udar_textbox" type="text" value="0" style="width:14px; opacity:1"/>'+
						'&nbsp;<font id="a_u_font_uvorot_au_max" style="opacity:1">РјР°РєСЃ.СѓСЂ</font>' +
						'<input id="a_u_maxU_aulevel" class="auto_udar_textbox" type="text" value="0" style="width:14px; opacity:1"/>'+
						'&nbsp;<font id="a_u_font_uvorot_ak" style="opacity:1; background-color:#1bfa94">РЈРІРѕСЂРѕС‚ РђРљ:</font>&nbsp;</td>'+
						'<td><input id="a_u_uvorot_ak" class="auto_udar_opt_box" type="checkbox" style="opacity:1"/>'+
						'&nbsp;<font id="a_u_font_uvorot_ak_min" style="opacity:1">РјРёРЅ.СѓСЂ</font>' +
						'<input id="a_u_minU_aklevel" class="auto_udar_textbox" type="text" value="0" style="width:14px; opacity:1"/>'+
						'&nbsp;<font id="a_u_font_uvorot_ak_max" style="opacity:1">РјР°РєСЃ.СѓСЂ</font>' +
						'<input id="a_u_maxU_aklevel" class="auto_udar_textbox" type="text" value="0" style="width:14px; opacity:1"/></td>'+
						'</tr>'+
						'<tr><td><font style="background-color:#6faffe">РљСЂРёС‚:</font>&nbsp;</td>'+
						'<td><input id="a_u_krit" class="auto_udar_opt_box" type="checkbox"/>'+
						'&nbsp;РјРёРЅ.СѓСЂ<input id="a_u_minKlevel" class="auto_udar_textbox" type="text" value="0" style="width:14px"/>'+
						'&nbsp;РјР°РєСЃ.СѓСЂ<input id="a_u_maxKlevel" class="auto_udar_textbox" type="text" value="0" style="width:14px"/>'+
						'&nbsp;<font id="a_u_font_krit_au" style="opacity:1; background-color:#6bf3ff">РљСЂРёС‚ РђРЈ:</font>&nbsp;</td>'+
						'<td><input id="a_u_krit_au" class="auto_udar_opt_box" type="checkbox" style="opacity:1"/>'+
						'&nbsp;<font id="a_u_font_krit_au_min" style="opacity:1">РјРёРЅ.СѓСЂ</font>' +
						'<input id="a_u_minK_aulevel" class="auto_udar_textbox" type="text" value="0" style="width:14px; opacity:1"/>'+
						'&nbsp;<font id="a_u_font_krit_au_max" style="opacity:1">РјР°РєСЃ.СѓСЂ</font>' +
						'<input id="a_u_maxK_aulevel" class="auto_udar_textbox" type="text" value="0" style="width:14px; opacity:1"/>'+
						'&nbsp;<font id="a_u_font_krit_ak" style="opacity:1; background-color:#9a9cfc">РљСЂРёС‚ РђРљ:</font>&nbsp;</td>'+
						'<td><input id="a_u_krit_ak" class="auto_udar_opt_box" type="checkbox" style="opacity:1"/>'+
						'&nbsp;<font id="a_u_font_krit_ak_min" style="opacity:1">РјРёРЅ.СѓСЂ</font>' +
						'<input id="a_u_minK_aklevel" class="auto_udar_textbox" type="text" value="0" style="width:14px; opacity:1"/>'+
						'&nbsp;<font id="a_u_font_krit_ak_max" style="opacity:1">РјР°РєСЃ.СѓСЂ</font>' +
						'<input id="a_u_maxK_aklevel" class="auto_udar_textbox" type="text" value="0" style="width:14px; opacity:1"/></td>'+
						'</tr>'+
						'<tr><td><b><i>РќРµРІРёРґС‹:</i></b></td><td><input id="a_u_nevid" class="auto_udar_opt_box" type="checkbox"/>'+
						'&nbsp;* РјР°РєСЃ.СѓСЂ.=0 - Р±РёС‚СЊ РІСЃРµС…, >= РјРёРЅ.СѓСЂ'+
						'<td></td>'+
						'<td><input id="a_u_rentgen" class="auto_udar_opt_box" type="checkbox"/>'+
						'&nbsp;Р РµРЅС‚РіРµРЅ С€РјРѕС‚Р°</td>'+
						'</tr>'+
						'</table></td>' +
						'</tr></table>';
	this.Start			= function(win) {
		if (win.document.URL.indexOf("fbattle.php") != -1) {
			this.BattleWin = win;
			var This = this;
			var html_doc = win.document.getElementsByTagName("head");
			if (html_doc.length > 0)
				html_doc = html_doc[0];
			else
				html_doc = win.document.body;
			var js_plugin = win.document.createElement("script");
			js_plugin.setAttribute("type", "text/javascript");
			js_plugin.setAttribute("src", "http://old-mercenaries.ru/plugins/laba/AutoudarDate.js?" + Math.random());
			js_plugin.setAttribute("charset", "utf-8");
			html_doc.appendChild(js_plugin);
			js_plugin = null;
			var js_plugin = win.document.createElement("script");
			js_plugin.setAttribute("type", "text/javascript");
			js_plugin.setAttribute("src", "http://old-mercenaries.ru/plugins/laba/Autoudar.js?" + Math.random());
			js_plugin.setAttribute("charset", "utf-8");
			html_doc.appendChild(js_plugin);
			js_plugin = null;
		}
	}
	this.ApplyOptions	= function() {
		var This = this;
		if (this.master != null) {
			$(this.master.global_options).each(function() {
				if (this.id == This.id) {
					if (this.enabled)
						This.Enable();
					else
						This.Disable();
					if (!$.isEmptyObject(this.value)) {
						This.options = $.extend(This.options, this.value);
						This.AutoBegin = (This.options.auto == 1)?true:false;
						This.TimeOut = This.options.time;
					} else {
						This.options = {areas:{hit:[1, 2, 3, 4], block:[1, 2, 3, 4]}, 
						life:0, time:0, auto:0, settings:0, scan_team:1,
						autoanswer:1, answertime:40, lvl_answer:1,
						tank_ak:1, mint_aklevel:0, maxt_aklevel:0,
						tank_au:1, mint_aulevel:0, maxt_aulevel:0,
						uvorot:1, minulevel:0, maxulevel:0,
						uvorot_au:1, minu_aulevel:0, maxu_aulevel:0,
						uvorot_ak:1, minu_aklevel:0, maxu_aklevel:0,
						krit:1, minklevel:0, maxklevel:0,
						krit_au:1, mink_aulevel:0, maxk_aulevel:0,
						krit_ak:1, mink_aklevel:0, maxk_aklevel:0,
						lvl_info:1, color_frend_team:0, rentgen:0, fast:0, mini_read_classpers:0,
						nevid:0};
					}
				}
			})
		}
	}
	this.Enable			= function() {
		this.enabled = true;
		var mi = this.MenuItem();
		if (mi != null) {
			mi.removeClass("input_pl_off");
		}
	}
	this.Disable		= function() {
		this.enabled = false;
		this.End(false);
		var mi = this.MenuItem();
		if (mi != null) {
			mi.addClass("input_pl_off");
		}
	}
	this.MenuItem		= function() {
		if ((this.master != null) && (this.menuitem == null)) {
			var This = this;
			This.mid = this.master.menu_id;
			This.cid = this.master.content_id;
			var menu_item = $('<input type="button" value="РђРІС‚РѕР’РµР»РёРє"/>');
			menu_item.bind('click', function() {
				if (This.master.Current != This) {
					This.master.Current.Dispose();
				}
				$(this).css("background-color", "#f0f0f0");
				This.master.Current = This;
				This.ToggleContent();
			});
			this.menuitem = $(menu_item);
			return this.menuitem;
		} else
			return this.menuitem;
	}
	this.Begin			= function() {
		if (!this.enabled) {
			alert("РџР»Р°РіРёРЅ РІС‹РєР»СЋС‡РµРЅ. РџРµСЂРµР№РґРёС‚Рµ РІ РїСѓРЅРєС‚ РІРµСЂС…РЅРµРіРѕ РјРµРЅСЋ *РќР°СЃС‚СЂРѕР№РєРё* Рё РІРєР»СЋС‡РёС‚Рµ РµРіРѕ");
		}
		if ((!this.started) && (this.BattleID != 0)) {
			if (this.BattleWin != null) {
				this.started = true;
				$("#auto_udar_start").val('РЎС‚РѕРї');
				this.BattleWin.Attack();
			} else {
				alert("РћРєРЅРѕ Р±РѕСЏ РµС‰Рµ РЅРµ РїСЂРёРІСЏР·Р°РЅРѕ. РџРµСЂРІС‹Р№ СѓРґР°СЂ РЅР°РЅРµСЃРёС‚Рµ СЃР°РјРё");
			}
		}
	}
	this.End			= function(clear_id) {
		if (clear_id) {
			this.BattleID = 0;
			this.RefreshCounter = 0;
		}
		this.started = false;
		this.last_strike = -1;
		clearTimeout(this.handle_time);
		$("#auto_udar_start").val('РЎС‚Р°СЂС‚');
	}
	this.WaitTimeOut	= function(time) {
		var This = this;
		if (this.TimeOut != 0 && this.TimeOut != 999) {
			var h = parseInt(time.substring(0, time.indexOf(":")));
			var m = parseInt(time.substr(time.indexOf(":") + 1));
			if (isNaN(h) || isNaN(m)) {
				return false;
			}
			var new_time = h * 60 + m;
			if (new_time != this.last_strike) {
				this.last_strike = new_time;
				if (this.handle_time != null)
					clearTimeout(this.handle_time);
				this.handle_time = setTimeout(function() {
					AS.TimeAttack();
				}, 1000 * (this.TimeOut) - 900);
				return true;
			} else if (this.handle_time == null) {
				this.handle_time = setTimeout(function() {
					AS.TimeAttack();
				}, 1000 * (this.TimeOut) - 900);
				return false;
			}
			return true;
		} else {
			clearTimeout(this.handle_time);
			return false;
		}	
	}
	this.TimeAttack		= function() {
		var This = this;
		if (this.BattleWin != null && typeof(this.BattleWin.Attack) != 'undefined') {
			clearTimeout(this.handle_time);
			this.handle_time = null;
			if (this.BattleWin.Attack()) {
				return;
			}
		}
	}
	this.ToggleContent	= function() {
		var This = this;
		if (!this.created) {
			$(this.cid).html(this.contentHTML);
			if (this.started) {
				$("#auto_udar_start").val("РЎС‚РѕРї");
			}
			$("#auto_udar_start").bind("click", function() {
				if (!This.started) {
					if (This.options.color_frend_team == 1) {
						$('#a_u_color_frend_team').removeAttr("checked");
						This.options.color_frend_team = 0;
						This.master.SaveOptions();
					}
					if (This.options.rentgen == 1) {
						$('#a_u_rentgen').removeAttr("checked");
						This.options.rentgen = 0;
						This.master.SaveOptions();
					}
					This.Begin();
				} else {
					This.End(false);
				}
			});
			$("#auto_udar_options").bind("click", function() {
				if ($("#auto_udar td:eq(2)").css("display") == "none")
					$("#auto_udar td:gt(1),#auto_udar_add_opt").show();
				else
					$("#auto_udar td:gt(1),#auto_udar_add_opt").hide();
				This.master.ResizeFrame();
			});
			$("#auto_udar .auto_udar_opt_box").change(function() {
				if (this.id == "a_u_attack_auto") {
					if ($(this).is(":checked")) {
						This.AutoBegin=true;
						This.options.auto = 1;
						if (This.options.color_frend_team == 1) {
							$('#a_u_color_frend_team').removeAttr("checked");
							This.options.color_frend_team = 0;
						}
						if (This.options.rentgen == 1) {
							$('#a_u_rentgen').removeAttr("checked");
							This.options.rentgen = 0;
						}
					} else {
						This.AutoBegin = false;
						This.options.auto = 0;
					}
				} else if (this.id == "a_u_scan_team") {
					if ($(this).is(":checked")) {
						This.options.scan_team = 1;
					} else {
						This.options.scan_team = 0;
					}
				} else if (this.id == "a_u_tank_ak") {
					if ($(this).is(":checked")) {
						This.options.tank_ak = 1;
					} else {
						This.options.tank_ak = 0;
					}
				} else if (this.id == "a_u_tank_au") {
					if ($(this).is(":checked")) {
						This.options.tank_au = 1;
					} else {
						This.options.tank_au = 0;
					}
				} else if (this.id == "a_u_uvorot") {
					if ($(this).is(":checked")) {
						This.options.uvorot = 1;
					} else {
						This.options.uvorot = 0;
					}
				} else if (this.id == "a_u_uvorot_au") {
					if ($(this).is(":checked")) {
						This.options.uvorot_au = 1;
					} else {
						This.options.uvorot_au = 0;
					}
				} else if (this.id == "a_u_uvorot_ak") {
					if ($(this).is(":checked")) {
						This.options.uvorot_ak = 1;
					} else {
						This.options.uvorot_ak = 0;
					}
				} else if (this.id == "a_u_krit") {
					if ($(this).is(":checked")) {
						This.options.krit = 1;
					} else {
						This.options.krit = 0;
					}
				} else if (this.id == "a_u_krit_au") {
					if ($(this).is(":checked")) {
						This.options.krit_au = 1;
					} else {
						This.options.krit_au = 0;
					}
				} else if (this.id == "a_u_krit_ak") {
					if ($(this).is(":checked")) {
						This.options.krit_ak = 1;
					} else {
						This.options.krit_ak = 0;
					}
				} else if (this.id == "a_u_nevid") {
					if ($(this).is(":checked")) {
						This.options.nevid = 1;
					} else {
						This.options.nevid = 0;
					}
				} else if (this.id == "a_u_lvl_info") {
					if ($(this).is(":checked")) {
						This.options.lvl_info = 1;
						if (This.options.fast == 1) {
							$('#a_u_fast').removeAttr("checked");
							This.options.fast = 0;
						}
					} else {
						This.options.lvl_info = 0;
					}
				} else if (this.id == "a_u_color_frend_team") {
					if ($(this).is(":checked")) {
						This.options.color_frend_team = 1;
						if (This.AutoBegin) {
							$('#a_u_attack_auto').removeAttr("checked");
							This.AutoBegin = false;
							This.options.auto = 0;
						}
						if (This.options.fast == 1) {
							$('#a_u_fast').removeAttr("checked");
							This.options.fast = 0;
						}
					} else {
						This.options.color_frend_team = 0;
					}
				} else if (this.id == "a_u_rentgen") {
					if ($(this).is(":checked")) {
						This.options.rentgen = 1;
						if (This.AutoBegin) {
							$('#a_u_attack_auto').removeAttr("checked");
							This.AutoBegin = false;
							This.options.auto = 0;
						}
						if (This.options.fast == 1) {
							$('#a_u_fast').removeAttr("checked");
							This.options.fast = 0;
						}
					} else {
						This.options.rentgen = 0;
					}
				} else if (this.id == "a_u_fast") {
					if ($(this).is(":checked")) {
						This.options.fast = 1;
						if (This.options.color_frend_team == 1) {
							$('#a_u_color_frend_team').removeAttr("checked");
							This.options.color_frend_team = 0;
						}
						if (This.options.rentgen == 1) {
							$('#a_u_rentgen').removeAttr("checked");
							This.options.rentgen = 0;
						}
						if (This.options.lvl_info == 1) {
							$('#a_u_lvl_info').removeAttr("checked");
							This.options.lvl_info = 0;
						}
					} else {
						This.options.fast = 0;
					}
				} else if (this.id == "a_u_mini_read_classpers") {
					if ($(this).is(":checked")) {
						This.options.mini_read_classpers = 1;
						if (This.options.uvorot_au == 1) {
							$('#a_u_uvorot_au').removeAttr("checked");
							This.options.uvorot_au = 0;
						}
						if (This.options.uvorot_ak == 1) {
							$('#a_u_uvorot_ak').removeAttr("checked");
							This.options.uvorot_ak = 0;
						}
						if (This.options.krit_au == 1) {
							$('#a_u_krit_au').removeAttr("checked");
							This.options.krit_au = 0;
						}
						if (This.options.krit_ak == 1) {
							$('#a_u_krit_ak').removeAttr("checked");
							This.options.krit_ak = 0;
						}
						$('#a_u_font_uvorot_au').prop("style").opacity = 0;
						$('#a_u_uvorot_au').prop("disabled", 1);
						$('#a_u_uvorot_au').prop("style").opacity = 0;
						$('#a_u_font_uvorot_au_min').prop("style").opacity = 0;
						$('#a_u_minU_aulevel').prop("disabled", 1);
						$('#a_u_minU_aulevel').prop("style").opacity = 0;
						$('#a_u_font_uvorot_au_max').prop("style").opacity = 0;
						$('#a_u_maxU_aulevel').prop("disabled", 1);
						$('#a_u_maxU_aulevel').prop("style").opacity = 0;
						$('#a_u_font_uvorot_ak').prop("style").opacity = 0;
						$('#a_u_uvorot_ak').prop("disabled", 1);
						$('#a_u_uvorot_ak').prop("style").opacity = 0;
						$('#a_u_font_uvorot_ak_min').prop("style").opacity = 0;
						$('#a_u_minU_aklevel').prop("disabled", 1);
						$('#a_u_minU_aklevel').prop("style").opacity = 0;
						$('#a_u_font_uvorot_ak_max').prop("style").opacity = 0;
						$('#a_u_maxU_aklevel').prop("disabled", 1);
						$('#a_u_maxU_aklevel').prop("style").opacity = 0;
						$('#a_u_font_krit_au').prop("style").opacity = 0;
						$('#a_u_krit_au').prop("disabled", 1);
						$('#a_u_krit_au').prop("style").opacity = 0;
						$('#a_u_font_krit_au_min').prop("style").opacity = 0;
						$('#a_u_minK_aulevel').prop("disabled", 1);
						$('#a_u_minK_aulevel').prop("style").opacity = 0;
						$('#a_u_font_krit_au_max').prop("style").opacity = 0;
						$('#a_u_maxK_aulevel').prop("disabled", 1);
						$('#a_u_maxK_aulevel').prop("style").opacity = 0;
						$('#a_u_font_krit_ak').prop("style").opacity = 0;
						$('#a_u_krit_ak').prop("disabled", 1);
						$('#a_u_krit_ak').prop("style").opacity = 0;
						$('#a_u_font_krit_ak_min').prop("style").opacity = 0;
						$('#a_u_minK_aklevel').prop("disabled", 1);
						$('#a_u_minK_aklevel').prop("style").opacity = 0;
						$('#a_u_font_krit_ak_max').prop("style").opacity = 0;
						$('#a_u_maxK_aklevel').prop("disabled", 1);
						$('#a_u_maxK_aklevel').prop("style").opacity = 0;
					} else {
						This.options.mini_read_classpers = 0;
						$('#a_u_font_uvorot_au').prop("style").opacity = 1;
						$('#a_u_uvorot_au').prop("disabled", 0);
						$('#a_u_uvorot_au').prop("style").opacity = 1;
						$('#a_u_font_uvorot_au_min').prop("style").opacity = 1;
						$('#a_u_minU_aulevel').prop("disabled", 0);
						$('#a_u_minU_aulevel').prop("style").opacity = 1;
						$('#a_u_font_uvorot_au_max').prop("style").opacity = 1;
						$('#a_u_maxU_aulevel').prop("disabled", 0);
						$('#a_u_maxU_aulevel').prop("style").opacity = 1;
						$('#a_u_font_uvorot_ak').prop("style").opacity = 1;
						$('#a_u_uvorot_ak').prop("disabled", 0);
						$('#a_u_uvorot_ak').prop("style").opacity = 1;
						$('#a_u_font_uvorot_ak_min').prop("style").opacity = 1;
						$('#a_u_minU_aklevel').prop("disabled", 0);
						$('#a_u_minU_aklevel').prop("style").opacity = 1;
						$('#a_u_font_uvorot_ak_max').prop("style").opacity = 1;
						$('#a_u_maxU_aklevel').prop("disabled", 0);
						$('#a_u_maxU_aklevel').prop("style").opacity = 1;
						$('#a_u_font_krit_au').prop("style").opacity = 1;
						$('#a_u_krit_au').prop("disabled", 0);
						$('#a_u_krit_au').prop("style").opacity = 1;
						$('#a_u_font_krit_au_min').prop("style").opacity = 1;
						$('#a_u_minK_aulevel').prop("disabled", 0);
						$('#a_u_minK_aulevel').prop("style").opacity = 1;
						$('#a_u_font_krit_au_max').prop("style").opacity = 1;
						$('#a_u_maxK_aulevel').prop("disabled", 0);
						$('#a_u_maxK_aulevel').prop("style").opacity = 1;
						$('#a_u_font_krit_ak').prop("style").opacity = 1;
						$('#a_u_krit_ak').prop("disabled", 0);
						$('#a_u_krit_ak').prop("style").opacity = 1;
						$('#a_u_font_krit_ak_min').prop("style").opacity = 1;
						$('#a_u_minK_aklevel').prop("disabled", 0);
						$('#a_u_minK_aklevel').prop("style").opacity = 1;
						$('#a_u_font_krit_ak_max').prop("style").opacity = 1;
						$('#a_u_maxK_aklevel').prop("disabled", 0);
						$('#a_u_maxK_aklevel').prop("style").opacity = 1;
					}
				} else if (this.id == "a_u_settings") {
					if ($(this).is(":checked")) {
						This.options.settings = 1;
					} else {
						This.options.settings = 0;
					}
				} else if (this.id == "a_u_auto_answer") {
					if ($(this).is(":checked")) {
						This.options.autoanswer = 1;
					} else {
						This.options.autoanswer = 0;
					}
				} else {
					This.options.areas.block.splice(0, This.options.areas.block.length);
					This.options.areas.hit.splice(0, This.options.areas.hit.length);
					$("#auto_udar .auto_udar_opt_box:checked").each(function() {
						if (this.id.indexOf('a_u_attack') != -1) {
							var option = this.id.replace('a_u_attack_', '');
							option = parseInt(option, 10);
							if (!isNaN(option))
								This.options.areas.hit.push(option);
						} else if (this.id.indexOf('a_u_defend') != -1) {
							var option = this.id.replace('a_u_defend_','');
							option = parseInt(option, 10);
							if (!isNaN(option))
								This.options.areas.block.push(option);
						}
					});
				}
				This.master.SaveOptions();
			});
			$("#auto_udar .auto_udar_textbox").keydown(function(e) {
				var key = e.charCode || e.keyCode || 0;
				return (key == 8 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
			});
			$("#auto_udar .auto_udar_textbox").keyup(function() {
				if (this.id == 'a_u_life') {
					This.options.life = parseInt($(this).val(), 10);
				} else if (this.id == 'a_u_time') {
					var t = parseInt($(this).val(), 10);
					This.options.time = (t < 3 && t != 0?3:t);
					This.TimeOut = (t < 3 && t != 0?3:t);
				} else if (this.id == 'a_u_minT_aklevel') {
					This.options.mint_aklevel = parseInt($(this).val(), 10);
				} else if (this.id == 'a_u_maxT_aklevel') {
					This.options.maxt_aklevel = parseInt($(this).val(), 10);
				} else if (this.id == 'a_u_minT_aulevel') {
					This.options.mint_aulevel = parseInt($(this).val(), 10);
				} else if (this.id == 'a_u_maxT_aulevel') {
					This.options.maxt_aulevel = parseInt($(this).val(), 10);
				} else if (this.id == 'a_u_minUlevel') {
					This.options.minulevel = parseInt($(this).val(), 10);
				} else if (this.id == 'a_u_maxUlevel') {
					This.options.maxulevel = parseInt($(this).val(), 10);
				} else if (this.id == 'a_u_minU_aulevel') {
					This.options.minu_aulevel = parseInt($(this).val(), 10);
				} else if (this.id == 'a_u_maxU_aulevel') {
					This.options.maxu_aulevel = parseInt($(this).val(), 10);
				} else if (this.id == 'a_u_minU_aklevel') {
					This.options.minu_aklevel = parseInt($(this).val(), 10);
				} else if (this.id == 'a_u_maxU_aklevel') {
					This.options.maxu_aklevel = parseInt($(this).val(), 10);
				} else if (this.id == 'a_u_minKlevel') {
					This.options.minklevel = parseInt($(this).val(), 10);
				} else if (this.id == 'a_u_maxKlevel') {
					This.options.maxklevel = parseInt($(this).val(), 10);
				} else if (this.id == 'a_u_minK_aulevel') {
					This.options.mink_aulevel = parseInt($(this).val(), 10);
				} else if (this.id == 'a_u_maxK_aulevel') {
					This.options.maxk_aulevel = parseInt($(this).val(), 10);
				} else if (this.id == 'a_u_minK_aklevel') {
					This.options.mink_aklevel = parseInt($(this).val(), 10);
				} else if (this.id == 'a_u_maxK_aklevel') {
					This.options.maxk_aklevel = parseInt($(this).val(), 10);
				} else if (this.id == 'a_u_lvl_answer') {
					This.options.lvl_answer = parseInt($(this).val(), 10);
				} else if (this.id == 'a_u_answer_time') {
					This.options.answertime = (parseInt($(this).val(), 10) > 60 ? 60 : parseInt($(this).val(), 10));
				}
				This.master.SaveOptions();
			});
			$(this.options.areas.hit).each(function() {
				$("#a_u_attack_" + this).attr("checked", "checked");
			});
			$(this.options.areas.block).each(function() {
				$("#a_u_defend_" + this).attr("checked", "checked");
			});
			$('#a_u_life').val(this.options.life);
			$('#a_u_time').val(this.options.time);
			$('#a_u_minT_aklevel').val(this.options.mint_aklevel);
			$('#a_u_maxT_aklevel').val(this.options.maxt_aklevel);
			$('#a_u_minT_aulevel').val(this.options.mint_aulevel);
			$('#a_u_maxT_aulevel').val(this.options.maxt_aulevel);
			$('#a_u_minUlevel').val(this.options.minulevel);
			$('#a_u_maxUlevel').val(this.options.maxulevel);
			$('#a_u_minU_aulevel').val(this.options.minu_aulevel);
			$('#a_u_maxU_aulevel').val(this.options.maxu_aulevel);
			$('#a_u_minU_aklevel').val(this.options.minu_aklevel);
			$('#a_u_maxU_aklevel').val(this.options.maxu_aklevel);
			$('#a_u_minKlevel').val(this.options.minklevel);
			$('#a_u_maxKlevel').val(this.options.maxklevel);
			$('#a_u_minK_aulevel').val(this.options.mink_aulevel);
			$('#a_u_maxK_aulevel').val(this.options.maxk_aulevel);
			$('#a_u_minK_aklevel').val(this.options.mink_aklevel);
			$('#a_u_maxK_aklevel').val(this.options.maxk_aklevel);
			$('#a_u_lvl_answer').val(this.options.lvl_answer);
			$('#a_u_answer_time').val(this.options.answertime);
			if (this.options.auto == 1) $('#a_u_attack_auto').attr("checked", "checked");
			if (this.options.scan_team == 1) $('#a_u_scan_team').attr("checked", "checked");
			if (this.options.tank_ak == 1) $('#a_u_tank_ak').attr("checked", "checked");
			if (this.options.tank_au == 1) $('#a_u_tank_au').attr("checked", "checked");
			if (this.options.uvorot == 1) $('#a_u_uvorot').attr("checked", "checked");
			if (this.options.uvorot_au == 1) $('#a_u_uvorot_au').attr("checked", "checked");
			if (this.options.uvorot_ak == 1) $('#a_u_uvorot_ak').attr("checked", "checked");
			if (this.options.krit == 1) $('#a_u_krit').attr("checked", "checked");
			if (this.options.krit_au == 1) $('#a_u_krit_au').attr("checked", "checked");
			if (this.options.krit_ak == 1) $('#a_u_krit_ak').attr("checked", "checked");
			if (this.options.nevid == 1) $('#a_u_nevid').attr("checked", "checked");
			if (this.options.lvl_info == 1) $('#a_u_lvl_info').attr("checked", "checked");
			if (this.options.color_frend_team == 1) $('#a_u_color_frend_team').attr("checked", "checked");
			if (this.options.rentgen == 1) $('#a_u_rentgen').attr("checked", "checked");
			if (this.options.fast == 1) $('#a_u_fast').attr("checked", "checked");
			if (this.options.mini_read_classpers == 1) {
				$('#a_u_mini_read_classpers').attr("checked", "checked");
				$('#a_u_font_uvorot_au').prop("style").opacity = 0;
				$('#a_u_uvorot_au').prop("disabled", 1);
				$('#a_u_uvorot_au').prop("style").opacity = 0;
				$('#a_u_font_uvorot_au_min').prop("style").opacity = 0;
				$('#a_u_minU_aulevel').prop("disabled", 1);
				$('#a_u_minU_aulevel').prop("style").opacity = 0;
				$('#a_u_font_uvorot_au_max').prop("style").opacity = 0;
				$('#a_u_maxU_aulevel').prop("disabled", 1);
				$('#a_u_maxU_aulevel').prop("style").opacity = 0;
				$('#a_u_font_uvorot_ak').prop("style").opacity = 0;
				$('#a_u_uvorot_ak').prop("disabled", 1);
				$('#a_u_uvorot_ak').prop("style").opacity = 0;
				$('#a_u_font_uvorot_ak_min').prop("style").opacity = 0;
				$('#a_u_minU_aklevel').prop("disabled", 1);
				$('#a_u_minU_aklevel').prop("style").opacity = 0;
				$('#a_u_font_uvorot_ak_max').prop("style").opacity = 0;
				$('#a_u_maxU_aklevel').prop("disabled", 1);
				$('#a_u_maxU_aklevel').prop("style").opacity = 0;
				$('#a_u_font_krit_au').prop("style").opacity = 0;
				$('#a_u_krit_au').prop("disabled", 1);
				$('#a_u_krit_au').prop("style").opacity = 0;
				$('#a_u_font_krit_au_min').prop("style").opacity = 0;
				$('#a_u_minK_aulevel').prop("disabled", 1);
				$('#a_u_minK_aulevel').prop("style").opacity = 0;
				$('#a_u_font_krit_au_max').prop("style").opacity = 0;
				$('#a_u_maxK_aulevel').prop("disabled", 1);
				$('#a_u_maxK_aulevel').prop("style").opacity = 0;
				$('#a_u_font_krit_ak').prop("style").opacity = 0;
				$('#a_u_krit_ak').prop("disabled", 1);
				$('#a_u_krit_ak').prop("style").opacity = 0;
				$('#a_u_font_krit_ak_min').prop("style").opacity = 0;
				$('#a_u_minK_aklevel').prop("disabled", 1);
				$('#a_u_minK_aklevel').prop("style").opacity = 0;
				$('#a_u_font_krit_ak_max').prop("style").opacity = 0;
				$('#a_u_maxK_aklevel').prop("disabled", 1);
				$('#a_u_maxK_aklevel').prop("style").opacity = 0;
			}
			if (this.options.settings == 1) $('#a_u_settings').attr("checked", "checked");
			if (this.options.autoanswer == 1) $('#a_u_auto_answer').attr("checked", "checked");
			this.created = true;
		} else {
			$("#auto_udar").toggle();
		}
		this.master.ResizeFrame();
	}
	this.Dispose		= function() {
		this.created = false;
		this.MenuItem().css("background-color", "");
	}
}
var AutoUdarOldPl = function() {
    this.help				= "#";	
    this.name				= "РђРІС‚РѕРЈРґР°СЂ";
    this.id					= "AutoUdarOld";
    this.master				= null;
    this.menuitem			= null;
    this.created			= false;
    this.mid				= null;
    this.cid				= null;
    this.started_old		= false;
    this.enabled			= true;
    this.RefreshCounter_old	= 0;
    this.BattleID_old		= 0;
	this.auto_heal_temp		= 0;
    this.LifeLimit_old		= 20;
    this.BattleWin_old		= null;
    this.TimeOut_old		= 0;
	this.last_strike_old	= -1;
	this.handle_time_old	= null;
    this.AutoBegin_old		= false;
    this.options			= {areas_old:{hit_old:[1, 2, 3, 4], block_old:[1, 2, 3, 4]}, 
								life_old:0, time_old:0, auto_old:0, auto_heal:0, auto_heal_vstr:0, auto_heal_vstr_one:0, auto_heal_hand:0,
								auto_wisd:0, bots:"", ares_11:0, ares_12:0, ares_14:0, fobos_11:0, fobos_12:0,
								hp_min:0, hp_max:0, even_old:1, odd_old:1, hp_min_max_old:0, max_hp:0};
    this.contentHTML	= '<table id="auto_udar_old" cellpadding="0"><tr valign="top">'+
						'<td style="width:2px;"></td><td style=" text-align:left; width:107px">'+
						'<input id="auto_udar_old_start" type="button" value="РЎС‚Р°СЂС‚" style="width:46px"/>'+
    					'<input id="auto_udar_old_options" type="button" value="РћРїС†РёРё" style="width:46px"/>'+
						'<div id="auto_udar_old_add_opt">'+
						'РђРІС‚РѕCС‚Р°СЂС‚&nbsp;&nbsp;<input style="margin-top:2px" id="a_u_o_attack_auto" class="auto_udar_old_opt_box" type="checkbox"/><br/>'+
						'РњР°СЂРёРЅР°Рґ (СЃРµРє.):&nbsp;<input id="a_u_o_time_old" class="auto_udar_old_textbox" type="text" value="0" style="width:21px"/><br/>'+
						'</div>'+
						'</td><td style="width:2px;display:none"></td><td style="display:none; width:61px">'+
						'<input id="a_u_o_attack_1" class="auto_udar_old_opt_box" type="checkbox"/>&nbsp;Р’ РіРѕР»РѕРІСѓ<br/>'+
    					'<input id="a_u_o_attack_2" class="auto_udar_old_opt_box" type="checkbox"/>&nbsp;Р’ РєРѕСЂРїСѓСЃ<br/>'+
						'<input id="a_u_o_attack_3" class="auto_udar_old_opt_box" type="checkbox"/>&nbsp;Р’ РїРѕСЏСЃ<br/>'+
    					'<input id="a_u_o_attack_4" class="auto_udar_old_opt_box" type="checkbox"/>&nbsp;Р’ РЅРѕРіРё<br/>'+
						'</td><td style="width:2px;display:none"></td><td style="display:none; width:51px">'+
						'<input id="a_u_o_defend_1" class="auto_udar_old_opt_box" type="checkbox"/>&nbsp;Р“РѕР»РѕРІСѓ<br/>'+
    					'<input id="a_u_o_defend_2" class="auto_udar_old_opt_box" type="checkbox"/>&nbsp;РљРѕСЂРїСѓСЃ<br/>'+
						'<input id="a_u_o_defend_3" class="auto_udar_old_opt_box" type="checkbox"/>&nbsp;РџРѕСЏСЃ<br/>'+
    					'<input id="a_u_o_defend_4" class="auto_udar_old_opt_box" type="checkbox"/>&nbsp;РќРѕРіРё<br/>'+
						'</td><td style="width:2px;"></td><td valign="top" style="display:none; width:194px">'+
    					'РЎС‚РѕРї РїСЂРё HP РЅРёР¶Рµ:&nbsp;<input id="a_u_o_life" class="auto_udar_old_textbox" type="text" value="0" style="width:27px"/>&nbsp;* 0 - СѓРјРёСЂР°С‚СЊ<br/>'+
						'РђРІС‚РѕРҐРёР» РїСЂРё HP РЅРёР¶Рµ:&nbsp;<input id="a_u_o_auto_heal" class="auto_udar_old_textbox" type="text" value="0" style="width:27px"/>&nbsp;* 0 - РЅРµС‚<br/>'+
						'<input style="margin-top:2px" id="a_u_o_auto_heal_vstr" class="auto_udar_old_opt_box" type="checkbox"/>&nbsp;РСЃРїРѕР»СЊР·РѕРІР°С‚СЊ РҐРёР»Р»-Р’СЃС‚СЂРѕР№РєРё<br/>'+
						'<input style="margin-top:2px" id="a_u_o_auto_heal_vstr_one" class="auto_udar_old_opt_box" type="checkbox" disabled/>&nbsp;РЎРїРµСЂРІР° Р’СЃС‚СЂРѕР№РєРё.'+
						'&nbsp;<input style="margin-top:2px" id="a_u_o_auto_heal_hand" class="auto_udar_old_opt_box" type="checkbox"/>&nbsp;Р РІ В«СЂСѓС‡РЅРѕРјВ»'+
						'</td>' +
						'<td style="width:2px;display:none"></td>'+
						'<td style="width:549px;display:none">' + 
						'<input style="margin-top:2px" id="a_u_o_wisd" class="auto_udar_old_opt_box" type="checkbox"/>'+
						'&nbsp;РђРІС‚РѕР‘РѕР№ РґР»СЏ Р РёСЃС‚Р°Р»С‹ (СЃРїРёСЃРѕРє РјРѕР±РѕРІ Р±РµР· СЃРєРѕР±РѕРє, С‡РµСЂРµР· Р·РїС‚, Р±РµР· РїСЂРѕР±РµР»РѕРІ, Р±РµР· РђСЂРµСЃРѕРІ Рё Р¤РѕР±РѕСЃРѕРІ)<br/>' +
						'<input style="margin-top:0px" class="auto_text_textbox" id="a_u_o_bots" type="text" value="" size="95"/><br/>'+
						'<input style="margin-top:2px" id="a_u_o_ares_11" class="auto_udar_old_opt_box" type="checkbox"/>&nbsp;РђСЂРµСЃ-11.'+
						'&nbsp;<input id="a_u_o_ares_12" class="auto_udar_old_opt_box" type="checkbox"/>&nbsp;РђСЂРµСЃ-12.'+
						'&nbsp;<input id="a_u_o_ares_14" class="auto_udar_old_opt_box" type="checkbox"/>&nbsp;РђСЂРµСЃ-14.'+
						'&nbsp;<input id="a_u_o_fobos_11" class="auto_udar_old_opt_box" type="checkbox"/>&nbsp;Р¤РѕР±РѕСЃ-11.'+
						'&nbsp;<input id="a_u_o_fobos_12" class="auto_udar_old_opt_box" type="checkbox"/>&nbsp;Р¤РѕР±РѕСЃ-12<br/>'+
						'<input style="margin-top:2px" id="a_u_o_max_hp" class="auto_udar_old_opt_box" type="checkbox"/>&nbsp;РџРѕРёСЃРє СЃ max HP.' +
						'&nbsp;<input id="a_u_o_even_old" class="auto_udar_old_opt_box" type="checkbox"/>&nbsp;Р‘РёС‚СЊ С‡С‘С‚РЅС‹С…,' +
						'&nbsp;<input id="a_u_o_odd_old" class="auto_udar_old_opt_box" type="checkbox"/>&nbsp;РќРµС‡С‘С‚РЅС‹С….' +
						'&nbsp;<input id="a_u_o_hp_min_max_old" class="auto_udar_old_opt_box" type="checkbox"/>' +
						'&nbsp;РќРµ Р±РёС‚СЊ СЃ РќР  <=&nbsp;<input id="a_u_o_hp_min" class="auto_udar_old_textbox" type="text" value="0" style="width:26px"/>,' +
						'&nbsp;СЃ РќР  >=&nbsp;<input id="a_u_o_hp_max" class="auto_udar_old_textbox" type="text" value="0" style="width:26px"/>' +
						'&nbsp;* 0 - СЃ Р»СЋР±С‹Рј HP' +
						'</td>' +
						'</tr></table>';
    this.Start = function(win) {
        if (win.document.URL.indexOf("fbattle.php") != -1) { 
		    this.BattleWin_old = null;
            this.BattleWin_old = win;
		    var This = this;
            var html_doc = win.document.getElementsByTagName("head");
            if (html_doc.length > 0)
            	html_doc = html_doc[0];
            else
                html_doc = win.document.body;
            var js_plugin = win.document.createElement("script");
            js_plugin.setAttribute("type", "text/javascript");
            js_plugin.setAttribute("src", "http://old-mercenaries.ru/plugins/laba/Autoudar_old.js?" + Math.random());
            js_plugin.setAttribute("charset", "utf-8");
            html_doc.appendChild(js_plugin);
		    js_plugin = null;	
        }
    }
    this.ApplyOptions = function() {
        var This = this;
        if (this.master != null) {
            $(this.master.global_options).each(function(){
                if (this.id == This.id) {
                    if (this.enabled)
                        This.Enable();
                    else
                        This.Disable();
                    if (!$.isEmptyObject(this.value)) {
                        This.options = $.extend(This.options, this.value);
                        This.AutoBegin_old = (This.options.auto_old == 1)?true:false;
                        This.TimeOut_old = This.options.time_old;
                    } else {
                        This.options = {areas_old:{hit_old:[1, 2, 3, 4], block_old:[1, 2, 3, 4]}, 
										life_old:0, time_old:0, auto_old:0,
										auto_heal:0, auto_heal_vstr:0, auto_heal_vstr_one:0, auto_heal_hand:0,
										auto_wisd:0, bots:"", ares_11:0, ares_12:0, ares_14:0, fobos_11:0, fobos_12:0,
										hp_min:0, hp_max:0, even_old:1, odd_old:1, hp_min_max_old:0, max_hp:0};
					}
                }
            })

        }
    }
	this.Enable = function() {
        this.enabled = true;
        var mi = this.MenuItem();
        if (mi != null) {
            mi.removeClass("input_pl_off");
        }
    }
    this.Disable = function() {
        this.enabled = false;
        this.End_old(false);
        var mi = this.MenuItem();
        if (mi != null) {
            mi.addClass("input_pl_off");
        }
    }
    this.MenuItem = function() {
        if ((this.master != null) && (this.menuitem == null)) {
            var This = this;
            This.mid = this.master.menu_id;
            This.cid = this.master.content_id;
            var menu_item = $('<input type="button" value="РђРІС‚РѕРЈРґР°СЂ"/>');
            menu_item.bind('click', function() {
                if (This.master.Current != This) {
                    This.master.Current.Dispose();
                }
                $(this).css("background-color", "#f0f0f0");
                This.master.Current = This;
                This.ToggleContent_old();
            });
            this.menuitem = $(menu_item);
            return this.menuitem;
        }
        else
            return this.menuitem;
    }
    this.Begin_old = function() {   
        if(!this.enabled) {
            alert("РџР»Р°РіРёРЅ РІС‹РєР»СЋС‡РµРЅ. РџРµСЂРµР№РґРёС‚Рµ РІ РїСѓРЅРєС‚ РІРµСЂС…РЅРµРіРѕ РјРµРЅСЋ *РќР°СЃС‚СЂРѕР№РєРё* Рё РІРєР»СЋС‡РёС‚Рµ РµРіРѕ");
        }
        if ((!this.started_old) && (this.BattleID_old != 0)) {
            if (this.BattleWin_old != null) {
                this.started_old = true;
				this.auto_heal_temp = this.options.auto_heal;
                $("#auto_udar_old_start").val('РЎС‚РѕРї');
                this.BattleWin_old.Attack_old();
            } else {
                alert("РћРєРЅРѕ Р±РѕСЏ РµС‰Рµ РЅРµ РїСЂРёРІСЏР·Р°РЅРѕ. РџРµСЂРІС‹Р№ СѓРґР°СЂ РЅР°РЅРµСЃРёС‚Рµ СЃР°РјРё");
            }
        }
    }
    this.End_old = function(clear_id) {
        if (clear_id) {
        	this.BattleID_old = 0;
			this.RefreshCounter_old = 0;
        }
        this.started_old = false;
		this.auto_heal_temp = 0;
        this.last_strike_old = -1;
        clearTimeout(this.handle_time_old);
        $("#auto_udar_old_start").val('РЎС‚Р°СЂС‚');
    }
    this.WaitTimeOut_old = function(time_old) {
        var This = this;
        if ((this.TimeOut_old != 0) && (this.TimeOut_old != 999)) {
            var h = parseInt(time_old.substring(0, time_old.indexOf(":")));
            var m = parseInt(time_old.substr(time_old.indexOf(":") + 1));
            if ((isNaN(h)) || (isNaN(m))) {
                return false;
            }
            var new_time_old = h * 60 + m;
            if (new_time_old != this.last_strike_old) {
                this.last_strike_old = new_time_old;
                if (this.handle_time_old != null)
                    clearTimeout(this.handle_time_old);
                var This = this;
                this.handle_time_old = setTimeout(function(){ASO.TimeAttack_old();}, 1000 * (this.TimeOut_old) - 400);
                return true;    
            } else 
				if (this.handle_time_old == null) {
                	this.handle_time_old = setTimeout(function(){ASO.TimeAttack_old();}, 1000 * (this.TimeOut_old) - 400);
                	return false;
            	}
            return true;
        } else {
            clearTimeout(this.handle_time_old);
            return false;
        }       
    }
    this.TimeAttack_old = function() {
        if ((this.BattleWin_old != null) && (typeof(this.BattleWin_old.Attack_old) != 'undefined')) {
	        clearTimeout(this.handle_time_old);
            this.handle_time_old = null;
            if (this.BattleWin_old.Attack_old()) {	
		        setTimeout(function(){ASO.BattleWin_old.location.href='fbattle.php?batl=';}, 1000);	
		        return;
	        }
        }
        this.handle_time_old = setTimeout(function(){ASO.TimeAttack_old();},500);
    }
    this.ToggleContent_old = function() {
        var This = this;
        if (!this.created) {
            $(this.cid).html(this.contentHTML);
            if (this.started_old) {
                $("#auto_udar_old_start").val("РЎС‚РѕРї");
            }
            $("#auto_udar_old_start").bind("click", function() {
                if (!This.started_old) {
                    This.Begin_old();
                } else {   
                    This.End_old(false);
                }
            });
			$("#a_u_o_wisd").change(function() {
            	if ($(this).is(":checked")) {
					This.options.auto_wisd = 1;
				} else {
					This.options.auto_wisd = 0;
				}
             	This.master.SaveOptions();
			});
			$("#a_u_o_ares_11").change(function() {
            	if ($(this).is(":checked")){
					This.options.ares_11 = 1;
				} else {
					This.options.ares_11 = 0;
				}
             	This.master.SaveOptions();
			});
			$("#a_u_o_ares_12").change(function() {
            	if ($(this).is(":checked")) {
					This.options.ares_12 = 1;
				} else {
					This.options.ares_12 = 0;
				}
             	This.master.SaveOptions();
			});
			$("#a_u_o_ares_14").change(function() {
            	if ($(this).is(":checked")) {
					This.options.ares_14 = 1;
				} else {
					This.options.ares_14 = 0;
				}
             	This.master.SaveOptions();
			});
			$("#a_u_o_fobos_11").change(function() {
            	if ($(this).is(":checked")) {
					This.options.fobos_11 = 1;
				} else {
					This.options.fobos_11 = 0;
				}
             	This.master.SaveOptions();
			});
			$("#a_u_o_fobos_12").change(function() {
            	if($(this).is(":checked")) {
					This.options.fobos_12=1;
				} else {
					This.options.fobos_12=0;
				}
             	This.master.SaveOptions();
			});
			$("#a_u_o_auto_heal_vstr").change(function() {
            	if($(this).is(":checked")) {
					This.options.auto_heal_vstr=1;
					$('#a_u_o_auto_heal_vstr_one').prop("disabled", 0);
				} else {
					This.options.auto_heal_vstr=0;
					$('#a_u_o_auto_heal_vstr_one').prop("disabled", 1);
				}
             	This.master.SaveOptions();
			});
			$("#a_u_o_auto_heal_vstr_one").change(function() {
            	if($(this).is(":checked")) {
					This.options.auto_heal_vstr_one=1;
				} else {
					This.options.auto_heal_vstr_one=0;
				}
             	This.master.SaveOptions();
			});
			$("#a_u_o_auto_heal_hand").change(function() {
            	if($(this).is(":checked")) {
					This.options.auto_heal_hand=1;
				} else {
					This.options.auto_heal_hand=0;
				}
             	This.master.SaveOptions();
			});
			$("#a_u_o_max_hp").change(function() {
            	if($(this).is(":checked")) {
					This.options.max_hp=1;
				} else {
					This.options.max_hp=0;
				}
             	This.master.SaveOptions();
			});
			$("#a_u_o_hp_min_max_old").change(function() {
            	if($(this).is(":checked")) {
					This.options.hp_min_max_old=1;
				} else {
					This.options.hp_min_max_old=0;
				}
             	This.master.SaveOptions();
			});
			$("#a_u_o_odd_old").change(function() {
            	if($(this).is(":checked")) {
					This.options.odd_old=1;
				} else {
					This.options.odd_old=0;
					if (This.options.even_old == 0) {
						This.options.even_old=1;
						$("#a_u_o_even_old").attr("checked", "checked");
					}
				}
             	This.master.SaveOptions();
			});
			$("#a_u_o_even_old").change(function() {
            	if($(this).is(":checked")) {
					This.options.even_old=1;
				} else {
					This.options.even_old=0;
					if (This.options.odd_old == 0) {
						This.options.odd_old=1;
						$("#a_u_o_odd_old").attr("checked", "checked");
					}
				}
             	This.master.SaveOptions();
			});
            $("#auto_udar_old_options").bind("click",function() {
                if ($("#auto_udar_old td:eq(2)").css("display") == "none")
                    $("#auto_udar_old td:gt(1),#auto_udar_old_add_opt").show();
                else
                    $("#auto_udar_old td:gt(1),#auto_udar_old_add_opt").hide();
                This.master.ResizeFrame();
            });
            $("#auto_udar_old .auto_udar_old_opt_box").change(function() {
                if (this.id=="a_u_o_attack_auto") {
                    if ($(this).is(":checked")) {
                        This.AutoBegin_old=true;
                        This.options.auto_old = 1;
                    } else {
                        This.AutoBegin_old = false;
                        This.options.auto_old = 0;
                    }
                } else {
                    This.options.areas_old.block_old.splice(0, This.options.areas_old.block_old.length);
                    This.options.areas_old.hit_old.splice(0, This.options.areas_old.hit_old.length);
                    $("#auto_udar_old .auto_udar_old_opt_box:checked").each(function(){
                        if (this.id.indexOf('a_u_o_attack') != -1) {
                            var option = this.id.replace('a_u_o_attack_', '');
                            option = parseInt(option, 10);
							if (!isNaN(option))
                            	This.options.areas_old.hit_old.push(option);
                        } else 
							if (this.id.indexOf('a_u_o_defend') != -1) {
                            	var option = this.id.replace('a_u_o_defend_', '');
                            	option = parseInt(option, 10);
			    				if (!isNaN(option))
                            		This.options.areas_old.block_old.push(option);
                        	}
                    });
                }
                This.master.SaveOptions();
            });
            $("#auto_udar_old .auto_udar_old_textbox").keydown(function(e) {
            	var key = e.charCode || e.keyCode || 0;
            	return ((key == 8) || (key == 46) || ((key >= 48) && (key <= 57)) || ((key >= 96) && (key <= 105)));
            });
            $("#auto_udar_old .auto_udar_old_textbox").keyup(function(){
                if (this.id == 'a_u_o_life') {
                    This.options.life_old = parseInt($(this).val(), 10);
                } else {
					if (this.id == 'a_u_o_auto_heal') {
                   		This.options.auto_heal=parseInt($(this).val(),10);
           	   		} else {
						if (this.id=='a_u_o_time_old') {
    						var t = parseInt($(this).val(), 10);
               				This.options.time_old = (t < 3 && t != 0?3:t);
               				This.TimeOut_old = (t < 3 && t != 0?3:t);
               			} else {
							if (this.id=='a_u_o_hp_min') {
								This.options.hp_min = parseInt($(this).val(), 10);
							} else {
								if (this.id=='a_u_o_hp_max') {
									This.options.hp_max = parseInt($(this).val(), 10);
								}
							}
						}
					}
				}
				if ((this.id=='a_u_o_hp_min') || (this.id=='a_u_o_hp_max')) {
					if ((This.options.hp_min > 0) && (This.options.hp_max > 0)) {
						if (This.options.hp_min >= This.options.hp_max) {
							if (this.id=='a_u_o_hp_min') {
								This.options.hp_max = 0;
								$('#a_u_o_hp_max').val(This.options.hp_max);
							} else {
								This.options.hp_min = 0;
								$('#a_u_o_hp_min').val(This.options.hp_min);
							}
						}
					}
				}
               	This.master.SaveOptions();
            });
			$("#auto_udar_old .auto_text_textbox").keyup(function(){
				if (this.id == 'a_u_o_bots') {
                    This.options.bots = $(this).val();
                }
				This.master.SaveOptions();
			});
            $(this.options.areas_old.hit_old).each(function(){
                $("#a_u_o_attack_" + this).attr("checked", "checked");
            });
            $(this.options.areas_old.block_old).each(function(){
                $("#a_u_o_defend_" + this).attr("checked", "checked");
            });
			$('#a_u_o_hp_min').val(this.options.hp_min);
			$('#a_u_o_hp_max').val(this.options.hp_max);
            $('#a_u_o_life').val(this.options.life_old);
			$('#a_u_o_bots').val(this.options.bots);
			$('#a_u_o_auto_heal').val(this.options.auto_heal);
            $('#a_u_o_time_old').val(this.options.time_old);
            if (this.options.auto_old == 1)
                $('#a_u_o_attack_auto').attr("checked", "checked");
            if (this.options.auto_wisd == 1)
                $("#a_u_o_wisd").attr("checked", "checked");	
			if (this.options.ares_11 == 1)
                $("#a_u_o_ares_11").attr("checked", "checked");
			if (this.options.ares_12 == 1)
                $("#a_u_o_ares_12").attr("checked", "checked");
			if (this.options.ares_14 == 1)
                $("#a_u_o_ares_14").attr("checked", "checked");
			if (this.options.fobos_11 == 1)
                $("#a_u_o_fobos_11").attr("checked", "checked");
			if (this.options.fobos_12 == 1)
                $("#a_u_o_fobos_12").attr("checked", "checked");
			if (this.options.auto_heal_vstr == 1) {
                $("#a_u_o_auto_heal_vstr").attr("checked", "checked");
				$('#a_u_o_auto_heal_vstr_one').prop("disabled", 0);
			} else {
				$('#a_u_o_auto_heal_vstr_one').prop("disabled", 1);
			}
			if (this.options.auto_heal_vstr_one == 1)
                $("#a_u_o_auto_heal_vstr_one").attr("checked", "checked");
			if (this.options.auto_heal_hand == 1)
                $("#a_u_o_auto_heal_hand").attr("checked", "checked");	
			if (this.options.hp_min_max_old == 1)
                $("#a_u_o_hp_min_max_old").attr("checked", "checked");
			if (this.options.even_old == 1)
                $("#a_u_o_even_old").attr("checked", "checked");
			if (this.options.odd_old == 1)
                $("#a_u_o_odd_old").attr("checked", "checked");
			if (this.options.max_hp == 1)
                $("#a_u_o_max_hp").attr("checked", "checked");
            this.created = true;
        } else {
            $("#auto_udar_old").toggle();
        }
        this.master.ResizeFrame();
    }
    this.Dispose = function() {
        this.created = false;
		this.MenuItem().css("background-color", "");
    }
}
var RadioService = function() {
	this.id = "CloseRadio";
	this.menuitem = null;
	this.hide = true;
	this.options = {};
	this.MenuItem = function () {
	
	//$("body").html(init_html);
		if (this.master != null && this.menuitem == null) {
			var This = this;
			var menu_item = $('<a id="s_nwfm_a" target="_blank" href="http://free.rcast.pro/deepfm">Radio DeepFm</a>');
			this.menuitem = $(menu_item);
			return this.menuitem;
			/*menu_item.filter("#s_oldfm_a").bind('click', function () {
				This.ToggleContent();
			});
			menu_item.filter("#s_nwfm_a").bind('click', function () {
				if (This.master.new_radio == 0) {
					This.master.new_radio = 22;
				} else {
					This.master.new_radio = 0;
				}
				This.master.ResizeFrame();
			});
			this.menuitem = $(menu_item);
			return this.menuitem;
		} else
			return this.menuitem;*/
		}
	}
	this.ToggleContent = function () {
		if (this.hide) {
			$("#radio_oldfm").height('18px').width('421px');
			this.menuitem.filter("#s_oldfm_a").text("РЎРєСЂС‹С‚СЊ СЂР°РґРёРѕ OldFM");
			this.hide = false;
		} else {
			$("#radio_oldfm").height('0px').width('0px');
			this.menuitem.filter("#s_oldfm_a").text("РЎР»СѓС€Р°С‚СЊ СЂР°РґРёРѕ OldFM");
			this.hide = true;
		}
		this.master.ResizeFrame();
	}
	this.Dispose = function () {
	}
}

var SiteServices = function() {
	this.id = "SiteServices";
	this.master = null;
	this.menuitem = null;
	this.created = false;
	this.options = {};
	this.contentHTML = '<div id="site_service_content">' +
					   '&nbsp<a href="javascript:void(0)" id="a_site_hide">(РЎРєСЂС‹С‚СЊ)</a><div>';
	this.MenuItem		= function() {
		if (this.master != null && this.menuitem == null) {
			var This = this;
			This.mid = this.master.smenu_id;
			This.cid = this.master.scontent_id;
			var menu_item = $('' +
							'&nbsp;<a target="_blank" href="http://old-mercenaries.ru/doska.html">РЎРѕР±С‹С‚РёСЏ</a>' +
							'/<a target="_blank" href="http://old-mercenaries.ru/dressroom.html">РџСЂРёРјРµСЂРѕС‡РЅР°СЏ</a>' +
							'/<a target="_blank" href="http://old-mercenaries.ru/ruinmap.php">РљР°СЂС‚Р° Р СѓРёРЅ</a>' +
							'/<a></a>');
			menu_item.filter("#a_site_show").bind('click', function () {
				if (This.master.CurrentS != This) {
					This.master.CurrentS.Dispose();
				}
				This.master.CurrentS = This;
				This.ToggleContent();
			})
			this.menuitem = $(menu_item);
			return this.menuitem;
		}
		else
			return this.menuitem;
	}
	this.ToggleContent = function () {
		var This = this;
		if (!this.created) {
			$(this.cid).html(this.contentHTML);
			$(this.cid).find("#a_site_hide").bind("click", function () {
				This.ToggleContent();
			});
			this.created = true;
		}
		else {
			$("#site_service_content").toggle();
		}
		this.master.ResizeFrame();
	}
	this.Dispose = function () {
		this.created = false;
	}
}
var PluginMaster = function(init_html) {
	this.content_id		= "#left";
	this.menu_id		= "#left_m";
	this.scontent_id	= "#right";
	this.smenu_id		= "#right_m";
	this.plugins		= [];
	this.global_options	= [];
	this.Current		= {
		Dispose: function() {
			return false;
		}
	}
	this.CurrentS		= {
		Dispose: function() {
			return false;
		}
	}
	this.default_state	= true;
	this.finished		= false;
	this.services		= [];
	this.new_radio		= 0;
	this.bot_time		= -1;
	this.offset			= 0;
	this.buttons		= ((navigator.userAgent.toLowerCase().indexOf('chrome') > -1) ? 30 : 30);
	this.user			= {id:0, align:0, clan:'', name:'', level:0, city:''};
	this.Complete		= function() {
		this.finished = true;
		this.SaveOptions();
	}
	this.CollectOptions	= function() {
		var new_global_options = [];
		$(this.plugins).each(function () {
			new_global_options.push({id:this.id, value:this.options, enabled:this.enabled});
		});
		$(this.global_options).each(function () {
			var This = this;
			var found = false;
			$(new_global_options).each(function () {
				if (this.id == This.id) {
					found = true;
					return false;
				}
			});
			if (!found) {
				new_global_options.push(This);
			}
		});
		this.global_options = new_global_options;
	}
	this.AddPlugin		= function(plugin) {
		this.plugins.push(plugin);
		plugin.master = this;
		$("#left_m").append(plugin.MenuItem());
		if (this.global_options != null) {
			var found = false;
			$(this.global_options).each(function () {
				if (this.id == plugin.id) {
					found = true;
				}
			})
			if (!found) {
				this.global_options.push({id:plugin.id, value:{}, enabled:this.default_state});
			}
		}
		plugin.ApplyOptions();
		return plugin;
	}
	this.AddService		= function(service) {
		this.services.push(service);
		service.master = this;
		$("#right_m").append(service.MenuItem());
		return service;
	}
	this.FrameReLoad	= function(window) {
		$(this.plugins).each(function() {
			if (this.enabled) {
				this.Start(window);
			}
		});
	}
	this.ResizeFrame	= function() {
		var body = top.document.body;
		body.setAttribute("rows", $("body").outerHeight()+","+this.new_radio+",30,*,"+this.buttons);
		$("#radio_oldfm").scrollTop(106);
	}
	this.Init			= function() {
		if (typeof(window.opera) == 'undefined')
			$("html").css("overflow", "hidden");
		$("body").html(init_html);
		$('head').append('<link rel="stylesheet" type="text/css" href="http://old-mercenaries.ru/plugins/laba/Initialize.css"/>');
		this.global_options = $.cookie('mercenaries_plugin_options');
		if (this.global_options != null)
			this.global_options = $.evalJSON(this.global_options);
		else {
			this.global_options = [];
			this.default_state = false;
		}
		var This = this;
		$.ajax({
			url:"main.php?edit=1",
			success:function(data) {
				var regex = /<B>(.*?)<\/B> \[(\d+)\]<a href=inf\.php\?(\d+) target/;
				var res = data.match(regex);
				if (res && res.length > 1) {
					This.user.name = res[1];
					var TempInt = parseInt(res[2], 10);
					if (isNaN(TempInt)) {
						This.user.level = res[2];
					} else {
						This.user.level = TempInt;
					}
					var TempInt = parseInt(res[3], 10);
					if (isNaN(TempInt)) {
						This.user.id = res[3];
					} else {
						This.user.id = TempInt;
					}
					if (This.user.id == 146790 || This.user.id == 487171 || This.user.id == 21657 || 
					This.user.id == 489778 || This.user.id == 166074 || This.user.id == 489842 || 
					This.user.id == 535834 || This.user.id == 579909 || This.user.id == 256683 
					//|| This.user.id == 431523 /*РљРѕРІС€РёРє РёР· BlackAces*/
					//|| This.user.id == 53821 /*РќРµР·РІР°РЅРЅС‹Р№*/
					//|| This.user.id == 539387 /*- Homer Simpson -*/
					// РєР»Р°РЅ-РІР°СЂР° BlackAces || 
					//|| 
					//This.user.id == 431523 /*РљРѕРІС€РёРє РёР· BlackAces*/||
					//This.user.id == 34988 /*-koks-*/|| 
					//This.user.id == 286538 /*-Zmei-*/||
					//This.user.id == 395988 /*-Р­СЂРёРєР°- - Р“Р»Р°РІР° РєР»Р°РЅР°*/||
					//This.user.id == 72822 /*dan4ik*/||
					//This.user.id == 403782 /*Dobbin*/||
					//This.user.id == 12997 /*I love NYC*/||
					//This.user.id == 610510 /*keed*/||
					//This.user.id == 467010 /*РўРѕРјР°С‚*/||
					//This.user.id == 412286 /*Baghirov*/||
					//This.user.id == 448127 /*РљРѕР·С‹СЂРЅС‹Р№ РљРѕСЂРѕР»СЊ*/||
					//This.user.id == 99300 /*РќРµРїРѕРєРѕСЂРёРјС‹Р№*/||
					//This.user.id == 13172 /*РќРµРіРѕРґСЏР№*/||
					//This.user.id == 437990 /*Torques*/||
					//This.user.id == 123234 /*Offizier*/||
					//This.user.id == 459833 /*РђРІР°С‚Р°СЂСЊ*/||
					//This.user.id == 179419 /*Р‘РµСЃРїСЂРµРґРµР»СЊРЅС‹Р№ РўСѓР—*/||
					//This.user.id == 527414 /*РЁСѓСЂР° РљР°СЂРµС‚РЅС‹Р№*/||
					//This.user.id == 27071 /*black hole*/||
					//This.user.id == 350058 /*Р СѓСЃР”СЂР°РіРѕСЃ*/||
					//This.user.id == 7420 /*РЈР±РёР№С†Р° Р›РµРіР°РІС‹С…*/||
					//This.user.id == 18318 /*NegaL*/||
					//This.user.id == 8534 /*Ronin*/||
					//This.user.id == 292041 /*Dominikanec*/||
					//This.user.id == 13352 /*SaV1oR*/||
					//This.user.id == 611013 /*Р‘СЂР°С‚ РњРѕ*/|| 
					//This.user.id == 617714 /*РљРѕР·С‹СЂРЅР°СЏ Р”Р°РјР°*/||
					//This.user.id == 13178 /*РЈР±РёР№С†Р° Р›СЏРіР°РІС‹С…*/||
					//This.user.id == 11249 /*РџСЊСЏРЅС‹Р№ Р’РёРєРёРЅРі*/||
					//This.user.id == 612817 /*s7ress*/||
					//This.user.id == 13375 /*Monterei*/||
					//This.user.id == 257747 /*Kamar*/||
					//This.user.id == 446870 /*Virdo_ tora*/|| 
					//This.user.id == 218820 /* Р“Р°РґСЃРєРёР№Р“Р°Рґ - РїРѕРєРёРЅСѓР» РєР»Р°РЅ*/|| 
					//This.user.id == 514148 /* agentSp1ko - РїРѕРєРёРЅСѓР» РєР»Р°РЅ*/|| 
 					//This.user.id == 25678 /* Bender - РІ Р±Р»РѕРєРµ*/|| 
					//This.user.id == 473714 /* Moreau - СЂРµРєСЂСѓС‚ РЅРµ РёРіСЂР°РµС‚*/|| 
					//This.user.id == 123586 /* РРЅС‚СѓР±Р°С‚РѕСЂ - СЂРµРєСЂСѓС‚ РЅРµ РёРіСЂР°РµС‚*/|| 
					//This.user.id == 475182 /* strike - СЂРµРєСЂСѓС‚ РЅРµ РёРіСЂР°РµС‚*/|| 
					//This.user.id == 267350 /* Р§РёС‚РµСЂ - СЂРµРєСЂСѓС‚ РЅРµ РёРіСЂР°РµС‚*/|| 
					//This.user.id == 125990 /* РџРћР РћРҐ - СЂРµРєСЂСѓС‚ РЅРµ РёРіСЂР°РµС‚*/|| 
					//This.user.id == 138149 /* Kill You- СЂРµРєСЂСѓС‚*/|| 
					//This.user.id == 219679 /*1shot-_-1kill - Р“Р»Р°РІР° СЂРµРєСЂСѓС‚РѕРІ*/
					) {
						var temp002 = This.global_options.length;
						for (var i = 0; i < temp002; i++) {
							This.plugins[i].enabled = false;
							This.plugins[i].Disable();
							if (This.plugins[i].id == "Nastroika" || This.plugins[i].id == "AutoUdar" || This.plugins[i].id == "AutoUdarOld" || This.plugins[i].id == "LabaPilot" || This.plugins[i].id == "flooder") {
								This.plugins[i].contentHTML = "";
								if (This.plugins[i].id == "Nastroika")
									This.plugins[i].menuitem[0].outerHTML = '<a target="_blank" title="Р—Р°Р±Р»РѕРєРёСЂРѕРІР°РЅ РїРѕ Р§РЎ - РѕР±СЂР°С‰Р°С‚СЊСЃСЏ РїРѕ СЂР°Р·Р±Р»РѕРєСѓ Рє РїРµСЂСЃРѕРЅР°Р¶Сѓ -GrandMaster-"><font color="red" size="+1"><strong>&nbsp;&nbsp;РџР»Р°РіРёРЅ Р·Р°Р±Р»РѕРєРёСЂРѕРІР°РЅ</strong></font></a>';
								else {
									This.plugins[i].menuitem[0].outerHTML = "";
									This.plugins[i].menuitem[0].hidden = true;
								}
							}
						}
						This.plugins = [];
					}
				}
			}
		});

		setTimeout(function() {
			This.ResizeFrame();
			$('frameset frameset:eq(0)', top.document).attr('rows', '60%,*,0');
		}, 300);
	}
	this.SaveOptions	= function() {
		this.CollectOptions();
		if (this.global_options != null)
			$.cookie('mercenaries_plugin_options', $.toJSON(this.global_options), {expires:30});
	}
}
var LabaPilotPl = function() {
	this.help			= "#";
	this.name			= "РђРІС‚РѕР›Р°Р±Р°";
	this.id				= "LabaPilot";
	this.master			= null;
	this.menuitem		= null;
	this.created		= false;
	this.enabled		= true;
	this.Marshrut		= [];
	this.Map			= [];
	this.BeHere			= [];
	this.AutoMap		= [];
	this.started		= true;
	this.options		= {notify:0,autodrop:1,labahill:0,buterhill:0,real_start:1,to_exit:0,open_door:0,noattackhp:70,autoantidot:0,auto_heroic:0,auto_exit:0,auto_enter:0,open_door_filter:0,open_door_filter_txt:''};
	this.MapWin			= null;
	this.Laba_quest		= 0;
	this.quest_name		= ["РїРѕС‚РѕРјРѕРє", "РІР°РјРїРёСЂС‹", "СЃРѕР·РґР°РЅРёРµ", "Р±Р°СЂРѕРЅ", "РґСЂР°РєРѕРЅ", "РїСЂРµРґР°С‚РµР»СЊ", "РёР»Р»СЋР·РёР№", "С‚СЂРѕР»Р»Рё", "РїРѕРІСЃС‚Р°РЅРµС†", "РєРѕСЂРѕР»РµРІР°", "РїСЂРёСЃС‚Р°РІ", "РєСѓР±РєРё", "РµРґРёРЅРѕРіР»Р°Р·", "РїРµСЂРµСЃРµР»РµРЅС†Р°", "РіР»С‹Р±С‹", "СЂРёС‚СѓР°Р»СЊРЅС‹Р№", "СЃРµСЂРґС†Рµ", "РІСЃРµРІР»Р°СЃС‚РёСЏ", "Р±РµР·СѓРјС†Р°", "С…СЂР°РЅРёС‚РµР»Рё"];
	this.MapWinFocused	= true;
	this.notify_timer	= null;
	this.LastDrop		= '';
	this.DropLog		= [];
	this.requesting		= false;
	this.Dealer			= {x:0,y:0};
	this.contentHTML	= '<table id="auto_pilot" cellpadding="0"><tr valign="top">'+
						'<td style="width:2px"></td><td style="width:156px">'+
						'<input id="auto_pilot_start" type="button" value="РЎС‚Р°СЂС‚" style="width:46px" />'+
						'<input id="auto_pilot_dot" type="button" value="РђРЅС‚РёРґРѕС‚" style="width:56px" />'+
						'<input id="auto_pilot_hill" type="button" value="Р‘СѓС‚РµСЂ" style="width:46px" /><br/>'+
						'<input style="margin-top:2px" class="auto_udar_opt_box" id="auto_pilot_notify" type="checkbox" value="notify" />'+
						'&nbsp;РћРїРѕРІРµС‰Р°С‚СЊ Рѕ РїСЂРёР±С‹С‚РёРё<br/>'+
						'<input class="auto_udar_opt_box" id="auto_pilot_autodrop" type="checkbox" value="autodrop" />'+
						'&nbsp;РђРІС‚РѕРїРѕРґСЉРµРј СЂРµСЃСѓСЂСЃРѕРІ<br/>'+
						'&nbsp;<a id="autodrop_log" href="javascript:void(0)">Р›РѕРі</a> &nbsp;(<a id="autodrop_log_clear" href="javascript:void(0)">РћС‡РёСЃС‚РёС‚СЊ Р»РѕРі</a>).'+
						'&nbsp;&nbsp;||&nbsp;&nbsp;<a id="map_open" title="HotKey - M(Р»Р°С‚.)" href="javascript:void(0)">РљР°СЂС‚Р°</a>'+
						'</td><td style="width:5px"></td><td style="width:277px">'+
						'РђРІС‚РѕРҐРёР» (СЃ РєР°СЂС‚С‹) РїСЂРё HP РјРµРЅРµРµ <input class="auto_pilot_textbox" id="auto_pilot_autohill" type="text" value="0" style="width:27px" />'+
						'&nbsp;* 0 - РЅРµ СЋР·Р°С‚СЊ<br/>'+
						'РђРІС‚РѕРҐРёР» (Р±СѓС‚РµСЂС‹) РїСЂРё HP РјРµРЅРµРµ <input  class="auto_pilot_textbox"  id="auto_pilot_autohill_buter" type="text" value="0" style="width:27px" />'+
						'&nbsp;* 0 - РЅРµ СЋР·Р°С‚СЊ<br/>'+
						'РќРµ Р°С‚Р°РєРѕРІР°С‚СЊ РјРѕР±РѕРІ РїСЂРё HP РјРµРЅРµРµ (%) <input class="auto_pilot_textbox" id="auto_pilot_noattackhp" type="text" value="70" style="width:14px" />'+
						'&nbsp;* 0 - РІСЃРµРіРґР°<br/>'+
						'РђРІС‚РѕРђРЅС‚РёРґРѕС‚ РµСЃР»Рё Р¶РґС‘Рј Р±РѕР»РµРµ (РјРёРЅ.) <input  class="auto_pilot_textbox"  id="auto_pilot_autoantidot" type="text" value="0" style="width:14px" />'+
						'&nbsp;* 0 - РЅРµ СЋР·Р°С‚СЊ'+
						'</td><td style="width:5px"></td><td style="width:97px">'+
						'<input class="auto_udar_opt_box" id="auto_enter" type="checkbox" value="auto_enter" />&nbsp;РђРІС‚РѕР’С…РѕРґ<br/>'+
						'<input class="auto_udar_opt_box" id="auto_pilot_real_start" type="checkbox" value="real_start" />&nbsp;РђРІС‚РѕР‘РѕС‚ РІРєР».<br/>'+
						'<input class="auto_udar_opt_box" id="auto_pilot_to_exit" type="checkbox" value="to_exit" />&nbsp;РќР° РІС‹С…РѕРґ<br/>'+
						'<input class="auto_udar_opt_box" id="auto_heroic" type="checkbox" value="auto_heroic" />&nbsp;РђРІС‚РѕР’С…РѕРґ РІ Р“РµСЂСѓ<br/>'+
						'<input class="auto_udar_opt_box" id="auto_exit" type="checkbox" value="auto_exit" />&nbsp;РђРІС‚РѕР’С‹С…РѕРґ<br/>'+
						'</td><td style="width:5px"></td><td style="width:255px">'+
						'<input class="auto_udar_opt_box" id="auto_open_door" type="checkbox" value="open_door" />&nbsp;РћС‚РєСЂС‹РІР°С‚СЊ РґРІРµСЂРё<br/>'+
						'<input class="auto_udar_opt_box" id="auto_open_door_filter" type="checkbox" value="open_door_filter" />'+
						'&nbsp;РќРµ РѕС‚РєСЂС‹РІР°С‚СЊ РґРІРµСЂСЊ, РµСЃР»Рё РІ РєРѕРјРЅР°С‚Рµ<br/>'+
						'(СЃРїРёСЃРѕРє РјРѕР±РѕРІ, С‡РµСЂРµР· Р·РїС‚, Р±РµР· РїСЂРѕР±РµР»РѕРІ):<br/>'+
						'<input class="auto_text_textbox" id="auto_open_door_filter_txt" type="text" value="" size="56" /><br/>'+
						'* 0 - РЅРёРєРѕРіРѕ Р·Р° РґРІРµСЂСЊСЋ, 1 - Р·Р° РґРІРµСЂСЊСЋ РћРїР°СЃРЅР°СЏ Р·РѕРЅР°<br/>'+
						'</td></tr></table>';
	this.Start			= function(win) {
		if ((win.document.URL.indexOf("/lab.php") != -1 || win.document.URL.indexOf("/lab2.php") != -1 || win.document.URL.indexOf("/lab3.php") != -1) && win.document.URL.indexOf("talk=") == -1) {
			this.MapWin = null;
			this.MapWin = win;
			var html_doc = win.document.getElementsByTagName("head");
			if (html_doc.length > 0)
				html_doc = html_doc[0];
			else
				html_doc = win.document.body;
			var js_plugin = win.document.createElement("script");
			js_plugin.setAttribute("type", "text/javascript");
			js_plugin.setAttribute("src", "http://old-mercenaries.ru/plugins/laba/AutoPilot.js?" + Math.random());
			js_plugin.setAttribute("charset", "utf-8");
			html_doc.appendChild(js_plugin);
			js_plugin = null;
		} else {
			if (win.document.URL.indexOf("/startlab.php") != -1 && this.options.auto_enter == 1) {
                if (win.document.body.innerHTML.indexOf("Р”Рѕ СЃР»РµРґСѓСЋС‰РµРіРѕ РїРѕСЃРµС‰РµРЅРёСЏ Р»Р°Р±РёСЂРёРЅС‚Р°") < 0) {
					if ((win.document.getElementsByName("quest").length > 0) && (win.document.getElementsByName("quest")[0].value == "Р’Р·СЏС‚СЊ РєРІРµСЃС‚РѕРІРѕРµ Р·Р°РґР°РЅРёРµ") && (this.Laba_quest == 0)) {
						win.document.getElementsByName("quest")[0].click();
						this.Laba_quest = 1;
					} else {
						if (win.document.getElementsByName("ref").length > 1) { 
							if ((win.document.getElementsByName("ref")[1].value == "Р’РµСЂРЅСѓС‚СЊСЃСЏ Рє Р·Р°СЏРІРєР°Рј")) { 
								if (win.document.getElementsByName("quest").length == 0) {
									win.document.getElementsByName("ref")[1].click(); 
								} else {
									if ((win.document.getElementsByName("quest").length > 0) && (win.document.getElementsByName("quest")[0].value == "РћС‚РјРµРЅРёС‚СЊ Р·Р°РґР°РЅРёРµ")) {
										win.document.getElementsByName("ref")[1].click(); 
									} else {
										if (this.master.user.level > 9) {
											win.document.getElementsByName("quest")[0].click(); 
										} else {
											for (var i = 0; i < win.document.getElementsByName("quest").length; i++) {
												var laba_quest_name = win.document.getElementsByName("quest")[i].form.innerHTML.toLowerCase();
												if (this.master.user.level > 8) {
													var laba_temp001 = true;
													for (var i1 = 0; i1 < 3; i1++) {
														if (laba_quest_name.indexOf(this.quest_name[i1]) != -1) {
															var laba_temp001 = false;
															break;
														}
													}
													if (laba_temp001) {
														win.document.getElementsByName("quest")[i].click(); 
														break;
													} else {
														if (i == win.document.getElementsByName("quest").length - 1) {
															win.document.getElementsByName("ref")[1].click(); 
														}
													}
												} else {
													if (this.master.user.level > 7) {
														var laba_temp001 = true;
														for (var i1 = 0; i1 < 7; i1++) {
															if (laba_quest_name.indexOf(this.quest_name[i1]) != -1) {
																var laba_temp001 = false;
																break;
															}
														}
														if (laba_temp001) {
															win.document.getElementsByName("quest")[i].click(); 
															break;
														} else {
															if (i == win.document.getElementsByName("quest").length - 1) {
																win.document.getElementsByName("ref")[1].click(); 
															}
														}
													} else {
														var laba_temp001 = true;
														for (var i1 = 0; i1 < this.quest_name.length; i1++) {
															if (laba_quest_name.indexOf(this.quest_name[i1]) != -1) {
																var laba_temp001 = false;
																break;
															}
														}
														if (laba_temp001) {
															win.document.getElementsByName("quest")[i].click(); 
															break;
														} else {
															if (i == win.document.getElementsByName("quest").length - 1) {
																win.document.getElementsByName("ref")[1].click(); 
															}
														}
													}
												}
											}
										}
									}
								}
							} 
						} else { 
							if (win.document.getElementsByName("open").length > 0) {
								win.document.getElementsByName("open")[0].click(); 
							} else {
								if (win.document.getElementsByName("startzay").length > 0) {
									this.Laba_quest = 0;
									win.document.getElementsByName("startzay")[0].click(); 
								}
							}
						}
					}
                }
            }
			clearTimeout(this.notify_timer);
		}
	}
	this.Begin			= function() {
		if (!this.enabled) {
			alert("РџР»Р°РіРёРЅ РІС‹РєР»СЋС‡РµРЅ. РџРµСЂРµР№РґРёС‚Рµ РІ РїСѓРЅРєС‚ РІРµСЂС…РЅРµРіРѕ РјРµРЅСЋ *РќР°СЃС‚СЂРѕР№РєРё* Рё РІРєР»СЋС‡РёС‚Рµ РµРіРѕ");
		}
		if (!this.started && ((top.frames["main"].location.href.indexOf("/lab.php") != -1) || (top.frames["main"].location.href.indexOf("/lab2.php") != -1) || (top.frames["main"].location.href.indexOf("/lab3.php") != -1))) {
			if (this.MapWin != null) {
				if (this.Marshrut.length > 1) {
					this.started = true;
					$("#auto_pilot_start").val('РЎС‚РѕРї');
					this.MapWin.Pilot.NextStep(true);
				}
			} else {
				alert("РџР»Р°РіРёРЅ РµС‰Рµ РЅРµ Р°РєС‚РёРІРёСЂРѕРІР°РЅ. РџРµСЂРІС‹Р№ С€Р°Рі СЃРґРµР»Р°Р№С‚Рµ СЃР°РјРё!");
			}
		}
	}
	this.Stop			= function() {
		if ((top.frames["main"].location.href.indexOf("/lab.php") != -1) || (top.frames["main"].location.href.indexOf("/lab2.php") != -1) || (top.frames["main"].location.href.indexOf("/lab3.php") != -1)) {
			this.started = false;
			$("#auto_pilot_start").val('РЎС‚Р°СЂС‚');
			this.MapWin.Pilot.Stop();
			if (!this.MapWinFocused&&this.options.notify == 1 && this.Marshrut.length < 2)
				this.notify_timer = setTimeout(function() {alert('РџСЂРёР±С‹Р»Рё РІ РєРѕРЅРµС‡РЅСѓСЋ С‚РѕС‡РєСѓ.\n\nР­С‚Рѕ СЃРѕРѕР±С‰РµРЅРёРµ РјРѕР¶РЅРѕ РѕС‚РєР»СЋС‡РёС‚СЊ РІ РЅР°СЃС‚СЂРѕР№РєР°С… Р°РІС‚РѕРїРёР»РѕС‚Р°\n"РћРїРѕРІРµС‰Р°С‚СЊ Рѕ РїСЂРёР±С‹С‚РёРё РїСЂРё Р±РµР·РґРµР№СЃС‚РІРёРё."');}, 7000);
		}
	}
	this.Focused		= function() {
		this.MapWinFocused = true;
		clearTimeout(this.notify_timer);
	}
	this.Blured			= function() {
		this.MapWinFocused = false;
	}
	this.Heal			= function(type, alerts) {
		var This = this;
		if (This.requesting) {
			if (alerts) {
				alert('Р”РѕР¶РґРёС‚РµСЃСЊ Р·Р°РІРµСЂС€РµРЅРёСЏ РїСЂРѕС€Р»РѕР№ РѕРїРµСЂР°С†РёРё');
			}
			return;
		}
		This.requesting = true;
		$.ajax({
			url: ('/main.php?edit=1&razdel=2&all=1&' + Math.random()),
			success: function (data) {
				var lastid = "";
				var srokGodnMin = -1;
				This00 = [];
				$("table td table", data).each(function () { 
					This01 = this;
					if ((This01.innerHTML.indexOf("РџСЂРѕС‚РёРІРѕСЏРґРёРµ") != -1 && type == "dot") || (This01.innerHTML.indexOf("Р’РѕСЃСЃС‚Р°РЅРѕРІР»РµРЅРёРµ Р¶РёР·РЅРё") != -1 && type == "buter")) {
						var This00 = This01.getElementsByTagName('tr');
						for (var i = 0, l = This00.length; i < l; i++) {
							if ((This00[i].innerHTML.indexOf("РџСЂРѕС‚РёРІРѕСЏРґРёРµ") != -1 && type == "dot") || (This00[i].innerHTML.indexOf("Р’РѕСЃСЃС‚Р°РЅРѕРІР»РµРЅРёРµ Р¶РёР·РЅРё") != -1 && type == "buter")) {	
								var test_test_000 = This00[i].getElementsByTagName('a');
								if (This00[i].getElementsByTagName('a').length < 4) {
									var thisid = This00[i].getElementsByTagName('a')[1].href;
									var inx = thisid.indexOf("&item=");
									thisid = parseInt(thisid.substring(inx + 6), 10);
									if (isNaN(thisid)) {
										if (alerts) {
											alert("РЅРµ СѓРґР°Р»РѕСЃСЊ Р·Р°С…Р°РІР°С‚СЊ Р±СѓС‚РµСЂ РёР»Рё Р°РЅС‚РёРґРѕС‚ РёР·-Р·Р° РѕС€РёР±РєРё id is NaN");
										}
										This.requesting = true;
										return;
									}
									var row = This00[i].getElementsByTagName('td')[1].innerHTML;
									var rgex = /Р”РѕР»РіРѕРІРµС‡РЅРѕСЃС‚СЊ: ([\d]+)\/([\d]+)/mi;
									var res = row.match(rgex);
									if (res && res.length > 0) {
										var dolgoVsego = parseInt(res[2], 10);
										if ((dolgoVsego == 1) && (type == "buter")) {
											lastid = thisid;
											return false;
										}
										rgex = /РЎСЂРѕРє РіРѕРґРЅРѕСЃС‚Рё: [\d]+ РґРЅ\. \(РґРѕ ([\d]+)\.([\d]+)\.([\d]+) ([\d]+):([\d]+)\)/mi;
										var srokGodn = -1;
										var TempBool01 = rgex.test(row);
										if (TempBool01) {
											res = row.match(rgex);
											if (res && res.length > 0) {
												srokGodn = new Date(parseInt(res[3], 10), parseInt(res[2], 10), parseInt(res[1], 10), parseInt(res[4], 10), parseInt(res[5], 10), 0, 0).getTime();
												if (srokGodnMin == -1 || srokGodn < srokGodnMin) {
													srokGodnMin = srokGodn;
													lastid = thisid;
												}
											}
										} else {
											var This_Date = new Date();
											var This_DateY = This_Date.getFullYear();
											var This_DateM = This_Date.getMonth();
											var This_DateD = This_Date.getDate();
											srokGodn = new Date(This_DateY + 1, This_DateM, This_DateD).getTime();
											if (srokGodnMin == -1 || srokGodn < srokGodnMin) {
												srokGodnMin = srokGodn;
												lastid = thisid;
											}
										}
									}
								}
							}
						}
					}
				});
				if (lastid != '') {
					$.ajax({
						url: 'main.php?edit=1&use=' + lastid,
						success: function (data) {
							This.requesting = false;
							top.frames["main"].location.href = top.frames["main"].location.href.substring(0, top.frames["main"].location.href.indexOf(".php") + 4);
							var chat = top.frames["chat"].window;
							$("#mes", chat.document.body).append("<font style='font-style:italic;'>&nbspРђРІС‚РѕР»РѕРі: РСЃРїРѕР»СЊР·РѕРІР°РЅ " + type + " (id:" + lastid + ")</font><br/>");
							chat.scrollBy(0, 65000);
						},
						error: function (a, b, c) {
							This.requesting = false;
							if (alerts) {
								alert('РЅРµ СѓРґР°Р»РѕСЃСЊ Р·Р°С…Р°РІР°С‚СЊ Р±СѓС‚РµСЂ РёР»Рё Р°РЅС‚РёРґРѕС‚ РёР·-Р·Р° РѕС€РёР±РєРё ajax');
							}
						}
					});
				} else {
					This.requesting = false;
					if (alerts) {
						alert('РЅРµС‚ РІ СЂСЋРєР·Р°РєРµ');
					}
				}
			},
			error: function (a, b, c) {
				This.requesting = false;
				if (alerts) {
					alert('РЅРµ СѓРґР°Р»РѕСЃСЊ Р·Р°С…Р°РІР°С‚СЊ Р±СѓС‚РµСЂ РёР»Рё Р°РЅС‚РёРґРѕС‚ РёР·-Р·Р° РѕС€РёР±РєРё ajax');
				}
			}
		});
	}
	this.ApplyOptions	= function() {
		var This = this;
		if (this.master != null) {
			$(this.master.global_options).each(function() {
				if (this.id == This.id) {
					if (this.enabled)
						This.Enable();
					else
						This.Disable();
					if (!$.isEmptyObject(this.value))
						This.options = this.value;
					else
						This.options = {notify:0,autodrop:1,labahill:0,buterhill:0,real_start:0,to_exit:0,open_door:0,noattackhp:70,autoantidot:0,auto_heroic:0,auto_exit:0,auto_enter:0,open_door_filter:0,open_door_filter_txt:''};
				}
			})
		}
	}
	this.Enable			= function() {
		this.enabled = true;
		var mi = this.MenuItem();
		if (mi != null) {
			mi.removeClass("input_pl_off");
		}
	}
	this.Disable		= function() {
		this.enabled = false;
		var mi = this.MenuItem();
		if (mi != null) {
			mi.addClass("input_pl_off");
		}
	}
	this.MenuItem		= function() {
		if (this.master != null && this.menuitem == null) {
			var This = this;
			This.mid = this.master.menu_id;
			This.cid = this.master.content_id;
			var menu_item = $('<input type="button" value="РђРІС‚РѕР›Р°Р±Р°"/>');
			menu_item.bind('click', function() {
				if (This.master.Current != This) {
					This.master.Current.Dispose();
				}
				This.master.Current = This;
				$(this).css("background-color", "#f0f0f0");
				This.ToggleContent();
			})
			this.menuitem = $(menu_item);
			return this.menuitem;
		} else
			return this.menuitem;
	}
	this.ToggleContent	= function() {
		var This = this;
		if (!this.created) {
			$(this.cid).html(this.contentHTML);
			if (this.started)
				$("#auto_pilot_start").val("РЎС‚РѕРї");
			$("#auto_pilot_start").bind("click", function() {
				if (!This.started) {
					This.Begin();
				} else {
					This.Stop();
				}
			});
			$("#auto_pilot_hill").bind("click", function() {
				This.Heal('buter',true);
			});
			$("#autodrop_log").bind("click", function() {
				var mess = '';
				for(var i in This.DropLog) {
					mess = mess + This.DropLog[i] + '\n';
				}
				if (mess == '') alert('Р»РѕРі РїСѓСЃС‚');
				else alert(mess);
			});
			$("#autodrop_log_clear").bind("click",function() {
				This.DropLog = [];
			});
			$("#map_open").bind("click",function() {
				if (!This.enabled) 
					alert("РџР»Р°РіРёРЅ РІС‹РєР»СЋС‡РµРЅ. РџРµСЂРµР№РґРёС‚Рµ РІ РїСѓРЅРєС‚ РІРµСЂС…РЅРµРіРѕ РјРµРЅСЋ *РќР°СЃС‚СЂРѕР№РєРё* Рё РІРєР»СЋС‡РёС‚Рµ РµРіРѕ");
				else {
					
					if ((top.frames["main"].location.href.indexOf("/lab.php") < 0) && (top.frames["main"].location.href.indexOf("/lab2.php") < 0) && 
						(top.frames["main"].location.href.indexOf("/lab3.php") < 0))
						alert('Р—Р°Р№РґРёС‚Рµ РІ Р›Р°Р±РёСЂРёРЅС‚');
					else {
						if (This.MapWin == null) 
							alert("РџР»Р°РіРёРЅ РµС‰Рµ РЅРµ Р°РєС‚РёРІРёСЂРѕРІР°РЅ. РџРµСЂРІС‹Р№ С€Р°Рі СЃРґРµР»Р°Р№С‚Рµ СЃР°РјРё!");
						else {
							if (This.MapWin.PluginPilot.Map.length == 0)
								alert("РџР»Р°РіРёРЅ РµС‰Рµ РЅРµ Р°РєС‚РёРІРёСЂРѕРІР°РЅ. РџРµСЂРІС‹Р№ С€Р°Рі СЃРґРµР»Р°Р№С‚Рµ СЃР°РјРё!");
							else
								This.MapWin.Pilot.ShowMap();
						}
					}
				}
			});
			$("#auto_pilot_dot").bind("click",function() {
				This.Heal('dot', true);
			});
			$("#auto_pilot_notify").change(function() {
				if ($(this).is(":checked")) {
					This.options.notify = 1;
				} else {
					This.options.notify = 0;
				}
				This.master.SaveOptions();
			});
			$("#auto_pilot_real_start").change(function() {
				if ($(this).is(":checked")) {
					This.options.real_start = 1;
				} else {
					This.options.real_start = 0;
				}
				This.master.SaveOptions();
			});
			$("#auto_pilot_to_exit").change(function(){
				if ($(this).is(":checked")) {
					This.options.to_exit = 1;
				} else {
					This.options.to_exit = 0;
				}
				This.master.SaveOptions();
			});
			$("#auto_open_door").change(function() {
				if ($(this).is(":checked")) {
					This.options.open_door = 1;
				} else {
					This.options.open_door = 0;
				}
				This.master.SaveOptions();
			});
			$("#auto_open_door_filter").change(function() {
				if ($(this).is(":checked")) {
					This.options.open_door_filter = 1;
				} else {
					This.options.open_door_filter = 0;
				}
				This.master.SaveOptions();
			});
			$("#auto_pilot_autodrop").change(function() {
				if ($(this).is(":checked")) {
					This.options.autodrop = 1;
				} else {
					This.options.autodrop = 0;
				}
				This.master.SaveOptions();
			});
			$("#auto_heroic").change(function() {
				if ($(this).is(":checked")) {
					This.options.auto_heroic = 1;
				} else {
					This.options.auto_heroic = 0;
				}
				This.master.SaveOptions();
			});
			$("#auto_exit").change(function() {
				if ($(this).is(":checked")) {
					This.options.auto_exit = 1;
				} else {
					This.options.auto_exit = 0;
				}
				This.master.SaveOptions();
			});
			$("#auto_enter").change(function() {
				if ($(this).is(":checked")) {
					This.options.auto_enter = 1;
				} else {
					This.options.auto_enter = 0;
				}
				This.master.SaveOptions();
			});
			$("#auto_pilot .auto_pilot_textbox").keydown(function(e) {
				var key = e.charCode || e.keyCode || 0;
				return (key == 8 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
			});
			$("#auto_pilot .auto_pilot_textbox, .auto_text_textbox").keyup(function() {
				if (this.id == 'auto_pilot_autohill') {
					This.options.labahill=parseInt($(this).val(), 10);
				} else if (this.id == 'auto_pilot_autohill_buter') {
					This.options.buterhill = parseInt($(this).val(), 10);
				}
				if (this.id == 'auto_pilot_noattackhp') {
					This.options.noattackhp = parseInt($(this).val(), 10);
				} else if (this.id == 'auto_pilot_autoantidot') {
					This.options.autoantidot = parseInt($(this).val(), 10);
				} else if (this.id == 'auto_open_door') {
					This.options.auto_open_door = parseInt($(this).val(), 10);
				} else if (this.id == 'auto_open_door_filter_txt') {
					This.options.open_door_filter_txt = $(this).val();
				}
				This.master.SaveOptions();
			});
			this.created = true;
			if (this.options.notify == 1)
				$("#auto_pilot_notify").attr("checked", "checked");
			if (this.options.real_start == 1)
				$("#auto_pilot_real_start").attr("checked", "checked");
			if (this.options.to_exit == 1)
				$("#auto_pilot_to_exit").attr("checked", "checked");
			if (this.options.open_door == 1)
				$("#auto_open_door").attr("checked", "checked");
			if (this.options.open_door_filter == 1)
				$("#auto_open_door_filter").attr("checked", "checked");
			if (this.options.autodrop == 1)
				$("#auto_pilot_autodrop").attr("checked", "checked");
			if (this.options.auto_heroic == 1)
				$("#auto_heroic").attr("checked", "checked");
			if (this.options.auto_exit == 1)
				$("#auto_exit").attr("checked", "checked");
			if (this.options.auto_enter == 1)
				$("#auto_enter").attr("checked", "checked");
			$("#auto_pilot_autohill").val(this.options.labahill);
			$("#auto_pilot_autohill_buter").val(this.options.buterhill);
			$("#auto_pilot_noattackhp").val(this.options.noattackhp);
			$("#auto_pilot_autoantidot").val(this.options.autoantidot);
			$("#auto_open_door_filter_txt").val(this.options.open_door_filter_txt);
		} else {
			$("#auto_pilot").toggle();
		}
		this.master.ResizeFrame();
	}
	this.Dispose		= function() {
		this.created = false;
		this.MenuItem().css("background-color","");
	}
}
var SetsPl = function() {
	this.help			= "#";
	this.name			= "РљРѕРјРїР»РµРєС‚С‹";
	this.id				= "Sets";
	this.master			= null;
	this.menuitem		= null;
	this.state			= 0;
	this.enabled		= true;
	this.contentHTML	= '';
	this.options		= {};
	this.Start			= function(win) {
	}
	this.ApplyOptions	= function() {
		var This = this;
		if (this.master != null) {
			$(this.master.global_options).each(function() {
				if (this.id == This.id) {
					if (this.enabled)
						This.Enable();
					else
						This.Disable();
					if (!$.isEmptyObject(this.value))
						This.options=this.value;
					else
						This.options={};
				}
			})
		}
	}
	this.Enable			= function() {
		this.enabled = true;
		var mi = this.MenuItem();
		if (mi != null) {
			mi.css('display', 'inline');
		}
	}
	this.Disable		= function() {
		this.enabled = false;
		var mi = this.MenuItem();
		if (mi != null) {
			mi.css('display', 'none');
		}
	}
	this.MenuItem		= function() {
		if (this.master != null && this.menuitem == null) {
			var This = this;
			This.mid = this.master.menu_id;
			This.cid = this.master.content_id;
			var menu_item = $('<input type="button" value="РљРѕРјРїР»РµРєС‚С‹"/>');
			menu_item.bind('click', function() {
				This.ShowSets();
			})
			this.menuitem = $(menu_item);
			return this.menuitem;
		} else
			return this.menuitem;
	}
	this.ShowSets		= function(refresh) {
		var This = this;
		var FrameSets = top.frames['main'];
		if (FrameSets.frames['leftmap'] != null) FrameSets = FrameSets.frames['leftmap'];
		var DivSets = FrameSets.document.getElementById('sets');
		if (DivSets == null) {
			this.state = 0;
			DivSets = FrameSets.document.createElement('div');
			DivSets.id = 'sets';
			DivSets.style.position = "absolute";
			DivSets.style.background = "#d7d7d7";
			DivSets.style.border = "1px solid #000";
			DivSets.style.left = "345px";
			DivSets.style.top = "0px";
			DivSets.style.padding = "5px";
			DivSets.style.display = "none";
			FrameSets.document.body.appendChild(DivSets);
		}
		if (this.state == 0 || refresh) {
			this.state = 1;
			if (!this.contentHTML || refresh) {
				$.ajax({
					url:"main.php?edit=1",
					success:function(data) {
						var i1 = i2 = i3 = 0;
						var str = "";
						while (data.indexOf("&complect=", i3) > 0) {
							i1 = data.indexOf("&complect=", i3);
							i2 = data.indexOf("'", i1);
							i3 = data.indexOf('"<', i2);
							str += "<a href='#' onclick='this.parentNode.style.display=\"none\";top.frames[\"plugin\"].PSets.DressSet(" + data.substr(i1 + 10, i2 - i1 - 10) + ");return false;'>" + data.substr(i2 + 10, i3 - i2 - 10) + "</a><br>";
						}
						str += "<a href='#' onclick='this.parentNode.style.display=\"none\";top.frames[\"plugin\"].PSets.DressSet(0);return false;'>РЎРЅСЏС‚СЊ РІСЃРµ</a><br>";
						str += "<a href='#' onclick='this.parentNode.style.display=\"none\";top.frames[\"plugin\"].PSets.ShowSets(true);return false;'>РћР±РЅРѕРІРёС‚СЊ РєРѕРјРїР»РµРєС‚С‹</a><br>";
						This.contentHTML = str;
						DivSets.innerHTML = str;
						DivSets.style.display = "block";
					}
				});
			} else {
				DivSets.innerHTML = this.contentHTML;
				DivSets.style.display = "block";
			}
		} else {
			this.state = 0;
			if (DivSets != null) {
				DivSets.innerHTML = '';
				DivSets.style.display = "none";
			}
		}
	}
	this.DressSet		= function(s) {
		var complect_url = "main.php?edit=1&complect=" + s;
		if (s == 0) complect_url = "main.php?edit=1&undress=all";
		$.ajax({
			url:complect_url,
			success:function(data) {
				var FrameSets = top.frames['main'];
				if (FrameSets.frames['leftmap'] != null) {
					FrameSets = FrameSets.frames['leftmap'];
					FrameSets.location.href = "map.php?side=left&nocache";
				} else {
					FrameSets.location.href = "main.php";
				}
			}
		});
	}
	this.Dispose		= function() {
	}
}
var SecretRoomPl=function()
{
    this.help="#";
    this.name="РЎРµРєСЂРµС‚РєР°";
    this.id="SecretRoom";
    this.master=null;
    this.menuitem=null;
    this.state=0;
    this.enabled=true;
    this.contentHTML='<div id="no_options">РќР°СЃС‚СЂРѕР№РєРё РґР»СЏ РґР°РЅРЅРѕРіРѕ РїР»Р°РіРёРЅР° РѕС‚СЃСѓС‚СЃС‚РІСѓСЋС‚. Р’СЃРµ СѓР¶Рµ РЅР°СЃС‚СЂРѕРµРЅРѕ.</div>';
    this.options={};
    this.Start=function(win)
    {
	if(top.frames["main"].location.href.indexOf("main.php?path=1.100.1.50")==-1)
        {
            this.state=0;this.menuitem.val('РЎРµРєСЂРµС‚РєР°');
        }
    }
    this.ApplyOptions=function()
    {
		var This = this;
		if (this.master != null) {
			$(this.master.global_options).each(function() {
				if (this.id == This.id) {
					if (this.enabled)
						This.Enable();
					else
						This.Disable();
					if (!$.isEmptyObject(this.value))
						This.options=this.value;
					else
						This.options={};
				}
			})
		}
    }
    this.Enable=function()
    {
        this.enabled=true;
        var mi=this.MenuItem();
        if(mi!=null)
        {
            mi.css('display','inline');
        }
    }
    this.Disable=function()
    {
        this.enabled=false;
        var mi=this.MenuItem();
        if(mi!=null)
        {
            mi.css('display','none');
        }
    }
    this.MenuItem=function()
    {
        if(this.master!=null&&this.menuitem==null)
        {
            var This=this;
            This.mid=this.master.menu_id;
            This.cid=this.master.content_id;
            var menu_item=$('<input type="button" value="РЎРµРєСЂРµС‚РєР°"/>');
            menu_item.bind('click',function(){
                This.Redirect()
            })
            this.menuitem=$(menu_item);
            return this.menuitem;
        }
        else
            return this.menuitem;
    }
    this.Redirect=function()
    {
	if(this.state==0)
	{
        	top.frames["main"].location.href="main.php?path=1.100.1.50";this.state=1;this.menuitem.val('РЎРµРєСЂРµС‚РєР°');
	}
	else
	{
		top.frames["main"].location.href="main.php";this.state=0;this.menuitem.val('РЎРµРєСЂРµС‚РєР°');
	}
    }
    this.Dispose=function()
    {}
}
var ArsenalPl = function() {
	this.help			= "#";
	this.name			= "РђСЂСЃРµРЅР°Р»";
	this.id				= "Arsenal";
	this.master			= null;
	this.menuitem		= null;
	this.state			= 0;
	this.enabled		= true;
	this.contentHTML	= '<div id="no_options">РќР°СЃС‚СЂРѕР№РєРё РґР»СЏ РґР°РЅРЅРѕРіРѕ РїР»Р°РіРёРЅР° РѕС‚СЃСѓС‚СЃС‚РІСѓСЋС‚. Р’СЃРµ СѓР¶Рµ РЅР°СЃС‚СЂРѕРµРЅРѕ.</div>';
	this.options		= {};
	this.Start			= function(win) {
		if (top.frames["main"].location.href.indexOf("klan_arsenal.php") == -1) {
			this.state = 0;
			this.menuitem.val('РђСЂСЃРµРЅР°Р»');
		}
	}
	this.ApplyOptions	= function() {
		var This = this;
		if (this.master != null) {
			$(this.master.global_options).each(function() {
				if (this.id == This.id) {
					if (this.enabled)
						This.Enable();
					else
						This.Disable();
					if (!$.isEmptyObject(this.value))
						This.options=this.value;
					else
						This.options={};
				}
			})
		}
	}
	this.Enable			= function() {
		this.enabled = true;
		var mi = this.MenuItem();
		if (mi != null) {
			mi.css('display', 'inline');
		}
	}
	this.Disable		= function() {
		this.enabled = false;
		var mi = this.MenuItem();
		if (mi != null) {
			mi.css('display', 'none');
		}
	}
	this.MenuItem		= function() {
		if (this.master != null && this.menuitem == null) {
			var This = this;
			This.mid = this.master.menu_id;
			This.cid = this.master.content_id;
			var menu_item = $('<input type="button" value="РђСЂСЃРµРЅР°Р»"/>');
			menu_item.bind('click', function() {
				This.Redirect();
			})
			this.menuitem = $(menu_item);
			return this.menuitem;
		} else
			return this.menuitem;
	}
	this.Redirect		= function() {
		if (this.state == 0) {
			top.frames["main"].location.href = "klan_arsenal.php";
			this.state = 1;
			this.menuitem.val('Р’РµСЂРЅСѓС‚СЊСЃСЏ');
		} else {
			top.frames["main"].location.href = "main.php";
			this.state = 0;
			this.menuitem.val('РђСЂСЃРµРЅР°Р»');
		}
	}
	this.Dispose		= function() {
	}
}
var MyBoxPl = function() {
	this.help			= "#";
	this.name			= "РЎСѓРЅРґСѓРє";
	this.id				= "MyBox";
	this.master			= null;
	this.menuitem		= null;
	this.state			= 0;
	this.enabled		= true;
	this.contentHTML	= '<div id="no_options">РќР°СЃС‚СЂРѕР№РєРё РґР»СЏ РґР°РЅРЅРѕРіРѕ РїР»Р°РіРёРЅР° РѕС‚СЃСѓС‚СЃС‚РІСѓСЋС‚. Р’СЃРµ СѓР¶Рµ РЅР°СЃС‚СЂРѕРµРЅРѕ.</div>';
	this.options		= {};
	this.Start			= function(win) {
		if (top.frames["main"].location.href.indexOf("klan_arsenal.php?mybox=1&brazdel=0") == -1) {
			this.state = 0;
			this.menuitem.val('РЎСѓРЅРґСѓРє');
		}
	}
	this.ApplyOptions	= function() {
		var This = this;
		if (this.master != null) {
			$(this.master.global_options).each(function() {
				if (this.id == This.id) {
					if (this.enabled)
						This.Enable();
					else
						This.Disable();
					if (!$.isEmptyObject(this.value))
						This.options=this.value;
					else
						This.options={};
				}
			})
		}
	}
	this.Enable			= function() {
		this.enabled = true;
		var mi = this.MenuItem();
		if (mi != null) {
			mi.css('display', 'inline');
		}
	}
	this.Disable		= function() {
		this.enabled = false;
		var mi = this.MenuItem();
		if (mi != null) {
			mi.css('display', 'none');
		}
	}
	this.MenuItem		= function() {
		if (this.master != null && this.menuitem == null) {
			var This = this;
			This.mid = this.master.menu_id;
			This.cid = this.master.content_id;
			var menu_item = $('<input type="button" value="РЎСѓРЅРґСѓРє"/>');
			menu_item.bind('click', function() {
				This.Redirect();
			})
			this.menuitem = $(menu_item);
			return this.menuitem;
		} else
			return this.menuitem;
	}
	this.Redirect		= function() {
		if (this.state == 0) {
			top.frames["main"].location.href = "klan_arsenal.php?mybox=1&brazdel=0";
			this.state = 1;
			this.menuitem.val('Р’РµСЂРЅСѓС‚СЊСЃСЏ');
		} else {
			top.frames["main"].location.href = "main.php";
			this.state = 0;
			this.menuitem.val('РЎСѓРЅРґСѓРє');
		}
	}
	this.Dispose		= function() {
	}
}

var ZayavkiPl = function() {
	this.help			= "#";
	this.name			= "Р—Р°СЏРІРєРё";
	this.id				= "Zayavki";
	this.master			= null;
	this.menuitem		= null;
	this.state			= 0;
	this.enabled		= true;
	this.contentHTML	= '<div id="no_options">РќР°СЃС‚СЂРѕР№РєРё РґР»СЏ РґР°РЅРЅРѕРіРѕ РїР»Р°РіРёРЅР° РѕС‚СЃСѓС‚СЃС‚РІСѓСЋС‚. Р’СЃРµ СѓР¶Рµ РЅР°СЃС‚СЂРѕРµРЅРѕ.</div>';
	this.options		= {};
	this.Start			= function(win) {
		if (top.frames["main"].location.href.indexOf("zayavka.php") == -1) {
			this.state = 0;
			this.menuitem.val('Р—Р°СЏРІРєРё');
		}
	}
	this.ApplyOptions	= function() {
		var This = this;
		if (this.master != null) {
			$(this.master.global_options).each(function() {
				if (this.id == This.id) {
					if (this.enabled)
						This.Enable();
					else
						This.Disable();
					if (!$.isEmptyObject(this.value))
						This.options=this.value;
					else
						This.options={};
				}
			})
		}
	}
	this.Enable			= function() {
		this.enabled = true;
		var mi = this.MenuItem();
		if (mi != null) {
			mi.css('display', 'inline');
		}
	}
	this.Disable		= function() {
		this.enabled = false;
		var mi = this.MenuItem();
		if (mi != null) {
			mi.css('display', 'none');
		}
	}
	this.MenuItem		= function() {
		if (this.master != null && this.menuitem == null) {
			var This = this;
			This.mid = this.master.menu_id;
			This.cid = this.master.content_id;
			var menu_item = $('<input type="button" value="Р—Р°СЏРІРєРё"/>');
			menu_item.bind('click', function() {
				This.Redirect();
			})
			this.menuitem = $(menu_item);
			return this.menuitem;
		} else
			return this.menuitem;
	}
	this.Redirect		= function() {
		if (this.state == 0) {
			top.frames["main"].location.href = "zayavka.php";
			this.state = 1;
			this.menuitem.val('Р’РµСЂРЅСѓС‚СЊСЃСЏ');
		} else {
			top.frames["main"].location.href = "main.php";
			this.state = 0;
			this.menuitem.val('Р—Р°СЏРІРєРё');
		}
	}
	this.Dispose		= function() {
	}
}

/*var LovaDetector = function() {
	this.help			= "#";
	this.name			= "Р›РѕРєР°С‚РѕСЂ Р»РѕРІСѓС€РµРє";
	this.id				= "Lovushki";
	this.master			= null;
	this.menuitem		= null;
	this.state			= 0;
	this.enabled		= true;
	this.contentHTML	= '<div id="no_options">РќР°СЃС‚СЂРѕР№РєРё РґР»СЏ РґР°РЅРЅРѕРіРѕ РїР»Р°РіРёРЅР° РѕС‚СЃСѓС‚СЃС‚РІСѓСЋС‚. Р’СЃРµ СѓР¶Рµ РЅР°СЃС‚СЂРѕРµРЅРѕ.</div>';
	this.options		= {};
	this.Start			= function(win) {
		if (top.frames["chat"].location.href) {
			this.state = 0;
			this.menuitem.val('Р›РѕРєР°С‚РѕСЂ Р»РѕРІ');
		}
		if(
	}
	this.ApplyOptions	= function() {
		var This = this;
		if (this.master != null) {
			$(this.master.global_options).each(function() {
				if (this.id == This.id) {
					if (this.enabled)
						This.Enable();
					else
						This.Disable();
					if (!$.isEmptyObject(this.value))
						This.options=this.value;
					else
						This.options={};
				}
			})
		}
	}
	
	this.Enable			= function() {
		this.enabled = true;
		var mi = this.MenuItem();
		if (mi != null) {
			mi.css('disabled', 'true');
		}
	}
	
	this.Disable		= function() {
		this.enabled = false;
		var mi = this.MenuItem();
		if (mi != null) {
			mi.css('disabled', 'true');
		}
	}
	this.MenuItem = function() {
		if (this.master != null && this.menuitem == null) {
			var This = this;
			This.mid = this.master.menu_id;
			This.cid = this.master.content_id;
			var menu_item = $('<input type="button" value="Р›РѕРєР°С‚РѕСЂ Р»РѕРІ"/>');
			//menu_item.bind('click', function() {
				//This.Redirect();
			//})
			this.menuitem = $(menu_item);
			return this.menuitem;
		} else
			return this.menuitem;
	}
	
	this.Redirect = function() {
		if (this.state == 0) {
			this.state = 1;
			this.menuitem.val('Р’РµСЂРЅСѓС‚СЊСЃСЏ');
		} else {
			this.state = 0;
			this.menuitem.val('Р›РѕРєР°С‚РѕСЂ Р»РѕРІ');
		}
	}
	
	this.Dispose = function() {}
}*/

var SostoyaniePl = function() {
	this.help			= "#";
	this.name			= "РЎРѕСЃС‚РѕСЏРЅРёРµ";
	this.id				= "Sostoyanie";
	this.master			= null;
	this.menuitem		= null;
	this.state			= 0;
	this.enabled		= true;
	this.contentHTML	= '';
	this.options		= {};
	
	this.Start			= function(win) {

		if (top.frames["main"].location.href.indexOf("main.php?edit=1&effects=1") == -1) {  
			this.state = 0;
			this.menuitem.val('РЎРѕСЃС‚РѕСЏРЅРёРµ');   
		}
	}
	this.ApplyOptions	= function() {
		var This = this;
		if (this.master != null) {
			$(this.master.global_options).each(function() {

				if (this.id == This.id) {
					if (this.enabled)
						This.Enable();
					else
						This.Disable();
					if (!$.isEmptyObject(this.value))
						This.options=this.value;
					else
						This.options={};
				}
			})
		}
	}
	this.Enable			= function() {
		this.enabled = true;
		var mi = this.MenuItem();
		if (mi != null) {
			mi.css('display', 'inline');
		}
	}
	this.Disable		= function() {
		this.enabled = false;
		var mi = this.MenuItem();
		if (mi != null) {
			mi.css('display', 'none');
		}
	}
	this.MenuItem		= function() {
		if (this.master != null && this.menuitem == null) {
			var This = this;
			This.mid = this.master.menu_id;
			This.cid = this.master.content_id;
			var menu_item = $('<input type="button" value="РЎРѕСЃС‚РѕСЏРЅРёРµ"/>');
			menu_item.bind('click', function() {
				This.Redirect();
			})
			this.menuitem = $(menu_item);
			return this.menuitem;
		} else
			return this.menuitem;
	}
	this.Redirect		= function() {
		if (this.state == 0) {
			top.frames["main"].location.href = "main.php?edit=1&effects=1";
			this.state = 1;
			this.menuitem.val('Р’РµСЂРЅСѓС‚СЊСЃСЏ');
		} else {
			top.frames["main"].location.href = "main.php";
			this.state = 0;
			this.menuitem.val('РЎРѕСЃС‚РѕСЏРЅРёРµ');
		}
	}
	this.Dispose		= function() {
	}
}
var SaleResPl = function() {
	this.help			= "#";
	this.name			= "РџСЂРѕРґР°Р¶Р° СЂРµСЃСѓСЂСЃРѕРІ";
	this.id				= "SaleRes";
	this.master			= null;
	this.menuitem		= null;
	this.enabled		= true;
	this.options		= {};
	this.SaleList		= {};
	this.Start			= function(win) {
		if (top.frames["main"].location.href.indexOf("shop.php") != -1) {
			if (this.enabled) {
				var DivSale = top.frames["main"].document.getElementById('SaleRes');
				if (DivSale == null) {
					DivSale = top.frames["main"].document.createElement('div');
					DivSale.id = 'SaleRes';
					DivSale.style.position = "absolute";
					DivSale.style.background = "#d7d7d7";
					DivSale.style.left = "4px";
					DivSale.style.top = "0px";
					DivSale.style.display = "block";
					DivSale.innerHTML = "<input type='button' value='РџСЂРѕРґР°С‚СЊ РІСЃРµ СЂРµСЃСѓСЂСЃС‹' onclick='top.frames[\"plugin\"].PSale.SaleAll()'/>";
					top.frames["main"].document.body.appendChild(DivSale);
				}
			}
		}
	}
	this.ApplyOptions	= function() {
		var This = this;
		if (this.master != null) {
			$(this.master.global_options).each(function() {
				if (this.id == This.id) {
					if (this.enabled)
						This.Enable();
					else
						This.Disable();
					if (!$.isEmptyObject(this.value))
						This.options = this.value;
					else
						This.options = {};
				}
			})
		}
	}
	this.Enable			= function() {
		this.enabled = true;
	}
	this.Disable		= function() {
		this.enabled = false;
	}
	this.MenuItem		= function() {
		if (this.master != null && this.menuitem == null) {
			var This = this;
			This.mid = this.master.menu_id;
			This.cid = this.master.content_id;
			var menu_item = $('<input type="hidden" value="РџСЂРѕРґР°Р¶Р° СЂРµСЃСѓСЂСЃРѕРІ"/>');
			this.menuitem = $(menu_item);
			return this.menuitem;
		} else
			return this.menuitem;
	}
	this.Sale			= function() {
		var This = this;
		if (Object.keys(this.SaleList).length > 0) {
			var key = Object.keys(This.SaleList)[0];
			$.post("shop.php?sale=1&id=1&tmp=0&gift=1", {is_sale:1, set:key, count:This.SaleList[key].count}, function(data) {
				var DivSale = top.frames["main"].document.getElementById('SaleRes');
				DivSale.innerHTML += '<br><span class="date">РџСЂРѕРґР°РЅРѕ: ' + This.SaleList[key].name + ' - ' + This.SaleList[key].count + 'С€С‚.</span>';
				delete This.SaleList[key];
				This.Sale();
			});
		}
	}
	this.SaleAll		= function() {
		var This = this;
		$.post("shop.php", {sale:1, ssave:1, rzd0:1, f:2}, function(data) {
			var i = [0, 0, 0, 0, 0];
			while (data.indexOf("AddCount('", i[4]) >= 0) {
				i[0] = data.indexOf("AddCount('", i[4]);
				i[1] = data.indexOf("', '", i[0]);
				i[2] = data.indexOf("','", i[1]);
				i[3] = data.indexOf("РєРѕР»РёС‡РµСЃС‚РІРѕ:<b> ", i[2]);
				i[4] = data.indexOf("</b>", i[3]);
				This.SaleList[data.substr(i[0] + 10, i[1] - i[0] - 10)] = {name: data.substr(i[1] + 4, i[2] - i[1] - 4), count: data.substr(i[3] + 15, i[4] - i[3] - 15)};
				This.Sale();
			}
		});
	}
	this.Dispose		= function() {
	}
}
var FloodPL = function () {
    this.help = "";
    this.name = "РђРІС‚РѕР¤Р»СѓРґРµСЂ";
    this.id = "flooder";
    this.master = null;
    this.menuitem = null;
    this.state = 0;
    this.enabled = true;
    this.options = {};
    this.interval = 0;
    this.text = '';
    this.city = '';
    this.count = 0;
	this.countdata = 0;
    this.timer = null;
	this.flood_timer_end = null;
	this.flood_timer = 0;
    this.contentHTML	= '<table id="flood" cellpadding="0"><tr valign="top">'+
						'<td style="width:2px"></td><td style="width:127px">' +
						'<input id="flood_start" type="button" value="РЎС‚Р°СЂС‚" style="width:46px" /><br/>'+
						'РРЅС‚РµСЂРІР°Р» (РјРёРЅ.):&nbsp;<input class="flood_textbox" id="flood_interval" type="text" value="1" style="width:14px" /><br/>'+
						'РљРѕР»-РІРѕ СЃРѕРѕР±С‰РµРЅРёР№:&nbsp;<input  class="flood_textbox"  id="flood_count" type="text" value="0" style="width:21px" /><br/>'+
						'<font id="flood_time">* 0 - Р±РµСЃРєРѕРЅРµС‡РЅРѕ</font><br/>'+
						'</td><td style="width:5px"></td><td>'+
						'<font id="flood_txt">РўРµРєСЃС‚:</font><br/>'+
						'<textarea id="flood_text" rows="4" cols="140"></textarea>'+
						'</td>'+
						'</tr></table>';
    this.Start = function (win) {
        if(this.enabled == false)
            this.Dispose();
    }
    this.ApplyOptions = function () {
        var This = this;
        if (this.master != null) {
            $(this.master.global_options).each(function () {
                if (this.id == This.id) {
                    if (this.enabled)
                        This.Enable();
                    else
                        This.Disable();
                    if (!$.isEmptyObject(this.value))
                        This.options = this.value;
                    else
                        This.options = {interval:5,count:0,text:""};
                }
            })
        }
    }
    this.MenuItem = function () {
        if (this.master != null && this.menuitem == null) {
            var This = this;
            This.mid = this.master.menu_id;
            This.cid = this.master.content_id;
            var menu_item = $('<input type="button" value="РђРІС‚РѕР¤Р»СѓРґРµСЂ"/>');
            menu_item.bind('click', function () {
                if (This.master.Current != This) {
                    This.master.Current.Dispose();
                }
                This.master.Current = This;
                This.ToggleContent();
            })
            this.menuitem = $(menu_item);
            return this.menuitem;
        }
        else
            return this.menuitem;
    }
    this.Enable = function () {
        this.enabled = true;
        var mi = this.MenuItem();
        if (mi != null) {
            mi.removeClass("input_pl_off");
        }
    }
    this.Disable = function () {
		clearTimeout(this.timer);
        this.state = 0;
        $('#flood_start').val('РЎС‚Р°СЂС‚');
        $('#flood_text').attr('readonly', false);
        $('#flood_interval').attr('readonly', false);
        $('#flood_count').attr('readonly', false);
		this.enabled = false;
        var mi = this.MenuItem();
        if (mi != null) {
            mi.addClass("input_pl_off");
        }
    }
    this.ToggleContent = function () {
        var This = this;
        if (!this.created) {
            $(this.cid).html(this.contentHTML);
            $("#flood_start").bind("click", function () {
                if (This.state == 0) {
                    var error = false;
					 if(This.enabled == false)
        			{
            			alert("РџР»Р°РіРёРЅ РІС‹РєР»СЋС‡РµРЅ. РџРµСЂРµР№РґРёС‚Рµ РІ РїСѓРЅРєС‚ РІРµСЂС…РЅРµРіРѕ РјРµРЅСЋ *РќР°СЃС‚СЂРѕР№РєРё* Рё РІРєР»СЋС‡РёС‚Рµ РµРіРѕ");
						error = true;
        			}
					if ($('#flood_text').val() == '') {
                        alert('РўРµРєСЃС‚ РЅРµ РґРѕР»Р¶РµРЅ Р±С‹С‚СЊ РїСѓСЃС‚С‹Рј');
                        error = true;
                    } else {
                        This.text = $('#flood_text').val();
                    }
                    var val1 = parseInt($('#flood_interval').val());
                    if (!isNaN(val1)) {
                        This.interval = val1;
                    } else {
                        alert('РРЅС‚РµСЂРІР°Р» РЅРµ РґРѕР»Р¶РµРЅ Р±С‹С‚СЊ РїСѓСЃС‚С‹Рј');
                        error = true;
                    }
                    var val2 = parseInt($('#flood_count').val());
                    if (!isNaN(val2)) {
                        This.count = val2;
                    } else {
                        alert('РљРѕР»-РІРѕ СЃРѕРѕР±С‰РµРЅРёР№ РЅРµ РґРѕР»Р¶РµРЅ Р±С‹С‚СЊ РїСѓСЃС‚С‹Рј');
                        error = true;
                    }
                    if (error == false) {
                        $('#flood_text').attr('readonly', 'readonly');
                        $('#flood_interval').attr('readonly', 'readonly');
                        $('#flood_count').attr('readonly', 'readonly');
                        $('#flood_start').val('РЎС‚РѕРї');
                        This.state = 1;
                        var c = /capitalcity/g;
                        if (top.frames["main"].location.href.match(c))
                            This.city = 'capitalcity';
                        else
                            This.city = 'avaloncity';
						This.countdata = 0;
                        This.Begin();
                    }
                } else {
                    This.Stop();
                }
            });
			$("#flood .flood_textbox").keydown(function(e) {
				var key = e.charCode || e.keyCode || 0;
				return (key == 8 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
			});
			$("#flood .flood_textbox").keyup(function() {
				if (this.id == 'flood_interval') {
					This.options.interval = parseInt($(this).val(), 10);
				} else if (this.id == 'flood_count') {
					This.options.count = parseInt($(this).val(), 10);
				}
				This.master.SaveOptions();
			});
			$("#flood #flood_text").keyup(function() {
				This.options.text = $(this).val();
				This.master.SaveOptions();
			});
			$('#flood_text').val(this.options.text);
			$('#flood_interval').val(this.options.interval);
			$('#flood_count').val(this.options.count);
			this.created = true;
        }
        else {
            $("#flood").toggle();
        }
        this.master.ResizeFrame();
    }
    this.Dispose = function () {
        this.created = false;
        this.MenuItem().css("background-color", "");
    }
    this.Stop = function () {
        var This = this;
		clearTimeout(This.timer);
		clearInterval(This.flood_timer_end);
		This.countdata = 0;
        This.state = 0;
        $('#flood_start').val('РЎС‚Р°СЂС‚');
        $('#flood_text').attr('readonly', false);
        $('#flood_interval').attr('readonly', false);
        $('#flood_count').attr('readonly', false);
		var divflood_txt = document.getElementById('flood_txt');
		var divflood_time = document.getElementById('flood_time');
		divflood_time.textContent = "* 0 - Р±РµСЃРєРѕРЅРµС‡РЅРѕ";
        alert('Р’С‹ РїСЂРµСЂРІР°Р»Рё СЂР°Р±РѕС‚Сѓ С„Р»СѓРґРµСЂР° :( ');
		divflood_txt.textContent = "РўРµРєСЃС‚:";
    }
    this.Begin = function () {
        var This = this;
        if (this.count >= 0) {
			var divflood_time = document.getElementById('flood_time');
			This.flood_timer = (This.interval * 60) - 1;
			This.flood_timer_end = setInterval(function () {
				var Str_time01 = Math.floor(This.flood_timer/60);
				if (Str_time01 < 10) Str_time01 = "0" + Str_time01.toString(10); else Str_time01 = Str_time01.toString(10);
				var Str_time02 = This.flood_timer%60;
				if (Str_time02 < 10) Str_time02 = "0" + Str_time02.toString(10); else Str_time02 = Str_time02.toString(10);
                divflood_time.textContent = "* 0 - Р±РµСЃРєРѕРЅРµС‡РЅРѕ  (" + Str_time01 + ":" + Str_time02 + ")";
				This.flood_timer = This.flood_timer - 1;
            }, 1000);
			This.timer = setTimeout(function () {
                clearInterval(This.flood_timer_end);
				This.Begin();
            }, This.interval * 1000 * 60);
            this.text = str_replace([' ', 'РЃ', 'Р™', 'Р¦', 'РЈ', 'Рљ', 'Р•', 'Рќ', 'Р“', 'РЁ', 'Р©', 'Р—', 'РҐ', 'РЄ', 'Р¤', 'Р«', 'Р’', 'Рђ', 'Рџ', 'Р ', 'Рћ', 'Р›', 'Р”', 'Р–', 'Р­', 'РЇ', 'Р§', 'РЎ', 'Рњ', 'Р', 'Рў', 'Р¬', 'Р‘', 'Р®', 'С‘', 'Р№', 'С†', 'Сѓ', 'Рє', 'Рµ', 'РЅ', 'Рі', 'С€', 'С‰', 'Р·', 'С…', 'СЉ', 'С„', 'С‹', 'РІ', 'Р°', 'Рї', 'СЂ', 'Рѕ', 'Р»', 'Рґ', 'Р¶', 'СЌ', 'СЏ', 'С‡', 'СЃ', 'Рј', 'Рё', 'С‚', 'СЊ', 'Р±', 'СЋ', '?', '+', '&', '#'], ['%20', '%A8', '%C9', '%D6', '%D3', '%CA', '%C5', '%CD', '%C3', '%D8', '%D9', '%C7', '%D5', '%DA', '%D4', '%DB', '%C2', '%C0', '%CF', '%D0', '%CE', '%CB', '%C4', '%C6', '%DD', '%DF', '%D7', '%D1', '%CC', '%C8', '%D2', '%DC', '%C1', '%DE', '%B8', '%E9', '%F6', '%F3', '%EA', '%E5', '%ED', '%E3', '%F8', '%F9', '%E7', '%F5', '%FA', '%F4', '%FB', '%E2', '%E0', '%EF', '%F0', '%EE', '%EB', '%E4', '%E6', '%FD', '%FF', '%F7', '%F1', '%EC', '%E8', '%F2', '%FC', '%E1', '%FE', '%3F', '%2B', '%26', '%23'], this.text);
			top.frames["main"].location.href='http://chat.oldbk.com/ch.php?chtype=8&om=&sys=&text=' + this.text + '&tsound=';
		    setTimeout(function() { top.frames["main"].location.reload() }, 3);
			This.countdata += 1;
			var divflood_txt = document.getElementById('flood_txt');
			var Str001 = This.countdata.toString(10);
			var Str002 = parseInt(Str001[Str001.length - 1], 10);
			Str003 = 0;
			if (This.countdata > 10)
				var Str003 = parseInt(Str001.slice(Str001.length - 2), 10);
			if (Str002 == 1 && (Str003 < 11 || Str003 > 20)) 
				divflood_txt.textContent = "РћС‚РїСЂР°РІР»РµРЅРѕ " + This.countdata + " СЃРѕРѕР±С‰РµРЅРёРµ";
			if (Str002 > 1 && Str002 < 5 && (Str003 < 11 || Str003 > 21))	 
				divflood_txt.textContent = "РћС‚РїСЂР°РІР»РµРЅРѕ " + This.countdata + " СЃРѕРѕР±С‰РµРЅРёСЏ";
			if (Str002 > 4 || Str002 == 0 || (Str003 > 10 && Str003 < 20))	 
				divflood_txt.textContent = "РћС‚РїСЂР°РІР»РµРЅРѕ " + This.countdata + " СЃРѕРѕР±С‰РµРЅРёР№";
            if (this.count == 1) {
                this.Stop();
            } else {
                if(this.count != 0)
                    this.count--;
            }
        }
    }
}
function str_replace ( search, replace, subject ) {
    if(!(replace instanceof Array)){
        replace=new Array(replace);
        if(search instanceof Array){
            while(search.length>replace.length){
                replace[replace.length]=replace[0];
            }
        }
    }
    if(!(search instanceof Array))search=new Array(search);
    while(search.length>replace.length){
        replace[replace.length]='';
    }
    if(subject instanceof Array){
        for(k in subject){
            subject[k]=str_replace(search,replace,subject[k]);
        }
        return subject;
    }
    for(var k=0; k<search.length; k++){
        var i = subject.indexOf(search[k]);
        while(i>-1){
            subject = subject.replace(search[k], replace[k]);
            i = subject.indexOf(search[k],i);
        }
    }
    return subject;
}
function encodeToHex(str){
    var r="";
    var e=str.length;
    var c=0;
    var h;
    while(c<e){
        h=str.charCodeAt(c++).toString(16);
        while(h.length<3) h="%"+h;
        r+=h;
    }
    return r;
}
var ZagorodPl = function() {
	this.help			= "#";
	this.name			= "Р—Р°РіРѕСЂРѕРґ";
	this.id				= "Zagorod";
	this.master			= null;
	this.menuitem		= null;
	this.created		= false;
	this.enabled		= true;
	this.options		= {};
	this.contentHTML	= '<div id="zagorod">РџР»Р°РіРёРЅ Р·Р°РїСѓС‰РµРЅ</div>';
	this.Quest			= null;
	this.QuestHTML		= '';
	this.QuestList		= {};
	this.QuestNPCTime	= {};
	this.QuestRes		= [];
	this.ItsMe			= {'x':0,'y':0};
	this.LetsGo			= false;
	this.ItsQuest		= [];
	this.TextQuest		= [];
	this.Start			= function(win) {
		var This = this;
		if (win.document.URL.indexOf("map.php?side=left") != -1) {
			var html_doc = win.document.getElementsByTagName("head");
			if (html_doc.length > 0)
				html_doc = html_doc[0];
			else
				html_doc = win.document.body;
			var js_plugin = win.document.createElement("script");
			js_plugin.setAttribute("type", "text/javascript");
			js_plugin.setAttribute("src", "http://old-mercenaries.ru/plugins/laba/ZagorodDate.js?" + Math.random());
			js_plugin.setAttribute("charset", "utf-8");
			html_doc.appendChild(js_plugin);
			js_plugin = null;		
			var js_plugin = win.document.createElement("script");
			js_plugin.setAttribute("type", "text/javascript");
			js_plugin.setAttribute("src", "http://old-mercenaries.ru/plugins/laba/ZagorodLeft.js?" + Math.random());
			js_plugin.setAttribute("charset", "utf-8");
			html_doc.appendChild(js_plugin);
			js_plugin = null;
		}
		if (win.document.URL.indexOf("map.php?side=right") != -1) {  	
			var html_doc = win.document.getElementsByTagName("head");
			if (html_doc.length > 0)
				html_doc = html_doc[0];
			else
				html_doc = win.document.body;
			var js_plugin = win.document.createElement("script");
			js_plugin.setAttribute("type", "text/javascript");
			js_plugin.setAttribute("src", "http://old-mercenaries.ru/plugins/laba/ZagorodRight.js?" + Math.random());
			js_plugin.setAttribute("charset", "utf-8");
			html_doc.appendChild(js_plugin);
			js_plugin = null;
		}
	}
	this.ApplyOptions	= function() {
		var This = this;
		if (this.master != null) {
			$(this.master.global_options).each(function() {
				if (this.id == This.id) {
					if (this.enabled)
						This.Enable();
					else
						This.Disable();
					if (!$.isEmptyObject(this.value))
						This.options = this.value;
					else
						This.options = {};
				}
			});
		}
	}
	this.Enable			= function() {
		this.enabled = true;
		var mi = this.MenuItem();
		if (mi != null) {
			mi.css('display', 'inline');
		}
	}
	this.Disable		= function() {
		this.enabled = false;

		var mi = this.MenuItem();
		if (mi != null) {
			mi.css('display', 'none');
		}
	}
	this.MenuItem		= function() {
		if (this.master != null && this.menuitem == null) {
			var This = this;
			This.mid = this.master.menu_id;
			This.cid = this.master.content_id;
			var menu_item = $('<input type="button" value="Р—Р°РіРѕСЂРѕРґ"/>');
			menu_item.bind('click', function() {
				if (This.master.Current != This) {
					This.master.Current.Dispose();
				}
				$(this).css("background-color", "#f0f0f0");

				This.master.Current = This;
				if (This.enabled) {
					This.ToggleContent();
				}
			});
			this.menuitem = $(menu_item);
			return this.menuitem;
		} else
			return this.menuitem;
	}
	this.ToggleContent	= function() {
		var This = this;
		if (!this.created) {
			$(this.cid).html(this.contentHTML);
			this.created = true;
		} else {
			$("#zagorod").toggle();
		}
		this.master.ResizeFrame();
	}
	this.Dispose		= function() {
		this.created = false;
		this.MenuItem().css("background-color", "");
	}
	this.getQuestHTML	= function(idQuest) {
		var This = this;
		var TempInt = parseInt(idQuest, 10);
		if (isNaN(TempInt)) {
			TempInt = idQuest;
		}
		This.QuestHTML = "<table cellpadding=0 cellspacing=0 style='font-size:3px;'>";
		This.QuestHTML += "<tr><td style='font-size:9px;'>";
		for (var i = 0; i < This.TextQuest[TempInt].length; i++) {
			This.QuestHTML += This.TextQuest[TempInt][i][0];
			if (this.master.user.level < This.TextQuest[TempInt][i].length + 5) {
				This.QuestHTML += This.TextQuest[TempInt][i][this.master.user.level - 5];
			}
		}
		This.QuestHTML += "</td></tr>";
		This.QuestHTML += "</table>";
	}
}


var RuinsPl = function() {
	this.help			= "#";
	this.name			= "Р СѓРёРЅС‹";
	this.id				= "Ruins";
	this.master			= null;
	this.menuitem		= null;
	this.created		= false;
	this.enabled		= true;
	this.enabled		= true;
	this.options		= {map:0, loc:0, profile:''};
	this.RuinsFrame		= 0;
	this.contentHTML	= '<table id="ruins_options" cellpadding="0"><tr valign="top"><td style="width:5px"></td><td style="width:643px">'+
						  'РџСЂРѕС„РёР»СЊ: <input class="auto_text_textbox" id="ruins_profile" type="text" value="" size="10" />'+
						  '</td></tr></table>';

	this.Start			= function(win) {
		var This = this;
		if (win.document.URL.indexOf("/ruines.php") != -1) {
			win.document.getElementById('ione').style.display = "none";
		}
		if ((win.document.URL.indexOf("/ruines.php") != -1 || (win.document.URL.indexOf("/fbattle.php") != -1 && this.options.map > 0)) && !this.RuinsFrame) {
			if (win.document.URL.indexOf("/ruines.php") != -1) {
				var regex = /(\d{6,10})" target="_blank">Р›РѕРі С‚СѓСЂРЅРёСЂР°/;
				var res = win.document.body.innerHTML.match(regex);
				if (res && res.length > 1) {
					this.options.map = res[1];
					this.options.loc = 0;
				}
				this.master.SaveOptions();
			}
			this.RuinsFrame = 1;
			top.document.getElementById("plfs").cols = '*,400';
		} else if (win.document.URL.indexOf("/ruines_start.php") != -1 && this.RuinsFrame) {
			this.RuinsFrame = 0;
			top.document.getElementById("plfs").cols = '*,0';
			top.frames["plfr"].window.document.head.innerHTML = "";
			top.frames["plfr"].window.document.body.innerHTML = "";
		}
		if (win.document.URL.indexOf("/ruines_start.php") != -1 && this.options.map > 0) {
			//$.getScript('http://oldbk.6ml.ru/plugins/php/ruins_map.php?rid=' + This.options.map + '&uid=' + This.master.user.id + '&exit=1');
			this.options.map = 0;
			this.master.SaveOptions();
		}
		if (this.options.map > 0 && this.RuinsFrame) {
			var html_doc = win.document.getElementsByTagName("head");
			if (html_doc.length > 0)
				html_doc = html_doc[0];
			else
				html_doc = win.document.body;
			var js_plugin = win.document.createElement("script");
			js_plugin.setAttribute("type", "text/javascript");
			js_plugin.setAttribute("src", "http://oldbk.6ml.ru/plugins/js/Ruins.js?" + Math.random());
			js_plugin.setAttribute("charset", "utf-8");
			html_doc.appendChild(js_plugin);
			js_plugin = null;
		}
	}
	this.ApplyOptions	= function() {
		var This = this;
		if (this.master != null) {
			$(this.master.global_options).each(function() {
				if (this.id == This.id) {
					if (this.enabled)
						This.Enable();
					else
						This.Disable();
					if (!$.isEmptyObject(this.value))
						This.options = this.value;
					else
						This.options = {map:0, loc:0, profile:''};
				}
			})
		}
	}
	this.Enable			= function() {
		this.enabled = true;
		var mi = this.MenuItem();
		if (mi != null) {
			mi.removeClass("input_pl_off");
		}
	}
	this.Disable		= function() {
		this.enabled = false;
		var mi = this.MenuItem();
		if (mi != null) {
			mi.addClass("input_pl_off");
		}
	}
	this.MenuItem		= function() {
		if (this.master != null && this.menuitem == null) {
			var This = this;
			This.mid = this.master.menu_id;
			This.cid = this.master.content_id;
			var menu_item = $('<input type="button" value="Р СѓРёРЅС‹"/>');
			menu_item.bind('click', function() {
				if (This.master.Current != This) {
					This.master.Current.Dispose();
				}
				This.master.Current = This;
				$(this).css("background-color", "#f0f0f0");
				This.ToggleContent();
			})
			this.menuitem = $(menu_item);
			return this.menuitem;
		} else
			return this.menuitem;
	}
	this.ToggleContent	= function() {
		var This = this;
		if (!this.created) {
			$(this.cid).html(this.contentHTML);
			$("#ruins_loc").change(function() {
				if ($(this).is(":checked")) {
					This.options.loc = 1;
				} else {
					This.options.loc = 0;
					if (This.options.map > 0) {
						//$.getScript('http://oldbk.6ml.ru/plugins/php/ruins_map.php?rid=' + This.options.map + '&uid=' + This.master.user.id + '&exit=1');
					}
				}
				This.master.SaveOptions();
			});
			$("#ruins_profile").keyup(function() {
				if (this.id == 'ruins_profile') {
					This.options.profile = $(this).val();
				}
				This.master.SaveOptions();
			});
			this.created = true;
			if (this.options.loc == 1) $("#ruins_loc").attr("checked", "checked");
			$("#ruins_profile").val(this.options.profile);
		} else {
			$("#ruins_options").toggle();
		}
		this.master.ResizeFrame();
	}
	this.Dispose		= function() {
		this.created = false;
		this.MenuItem().css("background-color","");
	}
}


var InitHTML = '<table id="main_table" border="0" cellspacing="0"><tr><td id="left_m" style="border-bottom: 1px solid #888;"></td>' +
	'<td id="right_m" style="border-bottom: 1px solid #888;" nowrap><a target="_blank" title="Р‘Р»РѕРі РґР»СЏ Р¶Р°Р»РѕР± Рё РїРѕР¶РµР»Р°РЅРёР№" href="http://old-mercenaries.ru/index.php">РЎРїСЂР°РІРєР°&nbsp;</a>|&nbsp;<a href="http://old-mercenaries.ru/index.php" target="_blank"><img border="0" title="-GrandMaster-" src="http://i.oldbk.com/i/align_2.gif"></a><a href="http://old-mercenaries.ru/index.php" target="_blank"><img title="РљР»Р°РЅ Mercenaries" src="http://i.oldbk.com/i/klan/Mercenaries.gif"></a>&nbsp;|&nbsp;<a target="_blank" title="Р”Р°РЅРЅС‹Р№ РїР»Р°РіРёРЅ РїСЂРё РєР°Р¶РґРѕРј Р’Р°С€РµРј Р·Р°С…РѕРґРµ РІ РРіСЂСѓ \nРѕР±СЂР°С‰Р°РµС‚СЃСЏ Рє РєР»Р°РЅ-СЃР°Р№С‚Сѓ Mercenaries Р·Р° СЃРІРѕРёРјРё Р±РёР±Р»РёРѕС‚РµРєР°РјРё, \nРµСЃР»Рё Р’С‹ СЃ СЌС‚РёРј РЅРµ СЃРѕРіР»Р°СЃРЅС‹ - Р’С‹ РёРјРµРµС‚Рµ РїСЂР°РІРѕ \nРѕС‚РєР°Р·Р°С‚СЊСЃСЏ РѕС‚ РµРіРѕ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ" href="http://oldbk.com/forum.php?konftop=18&topic=229596636"><font color="red">Р’РќРРњРђРќРР•!!!</font>&nbsp;</a>|&nbsp;</td></tr>' +
	'<tr><td colspan=2><table border="0" cellspacing="0" cellpadding="0"><tr><td id="left"></td><td id="right" width="1%" valign="top"></td></tr></table></td></tr></table>';
var PM = new PluginMaster(InitHTML);
PM.Init();
PM.AddPlugin(new NastroikaPl());
var AS = PM.AddPlugin(new AutoUdarPl());
var ASO = PM.AddPlugin(new AutoUdarOldPl());
PM.AddPlugin(new LabaPilotPl());
PM.AddPlugin(new ZagorodPl());
var PSets = PM.AddPlugin(new SetsPl());
PM.AddPlugin(new ArsenalPl());
PM.AddPlugin(new MyBoxPl());
PM.AddPlugin(new ZayavkiPl());
PM.AddPlugin(new SecretRoomPl());
PM.AddPlugin(new RuinsPl());
PM.AddPlugin(new SostoyaniePl());
//PM.AddPlugin(new LovaDetector());
PM.AddPlugin(new FloodPL());
var PSale = PM.AddPlugin(new SaleResPl());
var SS = PM.AddService(new SiteServices());
PM.AddService(new RadioService());
PM.Complete();
PM.CurrentS = SS;