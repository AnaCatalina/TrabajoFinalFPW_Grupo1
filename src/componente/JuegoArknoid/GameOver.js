import Phaser from "phaser";
import {BotonReset} from "./BotonReset.js";

class Gameover extends Phaser.Scene{
    constructor(){
        super({key:"GameOver"});
        this.reset = new BotonReset(this);
    }
    preload(){
        this.load.image('Perder' ,"imagen/game over.jpg");
        this.reset.precargar();
        this.load.audio('gameOver', 'sonido/gameOver.mp3');
    }
    create(){
        this.imagenLose = this.add.image(400,300,'Perder');
        this.reset.crear();
        this.sonido3 = this.sound.add('gameOver');
        const soundConfig = {
            loop: false,
            volume: 0.2
        }

        this.sonido3.play(soundConfig)
    }
}
export default Gameover;