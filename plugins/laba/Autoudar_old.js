var PluginFrameOld = null;
if (typeof(top.frames['plugin']) == 'undefined') {
     if (typeof(top.frames[0]) != 'undefined') {
           if (typeof(top.frames[0].window.PM) != 'undefined') {
               PluginFrameOld = top.frames[0].window;
           }
     }
} else {
    PluginFrameOld = top.frames['plugin'].window;
}
var PluginAttackOld = null;
if (PluginFrameOld != null) {
    PluginFrameOld.$(PluginFrameOld.PM.plugins).each(function(){
        if (this.id == "AutoUdarOld") {
            PluginAttackOld = this;
        }
    })
}
function SetAttack_old() {
    var at = PluginAttackOld.options.areas_old.hit_old;
    if (at.length == 0) {
        at = [1, 2, 3, 4];
	}
    var i = at.length;
    var inx = Math.floor(Math.random() * i);	
	PluginFrameOld.$("#A" + at[inx], document.body).click();
}
function SetDefense_old() {
    var def = PluginAttackOld.options.areas_old.block_old;
    if (def.length == 0) {
        def = [1, 2, 3, 4];
	}
    var i = def.length;
    var inx = Math.floor(Math.random() * i);
	PluginFrameOld.$("#D" + def[inx], document.body).click();
}
function post_to_url(path, params, method) { 
    method = method || "post"; 
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    for (var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
	timeout_handle_old = setTimeout(form.submit(), 1000);
}
function ChangeTo(login) {
    PluginFrameOld.$("#hint3",document.body).html('<form id="fake_form" action="/fbattle.php?batl=" method=POST><table width=100% cellspacing=1 cellpadding=0 bgcolor=CCC3AA><tr><td align=center><B></td><td width=20 align=right valign=top style="cursor: pointer" onclick="closehint3();"><BIG><B>x</td></tr><tr><td colspan=2>'+
	'<table width=100% cellspacing=0 cellpadding=2 bgcolor=FFF6DD><tr><INPUT TYPE=hidden name=sd4 value="6"><td colspan=2>'+
	'Укажите логин персонажа:<small><BR>(можно щелкнуть по логину в чате)</TD></TR><TR><TD width=50% align=right><INPUT type=hidden id=fenemy name=enemy> <INPUT type=hidden id=fdefend name=defend><INPUT TYPE=text NAME="login_target" value="'+ login +'"></TD><TD width=50%><INPUT TYPE="submit" value=" »» "></TD></TR></TABLE></td></tr></table></form>');
	if (PluginFrameOld.$('#fdefend', document.body).length > 0) {
		PluginFrameOld.$('#fdefend', document.body).val(PluginFrameOld.$('#txtblockzone', document.body).val());
	}
	if (PluginFrameOld.$('#fenemy', document.body).length > 0 ) {
		PluginFrameOld.$('#fenemy', document.body).val(PluginFrameOld.$('#penemy', document.body).val());
	}
    PluginFrameOld.$("#fake_form", document.body).submit();
}
function TrimString(sInString) {
	sInString = sInString.replace(/ /g, ' ');
	return sInString.replace(/(^\s+)|(\s+$)/g, "");
}
function Ocenivaem() {
	var res_temp = [];
	var rname = /<B>(.*?)<\/B>\s*\[(\?\?|\d+)\]<a href=/mgi;
	var res_temp = PluginFrameOld.$('body', document).html().match(rname); 
	var level_vrag = -1;
	var level_vrag_temp = "";
	var name2 = "не определено";
	if (res_temp && res_temp.length > 1) {
		var res = [];
		var even_odd = 0; 
		var rname = /\(.*?\)/i; 
		var TempBool01 = rname.test(res_temp[res_temp.length - 1]);
		if (TempBool01) {
			var rname = /\(kлoн/i; 
			var TempBool01 = rname.test(res_temp[res_temp.length - 1]);
			if (TempBool01) {
				var rname = /\(kлoн\s*(\d+)\)/i; 
				var res = rname.exec(res_temp[res_temp.length - 1]);
				if (res && res.length > 1) {
					var even_odd = parseInt(res[1], 10);
					if (even_odd % 2 === 0) {
						var even_odd = 2; 
					} else {
						var even_odd = 1; 
					}
				} else {
				}
				var res = [];
				var rname = /<B>(.*?)\s*\(.*?\)<\/B>\s*\[(\?\?|\d+)\]<a href=/i; 
			} else {
				var rname = /<B>(.*?)<\/B>\s*\[(\?\?|\d+)\]<a href=/i; 
			}
		} else {
			var rname = /<B>(.*?)<\/B>\s*\[(\?\?|\d+)\]<a href=/i; 
		}
		var res = rname.exec(res_temp[res_temp.length - 1]);
		if (res && res.length > 1) {
    		var name2 = res[1];
			var rname = /<i>/i; 
			var TempBool01 = rname.test(name2);
			if (TempBool01) {
				var res_temp = [];
				var tempStr = name2;
				var rname = /<i>(.*?)<\/i>/i;
				var res_temp = rname.exec(tempStr);
				if (res_temp && res_temp.length > 1) {
					var name2 = res_temp[1];
				}
			}
			var level_vrag_temp = res[2];
			if (level_vrag_temp != "??") {
				var level_vrag = parseInt(level_vrag_temp, 10);
			}
		}
	}
	var hp_vrag_temp = [];
	var hp_vrag = -1;
	var hp_vrag_ares_fobos = -1;
	var hp_vrag_temp = document.getElementsByName("HP2");
	if (hp_vrag_temp && hp_vrag_temp.length > 1) {
		var rname = />:\s*(\?\?|\d+)\/(\?\?|\d+)/i;
		var res_temp = [];
		var res_temp = rname.exec(hp_vrag_temp[1].parentElement.innerHTML);
		if (res_temp && res_temp.length > 1) {
			if (res_temp[1] != "??") {
				var hp_vrag = parseInt(res_temp[1], 10);
			}
			if (res_temp[2] != "??") {
				var hp_vrag_ares_fobos = parseInt(res_temp[2], 10);
			}
		}
	}
	var ares_fobos = 0;
	if (hp_vrag_ares_fobos >= 2000) { 
		var ares_fobos = 1; 
	}
	var classname = "B2";
	var botsSTR=PluginAttackOld.options.bots;
	var bots = [];
	if (botsSTR.length > 0) {
		var bots = botsSTR.split(',');
		for (var nom = 0; nom < bots.length; nom++) {
			bots[nom] = TrimString(bots[nom]);
		}
	}
	var hp_min_temp = parseInt(PluginAttackOld.options.hp_min, 10);
	var hp_max_temp = parseInt(PluginAttackOld.options.hp_max, 10);
	var flag_hp_max_min = -1;
	if (PluginAttackOld.options.hp_min_max_old > 0) {
		if (ares_fobos > 0) { 
			var flag_hp_max_min = 1; 
		} else {
			if ((hp_min_temp < 1) && (hp_max_temp < 1)) {
				var flag_hp_max_min = 1; 
			} else {
				if ((hp_min_temp > 0) && (hp_max_temp > 0)) {
					if ((hp_vrag > hp_min_temp) && (hp_vrag < hp_max_temp)) {
						var flag_hp_max_min = 1;
					}
				} else {
					if (hp_min_temp > 0) {
						if (hp_vrag > hp_min_temp) {
							var flag_hp_max_min = 1;
						}
					} else {
						if (hp_vrag < hp_max_temp) {
							var flag_hp_max_min = 1;
						}
					}
				}
			}
		}
	} else {
		var flag_hp_max_min = 1; 
	}
	var podhodit = 0;
	var nashli = 0;
	if (name2 != "не определено") {
		if ((even_odd < 1) || 
			(ares_fobos > 0) || 
			((even_odd == 2) && (PluginAttackOld.options.even_old == 1)) || 
			((even_odd == 1) && (PluginAttackOld.options.odd_old == 1))) {
			if (flag_hp_max_min > 0) {
				if (ares_fobos < 1) {
					if (bots.indexOf(name2) != -1) { 
						podhodit = 1;
					}
				} else { 
					if ((hp_vrag_ares_fobos == 2000) || (hp_vrag_ares_fobos == 2500) || (hp_vrag_ares_fobos == 4000)) {
						if ((PluginAttackOld.options.ares_11 != 0) && (level_vrag == 11)) {
							podhodit = 1;
						}
						if ((PluginAttackOld.options.ares_12 != 0) && (level_vrag == 12)) {
							podhodit = 1;
						}
						if ((PluginAttackOld.options.ares_14 != 0) && (level_vrag == 14)) {
							podhodit = 1;
						}
					} else {
						if ((PluginAttackOld.options.fobos_11 != 0) && (level_vrag == 11)) {
							podhodit = 1;
						}
						if ((PluginAttackOld.options.fobos_12 != 0) && (level_vrag == 12)) {
							podhodit = 1;
						}
					}
				}
			}
		}
		if ((podhodit < 1) && (name2 != "не определено")) { 
			var divMes = document.getElementById("mes"); 
			if (divMes.getElementsByClassName(classname).length > 0) {
				var boicov = divMes.getElementsByTagName("span").length; 
				var rname = /\[(\?\?|\d+)\/(\?\?|\d+)\]/mgi;
				var hp_divMes = [];
				var hp_divMes01 = [];
				var hp_divMes_temp = [];
				var hp_divMes_temp01 = [];
				var names_divMes = [];
				var names_divMes_temp = [];
				var hp_divMes_temp = divMes.innerHTML.match(rname);
				if (hp_divMes_temp && hp_divMes_temp.length > 1) {
					var rname = /\[(\?\?|\d+)\/(\?\?|\d+)\]/i;
					for (var d = 0; d < hp_divMes_temp.length; d++) {
						var tempStr = hp_divMes_temp[d];
						hp_divMes_temp[d] = -1;
						hp_divMes_temp01[d] = -1;
						var res_temp = [];
						var res_temp = rname.exec(tempStr);
						if (res_temp && res_temp.length > 1) {
							if (res_temp[1] != "??") {
								hp_divMes_temp[d] = parseInt(res_temp[1], 10);
								hp_divMes_temp01[d] = parseInt(res_temp[2], 10);
							}
						}
					}
					for (var d = 0; d < boicov; d++) {
						if (divMes.getElementsByTagName("span")[d].className == classname) { 
							names_divMes_temp[names_divMes_temp.length] = divMes.getElementsByTagName("span")[d].textContent;
							hp_divMes[hp_divMes.length] = hp_divMes_temp[d];
							hp_divMes01[hp_divMes01.length] = hp_divMes_temp01[d];
						}
					}
					var names_divMes = names_divMes_temp;
					if ((PluginAttackOld.options.max_hp == 1) && (names_divMes.length > 1)) { 
						var hp_divMes_temp = [];
						var hp_divMes_temp01 = [];
						var names_divMes_temp = [];
						var numer_hp_temp = [];
						var hp_divMes_temp = hp_divMes;
						var hp_divMes_temp01 = hp_divMes01;
						var names_divMes_temp = names_divMes;
						var hp_divMes = [];
						var hp_divMes01 = [];
						var names_divMes = [];
						for (var d = 0; d < hp_divMes_temp.length; d++) {
							if (numer_hp_temp.indexOf(d) == -1) { 
								var temp_temp = hp_divMes_temp[d]; 
								var temp_temp01 = -1; 
								for (var d01 = 0; d01 < hp_divMes_temp.length; d01++) {
									if (numer_hp_temp.indexOf(d01) == -1) { 
										if (temp_temp < hp_divMes_temp[d01]) { 
											var temp_temp01 = d01;
											var temp_temp = hp_divMes_temp[d01];
										}
									}
								}
								if (temp_temp01 < 0) {
									var temp_temp01 = d;
								}
								numer_hp_temp[numer_hp_temp.length] = temp_temp01;
								hp_divMes[hp_divMes.length] = hp_divMes_temp[temp_temp01];
								hp_divMes01[hp_divMes01.length] = hp_divMes_temp01[temp_temp01];
								names_divMes[names_divMes.length] = names_divMes_temp[temp_temp01];
								if (numer_hp_temp.length < hp_divMes_temp.length) {
									var d = -1;
								}
							}
						}
					}
				}
				for (var d = 0; d < names_divMes.length; d++) {
					var names = names_divMes[d];
					var rname = /\(kлoн/i;
					var even_odd = 0;
					var TempBool01 = rname.test(names);
					if (TempBool01) {
						var rname = /\(kлoн\s*(\d+)\)/i; 
						var res_temp = [];
						var res_temp = rname.exec(names);
						if (res_temp && res_temp.length > 1) {
							var even_odd = parseInt(res_temp[1], 10);
							if (even_odd % 2 === 0) {
								var even_odd = 2; 
							} else {
								var even_odd = 1;
							}
						}
					}
					var ares_fobos = 0;
					if (hp_divMes01[d] >= 2000) { 
						var ares_fobos = 1; 
					}
					var hp_min_temp = parseInt(PluginAttackOld.options.hp_min, 10);
					var hp_max_temp = parseInt(PluginAttackOld.options.hp_max, 10);
					var flag_hp_max_min = -1;
					if (PluginAttackOld.options.hp_min_max_old > 0) {
						if (ares_fobos > 0) { 
							var flag_hp_max_min = 1;
						} else {
							if ((hp_min_temp < 1) && (hp_max_temp < 1)) {
								var flag_hp_max_min = 1;
							} else {
								if ((hp_min_temp > 0) && (hp_max_temp > 0)) {
									if ((hp_divMes[d] > hp_min_temp) && (hp_divMes[d] < hp_max_temp)) {
										var flag_hp_max_min = 1;
									}
								} else {
									if (hp_min_temp > 0) {
										if (hp_divMes[d] > hp_min_temp) {
											var flag_hp_max_min = 1;
										}
									} else {
										if (hp_divMes[d] < hp_max_temp) {
											var flag_hp_max_min = 1;
										}
									}
								}
							}
						}
					} else {
						var flag_hp_max_min = 1;
					}
					if ((even_odd < 1) || 
						(ares_fobos > 0) ||
						((even_odd == 2) && (PluginAttackOld.options.even_old == 1)) || 
						((even_odd == 1) && (PluginAttackOld.options.odd_old == 1))) {
						if (flag_hp_max_min > 0) { 
							var rname = /<i>/i; 
							var TempBool01 = rname.test(names);
							if (!TempBool01) {
								if (hp_divMes[d] != -1) {
									names_temp = names;
									var rname = /\(.*?\)/i; 
									var TempBool01 = rname.test(names_temp);
									if (TempBool01) {
										var rname = /\(kлoн/i; 
										var TempBool01 = rname.test(names_temp);
										if (TempBool01) {
											var res_temp = [];
											var tempStr = names_temp;
											var rname = /(.*?)\s*\(.*?\)/i; 
											var res_temp = rname.exec(tempStr);
											if (res_temp && res_temp.length > 1) {
												var names_temp = res_temp[1];
											}
										}
									}
									if (ares_fobos < 1) {
										if (bots.indexOf(names_temp) != -1) { 
											nashli = 1;
										}
									} else {
										if ((PluginAttackOld.options.ares_11 != 0) && (hp_divMes01[d] == 2000)) {
											nashli = 1;
										} else {
											if ((PluginAttackOld.options.ares_12 != 0) && (hp_divMes01[d] == 2500)) {
												nashli = 1;
											} else {
												if ((PluginAttackOld.options.ares_14 != 0) && (hp_divMes01[d] == 4000)) {
													nashli = 1;
												} else {
													if ((PluginAttackOld.options.fobos_11 != 0) && (names_temp == "Фобоc")) {
														nashli = 1;
													} else {
														if ((PluginAttackOld.options.fobos_12 != 0) && (names_temp == "Фобос")) {
															nashli = 1;
														} 
													}
												}
											}
										}
									}
									if (nashli > 0) {
										ChangeTo(names);
										return 'go';
									}
								}
							}
						}
					}
				}
				if (nashli < 1) {
                	return 'stop';
            	}
			}
		}
	}
	return 'wait';
}
function RefreshBWin_old() {
    PluginFrameOld.$('form', document.body).submit();
}
function SubmitAttack_old() {
    var f = PluginFrameOld.$('form', document.body);
    check(f[0]);
}
function RefreshBWin2_old() {
    PluginAttackOld.RefreshCounter_old++;
    RefreshBWin_old();   
}
var AttackInstalled_old=false;
var timeout_handle_old=null;
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
       	var f = PluginFrameOld.$('form', document.body);
        if (f.length > 0) {   
			if (document.body.innerHTML.indexOf('>Ожидаем хода противника...<') != -1) {
				f[0].submit();
			} else {
            	check(f[0]);
			}
        }
	} else {
		if (key == 17) { 
			if (PluginAttackOld.started_old) {
				PluginAttackOld.End_old(false);
			} else {
				PluginAttackOld.Begin_old();
			}
			if (e.preventDefault) {
				e.preventDefault();
			} else {
				return false;
			}
		}
	}
}
function Attack_old() {
	if (document.body.innerHTML.indexOf('Данные не получены')!=-1 || document.body.innerHTML.indexOf('<center>nginx</center>')!=-1 || document.body.innerHTML.indexOf('Веб-страница недоступна')!=-1 )
		timeout_handle_old = setTimeout(function(){window.location.href='fbattle.php?batl='}, 5000);
		
    if (PluginAttackOld != null) {
        var NewBattleID = parseInt(PluginFrameOld.$("input[name=batl]",document.body).val(),10);
        if (NewBattleID == NaN)
            return;
		if (NewBattleID != NewBattleID) { 
			return;
		}
		if (isNaN(NewBattleID)) { 
			return;
		}	
        if (NewBattleID != PluginAttackOld.BattleID_old) {
            PluginAttackOld.End_old(true);
            PluginAttackOld.BattleID_old = NewBattleID;
            if (PluginAttackOld.AutoBegin_old) {
                PluginAttackOld.Begin_old();
                return;
            }               
        }
        if (PluginAttackOld.enabled) {
	        if (!AttackInstalled_old) {
	            AttackInstalled_old = true;
            	SetAttack_old();
            	SetDefense_old();
            	PluginFrameOld.Bind('keypress', window.document, KeyPressed);                      
	        }
            if (PluginAttackOld.started_old) {
                if (document.body.innerHTML.indexOf('>Бой закончен! Всего вами нанесено урона') != -1) {
                    PluginAttackOld.End_old(true);
                    var f = PluginFrameOld.$('form', document.body);
                    f.append("<input type='hidden' value='Вернуться' name='end'/>");
                    f.submit();
                    return true;
                } else {
					if (document.body.innerHTML.indexOf('>Ожидаем, пока бой закончат другие игроки...') != -1) {
                    	PluginAttackOld.End_old(true);
                    	return true;
                	} else {
						if (document.body.innerHTML.indexOf('>Ожидаем хода противника...<') != -1) {
                    		if (PluginAttackOld.RefreshCounter_old != 0) {
                        		clearTimeout(timeout_handle_old);
                        		timeout_handle_old = setTimeout(RefreshBWin2_old, PluginAttackOld.RefreshCounter_old * 1000); 
                    		} else {
                        		PluginAttackOld.RefreshCounter_old++;
                       			RefreshBWin_old();
                    		}
                		} else {   
                    		if (PluginAttackOld.WaitTimeOut_old(PluginFrameOld.$("span.date, span.date2", document.body).first().text())) {
                        		clearTimeout(timeout_handle_old);
                        		timeout_handle_old = setTimeout(function(){window.location.href='fbattle.php?batl='}, 5000);
                        		return true;
                    		} else {
                        		clearTimeout(timeout_handle_old);
                    		}
                    		PluginAttackOld.RefreshCounter_old = 0;
							var HP = 0;
    	                	var rhp = /:? (\d+?)\/(\d+)/mi;
        	            	var res = PluginFrameOld.$('body', document).html().match(rhp);
            	        	if ((res) && (res.length > 0))
                	        	var HP = parseInt(res[1], 10);
							Auto_Heal(HP);
							if ((HP != 0) && (PluginAttackOld.options.life_old != 0)) {
                        		if (HP <= PluginAttackOld.options.life_old) {
                            		PluginAttackOld.End_old(false);
                            		alert('Уровень жизни достиг ограничения. Серия ударов прервана');
                            		return true;
                        		}
                    		}
							if (PluginAttackOld.options.auto_wisd != 0) {
								var result = Ocenivaem();
								if (result == 'stop') {
									PluginAttackOld.End_old(false);
									alert('Подходящие боты кончились, автоудар отключается');
                            		return true;
								}
							}
                       		var f = PluginFrameOld.$('form', document.body);
                       		if (f.length > 0) {   
                           		PluginAttackOld.RefreshCounter_old = 0;
                           		clearTimeout(timeout_handle_old);
		    					if (PluginAttackOld.TimeOut_old != 999) {						
									timeout_handle_old = setTimeout(SubmitAttack_old, 310);
								} else {
									timeout_handle_old = setTimeout(SubmitAttack_old, 200);
								}
                       		}
		    				return true;
						}
                	}
				}
            } else {
				if (PluginAttackOld.options.auto_heal_hand != 0)
					Auto_Heal(-1);
			}
	    	return false;
        }
    }
}
function Auto_Heal(HP01) {
	if (HP01 < 0) {
		var HP01 = 0;
		var rhp = /:? (\d+?)\/(\d+)/mi;
		var res = PluginFrameOld.$('body', document).html().match(rhp);
		if ((res) && (res.length > 0))
			var HP01 = parseInt(res[1], 10);
		if (PluginAttackOld.auto_heal_temp == 0)
			PluginAttackOld.auto_heal_temp = PluginAttackOld.options.auto_heal;
	}
	if ((HP01 != 0) && (PluginAttackOld.options.auto_heal != 0) && (HP01 < PluginAttackOld.options.auto_heal) && (PluginAttackOld.auto_heal_temp > 0)){	
		var heal_golova = [];
		var heal_vstr = [];
		if (document.body.innerHTML.indexOf('Восстановление энергии') != -1){
			var heal_temp001 = document.getElementsByTagName('CENTER')[2];
			var heal_temp002 = heal_temp001.getElementsByTagName('a');
			for (var i = 0, l = heal_temp002.length; i < l; i++) {
				var heal_temp001 = heal_temp002[i].innerHTML;
				var rhp = /энергии\s*(\d+)HP/i;
				var TempBool01 = rhp.test(heal_temp001);
				if (TempBool01) {
					if (PluginAttackOld.options.auto_wisd != 0) {
						var res = rhp.exec(heal_temp001);
						if ((res) && (res.length > 1)) {
							var heal_temp003 = parseInt(res[1], 10);
							if (heal_temp003 <= 180) {
								heal_golova[heal_golova.length] = heal_temp002[i];
								break;
							}
						}
					} else {
						heal_golova[heal_golova.length] = heal_temp002[i];
						break;
					}
				}
			}
		}
		if ((document.body.innerHTML.indexOf('Встроена магия: исцеление') != -1) && (PluginAttackOld.options.auto_heal_vstr != 0)){
			var heal_temp001 = document.getElementsByTagName('td')[1];
			var heal_temp002 = heal_temp001.getElementsByTagName('a');
			for (var i = 0, l = heal_temp002.length; i < l; i++) {
				var heal_temp001 = heal_temp002[i].outerHTML;
				if (heal_temp001.indexOf('Встроена магия: исцеление') != -1) {
					heal_vstr[heal_vstr.length] = heal_temp002[i];
					break;
				}
			}
		}
		if ((heal_golova.length > 0) || (heal_vstr.length > 0)) {
			if ((PluginAttackOld.options.auto_heal_vstr != 0) && (PluginAttackOld.options.auto_heal_vstr_one != 0)) {
				if (heal_vstr.length > 0) {
					var heal_heal = heal_vstr[0];
				} else {
					var heal_heal = heal_golova[0];
				}
			} else {
				if (heal_golova.length > 0) {
					var heal_heal = heal_golova[0];
				} else {
					var heal_heal = heal_vstr[0];
				}
			}
			if (heal_heal.onclick !== null){
				var heal_temp001 = heal_heal.onclick;
				if (heal_temp001 != undefined){
					var rhp = /php\?use=(\d+)/mi;
					var res = heal_temp001.toString().match(rhp);
					if ((res) && (res.length > 0)) {
						var enemyOld = document.getElementById('penemy').value;
						post_to_url('fbattle.php?', {'use':'' + res[1] + '', 'enemy':'' + enemyOld + '', 'defend':'' + Math.floor(Math.random() * 4 + 1) + ''}, 'get');
					}
				}
			}
		} else {
			if (PluginAttackOld.started_old)
				PluginAttackOld.auto_heal_temp = 0;
			else
				PluginAttackOld.auto_heal_temp = -1;
		}
	}
}
Attack_old();
// © -GrandMaster- - http://capitalcity.oldbk.com/inf.php?329863