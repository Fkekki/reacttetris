export default class Tetromino {
    constructor(pos,color) {
        this.pos = {
            x: pos.x,
            y: pos.y
        };
        this.color=color;
        this.blocks =[];
    }

    Update(dpos)
    {
        for(var i=0;i<this.blocks.length;i++)
        {
            this.blocks[i].position.x+=dpos.x;
            this.blocks[i].position.y+=dpos.y;
        }
    }

    Draw(ctx)
    {
        for(var i=0;i<this.blocks.length;i++)
        {
            this.blocks[i].Draw(ctx);
        }
    }

    CheckCollisionToBottom()
    {
        for(var i=0;i<this.blocks.length;i++)
        {
            if (this.blocks[i].position.y > 19)
            {
                return true;
            }
        }
        return false;
    }

    CheckCollisionToWall()
    {
        for(var i=0;i<this.blocks.length;i++)
        {
            if (this.blocks[i].position.x < 0 || this.blocks[i].position.x > 9)
            {
                return true;
            }
        }
        return false;
    }

}