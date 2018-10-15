import Tetromino from './Tetromino';
import Block from './Block';
import Vec2 from './Vec2';


export default class OTetromino extends Tetromino {

    constructor(pos) {
        super(pos,'yellow');
        this.blocks.push(new Block(this.pos, this.color),new Block(new Vec2(this.pos.x+1,this.pos.y), this.color),new Block(new Vec2(this.pos.x,this.pos.y+1), this.color),new Block(new Vec2(this.pos.x+1,this.pos.y+1), this.color));
    }

    ChangeForm(){

    }
}


