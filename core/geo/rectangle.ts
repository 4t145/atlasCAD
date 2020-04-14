namespace AT.Geo {
    export class Rectangle implements GeoEnity {
        protected _name: string;
        protected _width: number;
        protected _height: number;
        protected _buffer: GLBuffer;
        protected _translation: number[];
        /**
            * Creates a new sprite.
            * @param name The name of this sprite.
            * @param materialName The name of the material to use with this sprite.
            * @param width The width of this sprite.
            * @param height The height of this sprite.
            */
        public constructor(
            name: string,
            width: number = 1,
            height: number = 1,
            translation: number[] = [
                1, 0, 0,
                0, 1, 0,
                0, 0, 1,
            ],
        ) {
            this._name = name;
            this._width = width;
            this._height = height;
            this._translation = translation;
        }
        /**
            * Performs loading routines on this sprite.
            * */
        public load(): void {
            
            this._buffer = new GLBuffer(gl.FLOAT, gl.ARRAY_BUFFER, gl.LINE_LOOP);
           
            let pos_attr = new AttributeInfo();
            pos_attr.location = 0;
            pos_attr.offset = 0;
            pos_attr.size = 2;
            this._buffer.addAttributeLocation(pos_attr);
            let vertices = [
                // x, y
                0, 0,
                0, this._height,
                this._width, 0,
                this._width, this._height
            ];

            this._buffer.pushBackData(vertices);
            this._buffer.upload();
            this._buffer.unbind();

            gl.bindBuffer(gl.ARRAY_BUFFER, )
            /*gl.bindBuffer(webgl.ARRAY_BUFFER, vInstance);
            webgl.vertexAttribPointer(webgl.instanceMat, 4, webgl.FLOAT, false, 0, 0);
            webgl.enableVertexAttribArray(webgl.instanceMat);
            INSTANGBBxt.vertexAttribDivisorANGLE(webgl.instanceMat, 1);

            webgl.bindBuffer(webgl.ARRAY_BUFFER, vInstance1);
            webgl.vertexAttribPointer(webgl.instanceMat + 1, 4, webgl.FLOAT, false, 0, 0);
            webgl.enableVertexAttribArray(webgl.instanceMat + 1);
            INSTANGBBxt.vertexAttribDivisorANGLE(webgl.instanceMat + 1, 1);*/
            /*let trans_attr = new AttributeInfo();
            pos_attr.location = 1;
            pos_attr.offset = 2;
            pos_attr.size = 1;
            this._buffer.addAttributeLocation(trans_attr);

            this._buffer.pushBackData(this._translation);
            this._buffer.upload();
            this._buffer.unbind();*/
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