import Phaser from "phaser";


export default class Disparo extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'disparo');
    }

    disparado(x,y){
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(500)
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if (this.x>=845){
            this.setActive(false);
            this.setVisible(false);
        }
    }
}