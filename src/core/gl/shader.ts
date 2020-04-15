
export default class Shader {
    private _context: WebGLRenderingContext;
    private _name: string;
    private _program: WebGLProgram;
    private _attributes: { [name: string]: number } = {};   // 字典存储
    private _uniforms: { [name: string]: WebGLUniformLocation } = {};

    public constructor(name: string, vert_src: string, frag_src: string, context: WebGLRenderingContext) {
        this._context = context;
        this._name = name;
        let vert_sdr = this.loadShader(vert_src, this._context.VERTEX_SHADER);
        let frag_sdr = this.loadShader(frag_src, this._context.FRAGMENT_SHADER);

        let p = this._context.createProgram();
        if (p===null) {
            throw new Error("创建GL着色程序失败" + "<着色器>: " + this.name);
        }
        this._program = p;
        this._context.attachShader(this._program, vert_sdr);
        this._context.attachShader(this._program, frag_sdr);
        this._context.linkProgram(this._program);

        let error = this._context.getProgramInfoLog(this._program)?.trim();
        if (error !== "") {
            throw new Error("Error linking shader '" + this._name + "': " + error);
        }
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
        this._context.useProgram(this._program);
    }

    private loadShader(source: string, shaderType: number): WebGLShader {
        let shader: WebGLShader = this._context.createShader(shaderType) as WebGLShader;
        this._context.shaderSource(shader, source);
        this._context.compileShader(shader);
        let error = this._context.getShaderInfoLog(shader)?.trim();
        if (error !== "") {
            throw new Error("错误 => 编译 shader '" + this._name + "' => " + error + "  " + shaderType + "   " + source);
        }
        return shader;
    }


    

    private detectAttributes(): void {
        let attributeCount = this._context.getProgramParameter(this._program, this._context.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < attributeCount; ++i) {
            let info = this._context.getActiveAttrib(this._program, i);
            if (!info) {
                break;
            }
            this._attributes[info.name] = this._context.getAttribLocation(this._program, info.name);
        }
    }

    private detectUniforms(): void {
        let uniformCount = this._context.getProgramParameter(this._program, this._context.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; ++i) {
            let info = this._context.getActiveUniform(this._program, i);
            if (!info) {
                break;
            }
            let loc = this._context.getUniformLocation(this._program, info.name);
            if (!loc) {
                break;
            }
            this._uniforms[info.name] = loc;
        }
    }
}

