namespace AT {

    enum AttrType {
        Position,
    }
    /**
    * Represents the information needed for a GLBuffer attribute.
    * */
    export class AttributeInfo {
        /**
        * attribute位置
        */
        public location: number;
        /**
        * 这个 attribute 的宽度 (元素个数, 如 Vector3 = 3).
        */
        public size: number;
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
        private _stride: number;
        private _buffer: WebGLBuffer;
        private _targetBufferType: number;
        private _dataType: number;
        private _mode: number;
        private _typeSize: number;
        private _data: number[] = [];
        private _attributes: AttributeInfo[] = [];
        /**
        * GL缓冲构建
        * @param dataType 缓冲的数据类型 默认 => gl.FLOAT
        * @param targetBufferType 缓冲目标类型. 应当是 gl.ARRAY_BUFFER 或者 gl.ELEMENT_ARRAY_BUFFER. 默认 => gl.ARRAY_BUFFER
        * @param mode 缓冲的绘图模式 默认 => gl.TRIANGLES
        */
        public constructor(
            dataType: number = gl.FLOAT,
            targetBufferType: number = gl.ARRAY_BUFFER,
            mode: number = gl.TRIANGLES
        ) {
            this._elementSize = 0;
            this._dataType = dataType;
            this._targetBufferType = targetBufferType;
            this._mode = mode;
            // 决定字节宽
            switch (this._dataType) {
                case gl.FLOAT:
                case gl.INT:
                case gl.UNSIGNED_INT:
                    this._typeSize = 4;
                    break;
                case gl.SHORT:
                case gl.UNSIGNED_SHORT:
                    this._typeSize = 2;
                    break;
                case gl.BYTE:
                case gl.UNSIGNED_BYTE:
                    this._typeSize = 1;
                    break;
                default:
                    throw new Error("无法识别的数据类型 => " + dataType.toString());
            }
            this._buffer = gl.createBuffer();
        }
        /**
        * 销毁缓冲
        * */
        public destroy(): void {
            gl.deleteBuffer(this._buffer);
        }
        /**
        * 绑定缓冲
        * @param normalized 说明数据是否归一化, 默认 => false
        */
        public bind(normalized: boolean = false): void {
            gl.bindBuffer(this._targetBufferType, this._buffer);
            if (this._hasAttributeLocation) {
                for (let it of this._attributes) {
                    gl.vertexAttribPointer(
                        it.location,
                        it.size,
                        this._dataType,
                        normalized,
                        this._stride,
                        it.offset * this._typeSize
                    );
                    gl.enableVertexAttribArray(it.location);
                }
            }
        }
        /**
        * 解绑缓冲
        * */
        public unbind(): void {
            for (let it of this._attributes) {
                gl.disableVertexAttribArray(it.location);
            }
            gl.bindBuffer(this._targetBufferType, undefined);
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
            gl.bindBuffer(this._targetBufferType, this._buffer);
            let bufferData: ArrayBuffer;
            switch (this._dataType) {
                case gl.FLOAT:
                    bufferData = new Float32Array(this._data);
                    break;
                case gl.INT:
                    bufferData = new Int32Array(this._data);
                    break;
                case gl.UNSIGNED_INT:
                    bufferData = new Uint32Array(this._data);
                    break;
                case gl.SHORT:
                    bufferData = new Int16Array(this._data);
                    break;
                case gl.UNSIGNED_SHORT:
                    bufferData = new Uint16Array(this._data);
                    break;
                case gl.BYTE:
                    bufferData = new Int8Array(this._data);
                    break;
                case gl.UNSIGNED_BYTE:
                    bufferData = new Uint8Array(this._data);
                    break;
            }
            gl.bufferData(this._targetBufferType, bufferData, gl.STATIC_DRAW);
        }
        /**
        * 画出缓存内容
        * */
        public draw(): void {
            if (this._targetBufferType === gl.ARRAY_BUFFER) {
                gl.drawArrays(
                    this._mode,
                    0,
                    this._data.length / this._elementSize
                );
            } else if (this._targetBufferType === gl.ELEMENT_ARRAY_BUFFER) {
                gl.drawElements(
                    this._mode,
                    this._data.length,
                    this._dataType,
                    0
                );
            }
        }
    }
}