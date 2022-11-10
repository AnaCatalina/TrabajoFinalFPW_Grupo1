import Phaser from "phaser";
import Disparo from "./Disparo";

export default class GrupoDisparos extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Disparo,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'disparo'
        })
    }

    realizarDisparo(x, y){
        const disparo = this.getFirstDead(false);
        if (disparo){
            disparo.disparado(x,y)
        }
    }

}