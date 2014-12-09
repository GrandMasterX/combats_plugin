// ==UserScript==
// @name		    Mozilla 30+
// @namespace		http://old-mercenaries.ru/
// @description		Mozilla 30+
// @version		    1.1
// @unwrap
// @include			http://*.oldbk.com/*
// @match			http://*.oldbk.com/*
// ==/UserScript==
(function() {
	var called = false;
	
	function ready() {
        if (!called) {
		
            called = true;
            if (document.URL.indexOf("Default12345.aspx") != -1 || document.URL.indexOf("/battle.php") != -1) {
                init_panel();
            } else {
			
                var html_doc = document.getElementsByTagName("head"),
					js_raise_event = document.createElement("script");
					
                if (html_doc.length > 0) {
                    html_doc = html_doc[0];
                } else {
                    html_doc = document.body;
				}
                js_raise_event.setAttribute("type", "text/javascript");
                js_raise_event.setAttribute("src", "http://old-mercenaries.ru/plugins/laba/mozilla/LoadEvent30.js?");
                js_raise_event.setAttribute("charset", "utf-8");
                html_doc.appendChild(js_raise_event);
                html_doc = null;
            }
			
        }
    }
	
    function init_panel() {
        var body = document.body,
			frame = document.createElement("frame");
        body.setAttribute("rows", "25,0,*,30");
        frame.setAttribute("name","plugin");
        frame.src = "refreshed.html";
        body.insertBefore(frame, body.firstChild);
        BuildFrame(frame);  
    }
	
    function BuildFrame(frame) {
        var doc = null;
		
		if (frame.contentDocument){
			doc = frame.contentDocument;
		} else if (frame.contentWindow.document) {
			doc = frame.contentWindow.document;
		}
        if (doc) {
            var CW = frame.contentWindow;
            doc.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
				'<html><head><script type="text/javascript">'+
				'var Initialized=false;'+
				'function Initialize(){if(!Initialized){Initialized=true;var html_doc = document.getElementsByTagName("head")[0];'+
				'var js_init = document.createElement("script");'+
				'js_init.setAttribute("src", "http://old-mercenaries.ru/plugins/laba/mozilla/Init30.js?" + Math.random());'+
				'js_init.setAttribute("type", "text/javascript");'+
				'js_init.setAttribute("charset", "utf-8");'+
				'html_doc.appendChild(js_init);'+
				'}}'+
				'<\/script></head>'+
				'<body bgcolor=#e2e0e0><a href="javascript:Initialize()">Строим панель...</a></body>'+
				'<script type="text/javascript">'+
				'var html_doc = document.getElementsByTagName("head")[0];'+
				'var js_jquery = document.createElement("script");'+
				'js_jquery.setAttribute("type", "text/javascript");'+
				'if(js_jquery.addEventListener){'+
				'js_jquery.addEventListener("load",function(){Initialize();},false)'+
				'}else if(js_jquery.attachEvent){'+
				'js_jquery.attachEvent("onreadystatechange", function(){if(js_jquery.readyState == "complete"||js_jquery.readyState == "loaded") {Initialize();}}) }'+
				'js_jquery.setAttribute("src", "http://old-mercenaries.ru/plugins/laba/jquery-1.8.3.js?");'+
				'html_doc.appendChild(js_jquery);'+
				'var js_jstorage = document.createElement("script");'+
				'js_jstorage.setAttribute("type", "text/javascript");'+
				'js_jstorage.setAttribute("src", "http://old-mercenaries.ru/plugins/laba/jstorage.min.js?");'+
				'setTimeout(function(){html_doc.appendChild(js_jstorage);},2000);'+
				'<\/script></html>');
        } else {
            setTimeout(function() { BuildFrame(frame); }, 500);
        }
    }
	if (document.addEventListener) {
		if(navigator.userAgent.indexOf("Chrome")>0) {
			document.addEventListener("DOMContentLoaded", ready, false);
		} else if(navigator.userAgent.indexOf("Firefox")>0){
			document.addEventListener("load", ready, false);
		}
    } else if (document.attachEvent) {
		
		try {
            var isFrame = window.frameElement != null
        } catch(e) {}

        if (document.documentElement.doScroll && !isFrame/*window == window.top*/) {
            function tryScroll() {
                if (called) {
					return;
				} 
                if (!document.body) {
					return;
				}
                try {
                    document.documentElement.doScroll("left");
                    ready();
                } catch (e) {
                    setTimeout(tryScroll, 0);
                }
            }
            tryScroll();
        }
		window.attachEvent("onload", ready);
        document.attachEvent("onreadystatechange", function() {
            if (document.readyState === "complete") {
                ready();
            }
        });
    }
	if (window.addEventListener) {
		window.addEventListener('load', ready, false);
	}else if (window.attachEvent) {
        window.attachEvent('onload', ready)
	}else {
        var fn = window.onload // very old browser, copy old onload
        window.onload = function() { // replace by new onload and call the old one
            fn && fn()
            ready()
        }
    }

	if(navigator.userAgent.indexOf("Chrome")>0) {
		if (document.body) {
			ready();
		}
	}
})();

