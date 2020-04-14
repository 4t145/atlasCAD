namespace AT.Geo {
    export class Triangle {
        protected _name: string;
        protected _width: number;
        protected _buffer: GLBuffer;
        /**
            * Creates a new sprite.
            * @param name The name of this sprite.
            * @param materialName The name of the material to use with this sprite.
            * @param width The width of this sprite.
            * @param height The height of this sprite.
            */
        public constructor(name: string, width: number = 100, height: number = 100) {
            this._name = name;
            this._width = width;
        }
        /**
            * Performs loading routines on this sprite.
            * */
        public load(): void {
            this._buffer = new GLBuffer(gl.FLOAT, gl.ARRAY_BUFFER, gl.LINE_STRIP);
            let positionArribute = new AttributeInfo();
            positionArribute.location = 0;
            positionArribute.offset = 0;
            positionArribute.size = 2;
            this._buffer.addAttributeLocation(positionArribute);
            let vertices = [
                // x, y
                0, 0,
                1, 1,
            ];
            this._buffer.pushBackData(vertices);
            this._buffer.upload();
            this._buffer.unbind();
        }
        /**
            * Performs update routines on this sprite.
            * @param time The delta time in milliseconds since the last update call.
            */
        public update(time: number): void {
        }
        /** Draws this sprite. */
        public draw(): void {
            this._buffer.bind();
            this._buffer.draw();
        }
    }
}