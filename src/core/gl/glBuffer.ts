

export enum AttrType {
    Position,
}
/**
* GLBuffer 需要的特性信息
* */
export class AttributeInfo {
    /**
    * attribute位置
    */
    public location: number = 0;
    /**
    * 这个 attribute 的宽度 (元素个数, 如 Vector3 = 3).
    */
    public size: number = 0;
    /**
    * 缓存中的偏移量
    */
    public offset: number = 0;

    public constructor(attr_type?:AttrType) {
        
    }
}
/**
* Represents a WebGL buffer.
* */
export class GLBuffer {
    private _hasAttributeLocation: boolean = false;
    private _elementSize: number;
    private _stride: number = 0;
    private _buffer: WebGLBuffer;
    private _targetBufferType: number;
    private _dataType: number;
    private _mode: number;
    private _typeSize: number;
    private _data: number[] = [];
    private _attributes: AttributeInfo[] = [];
    private _context: WebGLRenderingContext;
    /**
    * GL缓冲构建
    * @param dataType 缓冲的数据类型 默认 => WebGLRenderingContext.FLOAT
    * @param targetBufferType 缓冲目标类型. 应当是 WebGLRenderingContext.ARRAY_BUFFER 或者 WebGLRenderingContext.ELEMENT_ARRAY_BUFFER. 默认 => WebGLRenderingContext.ARRAY_BUFFER
    * @param mode 缓冲的绘图模式 默认 => WebGLRenderingContext.TRIANGLES
    */
    public constructor(
        context: WebGLRenderingContext,
        dataType: number = WebGLRenderingContext.FLOAT,
        targetBufferType: number = WebGLRenderingContext.ARRAY_BUFFER,
        mode: number = WebGLRenderingContext.TRIANGLES
    ) {
        this._context = context;
        this._elementSize = 0;
        this._dataType = dataType;
        this._targetBufferType = targetBufferType;
        this._mode = mode;
        // 决定字节宽
        switch (this._dataType) {
            case WebGLRenderingContext.FLOAT:
            case WebGLRenderingContext.INT:
            case WebGLRenderingContext.UNSIGNED_INT:
                this._typeSize = 4;
                break;
            case WebGLRenderingContext.SHORT:
            case WebGLRenderingContext.UNSIGNED_SHORT:
                this._typeSize = 2;
                break;
            case WebGLRenderingContext.BYTE:
            case WebGLRenderingContext.UNSIGNED_BYTE:
                this._typeSize = 1;
                break;
            default:
                throw new Error("无法识别的数据类型 => " + dataType.toString());
        }
        let buf = this._context.createBuffer();
        if (!buf) {
            throw new Error("创建GL缓存错误!");
        }
        this._buffer = buf;
    }
    /**
    * 销毁缓冲
    * */
    public destroy(): void {
        this._context.deleteBuffer(this._buffer);
    }
    /**
    * 绑定缓冲
    * @param normalized 说明数据是否归一化, 默认 => false
    */
    public bind(normalized: boolean = false): void {
        this._context.bindBuffer(this._targetBufferType, this._buffer);
        if (this._hasAttributeLocation) {
            for (let it of this._attributes) {
                this._context.vertexAttribPointer(
                    it.location,
                    it.size,
                    this._dataType,
                    normalized,
                    this._stride,
                    it.offset * this._typeSize
                );
                this._context.enableVertexAttribArray(it.location);
            }
        }
    }
    /**
    * 解绑缓冲
    * */
    public unbind(): void {
        for (let it of this._attributes) {
            this._context.disableVertexAttribArray(it.location);
        }
        this._context.bindBuffer(this._targetBufferType, null);
    }
    /**
    * 添加一个带有信息的 attribute 
    * @param info 添加的信息
    */
    public addAttributeLocation(info: AttributeInfo): void {
        this._hasAttributeLocation = true;
        info.offset = this._elementSize;
        this._attributes.push(info);
        this._elementSize += info.size;
        this._stride = this._elementSize * this._typeSize;
    }
    /**
    * 用给定数据替换现有数据
    * @param data 有待加载的数据
    */
    public setData(data: number[]): void {
        this.clearData();
        this.pushBackData(data);
    }
    /**
    * 添加数据
    * @param data 添加的数据
    */
    public pushBackData(data: number[]): void {
        for (let d of data) {
            this._data.push(d);
        }
    }
    /**
    * 清除缓存中的所有数据
    * */
    public clearData(): void {
        this._data.length = 0;
    }
    /**
    * 上传缓存数据到GPU
    * */
    public upload(): void {
        this._context.bindBuffer(this._targetBufferType, this._buffer);
        let bufferData: ArrayBuffer|null;
        switch (this._dataType) {
            case WebGLRenderingContext.FLOAT:
                bufferData = new Float32Array(this._data);
                break;
            case WebGLRenderingContext.INT:
                bufferData = new Int32Array(this._data);
                break;
            case WebGLRenderingContext.UNSIGNED_INT:
                bufferData = new Uint32Array(this._data);
                break;
            case WebGLRenderingContext.SHORT:
                bufferData = new Int16Array(this._data);
                break;
            case WebGLRenderingContext.UNSIGNED_SHORT:
                bufferData = new Uint16Array(this._data);
                break;
            case WebGLRenderingContext.BYTE:
                bufferData = new Int8Array(this._data);
                break;
            case WebGLRenderingContext.UNSIGNED_BYTE:
                bufferData = new Uint8Array(this._data);
                break;
            default: 
                bufferData = null;
        }
        this._context.bufferData(this._targetBufferType, bufferData, WebGLRenderingContext.STATIC_DRAW);
    }
    /**
    * 画出缓存内容
    * */
    public draw(): void {
        if (this._targetBufferType === WebGLRenderingContext.ARRAY_BUFFER) {
            this._context.drawArrays(
                this._mode,
                0,
                this._data.length / this._elementSize
            );
        } else if (this._targetBufferType === WebGLRenderingContext.ELEMENT_ARRAY_BUFFER) {
            this._context.drawElements(
                this._mode,
                this._data.length,
                this._dataType,
                0
            );
        }
    }
}
