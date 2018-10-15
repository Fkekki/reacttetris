import Tetromino from './Tetromino';
import Block from './Block';
import Vec2 from './Vec2';

export default class ITetromino extends Tetromino{

    constructor(pos) {
        super(pos, 'cyan');
        this.blocks.push(new Block(this.pos, this.color),new Block(new Vec2(this.pos.x+1,this.pos.y), this.color),new Block(new Vec2(this.pos.x+2,this.pos.y), this.color),new Block(new Vec2(this.pos.x+3,this.pos.y), this.color));

        this.Forms={
            form1 : "form1",
            form2 : "form2"
        };
        this.Form=this.Forms.form1;
    }

    ChangeForm(stack)
    {
        let delta;

        if(this.Form===this.Forms.form1)
        {
            delta=1;
            this.Form=this.Forms.form2;
        }
        else{
            delta=-1;
            this.Form=this.Forms.form1;
        }
        this.blocks[0].position.x+=2*delta;
        this.blocks[0].position.y-=2*delta;

        this.blocks[1].position.x+=1*delta;
        this.blocks[1].position.y-=1*delta;

        this.blocks[3].position.x-=1*delta;
        this.blocks[3].position.y+=1*delta;

        if(this.CheckCollisionToWall() || stack.CheckCollisionToStack(this))
        {
            delta=-delta;
            this.blocks[0].position.x+=2*delta;
            this.blocks[0].position.y-=2*delta;

            this.blocks[1].position.x+=1*delta;
            this.blocks[1].position.y-=1*delta;

            this.blocks[3].position.x-=1*delta;
            this.blocks[3].position.y+=1*delta;
            if(this.Form===this.Forms.form1)
            {
                this.Form=this.Forms.form2;
            }else{
                this.Form=this.Forms.form1;
            }
        }
    }
}