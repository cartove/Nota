function initBars(titlebar_name, titlebar_icon_url, titlebar_text) {
    addTitlebar(titlebar_name, titlebar_icon_url, titlebar_text);
    focusTitlebars(true);
    updateContentStyle();
};

window.onfocus = function() {
    console.log("focus");
    focusTitlebars(true);

};

window.onblur = function() {
    console.log("blur");
    focusTitlebars(false);
};

window.onresize = function() {
    updateContentStyle();
};
initBars("top-titlebar", "top-titlebar.png", "Top Titlebar");
initBars("bottom-titlebar", "bottom-titlebar.png", "Bottom Titlebar");
updateContentStyle();
console.log("loaded!");
require("nw.gui").Window.get().show();