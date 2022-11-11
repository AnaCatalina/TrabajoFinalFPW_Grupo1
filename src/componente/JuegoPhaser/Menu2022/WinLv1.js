import Phaser from "phaser";
import {BotonReset} from './BotonReiniciar'

class Win extends Phaser.Scene{
    constructor(){
        super({key:"WinLv1"});
        this.reset = new BotonReset(this);
    }
    preload(){
        this.load.image("Win" ,"imagen/win.png");
        this.reset.precargar();
        this.load.audio('winner', 'sonido/winner.mp3');
    }
    create(){
        this.imagenWin = this.add.image(400,300,'Win');
        this.reset.crear();
        this.sonido4 = this.sound.add('winner');
        const soundConfig = {
            loop: false
        }

        this.sonido4.play(soundConfig)
    }
}
export default Win;