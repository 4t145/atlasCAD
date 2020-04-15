﻿import "fs";
// import { readFile } from "fs";
import "../PCL";
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
    gl_position = (p,0,1);
}
`;

const FS = `
/* Color palette */
#define BLACK           vec3(0.0, 0.0, 0.0)
#define WHITE           vec3(1.0, 1.0, 1.0)
#define RED             vec3(1.0, 0.0, 0.0)
#define GREEN           vec3(0.0, 1.0, 0.0)
#define BLUE            vec3(0.0, 0.0, 1.0)
#define YELLOW          vec3(1.0, 1.0, 0.0)
#define CYAN            vec3(0.0, 1.0, 1.0)
#define MAGENTA         vec3(1.0, 0.0, 1.0)
#define ORANGE          vec3(1.0, 0.5, 0.0)
#define PURPLE          vec3(1.0, 0.0, 0.5)
#define LIME            vec3(0.5, 1.0, 0.0)
#define ACQUA           vec3(0.0, 1.0, 0.5)
#define VIOLET          vec3(0.5, 0.0, 1.0)
#define AZUR            vec3(0.0, 0.5, 1.0)

void main() {
    gl_Color = (AZUR, 1);
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
        let vert_src = "";
        let frag_src = "";
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


