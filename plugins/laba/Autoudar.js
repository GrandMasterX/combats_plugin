var PluginFrame = null;
if (typeof(top.frames['plugin']) == undefined) {
	if (typeof(top.frames[0]) != undefined) {
		if (typeof(top.frames[0].window.PM) != undefined) {
			PluginFrame = top.frames[0].window;
		}
	}
} else {
	PluginFrame = top.frames['plugin'].window;
}
var PluginAttack = null;
if (PluginFrame != null) {
	PluginFrame.$(PluginFrame.PM.plugins).each(function() {
		if (this.id == "AutoUdar") {
			PluginAttack = this;
		}
	});
}
function SetAttack() {
	var at = PluginAttack.options.areas.hit;
	if (at.length == 0) {
		at = [1, 2, 3, 4];
	}
	var i = at.length;
	var inx = Math.floor(Math.random() * i);
	PluginFrame.$("#A" + at[inx], document.body).click();
}
function SetDefense() {
	var def = PluginAttack.options.areas.block;
	if (def.length == 0) {
		def = [1, 2, 3, 4];
	}
	var i = def.length;
	var inx = Math.floor(Math.random() * i);
	PluginFrame.$("#D" + def[inx], document.body).click();
}
function RefreshBWin() {
	PluginFrame.$('form', document.body).submit();
}
function SubmitAttack() {
	var f = PluginFrame.$('form', document.body);
	check(f[0]);
}
function RefreshBWin2() {
	PluginAttack.RefreshCounter++;
	RefreshBWin();
}
var AttackInstalled = false;
var timeout_handle = null;
function KeyPressed(e) {
	var key = -1;
	var evt;
	if (window.event) {
		key = event.keyCode;
		evt = window.event;
	} else {
		key = e.which;
		evt = e;
	}
	if (key == 13) {
		var f = PluginFrame.$('form', document.body);
		if (f.length > 0) {
			if (document.body.innerHTML.indexOf('>Ожидаем хода противника...<') != -1) {
				f[0].submit();
			} else {
				check(f[0]);
			}
		}
	} else {
		if ( key == 32) {
			if (PluginAttack.started) {
				PluginAttack.End(false);
			} else {
				PluginAttack.Begin();
			}
			if (e.preventDefault) {
				e.preventDefault();
			} else {
				return false;
			}
		}
	}
}
function get_person(query, data, chek_type) {
	var chek_type = !!chek_type;
	for(var key in data) {
		if ((chek_type && data[key].name === query) || (!chek_type && data[key].name == query)) {
			return data[key];
		}
	}
	return false;
}
function GetTeams() {
	var regex = /inf\.php\?(\d+)/;
	var res = [];
	var res = regex.exec(document.getElementsByTagName('td')[1].innerHTML);
	PluginAttack.master.user.id = res[1];
	PluginAttack.teams = {};
	PluginAttack.teams_frend = [];
	var divMes = document.getElementById('mes');
	var regex = /ChangeEnemy/mi;
	if (PluginAttack.options.scan_team == 1) {
		for (var i = divMes.getElementsByTagName('span').length - 1; i >= 0; i--) {
			PluginAttack.teams[divMes.getElementsByTagName('span')[i].id] = {
				'name':			"",
				'pers_frend_read':	0,
				'level':		-1,
				'strength':		0,
				'dexterity':	0,
				'intuition':	0,
				'vitality':		0,
				'intellect':	0,
				'wisdom':		0,
				'enemy':		false,
				'order':		0,
				'attack':		false,
				'uvalue':		false,
				'klasspers':	"NoName",
				'k_uvorot':		0,
				'k_ak':			0,
				'k_au':			0,
				'k_krit':		0,
				'k_s':			0,
				'r_uvorot':		0,
				'r_ak':			0,
				'r_au':			0,
				'r_krit':		0,
				'r_s':			0,
				'indruns':		0
			};
			PluginAttack.teams[divMes.getElementsByTagName('span')[i].id].name = divMes.getElementsByTagName('span')[i].textContent;
			PluginAttack.teams[divMes.getElementsByTagName('span')[i].id].enemy = regex.test(divMes.getElementsByTagName('span')[i].onclick);
			if (!PluginAttack.teams[divMes.getElementsByTagName('span')[i].id].enemy) {
				PluginAttack.teams_frend[PluginAttack.teams_frend.length] = divMes.getElementsByTagName('span')[i].id;
			}
		}
	} else {
		for (var i = 0, l = divMes.getElementsByTagName('span').length; i < l; i++) {
			PluginAttack.teams[divMes.getElementsByTagName('span')[i].id] = {
				'name':			"",
				'pers_frend_read':	0,
				'level':		-1,
				'strength':		0,
				'dexterity':	0,
				'intuition':	0,
				'vitality':		0,
				'intellect':	0,
				'wisdom':		0,
				'enemy':		false,
				'order':		0,
				'attack':		false,
				'uvalue':		false,
				'klasspers':	"NoName",
				'k_uvorot':		0,
				'k_ak':			0,
				'k_au':			0,
				'k_krit':		0,
				'k_s':			0,
				'r_uvorot':		0,
				'r_ak':			0,
				'r_au':			0,
				'r_krit':		0,
				'r_s':			0,
				'indruns':		0
			};
			PluginAttack.teams[divMes.getElementsByTagName('span')[i].id].name = divMes.getElementsByTagName('span')[i].textContent;
			PluginAttack.teams[divMes.getElementsByTagName('span')[i].id].enemy = regex.test(divMes.getElementsByTagName('span')[i].onclick);
			if (!PluginAttack.teams[divMes.getElementsByTagName('span')[i].id].enemy) {
				PluginAttack.teams_frend[PluginAttack.teams_frend.length] = divMes.getElementsByTagName('span')[i].id;
			}
		}
	}
	if (PluginAttack.options.mini_read_classpers == 0) {
		var minlvl = Math.min(PluginAttack.options.mint_aklevel, PluginAttack.options.mint_aulevel, PluginAttack.options.minulevel, PluginAttack.options.minu_aulevel, PluginAttack.options.minu_aklevel, PluginAttack.options.minklevel, PluginAttack.options.mink_aulevel, PluginAttack.options.mink_aklevel);
		var maxlvl = Math.min(PluginAttack.options.maxt_aklevel, PluginAttack.options.maxt_aulevel, PluginAttack.options.maxulevel, PluginAttack.options.maxu_aulevel, PluginAttack.options.maxu_aklevel, PluginAttack.options.maxklevel, PluginAttack.options.maxk_aulevel, PluginAttack.options.maxk_aklevel);
		if (maxlvl != 0) {
			var maxlvl = Math.max(PluginAttack.options.maxt_aklevel, PluginAttack.options.maxt_aulevel, PluginAttack.options.maxulevel, PluginAttack.options.maxu_aulevel, PluginAttack.options.maxu_aklevel, PluginAttack.options.maxklevel, PluginAttack.options.maxk_aulevel, PluginAttack.options.maxk_aklevel);
		}
	} else {
		var minlvl = Math.min(PluginAttack.options.mint_aklevel, PluginAttack.options.mint_aulevel, PluginAttack.options.minulevel, PluginAttack.options.minklevel);
		var maxlvl = Math.min(PluginAttack.options.maxt_aklevel, PluginAttack.options.maxt_aulevel, PluginAttack.options.maxulevel, PluginAttack.options.maxklevel);
		if (maxlvl != 0) {
			var maxlvl = Math.max(PluginAttack.options.maxt_aklevel, PluginAttack.options.maxt_aulevel, PluginAttack.options.maxulevel, PluginAttack.options.maxklevel);
		}
	}
	PluginFrame.$.ajax({
		url:("logs.php?log=" + PluginAttack.BattleID),
		success:function(data) {
			var regex = /<B>(.*?)<\/B> \[(\?\?|\d+)\]<a href=inf/g;
			var res = [];
			var res = data.match(regex);
			if ((res) && (res.length > 1)) {
				for (var i = 0, l = res.length; i < l; i++) {
					var pers_info = /<B><i>(.*?)<\/i><\/B> \[(\?\?|\d+)\]<a href=inf/i;
					var TempBool01 = pers_info.test(res[i]);
					if (!TempBool01) {
						var pers_info = /<B>(.*?)<\/B> \[(\?\?|\d+)\]<a href=inf/i;
					}
					var lres = [];
					var lres = pers_info.exec(res[i]);
					if ((lres) && (lres.length > 1)) {
						var p = get_person(lres[1], PluginAttack.teams, true);
						if ((p != false) && (lres[2] != "??")) {
							var TempInt = parseInt(lres[2], 10);
							if (isNaN(TempInt)) {
								p.level = lres[2];
							} else {
								p.level = TempInt;
							}
						}
						if (p != false ) {
							if ((p.level == -1) && (PluginAttack.options.nevid == 1)) {
								p.attack = (p.enemy && true);
							} else {
								if ((p.level >= minlvl) && ((p.level <= maxlvl) || (maxlvl == 0))) {
									p.attack = (p.enemy && true);
								}
							}
						}
					}
				}
			}
			window.location.href = 'fbattle.php?batl=';
		}
	});
}
function GetFrendsInfo(Id_Frend) {
	if (PluginAttack.teams[Id_Frend] == null) {
		PluginAttack.teams[Id_Frend] = {};
		PluginAttack.teams[Id_Frend].vitality = 0;
		PluginAttack.teams[Id_Frend].enemy = true;
		PluginAttack.teams[Id_Frend].attack = false;
		PluginAttack.teams[Id_Frend].order = PluginAttack.BattleOrder;
		PluginAttack.teams[Id_Frend].name = "";
		PluginAttack.teams[Id_Frend].pers_frend_read = 0;
		PluginAttack.teams[Id_Frend].level = -1;
		PluginAttack.teams[Id_Frend].uvalue = false;
		PluginAttack.teams[Id_Frend].klasspers = "NoName";
		PluginAttack.teams[Id_Frend].k_uvorot = 0;
		PluginAttack.teams[Id_Frend].k_ak = 0;
		PluginAttack.teams[Id_Frend].k_au = 0;
		PluginAttack.teams[Id_Frend].k_krit = 0;
		PluginAttack.teams[Id_Frend].k_s = 0;
		PluginAttack.teams[Id_Frend].r_uvorot = 0;
		PluginAttack.teams[Id_Frend].r_ak = 0;
		PluginAttack.teams[Id_Frend].r_au = 0;
		PluginAttack.teams[Id_Frend].r_krit = 0;
		PluginAttack.teams[Id_Frend].r_s = 0;
		PluginAttack.teams[Id_Frend].indruns = 0;
		PluginAttack.teams_frend[PluginAttack.teams_frend.length] = Id_Frend;
	}
	var TempBool01 = true;
	var TempBool02 = true;
	var TempBool04 = false;
	if (PluginAttack.teams[Id_Frend].name != "") {
		var tempStr = PluginAttack.teams[Id_Frend].name;
		var regex = /\(kлoн/i;
		var TempBool01 = regex.test(tempStr);
		var regex = /\(\d/i;
		var TempBool02 = regex.test(tempStr);
		var TempInt = parseInt(Id_Frend, 10);
		if (TempInt >= 100000000) {
			if (PluginAttack.teams[Id_Frend].name != "Невидимка") {
				var regex = /Невидимка/i;
				var TempBool04 = regex.test(PluginAttack.teams[Id_Frend].name);
			} else {
				var TempBool04 = true;
			}
		}
	} else {
		var TempBool04 = true;
	}
	if ((!TempBool04) && (!TempBool01) && (!TempBool02)) {
		PluginFrame.$.ajax({
			url:("inf.php?" + Id_Frend),
			success:function(data) {
				var regex = /AntiDDOS/i;
				var TempBool03 = regex.test(data);
				if (!TempBool03) {
					var regex = /inf\.php\?(\d+)/i;
					var res = [];
					var res = regex.exec(data);
					if ((res) && (res.length > 1)) {
						Id_Frend01 = parseInt(res[1], 10);
					} else {
						Id_Frend01 = -1;
					}
					if (Id_Frend01 > 0) {
						if (PluginAttack.teams[Id_Frend01].level == -1) {
							var regex = /<B>(.*?)<\/B> \[(\?\?|\d+)\]<a href=/i;
							var res = [];
							var res = regex.exec(data);
							if ((res) && (res.length > 1)) {
								if (res[2] != "??") {
									var TempInt = parseInt(res[2], 10);
									if (isNaN(TempInt)) {
										TempInt = res[2];
									}
									PluginAttack.teams[Id_Frend01].level = TempInt;
								} else {
									PluginAttack.teams[Id_Frend01].level = -1;
								}
							}
						}
						TempVita = PluginAttack.teams[Id_Frend01].vitality;
						if (TempVita == 0) {
							GetEnemyStats(data, Id_Frend01, 0);
						}
					}
					if (PluginAttack.teams[Id_Frend01].vitality > 0) {
						if (PluginAttack.teams[Id_Frend01].klasspers == "NoName") {
							if ((PluginAttack.options.mini_read_classpers == 0) && (!TempBool01) && (!TempBool02)){
								GetEnemyRuns(data, Id_Frend01, 0, 0, 0);
								var regex = /<td(.*?)<\/td>/gi;
								var res = [];
								var res01 = [];
								var res = data.match(regex);
								if ((res) && (res.length > 1)) {
									for (var i = 0, l = res.length; i < l; i++) {
										var regex = /width=20 height=20/i;
										var TempBool01 = regex.test(res[i]);
										if (TempBool01) {
											res01[res01.length] = res[i];
										}
									}
								}
								var res = [];
								GetEnemyRings(res01, Id_Frend01, 0);
							}
							GetEnemyKlass(data, Id_Frend01, 0, false);
						}
					}
				}
				window.location.href = 'fbattle.php?batl=';
			}
		});
	}
}
function ShowLevels01(enemy01, divMes01, divMesPersID, i01) {
	var checked = "";
	var TempBool01 = false;
	if (PluginAttack.teams[divMesPersID].name != "") {
		var TempInt = parseInt(divMesPersID, 10);
		if (TempInt >= 100000000) {
			if (PluginAttack.teams[divMesPersID].name != "Невидимка") {
				var regex02 = /Невидимка/i;
				var TempBool01 = regex02.test(PluginAttack.teams[divMesPersID].name);
			} else {
				var TempBool01 = true;
			}
		}
	} else {
		var TempBool01 = true;
	}
	if ((PluginAttack.options.color_frend_team == 1) && (PluginAttack.teams[divMesPersID].klasspers == "NoName") && (!PluginAttack.teams[divMesPersID].enemy) && (!TempBool01)) {
		PluginAttack.teams[divMesPersID].pers_frend_read = PluginAttack.teams[divMesPersID].pers_frend_read + 1;
		if (PluginAttack.teams[divMesPersID].pers_frend_read >= 2) {
			PluginAttack.teams[divMesPersID].pers_frend_read = 0;
				GetFrendsInfo(divMesPersID);
		}
	}
	if (divMes01.getElementsByTagName('span')[i01].className == "B3") {
			if (PluginAttack.teams[divMesPersID].level >= 0) {
				if (PluginAttack.options.lvl_answer > 1) {
					var TempInt01a = PluginAttack.master.user.level + (PluginAttack.options.lvl_answer + 1);
					var TempInt01b = PluginAttack.master.user.level - (PluginAttack.options.lvl_answer + 1);
				} else {
					if (PluginAttack.options.fast == 0) {
						var TempInt01a = PluginAttack.master.user.level + 2;
						var TempInt01b = PluginAttack.master.user.level - 2;
					} else {
						var TempInt01a = PluginAttack.master.user.level + (PluginAttack.options.lvl_answer + 1);
						var TempInt01b = PluginAttack.master.user.level - (PluginAttack.options.lvl_answer + 1);
					}
				}
				var TempInt01c = PluginAttack.teams[divMesPersID].level;
				if (PluginAttack.AutoTime[divMesPersID] == null) {
					if ((TempInt01c > TempInt01b) && (TempInt01c < TempInt01a)) {
						PluginAttack.AutoTime[divMesPersID] = Date.now();
						if ((PluginAttack.options.fast == 0) && (!PluginAttack.started)) {
							divMes01.getElementsByTagName('span')[i01].textContent = divMes01.getElementsByTagName('span')[i01].textContent + " (1 сек.)";
						}
					}
				} else {
					if ((TempInt01c > TempInt01b) && (TempInt01c < TempInt01a)) {
						if ((PluginAttack.options.fast == 0) && (!PluginAttack.started)) {
							var TempStr02test = Math.round((Date.now() - PluginAttack.AutoTime[divMesPersID]) / 1000).toString(10);
							divMes01.getElementsByTagName('span')[i01].textContent = divMes01.getElementsByTagName('span')[i01].textContent + " (" + TempStr02test + " сек.)";
						}
					} else {
						delete PluginAttack.AutoTime[divMesPersID];
					}
				}
			} else {
				var TempInt = parseInt(divMesPersID, 10);
				if (TempInt >= 100000000) {
					var TempBool01 = false;
					if (PluginAttack.teams[divMesPersID].name != "Невидимка") {
						var regex02 = /Невидимка/i;
						var TempBool01 = regex02.test(PluginAttack.teams[divMesPersID].name);
					} else {
						var TempBool01 = true;
					}
					if (((PluginAttack.options.nevid == 1) || (PluginAttack.master.user.level > 10)) && (TempBool01)) {
						if (PluginAttack.AutoTime[divMesPersID] == null) {
							PluginAttack.AutoTime[divMesPersID] = Date.now();
							if ((PluginAttack.options.fast == 0) && (!PluginAttack.started)) {
								divMes01.getElementsByTagName('span')[i01].textContent = divMes01.getElementsByTagName('span')[i01].textContent + " (1 сек.)";
							}
						} else {
							if ((PluginAttack.options.fast == 0) && (!PluginAttack.started)) {
								var TempStr02test = Math.round((Date.now() - PluginAttack.AutoTime[divMesPersID]) / 1000).toString(10);
								divMes01.getElementsByTagName('span')[i01].textContent = divMes01.getElementsByTagName('span')[i01].textContent + " (" + TempStr02test + " сек.)";
							}
						}
					} else {
						if (PluginAttack.started) {
							if (((PluginAttack.options.nevid == 0) && (PluginAttack.master.user.level < 11)) && (TempBool01)) {
								if (PluginAttack.AutoTime[divMesPersID] != null) {
									delete PluginAttack.AutoTime[divMesPersID];
								}
							}
						} else {
							if (TempBool01) {
								if (PluginAttack.AutoTime[divMesPersID] == null) {
									PluginAttack.AutoTime[divMesPersID] = Date.now();
									if ((PluginAttack.options.fast == 0) && (!PluginAttack.started)) {
										divMes01.getElementsByTagName('span')[i01].textContent = divMes01.getElementsByTagName('span')[i01].textContent + " (1 сек.)";
									}
								} else {
									if ((PluginAttack.options.fast == 0) && (!PluginAttack.started)) {
										var TempStr02test = Math.round((Date.now() - PluginAttack.AutoTime[divMesPersID]) / 1000).toString(10);
										divMes01.getElementsByTagName('span')[i01].textContent = divMes01.getElementsByTagName('span')[i01].textContent + " (" + TempStr02test + " сек.)";
									}
								}
							}
						}
					}
				}
			}
	} else {
		if (PluginAttack.AutoTime[divMesPersID] != null) {
			delete PluginAttack.AutoTime[divMesPersID];
		}
	}
	var TempInt = parseInt(enemy01, 10);
	if (isNaN(TempInt)) {
		TempInt = enemy01;
	}
	if (TempInt > 0) {
		if (PluginAttack.options.fast == 0) {
			if (divMesPersID == enemy01) {
				var regex02 = /fighttype30/mi;
				var TempBool01 = regex02.test(divMes01.innerHTML);
				if (!TempBool01) {
					divMes01.getElementsByTagName('span')[i01].outerHTML = "<img src='http://i.oldbk.com/i/fighttype30.gif'>" + divMes01.getElementsByTagName('span')[i01].outerHTML;
				}
			}
		}
	}
	if ((PluginAttack.teams[divMesPersID].enemy) ||
		((!PluginAttack.teams[divMesPersID].enemy) && (PluginAttack.options.color_frend_team == 1))) {
		if (PluginAttack.teams[divMesPersID].attack) {
			checked = "checked";
		}
		if (PluginAttack.options.fast == 0) {
			if (PluginAttack.teams[divMesPersID].klasspers == "NoName") {
				if (PluginAttack.teams[divMesPersID].vitality > 0) {
					var TempClass_u = 0;
					var TempClass_ak = 0;
					var TempClass_au = 0;
					var TempClass_k = 0;
					if (PluginAttack.options.mini_read_classpers == 0) {
						if ((PluginAttack.teams[divMesPersID].r_uvorot >= 0) &&
							(PluginAttack.teams[divMesPersID].k_uvorot >= 0)) {
							var TempClass_u = PluginAttack.teams[divMesPersID].r_uvorot + PluginAttack.teams[divMesPersID].k_uvorot;
							var TempClass_ak = PluginAttack.teams[divMesPersID].r_ak + PluginAttack.teams[divMesPersID].k_ak;
							var TempClass_au = PluginAttack.teams[divMesPersID].r_au + PluginAttack.teams[divMesPersID].k_au;
							var TempClass_k = PluginAttack.teams[divMesPersID].r_krit + PluginAttack.teams[divMesPersID].k_krit;
						} else {
							if (PluginAttack.teams[divMesPersID].r_uvorot >= 0) {
								var TempClass_u = PluginAttack.teams[divMesPersID].r_uvorot;
								var TempClass_ak = PluginAttack.teams[divMesPersID].r_ak;
								var TempClass_au = PluginAttack.teams[divMesPersID].r_au;
								var TempClass_k = PluginAttack.teams[divMesPersID].r_krit;
							} else {
								if (PluginAttack.teams[divMesPersID].k_uvorot >= 0) {
									var TempClass_u = PluginAttack.teams[divMesPersID].k_uvorot;
									var TempClass_ak = PluginAttack.teams[divMesPersID].k_ak;
									var TempClass_au = PluginAttack.teams[divMesPersID].k_au;
									var TempClass_k = PluginAttack.teams[divMesPersID].k_krit;
								}
							}
						}
					}
					var TempMaxClass = Math.max(TempClass_u, TempClass_ak, TempClass_au, TempClass_k);
					if ((PluginAttack.teams[divMesPersID].strength >= PluginAttack.teams[divMesPersID].dexterity) && (PluginAttack.teams[divMesPersID].strength >= PluginAttack.teams[divMesPersID].intuition)) {
						if (PluginAttack.teams[divMesPersID].dexterity >= PluginAttack.teams[divMesPersID].intuition) {
							if (TempMaxClass > 0) {
								if (TempMaxClass == TempClass_u) {
									PluginAttack.teams[divMesPersID].klasspers = "Tank_АU";
									if (PluginAttack.teams[divMesPersID].enemy) {
										divMes01.getElementsByTagName('span')[i01].style.background = "#e7a8ff";
									} else {
										divMes01.getElementsByTagName('span')[i01].style.background = "#eec2ff";
									}
									if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
										if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
											divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
										} else {
										divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
										}
									}
								} else {
									if (TempMaxClass == TempClass_au) {
										PluginAttack.teams[divMesPersID].klasspers = "Tank_АU";
										if (PluginAttack.teams[divMesPersID].enemy) {
											divMes01.getElementsByTagName('span')[i01].style.background = "#e7a8ff";
										} else {
											divMes01.getElementsByTagName('span')[i01].style.background = "#eec2ff";
										}
										if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
											if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
												divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
											} else {
												divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
											}
										}
									} else {
										if (TempMaxClass == TempClass_ak) {
											PluginAttack.teams[divMesPersID].klasspers = "Tank_AK";
											if (PluginAttack.teams[divMesPersID].enemy) {
												divMes01.getElementsByTagName('span')[i01].style.background = "#bf9dfe";
											} else {
												divMes01.getElementsByTagName('span')[i01].style.background = "#d2bafe";
											}
											if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
												if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
													divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
												} else {
													divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
												}
											}
										} else {
											PluginAttack.teams[divMesPersID].klasspers = "Tank_AK";
											if (PluginAttack.teams[divMesPersID].enemy) {
												divMes01.getElementsByTagName('span')[i01].style.background = "#bf9dfe";
											} else {
												divMes01.getElementsByTagName('span')[i01].style.background = "#d2bafe";
											}
											if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
												if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
													divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
												} else {
													divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
												}
											}
										}
									}
								}
							} else {
								PluginAttack.teams[divMesPersID].klasspers = "Tank_АU";
								if (PluginAttack.teams[divMesPersID].enemy) {
									divMes01.getElementsByTagName('span')[i01].style.background = "#e7a8ff";
								} else {
									divMes01.getElementsByTagName('span')[i01].style.background = "#eec2ff";
								}
								if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
									if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
										divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
									} else {
										divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
									}
								}
							}
						} else {
							if (TempMaxClass > 0) {
								if (TempMaxClass == TempClass_u) {
									PluginAttack.teams[divMesPersID].klasspers = "Tank_АU";
									if (PluginAttack.teams[divMesPersID].enemy) {
										divMes01.getElementsByTagName('span')[i01].style.background = "#e7a8ff";
									} else {
										divMes01.getElementsByTagName('span')[i01].style.background = "#eec2ff";
									}
									if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
										if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
											divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
										} else {
											divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
										}
									}
								} else {
									if (TempMaxClass == TempClass_au) {
										PluginAttack.teams[divMesPersID].klasspers = "Tank_АU";
										if (PluginAttack.teams[divMesPersID].enemy) {
											divMes01.getElementsByTagName('span')[i01].style.background = "#e7a8ff";
										} else {
											divMes01.getElementsByTagName('span')[i01].style.background = "#eec2ff";
										}
										if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
											if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
												divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
											} else {
												divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
											}
										}
									} else {
										if (TempMaxClass == TempClass_ak) {
											PluginAttack.teams[divMesPersID].klasspers = "Tank_AK";
											if (PluginAttack.teams[divMesPersID].enemy) {
												divMes01.getElementsByTagName('span')[i01].style.background = "#bf9dfe";
											} else {
												divMes01.getElementsByTagName('span')[i01].style.background = "#d2bafe";
											}
											if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
												if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
													divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
												} else {
													divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
												}
											}
										} else {
											PluginAttack.teams[divMesPersID].klasspers = "Tank_AK";
											if (PluginAttack.teams[divMesPersID].enemy) {
												divMes01.getElementsByTagName('span')[i01].style.background = "#bf9dfe";
											} else {
												divMes01.getElementsByTagName('span')[i01].style.background = "#d2bafe";
											}
											if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
												if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
													divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
												} else {
													divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
												}
											}
										}
									}
								}
							} else {
								PluginAttack.teams[divMesPersID].klasspers = "Tank_AK";
								if (PluginAttack.teams[divMesPersID].enemy) {
									divMes01.getElementsByTagName('span')[i01].style.background = "#bf9dfe";
								} else {
									divMes01.getElementsByTagName('span')[i01].style.background = "#d2bafe";
								}
								if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
									if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
										divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
									} else {
										divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
									}
								}
							}
						}
					} else {
						if (PluginAttack.teams[divMesPersID].dexterity >= PluginAttack.teams[divMesPersID].intuition) {
							if (TempMaxClass > 0) {
								if (TempMaxClass == TempClass_u) {
									PluginAttack.teams[divMesPersID].klasspers = "Uvorot";
									if (PluginAttack.teams[divMesPersID].enemy) {
										divMes01.getElementsByTagName('span')[i01].style.background = "#c6f660";
									} else {
										divMes01.getElementsByTagName('span')[i01].style.background = "#daf997";
									}
									if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
										if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
											divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
										} else {
											divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
										}
									}
								} else {
									if (TempMaxClass == TempClass_au) {
										PluginAttack.teams[divMesPersID].klasspers = "Uvorot_АU";
										if (PluginAttack.teams[divMesPersID].enemy) {
											divMes01.getElementsByTagName('span')[i01].style.background = "#62f34e";
										} else {
											divMes01.getElementsByTagName('span')[i01].style.background = "#9ef891";
										}
										if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
											if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
												divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
											} else {
												divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
											}
										}
									} else {
										if (TempMaxClass == TempClass_ak) {
											PluginAttack.teams[divMesPersID].klasspers = "Uvorot_АK";
											if (PluginAttack.teams[divMesPersID].enemy) {
												divMes01.getElementsByTagName('span')[i01].style.background = "#1bfa94";
											} else {
												divMes01.getElementsByTagName('span')[i01].style.background = "#72fcbd";
											}
											if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
												if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
													divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
												} else {
													divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
												}
											}
										} else {
											PluginAttack.teams[divMesPersID].klasspers = "Uvorot";
											if (PluginAttack.teams[divMesPersID].enemy) {
												divMes01.getElementsByTagName('span')[i01].style.background = "#c6f660";
											} else {
												divMes01.getElementsByTagName('span')[i01].style.background = "#daf997";
											}
											if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
												if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
													divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
												} else {
													divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
												}
											}
										}
									}
								}
							} else {
								PluginAttack.teams[divMesPersID].klasspers = "Uvorot";
								if (PluginAttack.teams[divMesPersID].enemy) {
									divMes01.getElementsByTagName('span')[i01].style.background = "#c6f660";
								} else {
									divMes01.getElementsByTagName('span')[i01].style.background = "#daf997";
								}
								if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
									if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
										divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
									} else {
										divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
									}
								}
							}
						} else {
							if (TempMaxClass > 0) {
								if (TempMaxClass == TempClass_u) {
									PluginAttack.teams[divMesPersID].klasspers = "Krit";
									if (PluginAttack.teams[divMesPersID].enemy) {
										divMes01.getElementsByTagName('span')[i01].style.background = "#6faffe";
									} else {
										divMes01.getElementsByTagName('span')[i01].style.background = "#a6cdfe";
									}
									if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
										if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
											divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
										} else {
											divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
										}
									}
								} else {
									if (TempMaxClass == TempClass_au) {
										PluginAttack.teams[divMesPersID].klasspers = "Krit_АU";
										if (PluginAttack.teams[divMesPersID].enemy) {
											divMes01.getElementsByTagName('span')[i01].style.background = "#6bf3ff";
										} else {
											divMes01.getElementsByTagName('span')[i01].style.background = "#a9f8ff";
										}
										if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
											if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
												divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
											} else {
												divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
											}
										}
									} else {
										if (TempMaxClass == TempClass_ak) {
											PluginAttack.teams[divMesPersID].klasspers = "Krit_АK";
											if (PluginAttack.teams[divMesPersID].enemy) {
												divMes01.getElementsByTagName('span')[i01].style.background = "#9a9cfc";
											} else {
												divMes01.getElementsByTagName('span')[i01].style.background = "#c0c2fd";
											}
											if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
												if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
													divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
												} else {
													divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
												}
											}
										} else {
											PluginAttack.teams[divMesPersID].klasspers = "Krit";
											if (PluginAttack.teams[divMesPersID].enemy) {
												divMes01.getElementsByTagName('span')[i01].style.background = "#6faffe";
											} else {
												divMes01.getElementsByTagName('span')[i01].style.background = "#a6cdfe";
											}
											if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
												if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
													divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
												} else {
													divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
												}
											}
										}
									}
								}
							} else {
								PluginAttack.teams[divMesPersID].klasspers = "Krit";
								if (PluginAttack.teams[divMesPersID].enemy) {
									divMes01.getElementsByTagName('span')[i01].style.background = "#6faffe";
								} else {
									divMes01.getElementsByTagName('span')[i01].style.background = "#a6cdfe";
								}
								if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
									if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
										divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
									} else {
										divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
									}
								}
							}
						}
					}
				}
			} else {
				if (PluginAttack.teams[divMesPersID].klasspers == "Tank_AK") {
					if (PluginAttack.teams[divMesPersID].enemy) {
						divMes01.getElementsByTagName('span')[i01].style.background = "#bf9dfe";
					} else {
						divMes01.getElementsByTagName('span')[i01].style.background = "#d2bafe";
					}
					if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
						if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
							divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
						} else {
							divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
						}
					}
				} else {
					if (PluginAttack.teams[divMesPersID].klasspers == "Uvorot") {
						if (PluginAttack.teams[divMesPersID].enemy) {
							divMes01.getElementsByTagName('span')[i01].style.background = "#c6f660";
						} else {
							divMes01.getElementsByTagName('span')[i01].style.background = "#daf997";
						}
						if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
							if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
								divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
							} else {
								divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
							}
						}
					} else {
						if (PluginAttack.teams[divMesPersID].klasspers == "Krit") {
							if (PluginAttack.teams[divMesPersID].enemy) {
								divMes01.getElementsByTagName('span')[i01].style.background = "#6faffe";
							} else {
								divMes01.getElementsByTagName('span')[i01].style.background = "#a6cdfe";
							}
							if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
								if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
									divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
								} else {
									divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
								}
							}
						} else {
							if (PluginAttack.teams[divMesPersID].klasspers == "Krit_АK") {
								if (PluginAttack.teams[divMesPersID].enemy) {
									divMes01.getElementsByTagName('span')[i01].style.background = "#9a9cfc";
								} else {
									divMes01.getElementsByTagName('span')[i01].style.background = "#c0c2fd";
								}
								if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
									if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
										divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
									} else {
										divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
									}
								}
							} else {
								if (PluginAttack.teams[divMesPersID].klasspers == "Krit_АU") {
									if (PluginAttack.teams[divMesPersID].enemy) {
										divMes01.getElementsByTagName('span')[i01].style.background = "#6bf3ff";
									} else {
										divMes01.getElementsByTagName('span')[i01].style.background = "#a9f8ff";
									}
									if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
										if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
											divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
										} else {
											divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
										}
									}
								} else {
									if (PluginAttack.teams[divMesPersID].klasspers == "Tank_АU") {
										if (PluginAttack.teams[divMesPersID].enemy) {
											divMes01.getElementsByTagName('span')[i01].style.background = "#e7a8ff";
										} else {
											divMes01.getElementsByTagName('span')[i01].style.background = "#eec2ff";
										}
										if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
											if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
												divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
											} else {
												divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
											}
										}
									} else {
										if (PluginAttack.teams[divMesPersID].klasspers == "Uvorot_АU") {
											if (PluginAttack.teams[divMesPersID].enemy) {
												divMes01.getElementsByTagName('span')[i01].style.background = "#62f34e";
											} else {
												divMes01.getElementsByTagName('span')[i01].style.background = "#9ef891";
											}
											if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
												if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
													divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
												} else {
													divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
												}
											}
										} else {
											if (PluginAttack.teams[divMesPersID].klasspers == "Uvorot_АK") {
												if (PluginAttack.teams[divMesPersID].enemy) {
													divMes01.getElementsByTagName('span')[i01].style.background = "#1bfa94";
												} else {
													divMes01.getElementsByTagName('span')[i01].style.background = "#72fcbd";
												}
												if (divMes01.getElementsByTagName('span')[i01].className != "B3") {
													if (divMes01.getElementsByTagName('span')[i01].className == "B2") {
														divMes01.getElementsByTagName('span')[i01].style.color = "#653d00";
													} else {
														divMes01.getElementsByTagName('span')[i01].style.color = "#02028c";
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	if (PluginAttack.teams[divMesPersID].level != -1) {
		var TempLvlPers = PluginAttack.teams[divMesPersID].level.toString(10);
	} else {
		var TempLvlPers = "??";
	}
	if (PluginAttack.options.settings == 1) {
		if (PluginAttack.teams[divMesPersID].enemy) {
			var regex02 = /EnemySettings/gi;
			var regex03 = /ChangeEnemy/gi;
			var TempStr01 = divMes01.innerHTML;
			var TempBool01 = regex02.test(TempStr01);
			var TempBool02 = regex03.test(TempStr01);
			if (TempBool01 && TempBool02) {
				var TempRes01 = TempStr01.match(regex02);
				var TempRes02 = TempStr01.match(regex03);
				if (TempRes01.length < TempRes02.length) {
					divMes01.getElementsByTagName('span')[i01].outerHTML = (PluginAttack.teams[divMesPersID].enemy?"<input type='checkbox' " + checked + " value='" +
					divMesPersID + "' onclick='EnemySettings(this)'>":"") +
					divMes01.getElementsByTagName('span')[i01].outerHTML + ' [' + TempLvlPers + ']';
				}
			} else {
				divMes01.getElementsByTagName('span')[i01].outerHTML = (PluginAttack.teams[divMesPersID].enemy?"<input type='checkbox' " + checked + " value='" +
				divMesPersID + "' onclick='EnemySettings(this)'>":"") +
				divMes01.getElementsByTagName('span')[i01].outerHTML + ' [' + TempLvlPers + ']';
			}
		}
	} else {
		if (PluginAttack.options.lvl_info == 1) {
			var regex02 = /<\/span>\s\[.*?\].*?\s\[.*?\/.*?\]/gi;
			var TempStr01 = divMes01.innerHTML;
			var TempBool01 = regex02.test(TempStr01);
			if (TempBool01) {
				var TempRes01 = TempStr01.match(regex02);
				if (TempRes01.length < divMes01.getElementsByTagName('span').length) {
					divMes01.getElementsByTagName('span')[i01].outerHTML = divMes01.getElementsByTagName('span')[i01].outerHTML + ' [' + TempLvlPers + ']';
				}
			} else {
				divMes01.getElementsByTagName('span')[i01].outerHTML = divMes01.getElementsByTagName('span')[i01].outerHTML + ' [' + TempLvlPers + ']';
			}
		}
	}
}
function ShowLevels(enemy) {
	var divMes = {};
	var divMes = document.getElementById('mes');
	divMes.style.display = "none";
	var regex = /ChangeEnemy/mi;
	if (PluginAttack.options.scan_team == 1) {
		var divMeslength = divMes.getElementsByTagName('span').length;
		for (var i = divMeslength - 1; i >= 0; i--) {
			var divMes01id = divMes.getElementsByTagName('span')[i].id;
			if (PluginAttack.teams[divMes01id] == null) {
				PluginAttack.teams[divMes01id] = {
					'name':			divMes.getElementsByTagName('span')[i].textContent,
					'pers_frend_read':	0,
					'level':		-1,
					'strength':		0,
					'dexterity':	0,
					'intuition':	0,
					'vitality':		0,
					'intellect':	0,
					'wisdom':		0,
					'enemy':		regex.test(divMes.getElementsByTagName('span')[i].onclick),
					'order':		0,
					'attack':		false,
					'uvalue':		false,
					'klasspers':	"NoName",
					'k_uvorot':		0,
					'k_ak':			0,
					'k_au':			0,
					'k_krit':		0,
					'k_s':			0,
					'r_uvorot':		0,
					'r_ak':			0,
					'r_au':			0,
					'r_krit':		0,
					'r_s':			0,
					'indruns':		0
				};
				var TempInt = parseInt(divMes01id, 10);
				if (TempInt >= 100000000) {
					var TempBool01 = false;
					if (PluginAttack.teams[divMes01id].name != "Невидимка") {
						var regex02 = /Невидимка/i;
						var TempBool01 = regex02.test(PluginAttack.teams[divMes01id].name);
					} else {
						var TempBool01 = true;
					}
					if ((PluginAttack.options.nevid == 1) && (TempBool01)) {
						PluginAttack.teams[divMes01id].attack = (regex.test(divMes.getElementsByTagName('span')[i].onclick) && true);
					}
				}
				if (!PluginAttack.teams[divMes01id].enemy) {
					PluginAttack.teams_frend[PluginAttack.teams_frend.length] = divMes01id;
				}
			}
			var TempBool01 = PluginAttack.teams[divMes01id].enemy;
			if ((TempBool01) ||
				((!TempBool01) && (PluginAttack.options.color_frend_team == 1)) ||
				((!TempBool01) && (PluginAttack.options.lvl_info == 1))) {
				ShowLevels01(enemy, divMes, divMes01id, i);
			}
		}
	} else {
	var divMeslength = divMes.getElementsByTagName('span').length;
		for (var i = 0, l = divMeslength; i < l; i++) {
			var divMes01id = divMes.getElementsByTagName('span')[i].id;
			if (PluginAttack.teams[divMes01id] == null) {
				PluginAttack.teams[divMes01id] = {
					'name':			divMes.getElementsByTagName('span')[i].textContent,
					'pers_frend_read':	0,
					'level':		-1,
					'strength':		0,
					'dexterity':	0,
					'intuition':	0,
					'vitality':		0,
					'intellect':	0,
					'wisdom':		0,
					'enemy':		regex.test(divMes.getElementsByTagName('span')[i].onclick),
					'order':		0,
					'attack':		false,
					'uvalue':		false,
					'klasspers':	"NoName",
					'k_uvorot':		0,
					'k_ak':			0,
					'k_au':			0,
					'k_krit':		0,
					'k_s':			0,
					'r_uvorot':		0,
					'r_ak':			0,
					'r_au':			0,
					'r_krit':		0,
					'r_s':			0,
					'indruns':		0
				};
				var TempInt = parseInt(divMes01id, 10);
				if (TempInt >= 100000000) {
					var TempBool01 = false;
					if (PluginAttack.teams[divMes01id].name != "Невидимка") {
						var regex02 = /Невидимка/i;
						var TempBool01 = regex02.test(PluginAttack.teams[divMes01id].name);
					} else {
						var TempBool01 = true;
					}
					if ((PluginAttack.options.nevid == 1) && (TempBool01)) {
						PluginAttack.teams[divMes01id].attack = (regex.test(divMes.getElementsByTagName('span')[i].onclick) && true);
					}
				}
				if (!PluginAttack.teams[divMes01id].enemy) {
					PluginAttack.teams_frend[PluginAttack.teams_frend.length] = divMes01id;
				}
			}
			var TempBool01 = PluginAttack.teams[divMes01id].enemy
			if ((TempBool01) ||
				((!TempBool01) && (PluginAttack.options.color_frend_team == 1)) ||
				((!TempBool01) && (PluginAttack.options.lvl_info == 1))) {
				ShowLevels01(enemy, divMes, divMes01id, i);
			}
		}
	}
	divMes.style.display = "block";
	if (PluginAttack.options.fast == 0) {
		var regex = /Сейчас Вами нанесено урона/i;
		var TempBool01 = regex.test(document.getElementsByTagName('td')[21].innerHTML);
		if (!TempBool01) {
			var regex = /(.*?)HP<\/B>/i;
			var res = [];
			var res = regex.exec(document.getElementsByTagName('td')[21].innerHTML);
			if ((res) && (res.length > 1)) {
				divMes.outerHTML = '<CENTER>Сейчас Вами нанесено урона: <B>' + res[1] + 'НР</B></CENTER><HR>' + divMes.outerHTML;
			}
		}
	}
}
function CheckEnemy(enemy) {
	PluginAttack.menuitem.value = parseInt(PluginAttack.menuitem.value, 10) + 1;
	if (!PluginAttack.teams[enemy].uvalue) {
		PluginAttack.teams[enemy].attack = false;
		if (PluginAttack.teams[enemy].klasspers == "NoName") {
			if (PluginAttack.teams[enemy].level == -1) { // невид
				if (PluginAttack.options.nevid == 1) { // невидов бить разрешено
					PluginAttack.teams[enemy].attack = true;
				}
			} else {
				var TempClass_u = 0;
				var TempClass_ak = 0;
				var TempClass_au = 0;
				var TempClass_k = 0;
				if (PluginAttack.options.mini_read_classpers == 0) {
					if ((PluginAttack.teams[enemy].r_uvorot >= 0) && (PluginAttack.teams[enemy].k_uvorot >= 0)) {
						var TempClass_u = PluginAttack.teams[enemy].r_uvorot + PluginAttack.teams[enemy].k_uvorot;
						var TempClass_ak = PluginAttack.teams[enemy].r_ak + PluginAttack.teams[enemy].k_ak;
						var TempClass_au = PluginAttack.teams[enemy].r_au + PluginAttack.teams[enemy].k_au;
						var TempClass_k = PluginAttack.teams[enemy].r_krit + PluginAttack.teams[enemy].k_krit;
					} else {
						if (PluginAttack.teams[enemy].r_uvorot >= 0) {
							var TempClass_u = PluginAttack.teams[enemy].r_uvorot;
							var TempClass_ak = PluginAttack.teams[enemy].r_ak;
							var TempClass_au = PluginAttack.teams[enemy].r_au;
							var TempClass_k = PluginAttack.teams[enemy].r_krit;
						} else {
							if (PluginAttack.teams[enemy].k_uvorot >= 0) {
								var TempClass_u = PluginAttack.teams[enemy].k_uvorot;
								var TempClass_ak = PluginAttack.teams[enemy].k_ak;
								var TempClass_au = PluginAttack.teams[enemy].k_au;
								var TempClass_k = PluginAttack.teams[enemy].k_krit;
							}
						}
					}
				}
				var TempMaxClass = Math.max(TempClass_u, TempClass_ak, TempClass_au, TempClass_k);
				if ((PluginAttack.teams[enemy].strength >= PluginAttack.teams[enemy].dexterity) && (PluginAttack.teams[enemy].strength >= PluginAttack.teams[enemy].intuition)) {
					if (PluginAttack.teams[enemy].dexterity >= PluginAttack.teams[enemy].intuition) {
						if (TempMaxClass > 0) {
							if (TempMaxClass == TempClass_u) {
								PluginAttack.teams[enemy].klasspers = "Tank_АU";
								if ((PluginAttack.options.tank_au == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.mint_aulevel) &&
									((PluginAttack.teams[enemy].level <= PluginAttack.options.maxt_aulevel) || (PluginAttack.options.maxt_aulevel == 0))) {
									PluginAttack.teams[enemy].attack = true;
								}
							} else {
								if (TempMaxClass == TempClass_au) {
									PluginAttack.teams[enemy].klasspers = "Tank_АU";
									if ((PluginAttack.options.tank_au == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.mint_aulevel) &&
										((PluginAttack.teams[enemy].level <= PluginAttack.options.maxt_aulevel) || (PluginAttack.options.maxt_aulevel == 0))) {
										PluginAttack.teams[enemy].attack = true;
									}
								} else {
									if (TempMaxClass == TempClass_ak) {
										PluginAttack.teams[enemy].klasspers = "Tank_AK";
										if ((PluginAttack.options.tank_ak == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.mint_aklevel) &&
											((PluginAttack.teams[enemy].level <= PluginAttack.options.maxt_aklevel) || (PluginAttack.options.maxt_aklevel == 0))) {
											PluginAttack.teams[enemy].attack = true;
										}
									} else {
										PluginAttack.teams[enemy].klasspers = "Tank_AK";
										if ((PluginAttack.options.tank_ak == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.mint_aklevel) &&
											((PluginAttack.teams[enemy].level <= PluginAttack.options.maxt_aklevel) || (PluginAttack.options.maxt_aklevel == 0))) {
											PluginAttack.teams[enemy].attack = true;
										}
									}
								}
							}
						} else {
							PluginAttack.teams[enemy].klasspers = "Tank_АU";
							if ((PluginAttack.options.tank_au == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.mint_aulevel) &&
								((PluginAttack.teams[enemy].level <= PluginAttack.options.maxt_aulevel) || (PluginAttack.options.maxt_aulevel == 0))) {
								PluginAttack.teams[enemy].attack = true;
							}
						}
					} else {
						if (TempMaxClass > 0) {
							if (TempMaxClass == TempClass_u) {
								PluginAttack.teams[enemy].klasspers = "Tank_АU";
								if ((PluginAttack.options.tank_au == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.mint_aulevel) &&
									((PluginAttack.teams[enemy].level <= PluginAttack.options.maxt_aulevel) || (PluginAttack.options.maxt_aulevel == 0))) {
									PluginAttack.teams[enemy].attack = true;
								}
							} else {
								if (TempMaxClass == TempClass_au) {
									PluginAttack.teams[enemy].klasspers = "Tank_АU";
									if ((PluginAttack.options.tank_au == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.mint_aulevel) &&
										((PluginAttack.teams[enemy].level <= PluginAttack.options.maxt_aulevel) || (PluginAttack.options.maxt_aulevel == 0))) {
										PluginAttack.teams[enemy].attack = true;
									}
								} else {
									if (TempMaxClass == TempClass_ak) {
										PluginAttack.teams[enemy].klasspers = "Tank_AK";
										if ((PluginAttack.options.tank_ak == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.mint_aklevel) &&
											((PluginAttack.teams[enemy].level <= PluginAttack.options.maxt_aklevel) || (PluginAttack.options.maxt_aklevel == 0))) {
											PluginAttack.teams[enemy].attack = true;
										}
									} else {
										PluginAttack.teams[enemy].klasspers = "Tank_AK";
										if ((PluginAttack.options.tank_ak == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.mint_aklevel) &&
											((PluginAttack.teams[enemy].level <= PluginAttack.options.maxt_aklevel) || (PluginAttack.options.maxt_aklevel == 0))) {
											PluginAttack.teams[enemy].attack = true;
										}
									}
								}
							}
						} else {
							PluginAttack.teams[enemy].klasspers = "Tank_AK";
							if ((PluginAttack.options.tank_ak == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.mint_aklevel) &&
								((PluginAttack.teams[enemy].level <= PluginAttack.options.maxt_aklevel) || (PluginAttack.options.maxt_aklevel == 0))) {
								PluginAttack.teams[enemy].attack = true;
							}
						}
					}
				} else {
					if (PluginAttack.teams[enemy].dexterity >= PluginAttack.teams[enemy].intuition) {
						if (TempMaxClass > 0) {
							if (TempMaxClass == TempClass_u) {
								PluginAttack.teams[enemy].klasspers = "Uvorot";
								if ((PluginAttack.options.uvorot == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.minulevel) &&
									((PluginAttack.teams[enemy].level <= PluginAttack.options.maxulevel) || (PluginAttack.options.maxulevel == 0))) {
									PluginAttack.teams[enemy].attack = true;
								}
							} else {
								if (TempMaxClass == TempClass_au) {
									PluginAttack.teams[enemy].klasspers = "Uvorot_АU";
									if ((PluginAttack.options.uvorot_au == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.minu_aulevel) &&
										((PluginAttack.teams[enemy].level <= PluginAttack.options.maxu_aulevel) || (PluginAttack.options.maxu_aulevel == 0))) {
										PluginAttack.teams[enemy].attack = true;
									}
								} else {
									if (TempMaxClass == TempClass_ak) {
										PluginAttack.teams[enemy].klasspers = "Uvorot_АK";
										if ((PluginAttack.options.uvorot_ak == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.minu_aklevel) &&
											((PluginAttack.teams[enemy].level <= PluginAttack.options.maxu_aklevel) || (PluginAttack.options.maxu_aklevel == 0))) {
											PluginAttack.teams[enemy].attack = true;
										}
									} else {
										PluginAttack.teams[enemy].klasspers = "Uvorot";
										if ((PluginAttack.options.uvorot == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.minulevel) &&
											((PluginAttack.teams[enemy].level <= PluginAttack.options.maxulevel) || (PluginAttack.options.maxulevel == 0))) {
											PluginAttack.teams[enemy].attack = true;
										}
									}
								}
							}
						} else {
							PluginAttack.teams[enemy].klasspers = "Uvorot";
							if ((PluginAttack.options.uvorot == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.minulevel) &&
								((PluginAttack.teams[enemy].level <= PluginAttack.options.maxulevel) || (PluginAttack.options.maxulevel == 0))) {
								PluginAttack.teams[enemy].attack = true;
							}
						}
					} else {
						if (TempMaxClass > 0) {
							if (TempMaxClass == TempClass_u) {
								PluginAttack.teams[enemy].klasspers = "Krit";
								if ((PluginAttack.options.krit == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.minklevel) &&
									((PluginAttack.teams[enemy].level <= PluginAttack.options.maxklevel) || (PluginAttack.options.maxklevel == 0))) {
									PluginAttack.teams[enemy].attack = true;
								}
							} else {
								if (TempMaxClass == TempClass_au) {
									PluginAttack.teams[enemy].klasspers = "Krit_АU";
									if ((PluginAttack.options.krit_au == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.mink_aulevel) &&
										((PluginAttack.teams[enemy].level <= PluginAttack.options.maxk_aulevel) || (PluginAttack.options.maxk_aulevel == 0))) {
										PluginAttack.teams[enemy].attack = true;
									}
								} else {
									if (TempMaxClass == TempClass_ak) {
										PluginAttack.teams[enemy].klasspers = "Krit_АK";
										if ((PluginAttack.options.krit_ak == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.mink_aklevel) &&
											((PluginAttack.teams[enemy].level <= PluginAttack.options.maxk_aklevel) || (PluginAttack.options.maxk_aklevel == 0))) {
											PluginAttack.teams[enemy].attack = true;
										}
									} else {
										PluginAttack.teams[enemy].klasspers = "Krit";
										if ((PluginAttack.options.krit == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.minklevel) &&
											((PluginAttack.teams[enemy].level <= PluginAttack.options.maxklevel) || (PluginAttack.options.maxklevel == 0))) {
											PluginAttack.teams[enemy].attack = true;
										}
									}
								}
							}
						} else {
							PluginAttack.teams[enemy].klasspers = "Krit";
							if ((PluginAttack.options.krit == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.minklevel) &&
								((PluginAttack.teams[enemy].level <= PluginAttack.options.maxklevel) || (PluginAttack.options.maxklevel == 0))) {
								PluginAttack.teams[enemy].attack = true;
							}
						}
					}
				}
			}
		} else {
			if (PluginAttack.teams[enemy].klasspers == "Tank_AK") {
				if ((PluginAttack.options.tank_ak == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.mint_aklevel) &&
					((PluginAttack.teams[enemy].level <= PluginAttack.options.maxt_aklevel) || (PluginAttack.options.maxt_aklevel == 0))) {
					PluginAttack.teams[enemy].attack = true;
				}
			} else {
				if (PluginAttack.teams[enemy].klasspers == "Uvorot") {
					if ((PluginAttack.options.uvorot == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.minulevel) &&
						((PluginAttack.teams[enemy].level <= PluginAttack.options.maxulevel) || (PluginAttack.options.maxulevel == 0))) {
						PluginAttack.teams[enemy].attack = true;
					}
				} else {
					if (PluginAttack.teams[enemy].klasspers == "Krit") {
						if ((PluginAttack.options.krit == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.minklevel) &&
							((PluginAttack.teams[enemy].level <= PluginAttack.options.maxklevel) || (PluginAttack.options.maxklevel == 0))) {
							PluginAttack.teams[enemy].attack = true;
						}
					} else {
						if (PluginAttack.teams[enemy].klasspers == "Krit_АK") {
							if ((PluginAttack.options.krit_ak == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.mink_aklevel) &&
								((PluginAttack.teams[enemy].level <= PluginAttack.options.maxk_aklevel) || (PluginAttack.options.maxk_aklevel == 0))) {
								PluginAttack.teams[enemy].attack = true;
							}
						} else {
							if (PluginAttack.teams[enemy].klasspers == "Krit_АU") {
								if ((PluginAttack.options.krit_au == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.mink_aulevel) &&
									((PluginAttack.teams[enemy].level <= PluginAttack.options.maxk_aulevel) || (PluginAttack.options.maxk_aulevel == 0))) {
									PluginAttack.teams[enemy].attack = true;
								}
							} else {
								if (PluginAttack.teams[enemy].klasspers == "Tank_АU") {
									if ((PluginAttack.options.tank_au == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.mint_aulevel) &&
										((PluginAttack.teams[enemy].level <= PluginAttack.options.maxt_aulevel) || (PluginAttack.options.maxt_aulevel == 0))) {
										PluginAttack.teams[enemy].attack = true;
									}
								} else {
									if (PluginAttack.teams[enemy].klasspers == "Uvorot_АU") {
										if ((PluginAttack.options.uvorot_au == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.minu_aulevel) &&
											((PluginAttack.teams[enemy].level <= PluginAttack.options.maxu_aulevel) || (PluginAttack.options.maxu_aulevel == 0))) {
											PluginAttack.teams[enemy].attack = true;
										}
									} else {
										if ((PluginAttack.options.uvorot_ak == 1) && (PluginAttack.teams[enemy].level >= PluginAttack.options.minu_aklevel) &&
											((PluginAttack.teams[enemy].level <= PluginAttack.options.maxu_aklevel) || (PluginAttack.options.maxu_aklevel == 0))) {
											PluginAttack.teams[enemy].attack = true;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	ShowLevels(enemy);
	if (PluginAttack.options.autoanswer == 1) {
		if (PluginAttack.AutoTime[enemy] != null) {
			var TempInt22a = PluginAttack.master.user.level + (PluginAttack.options.lvl_answer + 1);
			var TempInt22b = PluginAttack.master.user.level - (PluginAttack.options.lvl_answer + 1);
			var TempInt22c = PluginAttack.teams[enemy].level;
			if (((PluginAttack.teams[enemy].level == -1) && (PluginAttack.options.nevid == 1)) ||
				((PluginAttack.teams[enemy].level == -1) && (PluginAttack.master.user.level > 10)) ||
				((PluginAttack.teams[enemy].level >= 0) && (TempInt22c > TempInt22b) && (TempInt22c < TempInt22a))) {
				if ((Date.now() > PluginAttack.AutoTime[enemy] + PluginAttack.options.answertime * 1000) ||
					(PluginAttack.teams[enemy].attack)) {
					delete PluginAttack.AutoTime[enemy];
					PluginAttack.teams[enemy].order++;
					return true;
				}
			}
		}
		for (var p in PluginAttack.AutoTime) {
			if (PluginAttack.AutoTime[p] != null) {
				var TempInt = parseInt(p, 10);
				if (isNaN(TempInt)) {
					TempInt = p;
				}
				var TempBool01 = false;
				if (TempInt >= 100000000) {
					if (PluginAttack.teams[p].name != "Невидимка") {
						var regex = /Невидимка/i;
						var TempBool01 = regex.test(PluginAttack.teams[p].name);
					} else {
						var TempBool01 = true;
					}
				}
				var TempInt22a = PluginAttack.master.user.level + (PluginAttack.options.lvl_answer + 1);
				var TempInt22b = PluginAttack.master.user.level - (PluginAttack.options.lvl_answer + 1);
				var TempInt22c = PluginAttack.teams[p].level;
				if (
					//((TempInt >= 1000000000) && (PluginAttack.options.nevid == 1)) ||
					//((TempInt >= 1000000000) && (PluginAttack.master.user.level > 10)) ||
					//((TempInt >= 100000000) && (TempInt < 1000000000) && (TempBool01) && (PluginAttack.options.nevid == 1)) ||
					((TempInt >= 100000000) && (TempInt < 1000000000) && (!TempBool01) && (TempInt22c < TempInt22a) && (TempInt22c > TempInt22b)) ||
					((TempInt < 100000000) && (TempInt22c > TempInt22b) && (TempInt22c < TempInt22a))) {
					if ((Date.now() > PluginAttack.AutoTime[p] + PluginAttack.options.answertime * 1000) ||
						(PluginAttack.teams[p].attack)){
						clearTimeout(timeout_handle);
						var timeout_handle = setTimeout(function() {
							document.getElementById(p).click();
						}, 400);
						return false;
					}
				}
			}
		}
	}
	if (PluginAttack.teams[enemy].attack) {
			PluginAttack.teams[enemy].order++;
			return true;
	} else {
		var divMes = document.getElementById('mes');
		var doAttack = true;
		while (doAttack) {
			var doAttack = false;
			var new_enemy = null;
			if (PluginAttack.options.scan_team == 1) {
				for (var i = divMes.getElementsByTagName('span').length - 1; i >= 0; i--) {
					var new_enemy = divMes.getElementsByTagName('span')[i];
					if (PluginAttack.teams[new_enemy.id].attack) {
						var doAttack = true;
					}
					if ((PluginAttack.teams[new_enemy.id].attack) && (PluginAttack.teams[new_enemy.id].order <= PluginAttack.BattleOrder)) {
						PluginAttack.teams[new_enemy.id].order++;
						clearTimeout(timeout_handle);
						var timeout_handle = setTimeout(function() {
							new_enemy.click();
						}, 400);
						return false;
					}
				}
			}
			else {
				for (var i = 0, l = divMes.getElementsByTagName('span').length; i < l; i++) {
					var new_enemy = divMes.getElementsByTagName('span')[i];
					if (PluginAttack.teams[new_enemy.id].attack) {
						var doAttack = true;
					}
					if ((PluginAttack.teams[new_enemy.id].attack) && (PluginAttack.teams[new_enemy.id].order <= PluginAttack.BattleOrder)) {
						PluginAttack.teams[new_enemy.id].order++;
						clearTimeout(timeout_handle);
						var timeout_handle = setTimeout(function() {
							new_enemy.click();
						}, 400);
						return false;
					}
				}
			}
			PluginAttack.BattleOrder++;
		}
		return false;
	}
}
function GetEnemyStats(document01, enemy01, td01) {
	if (PluginAttack.teams[enemy01].level >= 0) {
		if (td01 > 0) {
			var tempStr = document01.getElementsByTagName('td')[td01].innerHTML;
		} else {
			var tempStr = document01;
		}
		for (var i = 0; i < 6; i++) {
			switch (i) {
				case 0:
					var regex = /Сила: (\d+)<br>/i;
					var res = [];
					var res = regex.exec(tempStr);
					if ((res) && (res.length > 1)) {
						PluginAttack.teams[enemy01].strength = parseInt(res[1], 10);
					}
					break
				case 1:
					var regex = /Ловкость: (\d+)<br>/i;
					var res = [];
					var res = regex.exec(tempStr);
					if ((res) && (res.length > 1)) {
						PluginAttack.teams[enemy01].dexterity = parseInt(res[1], 10);
					}
					break
				case 2:
					var regex = /Интуиция: (\d+)<br>/i;
					var res = [];
					var res = regex.exec(tempStr);
					if ((res) && (res.length > 1)) {
						PluginAttack.teams[enemy01].intuition = parseInt(res[1], 10);
					}
					break
				case 3:
					var regex = /Выносливость: (\d+)<br>/i;
					var res = [];
					var res = regex.exec(tempStr);
					if ((res) && (res.length > 1)) {
						PluginAttack.teams[enemy01].vitality = parseInt(res[1], 10);
					}
					break
				case 4:
					var regex = /Интеллект: (\d+)<br>/i;
					var res = [];
					var res = regex.exec(tempStr);
					if ((res) && (res.length > 1)) {
						PluginAttack.teams[enemy01].intellect = parseInt(res[1], 10);
					}
					break
				case 5:
					var regex = /Мудрость: (\d+)<br>/i;
					var res = [];
					var res = regex.exec(tempStr);
					if ((res) && (res.length > 1)) {
						PluginAttack.teams[enemy01].wisdom = parseInt(res[1], 10);
					}
					break
			}
		}
	}
}
function GetEnemyRuns(document01, enemy01, td01, td02, td03) {
	var TempInt = parseInt(enemy01, 10);
	if (isNaN(TempInt)) {
		TempInt = enemy01;
	}
	var TempBoolNoKlon01 = false;
	if ((TempInt >= 100000000) && (TempInt < 1000000000)) {
		if (PluginAttack.teams[enemy01].name != "") {
			if (PluginAttack.teams[enemy01].name != "Невидимка") {
				var regex = /Невидимка/i;
				var TempBoolKlon01 = regex.test(PluginAttack.teams[enemy01].name);
				if (!TempBoolNoKlon01) {
					var regex = /\(клон/i;
					var TempBool03 = regex.test(PluginAttack.teams[enemy01].name);
					if (TempBool03) {
						var TempBoolNoKlon01 = false;
					}
				}
			} else {
				var TempBoolKlon01 = true;
			}
		} else {
			var TempBoolKlon01 = true;
		}
	}
	if ((PluginAttack.teams[enemy01].level == -1) || (PluginAttack.teams[enemy01].name == "")) {
		PluginAttack.teams[enemy01].r_uvorot = -1;
		PluginAttack.teams[enemy01].r_ak = -1;
		PluginAttack.teams[enemy01].r_au = -1;
		PluginAttack.teams[enemy01].r_krit = -1;
	} else {
		if (!TempBoolKlon01) {
			var regex = /Пустой слот руны/i;
			PluginAttack.teams[enemy01].r_s = 0;
			if (td01 > 0) {
				var tempStr01 = document01.getElementsByTagName('td')[td01].innerHTML;
			} else {
				var regex02 = /<td width=59(.*?)<\/td>/i;
				var res = [];
				var res = regex02.exec(document01);
				if ((res) && (res.length > 1)) {
					var tempStr01 = res[1];
				}
			}
			if (td02 > 0) {
				var tempStr02 = document01.getElementsByTagName('td')[td02].innerHTML;
			} else {
				var regex02 = /<td width=74(.*?)<\/td>/i;
				var res = [];
				var res = regex02.exec(document01);
				if ((res) && (res.length > 1)) {
					var tempStr02 = res[1];
				}
			}
			if (td03 > 0) {
				var tempStr03 = document01.getElementsByTagName('td')[td03].innerHTML;
			} else {
				var regex02 = /<td width=57(.*?)<\/td>/i;
				var res = [];
				var res = regex02.exec(document01);
				if ((res) && (res.length > 1)) {
					var tempStr03 = res[1];
				}
			}
		}
		for (var i = 0; i < 3; i++) {
			if (!TempBoolKlon01) {
				switch (i) {
					case 0:
						var TempBool01 = regex.test(tempStr01);
						break
					case 1:
						var TempBool01 = regex.test(tempStr02);
						break
					case 2:
						var TempBool01 = regex.test(tempStr03);
						break
				}
			} else {
				var TempBool01 = true;
			}
			if (!TempBool01) {
				PluginAttack.teams[enemy01].r_s = PluginAttack.teams[enemy01].r_s + 1;
				var regex01 = /&lt;b&gt;(.*?)&lt;\/b&gt;&lt;br&gt;Уровень:&lt;b&gt;(\d+)&lt;\/b&gt/i;
				var res = [];
				switch (i) {
					case 0:
						var TempBool01 = regex01.test(tempStr01);
						if (!TempBool01) {
							var regex01 = /<b>(.*?)<\/b><br>Уровень:<b>(\d+)<\/b>/i;
						}
						var res = regex01.exec(tempStr01);
						break
					case 1:
						var TempBool01 = regex01.test(tempStr02);
						if (!TempBool01) {
							var regex01 = /<b>(.*?)<\/b><br>Уровень:<b>(\d+)<\/b>/i;
						}
						var res = regex01.exec(tempStr02);
						break
					case 2:
						var TempBool01 = regex01.test(tempStr03);
						if (!TempBool01) {
							var regex01 = /<b>(.*?)<\/b><br>Уровень:<b>(\d+)<\/b>/i;
						}
						var res = regex01.exec(tempStr03);
						break
				}
				if ((res) && (res.length > 1)) {
					var TempInt = parseInt(res[2], 10);
					var TempInt01 = PluginAttack.RunsNameArray.indexOf(res[1]);
					if (TempInt01 != -1) {
						if (TempInt < 3) {
							PluginAttack.teams[enemy01].r_krit = PluginAttack.teams[enemy01].r_krit + PluginAttack.RunsParamArray[TempInt01][0][0];
							PluginAttack.teams[enemy01].r_ak = PluginAttack.teams[enemy01].r_ak + PluginAttack.RunsParamArray[TempInt01][1][0];
							PluginAttack.teams[enemy01].r_uvorot = PluginAttack.teams[enemy01].r_uvorot + PluginAttack.RunsParamArray[TempInt01][2][0];
							PluginAttack.teams[enemy01].r_au = PluginAttack.teams[enemy01].r_au + PluginAttack.RunsParamArray[TempInt01][3][0];
						} else {
							if (TempInt < 5) {
								PluginAttack.teams[enemy01].r_krit = PluginAttack.teams[enemy01].r_krit + PluginAttack.RunsParamArray[TempInt01][0][1];
								PluginAttack.teams[enemy01].r_ak = PluginAttack.teams[enemy01].r_ak + PluginAttack.RunsParamArray[TempInt01][1][1];
								PluginAttack.teams[enemy01].r_uvorot = PluginAttack.teams[enemy01].r_uvorot + PluginAttack.RunsParamArray[TempInt01][2][1];
								PluginAttack.teams[enemy01].r_au = PluginAttack.teams[enemy01].r_au + PluginAttack.RunsParamArray[TempInt01][3][1];
							} else {
								if (TempInt < 8) {
									PluginAttack.teams[enemy01].r_krit = PluginAttack.teams[enemy01].r_krit + PluginAttack.RunsParamArray[TempInt01][0][2];
									PluginAttack.teams[enemy01].r_ak = PluginAttack.teams[enemy01].r_ak + PluginAttack.RunsParamArray[TempInt01][1][2];
									PluginAttack.teams[enemy01].r_uvorot = PluginAttack.teams[enemy01].r_uvorot + PluginAttack.RunsParamArray[TempInt01][2][2];
									PluginAttack.teams[enemy01].r_au = PluginAttack.teams[enemy01].r_au + PluginAttack.RunsParamArray[TempInt01][3][2];
								} else {
									PluginAttack.teams[enemy01].r_krit = PluginAttack.teams[enemy01].r_krit + PluginAttack.RunsParamArray[TempInt01][0][3];
									PluginAttack.teams[enemy01].r_ak = PluginAttack.teams[enemy01].r_ak + PluginAttack.RunsParamArray[TempInt01][1][3];
									PluginAttack.teams[enemy01].r_uvorot = PluginAttack.teams[enemy01].r_uvorot + PluginAttack.RunsParamArray[TempInt01][2][3];
									PluginAttack.teams[enemy01].r_au = PluginAttack.teams[enemy01].r_au + PluginAttack.RunsParamArray[TempInt01][3][3];
								}
							}
						}
					} else {
						PluginAttack.teams[enemy01].r_krit = PluginAttack.teams[enemy01].r_krit + 0;
						PluginAttack.teams[enemy01].r_ak = PluginAttack.teams[enemy01].r_ak + 0;
						PluginAttack.teams[enemy01].r_uvorot = PluginAttack.teams[enemy01].r_uvorot + 0;
						PluginAttack.teams[enemy01].r_au = PluginAttack.teams[enemy01].r_au + 0;
					}
				}
			} else {
				PluginAttack.teams[enemy01].r_uvorot = PluginAttack.teams[enemy01].r_uvorot + 0;
				PluginAttack.teams[enemy01].r_ak = PluginAttack.teams[enemy01].r_ak + 0;
				PluginAttack.teams[enemy01].r_au = PluginAttack.teams[enemy01].r_au + 0;
				PluginAttack.teams[enemy01].r_krit = PluginAttack.teams[enemy01].r_krit + 0;
			}
		}
	}
	PluginAttack.teams[enemy01].indruns = 0;
	if (PluginAttack.teams[enemy01].r_uvorot < 0) {
		PluginAttack.teams[enemy01].indruns = -1;
	} else {
		if (PluginAttack.teams[enemy01].r_uvorot + PluginAttack.teams[enemy01].r_ak + PluginAttack.teams[enemy01].r_au + PluginAttack.teams[enemy01].r_krit == 0) {
			PluginAttack.teams[enemy01].indruns = 0;
		} else {
			if (PluginAttack.teams[enemy01].r_uvorot == 0) {
				if ((PluginAttack.teams[enemy01].r_ak > 0) && (PluginAttack.teams[enemy01].r_au > 0) && (PluginAttack.teams[enemy01].r_krit > 0)) {
					PluginAttack.teams[enemy01].indruns = 5;
				} else {
					if (PluginAttack.teams[enemy01].r_ak == 0) {
						if (PluginAttack.teams[enemy01].r_au == 0) {
							PluginAttack.teams[enemy01].indruns = 4;
						} else {
							if (PluginAttack.teams[enemy01].r_krit == 0) {
								PluginAttack.teams[enemy01].indruns = 3;
							} else {
								if (PluginAttack.teams[enemy01].r_au > PluginAttack.teams[enemy01].r_krit) {
									PluginAttack.teams[enemy01].indruns = 9;
								} else {
									if (PluginAttack.teams[enemy01].r_au < PluginAttack.teams[enemy01].r_krit) {
										PluginAttack.teams[enemy01].indruns = 10;
									} else {
										PluginAttack.teams[enemy01].indruns = 21;
									}
								}
							}
						}
					} else {
						if (PluginAttack.teams[enemy01].r_au == 0) {
							if (PluginAttack.teams[enemy01].r_ak == 0) {
								PluginAttack.teams[enemy01].indruns = 4;
							} else {
								if (PluginAttack.teams[enemy01].r_krit == 0) {
									PluginAttack.teams[enemy01].indruns = 2;
								} else {
									if (PluginAttack.teams[enemy01].r_ak > PluginAttack.teams[enemy01].r_krit) {
										PluginAttack.teams[enemy01].indruns = 11;
									} else {
										if (PluginAttack.teams[enemy01].r_ak < PluginAttack.teams[enemy01].r_krit) {
										PluginAttack.teams[enemy01].indruns = 12;
										} else {
											PluginAttack.teams[enemy01].indruns = 22;
										}
									}
								}
							}
						} else {
							if (PluginAttack.teams[enemy01].r_ak == 0) {
								PluginAttack.teams[enemy01].indruns = 3;
							} else {
								if (PluginAttack.teams[enemy01].r_au == 0) {
									PluginAttack.teams[enemy01].indruns = 2;
								} else {
									if (PluginAttack.teams[enemy01].r_ak > PluginAttack.teams[enemy01].r_au) {
										PluginAttack.teams[enemy01].indruns = 13;
									} else {
										if (PluginAttack.teams[enemy01].r_ak < PluginAttack.teams[enemy01].r_au) {
											PluginAttack.teams[enemy01].indruns = 14;
										} else {
											PluginAttack.teams[enemy01].indruns = 23;
										}
									}
								}
							}
						}
					}
				}
			} else {
				if (PluginAttack.teams[enemy01].r_ak == 0) {
					if ((PluginAttack.teams[enemy01].r_uvorot > 0) && (PluginAttack.teams[enemy01].r_au > 0) && (PluginAttack.teams[enemy01].r_krit > 0)) {
						PluginAttack.teams[enemy01].indruns = 6;
					} else {
						if (PluginAttack.teams[enemy01].r_au == 0) {
							if (PluginAttack.teams[enemy01].r_uvorot == 0) {
								PluginAttack.teams[enemy01].indruns = 4;
							} else {
								if (PluginAttack.teams[enemy01].r_krit == 0) {
									PluginAttack.teams[enemy01].indruns = 1;
								} else {
									if (PluginAttack.teams[enemy01].r_uvorot > PluginAttack.teams[enemy01].r_krit) {
										PluginAttack.teams[enemy01].indruns = 15;
									} else {
										if (PluginAttack.teams[enemy01].r_uvorot < PluginAttack.teams[enemy01].r_krit) {
											PluginAttack.teams[enemy01].indruns = 16;
										} else {
											PluginAttack.teams[enemy01].indruns = 24;
										}
									}
								}
							}
						} else {
							if (PluginAttack.teams[enemy01].r_uvorot == 0) {
								if (PluginAttack.teams[enemy01].r_au == 0) {
									PluginAttack.teams[enemy01].indruns = 4;
								} else {
									if (PluginAttack.teams[enemy01].r_krit == 0) {
										PluginAttack.teams[enemy01].indruns = 3;
									} else {
										if (PluginAttack.teams[enemy01].r_au > PluginAttack.teams[enemy01].r_krit) {
											PluginAttack.teams[enemy01].indruns = 9;
										} else {
											if (PluginAttack.teams[enemy01].r_au < PluginAttack.teams[enemy01].r_krit) {
												PluginAttack.teams[enemy01].indruns = 10;
											} else {
												PluginAttack.teams[enemy01].indruns = 21;
											}
										}
									}
								}
							} else {
								if (PluginAttack.teams[enemy01].r_uvorot == 0) {
									PluginAttack.teams[enemy01].indruns = 3;
								} else {
									if (PluginAttack.teams[enemy01].r_au == 0) {
										PluginAttack.teams[enemy01].indruns = 1;
									} else {
										if (PluginAttack.teams[enemy01].r_uvorot > PluginAttack.teams[enemy01].r_au) {
											PluginAttack.teams[enemy01].indruns = 17;
										} else {
											if (PluginAttack.teams[enemy01].r_uvorot < PluginAttack.teams[enemy01].r_au) {
												PluginAttack.teams[enemy01].indruns = 18;
											} else {
												PluginAttack.teams[enemy01].indruns = 25;
											}
										}
									}
								}
							}
						}
					}
				} else {
					if (PluginAttack.teams[enemy01].r_au == 0) {
						if ((PluginAttack.teams[enemy01].r_uvorot > 0) && (PluginAttack.teams[enemy01].r_ak > 0) && (PluginAttack.teams[enemy01].r_krit > 0)) {
							PluginAttack.teams[enemy01].indruns = 7;
						} else {
							if (PluginAttack.teams[enemy01].r_uvorot == 0) {
								if (PluginAttack.teams[enemy01].r_ak == 0) {
									PluginAttack.teams[enemy01].indruns = 4;
								} else {
									if (PluginAttack.teams[enemy01].r_krit == 0) {
										PluginAttack.teams[enemy01].indruns = 2;
									} else {
										if (PluginAttack.teams[enemy01].r_ak > PluginAttack.teams[enemy01].r_krit) {
											PluginAttack.teams[enemy01].indruns = 11;
										} else {
											if (PluginAttack.teams[enemy01].r_ak < PluginAttack.teams[enemy01].r_krit) {
												PluginAttack.teams[enemy01].indruns = 12;
											} else {
												PluginAttack.teams[enemy01].indruns = 22;
											}
										}
									}
								}
							} else {
								if (PluginAttack.teams[enemy01].r_ak == 0) {
									if (PluginAttack.teams[enemy01].r_uvorot == 0) {
										PluginAttack.teams[enemy01].indruns = 4;
									} else {
										if (PluginAttack.teams[enemy01].r_krit == 0) {
											PluginAttack.teams[enemy01].indruns = 1;
										} else {
											if (PluginAttack.teams[enemy01].r_uvorot > PluginAttack.teams[enemy01].r_krit) {
												PluginAttack.teams[enemy01].indruns = 15;
											} else {
												if (PluginAttack.teams[enemy01].r_uvorot < PluginAttack.teams[enemy01].r_krit) {
													PluginAttack.teams[enemy01].indruns = 16;
												} else {
													PluginAttack.teams[enemy01].indruns = 24;
												}
											}
										}
									}
								} else {
									if (PluginAttack.teams[enemy01].r_uvorot == 0) {
										PluginAttack.teams[enemy01].indruns = 2;
									} else {
										if (PluginAttack.teams[enemy01].r_ak == 0) {
											PluginAttack.teams[enemy01].indruns = 1;
										} else {
											if (PluginAttack.teams[enemy01].r_uvorot > PluginAttack.teams[enemy01].r_ak) {
												PluginAttack.teams[enemy01].indruns = 19;
											} else {
												if (PluginAttack.teams[enemy01].r_uvorot < PluginAttack.teams[enemy01].r_ak) {
													PluginAttack.teams[enemy01].indruns = 20;
												} else {
													PluginAttack.teams[enemy01].indruns = 26;
												}
											}
										}
									}
								}
							}
						}
					} else {
						if ((PluginAttack.teams[enemy01].r_uvorot > 0) && (PluginAttack.teams[enemy01].r_ak > 0) && (PluginAttack.teams[enemy01].r_au > 0)) {
							PluginAttack.teams[enemy01].indruns = 8;
						} else {
							if (PluginAttack.teams[enemy01].r_uvorot == 0) {
								if (PluginAttack.teams[enemy01].r_ak == 0) {
									PluginAttack.teams[enemy01].indruns = 3;
								} else {
									if (PluginAttack.teams[enemy01].r_au == 0) {
										PluginAttack.teams[enemy01].indruns = 2;
									} else {
										if (PluginAttack.teams[enemy01].r_ak > PluginAttack.teams[enemy01].r_au) {
											PluginAttack.teams[enemy01].indruns = 13;
										} else {
											if (PluginAttack.teams[enemy01].r_ak < PluginAttack.teams[enemy01].r_au) {
												PluginAttack.teams[enemy01].indruns = 14;
											} else {
												PluginAttack.teams[enemy01].indruns = 23;
											}
										}
									}
								}
							} else {
								if (PluginAttack.teams[enemy01].r_ak == 0) {
									if (PluginAttack.teams[enemy01].r_uvorot == 0) {
										PluginAttack.teams[enemy01].indruns = 3;
									} else {
										if (PluginAttack.teams[enemy01].r_au == 0) {
											PluginAttack.teams[enemy01].indruns = 1;
										} else {
											if (PluginAttack.teams[enemy01].r_uvorot > PluginAttack.teams[enemy01].r_au) {
												PluginAttack.teams[enemy01].indruns = 17;
											} else {
												if (PluginAttack.teams[enemy01].r_uvorot < PluginAttack.teams[enemy01].r_au) {
													PluginAttack.teams[enemy01].indruns = 18;
												} else {
													PluginAttack.teams[enemy01].indruns = 25;
												}
											}
										}
									}
								} else {
									if (PluginAttack.teams[enemy01].r_uvorot == 0) {
										PluginAttack.teams[enemy01].indruns = 2;
									} else {
										if (PluginAttack.teams[enemy01].r_ak == 0) {
											PluginAttack.teams[enemy01].indruns = 1;
										} else {
											if (PluginAttack.teams[enemy01].r_uvorot > PluginAttack.teams[enemy01].r_ak) {
												PluginAttack.teams[enemy01].indruns = 19;
											} else {
												if (PluginAttack.teams[enemy01].r_uvorot < PluginAttack.teams[enemy01].r_ak) {
													PluginAttack.teams[enemy01].indruns = 20;
												} else {
													PluginAttack.teams[enemy01].indruns = 26;
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
function GetEnemyRings(document01, enemy01, td01) {
	var TempInt = parseInt(enemy01, 10);
	if (isNaN(TempInt)) {
		TempInt = enemy01;
	}
	var TempBoolNoKlon01 = false;
	if ((TempInt >= 100000000) && (TempInt < 1000000000)) {
		if (PluginAttack.teams[enemy01].name != "") {
			if (PluginAttack.teams[enemy01].name != "Невидимка") {
				var regex = /Невидимка/i;
				var TempBoolKlon01 = regex.test(PluginAttack.teams[enemy01].name);
				if (!TempBoolNoKlon01) {
					var regex = /\(клон/i;
					var TempBool03 = regex.test(PluginAttack.teams[enemy01].name);
					if (TempBool03) {
						var TempBoolNoKlon01 = false;
					}
				}
			} else {
				var TempBoolKlon01 = true;
			}
		} else {
			var TempBoolKlon01 = true;
		}
	}
	if ((PluginAttack.teams[enemy01].level == -1) || (PluginAttack.teams[enemy01].name == "")) {
		PluginAttack.teams[enemy01].k_uvorot = -1;
		PluginAttack.teams[enemy01].k_ak = -1;
		PluginAttack.teams[enemy01].k_au = -1;
		PluginAttack.teams[enemy01].k_krit = -1;
	} else {
		var regex = /Пустой слот кольцо/i;
		PluginAttack.teams[enemy01].k_s = 0;
		if (!TempBoolKlon01) {
			if (td01 > 0) {
				var divTable16 = document01.getElementsByTagName('td')[td01];
			}
			for (var i = 0; i < 3; i++) {
				if (td01 > 0) {
					var tempStr = divTable16.getElementsByTagName('td')[i].innerHTML;
				} else {
					var tempStr = document01[i];
				}
				var TempBool01 = regex.test(tempStr);
				if (!TempBool01) {
					PluginAttack.teams[enemy01].k_s = PluginAttack.teams[enemy01].k_s + 1;
				}
			}
		}
		for (var i = 0; i < 3; i++) {
			if (!TempBoolKlon01) {
				if (td01 > 0) {
					var tempStr = divTable16.getElementsByTagName('td')[i].innerHTML;
				} else {
					var tempStr = document01[i];
				}
				var TempBool01 = regex.test(tempStr);
			} else {
				var TempBool01 = true;
			}
			if (!TempBool01) {
				var regex01 = /\[\d+\]/;
				var TempBool01 = regex01.test(tempStr);
				var regex02 = /\(мф\)/;
				var TempBool02 = regex02.test(tempStr);
				if (TempBool01 && TempBool02) {
					var regex01 = /\(мф\)\s\[\d+\]/;
					var TempBool03 = regex01.test(tempStr);
					if (TempBool03) {
						var regex02 = /&lt;b&gt;(.*?)\s\(мф\)\s\[\d+\]&lt;\/b&gt/i;
						var TempBool03 = regex02.test(tempStr);
						if (!TempBool03) {
							var regex02 = /<b>(.*?)\s\(мф\)\s\[\d+\]<\/b>/i;
						}
					} else {
						var regex02 = /&lt;b&gt;(.*?)\s\[\d+\]\s\(мф\)&lt;\/b&gt/i;
						var TempBool03 = regex02.test(tempStr);
						if (!TempBool03) {
							var regex02 = /<b>(.*?)\s\[\d+\]\s\(мф\)<\/b>/i;
						}
					}
				} else {
					if (TempBool01) {
						var regex02 = /&lt;b&gt;(.*?)\s\[\d+\]&lt;\/b&gt/i;
						var TempBool03 = regex02.test(tempStr);
						if (!TempBool03) {
							var regex02 = /<b>(.*?)\s\[\d+\]<\/b>/i;
						}
					} else {
						if (TempBool02) {
							var regex02 = /&lt;b&gt;(.*?)\s\(мф\)&lt;\/b&gt/i;
							var TempBool03 = regex02.test(tempStr);
							if (!TempBool03) {
								var regex02 = /<b>(.*?)\s\(мф\)<\/b>/i;
							}
						} else {
							var regex02 = /&lt;b&gt;(.*?)&lt;\/b&gt/i;
							var TempBool03 = regex02.test(tempStr);
							if (!TempBool03) {
								var regex02 = /<b>(.*?)<\/b>/i;
							}
						}
					}
				}
				var res = [];
				var res = regex02.exec(tempStr);
				if ((res) && (res.length > 1)) {
					var TempInt01 = PluginAttack.RingsNameArray.indexOf(res[1]);
					if (TempInt01 != -1) {
						PluginAttack.teams[enemy01].k_krit = PluginAttack.teams[enemy01].k_krit + PluginAttack.RingsParamArray[TempInt01][PluginAttack.teams[enemy01].indruns + 1][PluginAttack.teams[enemy01].k_s - 1][0];
						PluginAttack.teams[enemy01].k_ak = PluginAttack.teams[enemy01].k_ak + PluginAttack.RingsParamArray[TempInt01][PluginAttack.teams[enemy01].indruns + 1][PluginAttack.teams[enemy01].k_s - 1][1];
						PluginAttack.teams[enemy01].k_uvorot = PluginAttack.teams[enemy01].k_uvorot + PluginAttack.RingsParamArray[TempInt01][PluginAttack.teams[enemy01].indruns + 1][PluginAttack.teams[enemy01].k_s - 1][2];
						PluginAttack.teams[enemy01].k_au = PluginAttack.teams[enemy01].k_au + PluginAttack.RingsParamArray[TempInt01][PluginAttack.teams[enemy01].indruns + 1][PluginAttack.teams[enemy01].k_s - 1][3];
					} else {
						PluginAttack.teams[enemy01].k_uvorot = PluginAttack.teams[enemy01].k_uvorot + 0;
						PluginAttack.teams[enemy01].k_ak = PluginAttack.teams[enemy01].k_ak + 0;
						PluginAttack.teams[enemy01].k_au = PluginAttack.teams[enemy01].k_au + 0;
						PluginAttack.teams[enemy01].k_krit = PluginAttack.teams[enemy01].k_krit + 0;
					}
				}
			} else {
				PluginAttack.teams[enemy01].k_uvorot = PluginAttack.teams[enemy01].k_uvorot + 0;
				PluginAttack.teams[enemy01].k_ak = PluginAttack.teams[enemy01].k_ak + 0;
				PluginAttack.teams[enemy01].k_au = PluginAttack.teams[enemy01].k_au + 0;
				PluginAttack.teams[enemy01].k_krit = PluginAttack.teams[enemy01].k_krit + 0;
			}
		}
	}
}
function GetEnemyKlass(document01, enemy01, td01, bool01) {
	if (PluginAttack.teams[enemy01].level == -1) {
		var regex = /<B>(.*?)<\/B> \[(\?\?|\d+)\]<a href=/i;
		var res01 = [];
		if (td01 > 0) {
			var tempStr = document01.getElementsByTagName('td')[td01].innerHTML;
		} else {
			var tempStr = document01;
		}
		var res01 = regex.exec(tempStr);
		if ((res01) && (res01.length > 1)) {
			if (res01[2] != "??") {
				var TempInt = parseInt(res01[2], 10);
				if (isNaN(TempInt)) {
					TempInt = res01[2];
				}
				PluginAttack.teams[enemy01].level = TempInt;
			} else {
				PluginAttack.teams[enemy01].level = -1;
			}
		}
	}
	if (PluginAttack.teams[enemy01].level >= 0) {
		var minlvl = 0;
		var maxlvl = 0;
		var TempClass_u = 0;
		var TempClass_ak = 0;
		var TempClass_au = 0;
		var TempClass_k = 0;
		if (PluginAttack.options.mini_read_classpers == 0) {
			if ((PluginAttack.teams[enemy01].r_uvorot >= 0) && (PluginAttack.teams[enemy01].k_uvorot >= 0)) {
				var TempClass_u = PluginAttack.teams[enemy01].r_uvorot + PluginAttack.teams[enemy01].k_uvorot;
				var TempClass_ak = PluginAttack.teams[enemy01].r_ak + PluginAttack.teams[enemy01].k_ak;
				var TempClass_au = PluginAttack.teams[enemy01].r_au + PluginAttack.teams[enemy01].k_au;
				var TempClass_k = PluginAttack.teams[enemy01].r_krit + PluginAttack.teams[enemy01].k_krit;
			} else {
				if (PluginAttack.teams[enemy01].r_uvorot >= 0) {
					var TempClass_u = PluginAttack.teams[enemy01].r_uvorot;
					var TempClass_ak = PluginAttack.teams[enemy01].r_ak;
					var TempClass_au = PluginAttack.teams[enemy01].r_au;
					var TempClass_k = PluginAttack.teams[enemy01].r_krit;
				} else {
					if (PluginAttack.teams[enemy01].k_uvorot >= 0) {
						var TempClass_u = PluginAttack.teams[enemy01].k_uvorot;
						var TempClass_ak = PluginAttack.teams[enemy01].k_ak;
						var TempClass_au = PluginAttack.teams[enemy01].k_au;
						var TempClass_k = PluginAttack.teams[enemy01].k_krit;
					}
				}
			}
		}
		var TempMaxClass = Math.max(TempClass_u, TempClass_ak, TempClass_au, TempClass_k);
		if ((PluginAttack.teams[enemy01].strength >= PluginAttack.teams[enemy01].dexterity) && (PluginAttack.teams[enemy01].strength >= PluginAttack.teams[enemy01].intuition)) {
			if (PluginAttack.teams[enemy01].dexterity >= PluginAttack.teams[enemy01].intuition) {
				if (TempMaxClass > 0) {
					if (TempMaxClass == TempClass_u) {
						var minlvl = PluginAttack.options.mint_aulevel;
						var maxlvl = PluginAttack.options.maxt_aulevel;
						PluginAttack.teams[enemy01].klasspers = "Tank_АU";
						PluginAttack.options.test_class = PluginAttack.options.test_class + " + Танк АУ1";
					} else {
						if (TempMaxClass == TempClass_au) {
							var minlvl = PluginAttack.options.mint_aulevel;
							var maxlvl = PluginAttack.options.maxt_aulevel;
							PluginAttack.teams[enemy01].klasspers = "Tank_АU";
							PluginAttack.options.test_class = PluginAttack.options.test_class + " + Танк АУ2";
						} else {
							if (TempMaxClass == TempClass_ak) {
								var minlvl = PluginAttack.options.mint_aklevel;
								var maxlvl = PluginAttack.options.maxt_aklevel;
								PluginAttack.teams[enemy01].klasspers = "Tank_AK";
								PluginAttack.options.test_class = PluginAttack.options.test_class + " + Танк АК3";
							} else {
								var minlvl = PluginAttack.options.mint_aklevel;
								var maxlvl = PluginAttack.options.maxt_aklevel;
								PluginAttack.teams[enemy01].klasspers = "Tank_AK";
								PluginAttack.options.test_class = PluginAttack.options.test_class + " + Танк АК4";
							}
						}
					}
				} else {
					var minlvl = PluginAttack.options.mint_aulevel;
					var maxlvl = PluginAttack.options.maxt_aulevel;
					PluginAttack.teams[enemy01].klasspers = "Tank_АU";
					PluginAttack.options.test_class = PluginAttack.options.test_class + " + Танк АУ5";
				}
			} else {
				if (TempMaxClass > 0) {
					if (TempMaxClass == TempClass_u) {
						var minlvl = PluginAttack.options.mint_aulevel;
						var maxlvl = PluginAttack.options.maxt_aulevel;
						PluginAttack.teams[enemy01].klasspers = "Tank_АU";
						PluginAttack.options.test_class = PluginAttack.options.test_class + " + Танк АУ6";
					} else {
						if (TempMaxClass == TempClass_au) {
							var minlvl = PluginAttack.options.mint_aulevel;
							var maxlvl = PluginAttack.options.maxt_aulevel;
							PluginAttack.teams[enemy01].klasspers = "Tank_АU";
							PluginAttack.options.test_class = PluginAttack.options.test_class + " + Танк АУ7";
						} else {
							if (TempMaxClass == TempClass_ak) {
								var minlvl = PluginAttack.options.mint_aklevel;
								var maxlvl = PluginAttack.options.maxt_aklevel;
								PluginAttack.teams[enemy01].klasspers = "Tank_AK";
								PluginAttack.options.test_class = PluginAttack.options.test_class + " + Танк АК8";
							} else {
								var minlvl = PluginAttack.options.mint_aklevel;
								var maxlvl = PluginAttack.options.maxt_aklevel;
								PluginAttack.teams[enemy01].klasspers = "Tank_AK";
								PluginAttack.options.test_class = PluginAttack.options.test_class + " + Танк АК9";
							}
						}
					}
				} else {
					var minlvl = PluginAttack.options.mint_aklevel;
					var maxlvl = PluginAttack.options.maxt_aklevel;
					PluginAttack.teams[enemy01].klasspers = "Tank_AK";
					PluginAttack.options.test_class = PluginAttack.options.test_class + " + Танк АК10";
				}
			}
		} else {
			if (PluginAttack.teams[enemy01].dexterity >= PluginAttack.teams[enemy01].intuition) {
				if (TempMaxClass > 0) {
					if (TempMaxClass == TempClass_u) {
						var minlvl = PluginAttack.options.minulevel;
						var maxlvl = PluginAttack.options.maxulevel;
						PluginAttack.teams[enemy01].klasspers = "Uvorot";
						PluginAttack.options.test_class = PluginAttack.options.test_class + " + Уворот1";
					} else {
						if (TempMaxClass == TempClass_au) {
							var minlvl = PluginAttack.options.minu_aulevel;
							var maxlvl = PluginAttack.options.maxu_aulevel;
							PluginAttack.teams[enemy01].klasspers = "Uvorot_АU";
							PluginAttack.options.test_class = PluginAttack.options.test_class + " + Уворот АУ2";
						} else {
							if (TempMaxClass == TempClass_ak) {
								var minlvl = PluginAttack.options.minu_aklevel;
								var maxlvl = PluginAttack.options.maxu_aklevel;
								PluginAttack.teams[enemy01].klasspers = "Uvorot_АK";
								PluginAttack.options.test_class = PluginAttack.options.test_class + " + Уворот АК3";
							} else {
								var minlvl = PluginAttack.options.minulevel;
								var maxlvl = PluginAttack.options.minulevel;
								PluginAttack.teams[enemy01].klasspers = "Uvorot";
								PluginAttack.options.test_class = PluginAttack.options.test_class + " + Уворот4";
							}
						}
					}
				} else {
					var minlvl = PluginAttack.options.minulevel;
					var maxlvl = PluginAttack.options.minulevel;
					PluginAttack.teams[enemy01].klasspers = "Uvorot";
					PluginAttack.options.test_class = PluginAttack.options.test_class + " + Уворот5";
				}
			} else {
				if (TempMaxClass > 0) {
					if (TempMaxClass == TempClass_u) {
						var minlvl = PluginAttack.options.minklevel;
						var maxlvl = PluginAttack.options.maxklevel;
						PluginAttack.teams[enemy01].klasspers = "Krit";
						PluginAttack.options.test_class = PluginAttack.options.test_class + " + Крит1";
					} else {
						if (TempMaxClass == TempClass_au) {
							var minlvl = PluginAttack.options.mink_aulevel;
							var maxlvl = PluginAttack.options.maxk_aulevel;
							PluginAttack.teams[enemy01].klasspers = "Krit_АU";
							PluginAttack.options.test_class = PluginAttack.options.test_class + " + Крит АУ2";
						} else {
							if (TempMaxClass == TempClass_ak) {
								var minlvl = PluginAttack.options.mink_aklevel;
								var maxlvl = PluginAttack.options.maxk_aklevel;
								PluginAttack.teams[enemy01].klasspers = "Krit_АK";
								PluginAttack.options.test_class = PluginAttack.options.test_class + " + Крит АК3";
							} else {
								var minlvl = PluginAttack.options.minklevel;
								var maxlvl = PluginAttack.options.maxklevel;
								PluginAttack.teams[enemy01].klasspers = "Krit";
								PluginAttack.options.test_class = PluginAttack.options.test_class + " + Крит4";
							}
						}
					}
				} else {
					var minlvl = PluginAttack.options.minklevel;
					var maxlvl = PluginAttack.options.maxklevel;
					PluginAttack.teams[enemy01].klasspers = "Krit";
					PluginAttack.options.test_class = PluginAttack.options.test_class + " + Крит5";
				}
			}
		}
		if (bool01) {
			if (PluginAttack.teams[enemy01].level >= minlvl && ((PluginAttack.teams[enemy01].level <= maxlvl) || (maxlvl == 0))) {
				PluginAttack.teams[enemy01].attack = true;
			}
		}
	} else {
		if (bool01) {
			if (PluginAttack.options.nevid == 1) {
				PluginAttack.teams[enemy01].attack = true;
			}
		}
		PluginAttack.options.test_class = "Невид";
	}
}
function CheckEnemyInfo(enemy) {
	if (enemy > 0) {
		if (PluginAttack.teams[enemy] == null) {
			PluginAttack.teams[enemy] = {};
			PluginAttack.teams[enemy].vitality = 0;
			PluginAttack.teams[enemy].enemy = true;
			PluginAttack.teams[enemy].attack = false;
			PluginAttack.teams[enemy].order = PluginAttack.BattleOrder;
			PluginAttack.teams[enemy].name = "";
			PluginAttack.teams[enemy].pers_frend_read = 0;
			PluginAttack.teams[enemy].level = -1;
			PluginAttack.teams[enemy].uvalue = false;
			PluginAttack.teams[enemy].klasspers = "NoName";
			PluginAttack.teams[enemy].k_uvorot = 0;
			PluginAttack.teams[enemy].k_ak = 0;
			PluginAttack.teams[enemy].k_au = 0;
			PluginAttack.teams[enemy].k_krit = 0;
			PluginAttack.teams[enemy].k_s = 0;
			PluginAttack.teams[enemy].r_uvorot = 0;
			PluginAttack.teams[enemy].r_ak = 0;
			PluginAttack.teams[enemy].r_au = 0;
			PluginAttack.teams[enemy].r_krit = 0;
			PluginAttack.teams[enemy].r_s = 0;
			PluginAttack.teams[enemy].indruns = 0;
		}
		if ((PluginAttack.teams[enemy].name == "") || (PluginAttack.teams[enemy].level == -1)) {
			var regex = /<B>(.*?)<\/B> \[(\?\?|\d+)\]<a href=/i;
			var res01 = [];
			var tempStr = document.getElementsByTagName('td')[46].innerHTML;
			var res01 = regex.exec(tempStr);
			if ((res01) && (res01.length > 1)) {
				if (PluginAttack.teams[enemy].level == -1) {
					if (res01[2] != "??") {
						var TempInt = parseInt(res01[2], 10);
						if (isNaN(TempInt)) {
							TempInt = res01[2];
						}
						PluginAttack.teams[enemy].level = TempInt;
					} else {
						PluginAttack.teams[enemy].level = -1;
					}
				}
				if (PluginAttack.teams[enemy].name == "") {
					var tempStr = res01[1];
					var regex = /<i>/i;
					var TempBool01 = regex.test(tempStr);
					if (TempBool01) {
						var regex = /<i>(.*?)<\/i>/i;
						var res01 = regex.exec(tempStr);
						PluginAttack.teams[enemy].name = res01[1];
					} else {
						PluginAttack.teams[enemy].name = tempStr;
					}
				}
			}
		}
		if (PluginAttack.teams[enemy].vitality == 0) {
			GetEnemyStats(document, enemy, 66);
		}
		if (PluginAttack.teams[enemy].klasspers == "NoName") {
			if (PluginAttack.options.mini_read_classpers == 0) {
				GetEnemyRuns(document, enemy, 63, 64, 65);
			GetEnemyRings(document, enemy, 53);
			}
			GetEnemyKlass(document, enemy, 46, true);
		} 
	}
}
function Attack() {
	if (PluginAttack != null) {
		var NewBattleID = parseInt(PluginFrame.$("input[name=batl]", document.body).val(), 10);
		var CurrentEnemy = parseInt(PluginFrame.$("input[name=enemy1]", document.body).val(), 10);
		if (CurrentEnemy != CurrentEnemy) {
			var CurrentEnemy = 0;
		}
		if (isNaN(CurrentEnemy)) {
			var CurrentEnemy = 0;
		}
		if (NewBattleID == NaN) {
			return;
		}
		if (NewBattleID != NewBattleID) {
			return;
		}
		if (isNaN(NewBattleID)) {
			return;
		}
		if (NewBattleID != PluginAttack.BattleID) {
			PluginAttack.End(true);
			PluginAttack.BattleID = NewBattleID;
			PluginAttack.BattleOrder = 0;
			PluginAttack.AutoTime = {};
			GetTeams();
			if (PluginAttack.options.color_frend_team == 1) {
				for (var i = 0, l = PluginAttack.teams_frend.length; i < l; i++) {
					var TempInt = parseInt(PluginAttack.teams_frend[i], 10);
					if (isNaN(TempInt)) {
						TempInt = PluginAttack.teams_frend[i];
					}
					if (TempInt < 1000000000) {
						GetFrendsInfo(PluginAttack.teams_frend[i])
					}
				}
			}
			if (PluginAttack.AutoBegin) {
				PluginAttack.Begin();
				return;
			}
		}
		if (PluginAttack.enabled) {
			if (document.body.innerHTML.indexOf('="Автоподтверждение удара выключить"') != -1) {
				alert('Выключите автоподтверждение удара (иконка рядом с кнопкой Вперед)');
				return;
			}
			if (!AttackInstalled) {
				var AttackInstalled = true;
				SetAttack();
				SetDefense();
				PluginFrame.Bind('keypress', window.document, KeyPressed);
			}
			if (PluginAttack.started) {
				if (document.body.innerHTML.indexOf('>Бой закончен! Всего вами нанесено урона') != -1) {
					PluginAttack.teams = {};
					PluginAttack.teams_frend = [];
					PluginAttack.End(true);
					var f = PluginFrame.$('form', document.body);
					f.append("<input type='hidden' value='Вернуться' name='end'/>");
					f.submit();
					return true;
				} else {
					if (document.body.innerHTML.indexOf('>Ожидаем, пока бой закончат другие игроки...') != -1) {
						PluginAttack.End(false);
						return true;
					} else {
						if (document.body.innerHTML.indexOf('>Ожидаем хода противника...<') != -1) {
							ShowLevels(0);
							clearTimeout(timeout_handle);
							var timeout_handle = setTimeout(RefreshBWin2, (PluginAttack.RefreshCounter+1) * 600);
						} else {
							CheckEnemyInfo(CurrentEnemy);
							if (!CheckEnemy(CurrentEnemy)) {
								return true;
							}
							if (PluginAttack.WaitTimeOut(PluginFrame.$("span.date,span.date2", document.body).first().text())) {
								clearTimeout(timeout_handle);
								var timeout_handle = setTimeout(function() {
									window.location.href = 'fbattle.php?batl=';
								}, 5000);
								return true;
							} else {
								clearTimeout(timeout_handle);
							}
							PluginAttack.RefreshCounter = 0;
							var HP = 0;
							var rhp = /:? (\d+?)\/(\d+)/mi;
							var res = PluginFrame.$('body', document).html().match(rhp);
							if (res.length > 0)
								var HP = res[1];
							if ((HP != 0) && (PluginAttack.options.life != 0)) {
								if (HP <= PluginAttack.options.life) {
									PluginAttack.End(false);
									alert('Уровень жизни достиг ограничения. Серия ударов прервана');
									return true;
								}
							}
							var f = PluginFrame.$('form', document.body);
							if (f.length > 0) {
								PluginAttack.RefreshCounter = 0;
								clearTimeout(timeout_handle);
								if (PluginAttack.TimeOut != 999)
									var timeout_handle = setTimeout(SubmitAttack, 1000);
								else
									var timeout_handle = setTimeout(SubmitAttack, 400);
							}
							return true;
						}
					}
				}
			} else {
				if (CurrentEnemy > 0) {
					CheckEnemyInfo(CurrentEnemy);
				}
				ShowLevels(CurrentEnemy);
				if ((PluginAttack.options.rentgen == 1) && (CurrentEnemy > 0)) {
					RentgenOn(CurrentEnemy, 46);
				}
			}
			return false;
		}
	}
}
function RentgenOn(enemy, td01) {
	var TempInt = parseInt(enemy, 10);
	if (isNaN(TempInt)) {
		TempInt = enemy;
	}
	if (TempInt < 1000000000) {
		var regex = /<B>(.*?)<\/B> \[.*?\]<a href=/i;
		var res = [];
		var tempStr = document.getElementsByTagName('td')[td01].innerHTML;
		var res = regex.exec(tempStr);
		if ((res) && (res.length > 1)) {
			var tempStr = res[1];
			var regex = /\(kлoн/i;
			var TempBool01 = regex.test(tempStr);
			var regex = /\(\d+/i;
			var TempBool02 = regex.test(tempStr);
			var regex = /<i>/i;
			var TempBool03 = regex.test(tempStr);
		}
		if ((!TempBool01) && (!TempBool02) && (!TempBool03)) {
			for (var i = 0; i < 11; i++) {
				switch (i) {
					case 0:
						var regex = /Пустой слот серьги/i;
						var divTdTemp = document.getElementsByTagName('td')[49];
						break
					case 1:
						var regex = /Пустой слот ожерелье/i;
						var divTdTemp = document.getElementsByTagName('td')[50];
						break
					case 2:
						var regex = /Пустой слот оружие/i;
						var divTdTemp = document.getElementsByTagName('td')[51];
						break
					case 3:
						var regex = /Пустой слот броня/i;
						var divTdTemp = document.getElementsByTagName('td')[52];
						break
					case 4:
						var regex = /Пустой слот кольцо/i;
						var divTdTemp = document.getElementsByTagName('td')[54];
						break
					case 5:
						var regex = /Пустой слот кольцо/i;
						var divTdTemp = document.getElementsByTagName('td')[55];
						break
					case 6:
						var regex = /Пустой слот кольцо/i;
						var divTdTemp = document.getElementsByTagName('td')[56];
						break
					case 7:
						var regex = /Пустой слот шлем/i;
						var divTdTemp = document.getElementsByTagName('td')[59];
						break
					case 8:
						var regex = /Пустой слот перчатки/i;
						var divTdTemp = document.getElementsByTagName('td')[60];
						break
					case 9:
						var regex = /Пустой слот щит/i;
						var divTdTemp = document.getElementsByTagName('td')[61];
						break
					case 10:
						var regex = /Пустой слот обувь/i;
						var divTdTemp = document.getElementsByTagName('td')[62];
						break
				}
				var TempBool01 = regex.test(divTdTemp.innerHTML);
				if (!TempBool01) {
					var regex01 = /&lt;b&gt;(.*?)&lt;\/b&gt/i;
					var TempBool01 = regex01.test(divTdTemp.innerHTML);
					if (!TempBool01) {
						var regex01 = /<b>(.*?)<\/b>/i;
					}
					var res = [];
					var res = regex01.exec(divTdTemp.innerHTML);
					if ((res) && (res.length > 1)) {
						var TempStr = res[1];
						switch (i) {
							case 2:
								var regex01 = /\[\d+\]/;
								var TempBool01 = regex01.test(TempStr);
								var regex02 = /\+\d/;
								var TempBool02 = regex02.test(TempStr);
								if (TempBool01) {
									var regex03 = /(.*?)\s\[\d+\]/;
								} else {
									if (TempBool02) {
										var regex03 = /(.*?)\+\d/;
									} else {
										var regex03 = /<b>(.*?)<\/b>/i;
										var TempStr = "<b>" + TempStr + "</b>";
									}
								}
								break
							default:
								var regex01 = /\[\d+\]/;
								var TempBool01 = regex01.test(TempStr);
								var regex02 = /\(мф\)/;
								var TempBool02 = regex02.test(TempStr);
								if (TempBool01 && TempBool02) {
									var regex01 = /\(мф\)\s\[\d+\]/;
									var TempBool03 = regex01.test(TempStr);
									if (TempBool03) {
										var regex03 = /(.*?)\s\(мф\)\s\[\d+\]/i;
									} else {
										var regex03 = /(.*?)\s\[\d+\]\s\(мф\)/i;
									}
								} else {
									if (TempBool01) {
										var regex03 = /(.*?)\s\[\d+\]/i;
									} else {
										if (TempBool02) {
											var regex03 = /(.*?)\s\(мф\)/i;
										} else {
											var regex03 = /<b>(.*?)<\/b>/i;
											var TempStr = "<b>" + TempStr + "</b>";
										}
									}
								}
								break
						}
						var res = [];
						var res = regex03.exec(TempStr);
						if ((res) && (res.length > 1)) {
							switch (i) {
								case 0:
									var TempInt01 = PluginAttack.ClipNameArray.indexOf(res[1]);
									break
								case 1:
									var TempInt01 = PluginAttack.AmuletNameArray.indexOf(res[1]);
									break
								case 2:
									var TempInt01 = PluginAttack.RuggoNameArray.indexOf(res[1]);
									break
								case 3:
									var TempInt01 = PluginAttack.PlashNameArray.indexOf(res[1]);
									break
								case 4:
								case 5:
								case 6:
									var TempInt01 = PluginAttack.RingsNameArray.indexOf(res[1]);
									break
								case 7:
									var TempInt01 = PluginAttack.ShapkaNameArray.indexOf(res[1]);
									break
								case 8:
									var TempInt01 = PluginAttack.NaruchNameArray.indexOf(res[1]);
									break
								case 9:
									var TempInt01 = PluginAttack.SchitNameArray.indexOf(res[1]);
									break
								case 10:
									var TempInt01 = PluginAttack.BootsNameArray.indexOf(res[1]);
									break
							}
							if (TempInt01 != -1) {
								switch (i) {
									case 0:
										var TempStr = PluginAttack.ClipParamArray[TempInt01];
										break
									case 1:
										var TempStr = PluginAttack.AmuletParamArray[TempInt01];
										break
									case 2:
										var TempStr = PluginAttack.RuggoParamArray[TempInt01];
										break
									case 3:
										var TempStr = PluginAttack.PlashParamArray[TempInt01];
										break
									case 4:
									case 5:
									case 6:
										var TempStr = PluginAttack.RingsParamArray[TempInt01][0];
										break
									case 7:
										var TempStr = PluginAttack.ShapkaParamArray[TempInt01];
										break
									case 8:
										var TempStr = PluginAttack.NaruchParamArray[TempInt01];
										break
									case 9:
										var TempStr = PluginAttack.SchitParamArray[TempInt01];
										break
									case 10:
										var TempStr = PluginAttack.BootsParamArray[TempInt01];
										break
								}
								if (TempStr != divTdTemp.getElementsByTagName('img')[0].src) {
									divTdTemp.getElementsByTagName('img')[0].src = TempStr;
								}
							}
						}
					}
				}
			}
		}
	}
}
function EnemySettings(enemy) {
	PluginAttack.teams[enemy.value].attack = enemy.checked;
	PluginAttack.teams[enemy.value].uvalue = true;
}
Attack();
// © -GrandMaster- - http://capitalcity.oldbk.com/inf.php?329863