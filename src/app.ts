import { Drawer } from "./core/gl/drawer";

var atlas_pad: Drawer;

window.onload = () => {
    console.log("hello!");
    document.title = "atlas";
    atlas_pad = new Drawer();
    atlas_pad.start();
}
