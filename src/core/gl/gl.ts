

var Gl = {
    init : (canvasID?: string):WebGLRenderingContext => {
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
    
        let gl = canvas.getContext("webgl");
        if (gl === undefined || gl === null) {
            throw new Error("Unable to initialize WebGL!");
        }

        return gl;
    },
}
    
export default Gl