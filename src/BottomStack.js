
export default class BottomStack{
    constructor()
    {
        this.stack=[];
    }

    AddTostack(tetromino)
    {
        for(var i=0;i<tetromino.blocks.length;i++)
        {
            this.stack.push(tetromino.blocks[i]);
        }
    }
    CheckCollisionToStack(tetromino)
    {
        for(let i=0;i < tetromino.blocks.length;i++) {
            for(let j=0;j < this.stack.length;j++) {

                if (tetromino.blocks[i].position.x === this.stack[j].position.x && tetromino.blocks[i].position.y === this.stack[j].position.y) {
                    return true;
                }
            }
        }
        return false;
    }
    Draw(ctx)
    {
        for(var i=0;i<this.stack.length;i++)
        {
            this.stack[i].Draw(ctx);
        }
    }

    CheckStackOverflow()
    {
        for(var i=0;i<this.stack.length;i++)
        {
            if(this.stack[i].position.y<0)
            {
                return true;
            }
        }
        return false;
    }

    CheckRowFullnessAndDestroy(game)
    {
        this.stack.sort(function(a, b){return a.position.y - b.position.y });

        for(let i=0;i<this.stack.length;)
        {
            let currenty=this.stack[i].position.y;
            let rowstart=i;
            let rowsum=0;

            while(i<this.stack.length && this.stack[i].position.y===currenty)
            {
                ++rowsum;
                ++i;
                if(rowsum>=10)
                {
                    this.stack.splice(rowstart,10);
                    i-=10;
                    for(let t=0;t<i;t++)
                    {
                        this.stack[t].position.y+=1;
                    }
                    game.score+=100;
                }
            }

        }

    }
}