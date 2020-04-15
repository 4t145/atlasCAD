import { Drawer } from "./core/gl/drawer";

var atlas_pad: Drawer;

window.onload = () => {
    document.title = "atlas";
    atlas_pad = new Drawer()
    atlas_pad.start();
}
