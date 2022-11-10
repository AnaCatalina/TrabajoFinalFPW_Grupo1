import Phaser from "phaser";
import GrupoDisparos from "./GrupoDisparos";


class Escene extends Phaser.Scene {
    constructor() {
        super({ key: 'Inicio' });
    }

    //Se emplean variables globales
    plataforms = null;
    cursors = null;
    puntaje = 0;
    puntos = 10;
    sonido1 = null;
    disparo = null;

    preload() {
        this.load.image("fondo", "imagen/juegoPhaser/background.png");
        this.load.spritesheet("nave", "imagen/juegoPhaser/nave.png", {frameWidth: 69, frameHeight: 62});
        this.load.image("enemy", "imagen/juegoPhaser/enemy.png");
        this.load.image("disparo", "imagen/juegoPhaser/shoot.png");
        this.load.audio('nivel1', 'sonido/level1.mp3');
    }

    create() {
        //creando el fondo
        this.add.image(400, 300, "fondo");

        this.sonido1 = this.sound.add('nivel1');
        const soundConfig = {
            loop: true
        }

        this.sonido1.play(soundConfig)

        this.puntajeEnTexto = this.add.text(10, 10, 'Puntos: 0', {
            fontSize: '20px',
            fill: 'red',
            fontFamily: 'arial'
        });

        //se crea el disparo
        this.disparo = new GrupoDisparos(this);

        this.inputKeys = [this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)]
        // se crea la nave
        this.nave = this.physics.add. sprite(150, 300, "nave").setImmovable();
        // se cancela la gravedad
        this.nave.body.allowGravity = false;
        this.nave.setCollideWorldBounds(true);
        // se agrega un objeto para mover la plataforma
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBoundsCollision(true);


        this.anims.create({
            key: 'sube',
            frames: [ {key: 'nave' , frame: 2}],
            frameRate: 20
        });
        this.anims.create({
            key: 'normal',
            frames: [ {key: 'nave' , frame: 0}],
            frameRate: 20
        })
        this.anims.create({
            key: 'baja',
            frames: [ {key: 'nave' , frame: 1}],
            frameRate: 20
        });
    }

    disparar(){
        this.disparo.realizarDisparo(this.nave.x+43 , this.nave.y)
    }

    update() {
        //Movimientos laterales de la plataforma
        if (this.cursors.up.isDown) {
            this.nave.setVelocityY(-300);
            this.nave.anims.play('sube', true)
        }
        else if (this.cursors.down.isDown) {
            this.nave.setVelocityY(300);
            this.nave.anims.play('baja', true)
        }
        else if (this.cursors.left.isDown) {
            this.nave.setVelocityX(-300);
        }
        else if (this.cursors.right.isDown) {
            this.nave.setVelocityX(300);
        }
        else {
            this.nave.setVelocityY(0);
            this.nave.setVelocityX(0);
            this.nave.anims.play('normal')
        }

        this.inputKeys.forEach(key => {
            if(Phaser.Input.Keyboard.JustDown(key)){
                this.disparar();
            }
            
        });

    }
}

export default Escene;