namespace AT {
    export var gl: WebGLRenderingContext;
    export class GlUtil {
        /**
         * init
         */
        public static init(canvasID?: string): HTMLCanvasElement {
            let canvas: HTMLCanvasElement;

            if (canvasID !== undefined) {
                canvas = document.getElementById(canvasID) as HTMLCanvasElement
                if (canvas === undefined) {
                    throw new Error("Cannot find a canvas element named:" + canvasID);
                }
            } else {
                canvas = document.createElement("canvas") as HTMLCanvasElement;
                document.body.appendChild(canvas);
            }

            let _gl = canvas.getContext("webgl");
            if (_gl === undefined || _gl === null) {
                throw new Error("Unable to initialize WebGL!");
            } else {
                gl = _gl;
            }
            
            return canvas;
        }
    }
}