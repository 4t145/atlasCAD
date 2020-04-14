namespace AT {
    export class Core {
        /**
         * Constructor
         */
        public Constructor() {
            console.log("ＡＴＬＡＳ　ＣＡＤ　ｖｅｒ[0.0.1]");
            console.log("In God We Suspect");
        }

        private _count = 0;
        // 画布
        private _canvas: HTMLCanvasElement;

		public start(): void {
			this.loop();
        }
        
		private loop(): void {
			this._count++;
            document.title = this._count.toString();
            this._canvas = GlUtil.init("cad-drawpad");
            gl.clearColor(1,0.3,0.3,0);
			requestAnimationFrame(this.loop.bind(this));
		}
    }

    export class Shader {
        private _name: string;
        private _program: WebGLProgram;
        /**
         * get_name
         */
        public get_name() {
            
        }
        // public constructor(name: string, vertexSource: string, fragmentSource: string) {
        //     this._name = name;
        //     let vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
        //     let fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);
        //     this.createProgram(vertexShader, fragmentShader);
        // }
    }
}

window.onload = () => {
    var atlas_pad = new AT.Core();
    atlas_pad.start();
    document.body.innerHTML += "Foo";
}


