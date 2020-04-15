namespace BP {

    type EntityId = number;

    // export interface Entity {
    //     // rc: number;
    //     // id: EntityId;
    //     visible: boolean;
    //     hide(): void;
    //     show(): void;
    //     draw(): void;
    // }

    export class RegMannager {
        public table: Map<EntityId, Entity>;
        private _et_root: Entity;
        private _next_id: number;
        public constructor() {
            this.table = new Map<EntityId, Entity>();
            this._next_id = 1;
            this._et_root = new BluePrint(this);
        }
        
        // undef -> 
        public reg(entity: Entity):EntityId {
            let id = this._next_id;
            this.table.set(id, entity);
            this._next_id += 1;
            return id;
        }
        
    }
    
    export var rm = new RegMannager();

    // export var blueprint:any;

    export class Entity {
        protected __context: RegMannager;
        
        public visible: boolean;
        public id: EntityId;
        public parents: Array<Entity>|undefined;
        public children: Array<Entity>|undefined;

        constructor(context: RegMannager) {
            this.__context = context;
            this.id = context.reg(this);
            this.visible = true;
            // this.children = new Array<Entity>();
        }

        /**
         * belong_to
         * @param parent 指定亲代
         */
        public belong_to(parent: Entity) {
            if (this.parents===undefined) {
                this.parents = new Array<Entity>();
            }
            this.parents.push(parent);
            parent.get(this);
        }

        /**
         * get
         */
        protected get(child: Entity) {
            if (this.children===undefined) {
                this.children = new Array<Entity>();
            }
            this.children.push(child);
        }


        public show(): void {
            this.visible = true;
        }

        public hide(): void {
            this.visible = false;
        }

        // public draw(): void {

        // }
        // public draw_all_child(): void {
        //     if (!this.visible) {
        //         return;
        //     }
        //     if (this.children !== undefined) {
        //         this.children.forEach(element => {
        //             element.draw();
        //         });
        //     }
        // }
    }

    

    class BluePrint extends Entity{
        public name: string;
        constructor(context: RegMannager) {
            super(context);
            this.name = name;
        }
        public draw(): void {

        } 
    }
    
    export namespace Component {

        export interface AbLine {
            readonly point_1_: Coordinate;
            readonly point_2_: Coordinate;
        }

        export interface AbPoint {
            readonly coordinate_: Coordinate;
        }

        export namespace LineType {
            export class LineP2P extends Entity implements AbLine {
                readonly point_1_: Coordinate;
                readonly point_2_: Coordinate;

                public constructor(
                    p1: PointType.Point, 
                    p2: PointType.Point, 
                    context:RegMannager
                ) {
                    super(context);
                    this.point_1_ = p1.coordinate_;
                    this.point_2_ = p2.coordinate_;
                    p1.belong_to(this);
                    p2.belong_to(this);
                }

                // public draw(): void {
                //     super.draw();

                // }

            }
        }

        export namespace PointType {
            export class Point extends Entity implements AbPoint {
                readonly coordinate_: Coordinate;
                public constructor(p: Coordinate, context: RegMannager) {
                    super(context);
                    this.coordinate_ = p;
                }

                // public draw(): void {
                //     super.draw();
                // } 
            }
        }
    }
}