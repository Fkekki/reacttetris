import Tetromino from './Tetromino';
import Block from './Block';
import Vec2 from './Vec2';

export default class STetromino extends Tetromino{

    constructor(pos) {
        super(pos ,'green');
        this.blocks.push(new Block(this.pos, this.color),new Block(new Vec2(this.pos.x+1,this.pos.y), this.color),new Block(new Vec2(this.pos.x-1,this.pos.y+1), this.color),new Block(new Vec2(this.pos.x,this.pos.y+1), this.color));
        this.Forms={
            form1 : "form1",
            form2 : "form2",
            form3 : "form3",
            form4 : "form4"
        };
        this.Form=this.Forms.form1;
    }

    ChangeForm(stack)
    {
        if(this.Form===this.Forms.form1) {
            this.blocks[1].position.y += 2;
            this.blocks[2].position.x += 2;
            this.Form=this.Forms.form2;

            if(this.CheckCollisionToWall() || stack.CheckCollisionToStack(this))
            {
                this.blocks[1].position.y -= 2;
                this.blocks[2].position.x -= 2;
                this.Form=this.Forms.form1;
            }
        }

        else if(this.Form===this.Forms.form2) {
            this.blocks[1].position.x -= 1;
            this.blocks[0].position.x -= 1;
            this.blocks[0].position.y += 2;
            this.Form=this.Forms.form3;

            if(this.CheckCollisionToWall() || stack.CheckCollisionToStack(this))
            {
                this.blocks[1].position.x += 1;
                this.blocks[0].position.x += 1;
                this.blocks[0].position.y -= 2;
                this.Form=this.Forms.form2;
            }
        }

        else if(this.Form===this.Forms.form3) {
            this.blocks[0].position.y -= 2;
            this.blocks[2].position.x -= 2;
            this.Form=this.Forms.form4;

            if(this.CheckCollisionToWall() || stack.CheckCollisionToStack(this))
            {
                this.blocks[0].position.y += 2;
                this.blocks[2].position.x += 2;
                this.Form=this.Forms.form3;
            }
        }
        else if(this.Form===this.Forms.form4) {
            this.blocks[0].position.x += 1;
            this.blocks[1].position.x += 1;
            this.blocks[1].position.y -= 2;
            this.Form=this.Forms.form1;

            if(this.CheckCollisionToWall() || stack.CheckCollisionToStack(this))
            {
                this.blocks[0].position.x -= 1;
                this.blocks[1].position.x -= 1;
                this.blocks[1].position.y += 2;
                this.Form=this.Forms.form4;
            }
        }
    }
}
