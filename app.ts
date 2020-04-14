var atlas_pad: AT.Engine;

window.onload = () => {
    document.title = "atlas";
    atlas_pad = new AT.Engine();
    atlas_pad.start();
}

window.onresize = function () {
    atlas_pad.resize();
}