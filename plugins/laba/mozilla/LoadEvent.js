(function(){
    var timeout_h = null;
    function navigate_event(i) {
        if (i < 4) {
            if (top.frames['plugin'] === undefined) {
                if (top.frames[0] !== undefined) {
                    if (top.frames[0].window.PM !== undefined) {
                        clearTimeout(timeout_h);
                        top.frames[0].window.PM.FrameReLoad(window);
                    }
                    return;
                }
                timeout_h = setTimeout(function(){navigate_event(i + 1);}, 500);
            } else {
                if (top.frames['plugin'].window.PM === undefined) {
                    timeout_h = setTimeout(function(){navigate_event(i + 1);}, 500);
                } else {
                    if (top.frames['plugin'].window.PM.finished) {
                        timeout_h = top.frames['plugin'].window.PM.FrameReLoad(window);
                    } else {
                        timeout_h = setTimeout(function(){navigate_event(0);}, 1000);
                    }
                }
            }
        }
        clearTimeout(timeout_h);
    }
    navigate_event(0);})();