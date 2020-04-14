namespace AT {
    export class Shader {
        private _name: string;
        private _program: WebGLProgram;
        private _attributes: { [name: string]: number } = {};   // 字典存储
        private _uniforms: { [name: string]: WebGLUniformLocation } = {};

        public constructor(name: string, vertexSource: string, fragmentSource: string) {
            this._name = name;
            let vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
            let fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);
            this.createProgram(vertexShader, fragmentShader);
            this.detectAttributes();
            this.detectUniforms();
        }

        /**
        * 通过给定名称找到某个 uniform 的位置
        * @param name 被读取位置 uniform 的名字
        */
        public getUniformLocation(name: string): WebGLUniformLocation {
            if (this._uniforms[name] === undefined) {
                throw new Error(`错误 => 在 shader '${this._name}' 中, 无法找到名为 '${name}' 的 uniform`);
            }
            return this._uniforms[name];
        }
        /**
         * 获取具有提供的名称的属性的location 。
         * @param name 要检索其location的属性的名称。
         */
        public getAttributeLocation(name: string): number {
            if (this._attributes[name] === undefined) {
                throw new Error(`错误 => 在 shader '${this._name}' 中, 无法找到名为 '${name}' 的 attribute`);
            }
            return this._attributes[name];
        }
        /**
         * Creates a new shader.
         * @param name The name of this shader.
         */
        public get name(): string {
            return this._name;
        }
        /**
         * Use this shader.
         * */
        public use(): void {
            gl.useProgram(this._program);
        }

        private loadShader(source: string, shaderType: number): WebGLShader {
            let shader: WebGLShader = gl.createShader(shaderType);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            let error = gl.getShaderInfoLog(shader).trim();
            if (error !== "") {
                throw new Error("错误 => 编译 shader '" + this._name + "' => " + error + "  " + shaderType + "   " + source);
            }
            return shader;
        }


        private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
            this._program = gl.createProgram();
            gl.attachShader(this._program, vertexShader);
            gl.attachShader(this._program, fragmentShader);
            gl.linkProgram(this._program);
            let error = gl.getProgramInfoLog(this._program).trim();
            if (error !== "") {
                throw new Error("Error linking shader '" + this._name + "': " + error);
            }
        }

        private detectAttributes(): void {
            let attributeCount = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);
            for (let i = 0; i < attributeCount; ++i) {
                let info: WebGLActiveInfo = gl.getActiveAttrib(this._program, i);
                if (!info) {
                    break;
                }
                this._attributes[info.name] = gl.getAttribLocation(this._program, info.name);
            }
        }

        private detectUniforms(): void {
            let uniformCount = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);
            for (let i = 0; i < uniformCount; ++i) {
                let info: WebGLActiveInfo = gl.getActiveUniform(this._program, i);
                if (!info) {
                    break;
                }
                this._uniforms[info.name] = gl.getUniformLocation(this._program, info.name);
            }
        }



    }
}
