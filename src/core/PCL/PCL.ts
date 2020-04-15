import "../gl/glBuffer"
import { GLBuffer, AttributeInfo } from "../gl/glBuffer";
export interface PCL {
    draw(context:WebGLRenderingContext):void
}

export class Line implements PCL{
    _x1:number;
    _x2:number;
    _y1:number;
    _y2:number;
    constructor(x1:number,y1:number,x2:number,y2:number) {
        this._x1 = x1;
        this._x2 = x2;
        this._y1 = y1;
        this._y2 = y2;
    }

    public draw(context:WebGLRenderingContext) {
        let buf = new GLBuffer(
            context,
            WebGLRenderingContext.FLOAT,
            WebGLRenderingContext.ARRAY_BUFFER,
            WebGLRenderingContext.LINE_STRIP
        );
        let info = new AttributeInfo();
        info.size = 2;
        buf.addAttributeLocation(info);
        buf.bind();
        let data = [this._x1, this._y1, this._x2, this._y2];
        buf.pushBackData(data);
        buf.upload();
        buf.draw();
        buf.unbind();
    }
}