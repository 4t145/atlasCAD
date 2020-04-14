namespace BP {

    // export class TransMat {
    //     x:number
    // }
    export class Coordinate {
        public x: number;
        public y: number;

        constructor(x:number, y:number) {
            this.x = x;
            this.y = y;
        }

        public rot(angle:number): Coordinate {
            // | c   ,s  |  *   |x|
            // | -s  ,c  |      |y|
            let c = Math.cos(this.x);
            let s = Math.cos(this.y);
            let x = c*this.x + s*this.y;
            let y = -s*this.x + c*this.y;
            return new Coordinate(x,y);
        }

        /**
         * shift
         */
        public shift(dx:number, dy:number): Coordinate {
            return new Coordinate(this.x+dx, this.y+dy);
        }

        public scale(k: number): Coordinate {
            return new Coordinate(this.x*k, this.y*k);
        }

        /**
         * trans
         */
        // public trans_by(transmat: ) {
            
        // }
    }

    export class SpaceSystem {
        private _width: number;
        private _height: number;
        private _v_width: number;
        private _v_height: number;
        private _v_angle: number;
        private _v_x: number;
        private _v_y: number;
        private _scale: number;
        // readonly view_: Float32Array;
        private rm: RegMannager;
        public constructor(width:number, height:number) {
            this._width = width;
            this._height = height;
            this._v_width = width;
            this._v_height = height;
            this._v_angle = 0;
            this._scale = 1;
            this._v_x = 0;
            this._v_y = 0;

            this.rm = new RegMannager();
        }
        /**
         * draw_all
         */
        public draw_all() {
            this.rm.table.forEach(e=>this.draw(e))
        }

        public draw(line: Component.AbLine) {
            let v_p1 = line.point_1_
                .rot(this._v_angle)
                .shift(this._v_x, this._v_y)
                .scale(this._scale)

        }
    }
}