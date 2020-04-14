namespace AT {
    export class Engine {
        /**
         * Constructor
         */
        public Constructor() {
            
        }

        // 画布
        private _canvas: HTMLCanvasElement|undefined;
        private _shader: Shader|undefined;
        private _buffer: GLBuffer|undefined;
        private _geo_buffer: Array<Geo.GeoEnity>|undefined;

        public start(): void {
            this._geo_buffer = new Array<Geo.GeoEnity>();
            this._canvas = GlUtil.init();
            gl.clearColor(1, 0.3, 0.3, 1);
            this.loadShaders();
            this._shader?.use;
            this._geo_buffer.push(
                new Geo.Rectangle(
                    "cube-a",
                    0.5,
                    0.5, [
                        1, 1, 1,
                        0, 1, -1,
                        0, 1, 1,
                    ]
                )
            )
            this._geo_buffer[0].load();
            // this.craeteBuffer();
            this.resize();
            this.loop();
        }

        public resize(): void {
            if (this._canvas !== undefined) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;
            }

            gl.viewport(0, 0, window.innerWidth, window.innerHeight);
        }

        private loop(): void {
            gl.clear(gl.COLOR_BUFFER_BIT);  // 使用颜色缓冲区中的颜色，每次刷新
            // set uniform 
            let colorPosition = this._shader?.getUniformLocation("u_color");
            gl.uniform4f(colorPosition, 0, 0.7, 0.7, 1);
            this._geo_buffer[0].?draw();
            requestAnimationFrame(this.loop.bind(this));
        }

        private loadShaders():void {

            let vertexShaderSource = 
                `
                    attribute vec2 a_position;
                    attribute mat3 a_transmatrix;
                    void main() {
                        vec2 trans_position = (a_transmatrix * vec3(a_position, 1)).xy;
                        gl_Position = vec4(trans_position, 0.0, 1.0);
                    }
                `;
            let fragmentShaderSource = 
                `
                    precision mediump float;
                    uniform vec4 u_color;
                    void main() {
                        gl_FragColor = u_color;
                    }
                `;
            this._shader = new Shader("base", vertexShaderSource, fragmentShaderSource);
            
        }
    }
}

