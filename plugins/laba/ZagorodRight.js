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

if (document.body.innerHTML.indexOf('giveqitem') >= 0) {
	var i1 = document.body.innerHTML.indexOf('giveqitem');
	var i2 = document.body.innerHTML.indexOf('"', i1);
	location.href = 'map.php?side=right&giveqitem=' + document.body.innerHTML.substr(i1 + 10, i2 - i1 - 10);
}

if (PluginZagorod.Quest == null) {
	PluginZagorod.Quest = document.createElement('div');
	PluginZagorod.Quest.id = 'quest';
	PluginZagorod.Quest.style.position = "absolute";
	PluginZagorod.Quest.style.background = "#d7d7d7";
}

var textXY = document.head.innerHTML;
xIndex = textXY.indexOf('curposx') + 10;
yIndex = textXY.indexOf('curposy') + 10;
PluginZagorod.ItsMe.x = 40 + Math.abs(textXY.substr(xIndex, textXY.indexOf(';', xIndex) - xIndex));
PluginZagorod.ItsMe.y = 40 + Math.abs(textXY.substr(yIndex, textXY.indexOf(';', yIndex) - yIndex));

PluginZagorod.Quest.innerHTML = PluginZagorod.QuestHTML;
document.body.appendChild(PluginZagorod.Quest);

function HideQuestInfo() {
	PluginZagorod.QuestHTML = "";
	document.getElementById('quest').innerHTML = "";
}