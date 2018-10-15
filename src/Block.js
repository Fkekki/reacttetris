export default class Block
{
    constructor(pos ,color)
    {
        this.position = {
            x: pos.x,
            y: pos.y
        }
        this.dimension=25;
        this.color=color;
    }

    Draw(ctx)
    {
        let grd = ctx.createLinearGradient(this.position.x*this.dimension, 0, this.position.x*this.dimension+this.dimension, 0);
        grd.addColorStop(0 , 'black');
        grd.addColorStop(1 , this.color);
        ctx.fillStyle = grd;
        ctx.fillRect(this.position.x*this.dimension, this.position.y*this.dimension, this.dimension, this.dimension);
        ctx.stokeStyle='black';
        ctx.strokeRect(this.position.x*this.dimension+1, this.position.y*this.dimension+1, this.dimension-2, this.dimension-2);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x*this.dimension+2, this.position.y*this.dimension+2, this.dimension-4, this.dimension-4);
    }
}