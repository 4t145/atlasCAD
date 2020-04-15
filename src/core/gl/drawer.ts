// import "fs";
// import { readFile } from "fs";
import { PCL, Line } from "../PCL/PCL";
import "./gl";
import Gl from "./gl";
import "./shader";
import Shader from "./shader";

const VS = `
attribute vec2 a_position;
uniform vec2 u_offset;
// uniform mat2 u_rot;
void main() {
    vec2 p = a_position + u_offset;
    gl_Position = vec4(p,0.0,1.0);
}
`;

const FS = `
void main() {
    gl_FragColor = vec4(0.0, 0.5, 1.0, 1.0);
}
`

export class Drawer {
    /**
     * Constructor
     */
    
    // 画布
    private _context: WebGLRenderingContext;
    // private _shader: Shader|undefined;
    // private _buffer: GLBuffer|undefined;
    private _PCL_buffer: Array<PCL>|undefined;
    private _shader: Shader;
    
    public constructor() {
        this._PCL_buffer = new Array<PCL>();
        this._context = Gl.init();
        let vert_src = VS;
        let frag_src = FS;
        // readFile("./shaders/default.vert", (err, data) => {
        //     if (err) {
        //         throw err;
        //     }
        //     vert_src = data.toString('utf8');
        // });
        // readFile("./shaders/default.frag", (err, data) => {
        //     if (err) {
        //         throw err
        //     }
        //     frag_src = data.toString('utf8');
        // });
        this._shader = new Shader("base", vert_src, frag_src, this._context);
    }

    public push(command:PCL) {
        this._PCL_buffer?.push(command);
    }
    public start(): void {
        this.push(new Line(0,0,1,1));
        this._context.clearColor(1, 0.3, 0.3, 1);
        // this._shade
        // this._geo_buffer.push(
        //     new Geo.Rectangle(
        //         "cube-a",
        //         0.5,
        //         0.5, [
        //             1, 1, 1,
        //             0, 1, -1,
        //             0, 1, 1,
        //         ]
        //     )
        // )
        // this._geo_buffer[0].load();
        // this.craeteBuffer();
        // this.resize();
        this.loop();
    }

    // public resize(): void {
    //     if (this._canvas !== undefined) {
    //         this._canvas.width = window.innerWidth;
    //         this._canvas.height = window.innerHeight;
    //     }

    //     gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    // }

    private loop(): void {
        this._shader.use();
        this._context.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);  // 使用颜色缓冲区中的颜色，每次刷新
        // set uniform 
        // let colorPosition = this._shader?.getUniformLocation("u_color");
        // this._context.uniform4f(colorPosition, 0, 0.7, 0.7, 1);
        let offset = this._shader?.getUniformLocation("u_offset");
        this._context.uniform2f(offset,-1,-1);
        this._PCL_buffer?.forEach(e=>e.draw(this._context));
        requestAnimationFrame(this.loop.bind(this));
    }
}


