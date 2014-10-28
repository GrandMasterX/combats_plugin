var PluginFrame = null;
if (typeof(top.frames['plugin']) == 'undefined') {
    if (typeof(top.frames[0]) != 'undefined') {
        if (typeof(top.frames[0].window.PM) != 'undefined') {
            PluginFrame = top.frames[0].window;
        }
    }
}
else {
    PluginFrame = top.frames['plugin'].window;
}

var PluginZagorod = null;
if (PluginFrame != null) {
    PluginFrame.$(PluginFrame.PM.plugins).each(function() {
        if (this.id == "Zagorod") {
            PluginZagorod = this;
        }
    });
}

function GetQuestMenu() {
	var string = "<b>Список выполненных:</b><br>";
	var QuestTable = document.body.children[0].children[3].children[0].children[0].children[0].children[0];
	var QuestList = QuestTable.children[0].children[0].children[0].children[0].children[2];
	var q = -3;
	var Quests = {};
	for (var i = 0; i < QuestList.childNodes.length; i++) {
		var tempstr01 = QuestList.childNodes[i].textContent;
		if (QuestList.childNodes[i].textContent == 'Список выполненных:') {
			q = i + 1;
		}
		if (i == q + 2) {
			Quests[QuestList.childNodes[i].textContent.replace(/\d+\. /g, '')] = true;
			q = i;
		}
	}
	var q = 0;
	for (var Quest in PluginZagorod.QuestList) {
		if (Quests[Quest]) {
			q++;
			if (q >= 10) {
				var stringQ = q.toString(10);
			} else {
				var stringQ = "0" + q.toString(10);
			}
			string += stringQ + ". ";
			if (PluginZagorod.QuestRes[PluginZagorod.QuestList[Quest]][0] > 0) {
				string += "<img title='Можно выполнить не сходя с лошади' src='http://i.oldbk.com/i/map/horse_chat.gif' alt=''>";
			}
			if (PluginZagorod.QuestRes[PluginZagorod.QuestList[Quest]][1] > 0) {
				switch (PluginZagorod.QuestRes[PluginZagorod.QuestList[Quest]][1]) {
					case 1:
						string += "<img title='Требуется убивать противников' src='http://old-mercenaries.ru/plugins/laba/mob.gif' alt=''>&nbsp;";
						break
					case 2:
						string += "<img title='Требуется собирать ресурсы на местности' src='http://old-mercenaries.ru/plugins/laba/res.gif' alt=''>&nbsp;";
						break
					case 3:
						string += "<img title='Требуется убивать противников' src='http://old-mercenaries.ru/plugins/laba/mob.gif' alt=''>";
						string += "<img title='Требуется собирать ресурсы на местности' src='http://old-mercenaries.ru/plugins/laba/res.gif' alt=''>&nbsp;";
						break
				}
			} else {
				if (PluginZagorod.QuestRes[PluginZagorod.QuestList[Quest]][0] > 0) {
					string += "&nbsp;";
				}
			}
			string += "<a style='cursor:pointer;' title='" + PluginZagorod.QuestNPCTime[Quest] + "' onclick='ShowQuest(\"" + PluginZagorod.QuestList[Quest] + "\");'>" + Quest + "</a><br>"
		}
	}
	
	string += "</td><td width=40%><b>Список доступных:</b><br>";
	var q = 0;
	for (var Quest in PluginZagorod.QuestList) {
		if ((!Quests[Quest]) && (Quest != NameItsQuest)) {
			q++;
			if (q >= 10) {
				var stringQ = q.toString(10);
			} else {
				var stringQ = "0" + q.toString(10);
			}
			string += stringQ + ". ";
			if (PluginZagorod.QuestRes[PluginZagorod.QuestList[Quest]][0] > 0) {
				string += "<img title='Можно выполнить не сходя с лошади' src='http://i.oldbk.com/i/map/horse_chat.gif' alt=''>";
			}
			if (PluginZagorod.QuestRes[PluginZagorod.QuestList[Quest]][1] > 0) {
				switch (PluginZagorod.QuestRes[PluginZagorod.QuestList[Quest]][1]) {
					case 1:
						string += "<img title='Требуется убивать противников' src='http://old-mercenaries.ru/plugins/laba/mob.gif' alt=''>&nbsp;";
						break
					case 2:
						string += "<img title='Требуется собирать ресурсы на местности' src='http://old-mercenaries.ru/plugins/laba/res.gif' alt=''>&nbsp;";
						break
					case 3:
						string += "<img title='Требуется убивать противников' src='http://old-mercenaries.ru/plugins/laba/mob.gif' alt=''>";
						string += "<img title='Требуется собирать ресурсы на местности' src='http://old-mercenaries.ru/plugins/laba/res.gif' alt=''>&nbsp;";
						break
				}
			} else {
				if (PluginZagorod.QuestRes[PluginZagorod.QuestList[Quest]][0] > 0) {
					string += "&nbsp;";
				}
			}
			string += "<a style='cursor:pointer;' title='" + PluginZagorod.QuestNPCTime[Quest] + "' onclick='ShowQuest(\"" + PluginZagorod.QuestList[Quest] + "\");'>" + Quest + "</a><br>"
		}
	}
	string += "</td><td><b>Список мест:</b><br>";
	string += "<a style='cursor:pointer;' onclick='MoveToXY([{\"x\":870,\"y\":50}])'>Avalon City</a><br>";
	string += "<a style='cursor:pointer;' onclick='MoveToXY([{\"x\":50,\"y\":350}])'>Capital City</a><br>";
	string += "<a style='cursor:pointer;' title='Магическая сила,\nМагическое зеркало,\nПраздничные приготовления,\nЦветные сердца.' onclick='MoveToXY([{\"x\":855,\"y\":245}])'>Башня мага</a><br>";
	string += "<a style='cursor:pointer;' title='Бабушкин пирог,\nДиковинные чётки,\nЛюдоед,\nСейф для трактирщика,\nСемейный секрет,\nУкраденная икона.' onclick='MoveToXY([{\"x\":655,\"y\":335}])'>Деревня</a><br>";
	string += "<a style='cursor:pointer;' title='Дикий зверь,\nШляпа для лесоруба.' onclick='MoveToXY([{\"x\":795,\"y\":345}])'>Дом лесоруба</a><br>";
	string += "<a style='cursor:pointer;' title='Героический квест.' onclick='MoveToXY([{\"x\":355,\"y\":185}])'>Замок одинокого рыцаря</a><br>";
	string += "<a style='cursor:pointer;' title='Больная лошадь,\nПомощь по конюшне.' onclick='MoveToXY([{\"x\":105,\"y\":165},{\"x\":225,\"y\":135},{\"x\":305,\"y\":335},{\"x\":465,\"y\":125},{\"x\":675,\"y\":75},{\"x\":785,\"y\":215}])'>Конюшня</a><br>";
	string += "<a style='cursor:pointer;' title='Орёл.' onclick='MoveToXY([{\"x\":155,\"y\":195}])'>Орлиное гнездо</a><br>";
	string += "<a style='cursor:pointer;' title='Лечебное снадобье,\nНовые стрелы,\nОборотень.' onclick='MoveToXY([{\"x\":345,\"y\":45}])'>Охотничий бивак</a><br>";
	string += "<a style='cursor:pointer;' title='Гнилая вода,\nПрохудившаяся лодка.' onclick='MoveToXY([{\"x\":415,\"y\":245},{\"x\":435,\"y\":225}])'>Переправа</a><br>";
	string += "<a style='cursor:pointer;' title='Дракон.' onclick='MoveToXY([{\"x\":585,\"y\":25}])'>Пещера дракона</a><br>";
	string += "<a style='cursor:pointer;' title='Почтовый дилижанс,\nПропавшая грамота,\nСумка почтальона.' onclick='MoveToXY([{\"x\":655,\"y\":275}])'>Почтовая станция</a><br>";
	string += "<a style='cursor:pointer;' title='Подготовка к зимовке,\nРазбойничья переправа.' onclick='MoveToXY([{\"x\":525,\"y\":135}])'>Разбойничье логово</a><br>";
	string += "<a style='cursor:pointer;' title='Крыса,\nРудокоп.' onclick='MoveToXY([{\"x\":35,\"y\":35}])'>Рудник</a><br>";
	string += "<a style='cursor:pointer;' title='Скупает монеты.' onclick='MoveToXY([{\"x\":645,\"y\":165}])'>Скупщик краденого</a><br>";
	string += "<a style='cursor:pointer;' title='Потерявшийся ребенок,\nЧемпион.' onclick='MoveToXY([{\"x\":105,\"y\":255},{\"x\":835,\"y\":135}])'>Сторожевой пост</a><br>";
	string += "<a style='cursor:pointer;' title='Приворотное зелье.' onclick='MoveToXY([{\"x\":575,\"y\":375}])'>Хижина ведьмы</a><br>";
	string += "<a style='cursor:pointer;' title='Загадочный клинок,\nСоздание амулета,\nСтранная находка.' onclick='MoveToXY([{\"x\":265,\"y\":305}])'>Хижина пилигрима</a><br>";
	string += "</td>";
	return string;
}

if (PluginZagorod.QuestList != null) {
	if (document.body.children[0].children[1].style.display == "block") {
		var d3div01 = document.getElementById('d1').querySelectorAll('img');
		var d3div01length = d3div01.length;
		for (var i = 0; i < d3div01length; i++) {
			if (d3div01[i].src == "http://i.oldbk.com/i/map/empty_gif.gif") {
				switch (d3div01[i].alt) {
					case "Рудник":
						d3div01[i].title = '«Рудник»:\nКрыса,\nРудокоп.';				
						break
					case "Конюшня":
						d3div01[i].title = '«Конюшня»:\nКонюх.\nКвесты:\nБольная лошадь,\nПомощь по конюшне.';				
						break
					case "Сторожевой пост":
						d3div01[i].title = '«Сторожевой пост»:\nОхранник.\nКвесты:\nПотерявшийся ребенок,\nЧемпион.';				
						break
					case "Орлиное гнездо":
						d3div01[i].title = '«Орлиное гнездо»:\nОрёл.';				
						break
					case "Замок одинокого рыцаря":
						d3div01[i].title = '«Замок одинокого рыцаря»:\nРыцарь.\nГероический квест.';				
						break
					case "Переправа":
						d3div01[i].title = '«Переправа»:\nЛодочник.\nКвесты:\nГнилая вода,\nПрохудившаяся лодка.';				
						break
					case "Хижина пилигрима":
						d3div01[i].title = '«Хижина пилигрима»:\nПилигрим.\nКвесты:\nЗагадочный клинок,\nСоздание амулета,\nСтранная находка.';				
						break
					case "Хижина ведьмы":
						d3div01[i].title = '«Хижина ведьмы»:\nВедьма.\nКвест:\nПриворотное зелье.';				
						break
					case "Деревня":
						d3div01[i].title = '«Деревня»:\nТрактирщик,\nСвященник,\nКузнец.\nКвесты:\nБабушкин пирог,\nДиковинные чётки,\nЛюдоед,\nСейф для трактирщика,\nСемейный секрет,\nУкраденная икона.';				
						break
					case "Почтовая станция":
						d3div01[i].title = '«Почтовая станция»:\nПочтальон.\nКвесты:\nПочтовый дилижанс,\nПропавшая грамота,\nСумка почтальона.';				
						break
					case "Дом лесоруба":
						d3div01[i].title = '«Дом лесоруба»:\nЛесоруб.\nКвесты:\nДикий зверь,\nШляпа для лесоруба.';				
						break
					case "Башня мага":
						d3div01[i].title = '«Башня мага»:\nМаг.\nКвесты:\nМагическая сила,\nМагическое зеркало,\nПраздничные приготовления,\nЦветные сердца.';				
						break
					case "Скупщик краденого":
						d3div01[i].title = '«Скупщик краденого»:\nСкупщик.\nСкупает монеты.';				
						break
					case "Пещера дракона":
						d3div01[i].title = '«Пещера дракона»:\nДракон.';				
						break
					case "Разбойничье логово":
						d3div01[i].title = '«Разбойничье логово»:\nРазбойник.\nКвесты:\nПодготовка к зимовке,\nРазбойничья переправа.';				
						break
					case "Охотничий бивак":
						d3div01[i].title = '«Охотничий бивак»:\nОхотник.\nКвесты:\nЛечебное снадобье,\nНовые стрелы,\nОборотень.';				
						break
				}
			}
		}
	}
	if (document.body.children[0].children[3].style.display == "block") {
		var d3div = document.getElementById('d3').querySelectorAll('div')[0];
		var NameItsQuest = "";
		if (d3div.innerHTML.search('<b>Задание:</b>') != -1) {
			var d30001 = d3div.innerHTML.substr(d3div.innerHTML.indexOf('<b>Задание:</b>'));
			var d30002 = d30001.substr(0, d30001.indexOf('Выполнено заданий:'));
			var d30001 = d3div.innerHTML.substr(0, d3div.innerHTML.indexOf('<br><br><b>Список выполненных:</b>'));
			var d30004 = d3div.innerHTML.substr(d3div.innerHTML.indexOf('<br><br><b>Список выполненных:</b>'));
			var FlagItsQuest = false;
			for (var i = 0; i < PluginZagorod.ItsQuest.length; i++) {
				if ((PluginZagorod.ItsQuest[i][1] != "none") && (d30002.search(PluginZagorod.ItsQuest[i][1]) != -1)) {
					var FlagItsQuest = true;
					var tempI = i;
					break;
				}
			}
			if (!FlagItsQuest) {
				top:
				for (var i = 0; i < PluginZagorod.ItsQuest.length; i++) {
					if (PluginZagorod.ItsQuest[i].length > 2) {
						for (var i1 = 2; i1 < PluginZagorod.ItsQuest[i].length; i1++) {
							if (d30002.search(PluginZagorod.ItsQuest[i][i1]) != -1) {
								var FlagItsQuest = true;
								var tempI = i;
								break top;
							}
						}
					}
				}
			}
			
			if (FlagItsQuest) { 
				var string01 = d30001 + "<br><br><b>Текущее задание: </b>";
				if (PluginZagorod.QuestRes[tempI][0] > 0) {
					string01 += "<img title='Можно выполнить не сходя с лошади' src='http://i.oldbk.com/i/map/horse_chat.gif' alt=''>";
				}
				if (PluginZagorod.QuestRes[tempI][1] > 0) {
					switch (PluginZagorod.QuestRes[tempI][1]) {
						case 1:
							string01 += "<img title='Требуется убивать противников' src='http://old-mercenaries.ru/plugins/laba/mob.gif' alt=''>&nbsp;";
							break
						case 2:
							string01 += "<img title='Требуется собирать ресурсы на местности' src='http://old-mercenaries.ru/plugins/laba/res.gif' alt=''>&nbsp;";
							break
						case 3:
							string01 += "<img title='Требуется убивать противников' src='http://old-mercenaries.ru/plugins/laba/mob.gif' alt=''>";
							string01 += "<img title='Требуется собирать ресурсы на местности' src='http://old-mercenaries.ru/plugins/laba/res.gif' alt=''>&nbsp;";
							break
					}
				} else {
					if (PluginZagorod.QuestRes[tempI][0] > 0) {
						string01 += "&nbsp;";
					}
				}
				string01 += "<a style='cursor:pointer;' title='" + PluginZagorod.QuestNPCTime[PluginZagorod.ItsQuest[tempI][0]] + "' onclick='ShowQuest(\"" + tempI + "\");'>" + PluginZagorod.ItsQuest[tempI][0] + "</a>" + d30004;
				var NameItsQuest = PluginZagorod.ItsQuest[tempI][0];
				d3div.innerHTML = string01;
			}
		}
		//var d3body = d3div.innerHTML.substr(d3div.innerHTML.indexOf('<b>Список выполненных:</b>'));
		var d3new = d3div.innerHTML.substr(0, d3div.innerHTML.indexOf('<b>Список выполненных:</b>'));
		
		d3new += "<table width=100% cellpadding=0 cellspacing=0 style='font-size:4px;'>";
		//d3new += "<tr valign='top'><td width=30%>" + d3body + "</td>" + GetQuestMenu() + "</tr>";
		d3new += "<tr valign='top'><td width=30%>" + GetQuestMenu() + "</tr>";
		d3new += "</table>";
		d3div.innerHTML = d3new;
		if (PluginZagorod.Quest == null) {
			textXY = parent.frames["rightmap"].document.head.innerHTML;
			xIndex = textXY.indexOf('curposx') + 10;
			yIndex = textXY.indexOf('curposy') + 10;
			PluginZagorod.ItsMe.x = 40 + Math.abs(textXY.substr(xIndex, textXY.indexOf(';', xIndex) - xIndex));
			PluginZagorod.ItsMe.y = 40 + Math.abs(textXY.substr(yIndex, textXY.indexOf(';', yIndex) - yIndex));
			parent.frames["rightmap"].location.reload();
		}
	}
}

if (PluginZagorod.LetsGo) {
	PluginZagorod.LetsGo = false;
	parent.frames["rightmap"].location.href = 'map.php?go=1';
}

function ShowQuest(q) {
	PluginZagorod.getQuestHTML(q);
	parent.frames["rightmap"].location.href = 'map.php?side=right&' + Math.random();
}

function MoveToXY(objXY) {
	var bestXY = {'x':0, 'y':0};
	var bestDeltaXY = 10000;
	for (var i = 0; i < objXY.length; i++) {
		var DeltaXY = Math.abs(objXY[i].x - PluginZagorod.ItsMe.x) + Math.abs(objXY[i].y - PluginZagorod.ItsMe.y);
		if (DeltaXY < bestDeltaXY) {
			bestDeltaXY = DeltaXY;
			bestXY.x = objXY[i].x;
			bestXY.y = objXY[i].y;
		}
	}
	PluginZagorod.LetsGo = true;
	GTxy(bestXY.x, bestXY.y);
}
// © -GrandMaster- - http://capitalcity.oldbk.com/inf.php?329863