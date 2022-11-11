import Phaser from "phaser";
import GrupoDisparos from "./GrupoDisparos";

var cantENEMIGOS = 15;
var score = 0;
var scoreText;
class Escene3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Escene3' });
    }

    // Se emplean variables globales
    cursors = null;
    puntaje = 0;
    vida = 100;
    puntos = 10;
    disparo = null;

    preload() {
        this.load.image("fondo3", "imagen/juegoPhaser/background3.png");
        this.load.spritesheet("nave3", "imagen/juegoPhaser/nave3.png", { frameWidth: 69, frameHeight: 62 });
        this.load.image("boss", "imagen/juegoPhaser/boss.png");
        this.load.image("disparo", "imagen/juegoPhaser/shoot.png");
        this.load.audio('nivel3', 'sonido/2022/nivel3.mp3');
        this.load.audio('sonidoDisparo', 'sonido/2022/gunShot.mp3');
        this.load.audio('explosion', 'sonido/2022/explosion.mp3');
        
    }

    create() {
        // Creando el fondo
        this.background3 = this.add.tileSprite(400, 300, 800, 600, 'fondo3').
            setScrollFactor(0); // Esto nos permitira crear un fondo infinito

        this.sonido3 = this.sound.add('nivel3');
        const soundConfig = {
            loop: true,
            volume: 0.6
        }

        this.sonidoShot = this.sound.add('sonidoDisparo'), {
            loop: false
        }
        this.sonidoExplosion = this.sound.add('explosion'), {
            loop: false
        }
        this.sonidoImpacto = this.sound.add('impacto'), {
            loop: false
        }

        this.sonido3.play(soundConfig)

        this.puntajeEnTexto = this.add.text(10, 10, 'Puntos: 0', {
            fontSize: '20px',
            fill: 'red',
            fontFamily: 'arial'
        });

        this.vidaEnTexto = this.add.text(10, 30, 'Vida: 100 %', {
            fontSize: '20px',
            fill: 'red',
            fontFamily: 'arial'
        });
        this.nivel = this.add.text(725, 10, 'Nivel 3', {
            fontSize: '20px',
            fill: 'red',
            fontFamily: 'arial'
        });

        // Se crea el disparo
        this.disparo = new GrupoDisparos(this);

        this.inputKeys = [this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)]
        // Se crea la nave
        this.nave3 = this.physics.add.sprite(150, 300, "nave3").setImmovable();

        this.jefe = this.physics.add.sprite(700, 300, "boss").setImmovable();
        // Se cancela la gravedad
        this.nave3.body.allowGravity = false;
        this.nave3.setCollideWorldBounds(true);
        // Se agrega un objeto para mover la plataforma
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBoundsCollision(true);

        this.anims.create({
            key: 'sube3',
            frames: [{ key: 'nave3', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'normal3',
            frames: [{ key: 'nave3', frame: 0 }],
            frameRate: 20
        })
        this.anims.create({
            key: 'baja3',
            frames: [{ key: 'nave3', frame: 1 }],
            frameRate: 20
        });

        this.physics.add.collider(this.disparo, this.jefe, this.damageBoss, null, this);
        //this.physics.add.collider(this.nave2, this.bomba, this.destroyJugador, null, this);

    }

    moverJefe(){
        this.jefe.y=this.nave3.y;
    }

    disparar(){
        this.disparo.realizarDisparo(this.nave3.x+43 , this.nave3.y)
        this.sonidoShot.play()
    }

    damageBoss(disparo, jefe) {
        this.sonidoExplosion.play()
        this.aumentarPuntaje();
        disparo.setActive(false);
        jefe.setVisible(false);
        
        //this.quitarVidaJefe();
        /*if(vidaJefe==0){
            jefe.disableBody(true, true);
        }*/
        
        //disparo.disableBody(true, true);        
    }

    destroyJugador(nave2, bomba) {
        this.sonidoImpacto.play()
        this.disminuirVida();
        bomba.disableBody(true, true);
    }

    //Método que permite aumentar el puntaje
    aumentarPuntaje() {
        this.puntaje = this.puntaje + this.puntos;
        this.puntajeEnTexto.setText('Puntos: ' + this.puntaje);
        console.log(this.puntaje);
    }

    //Método que permite disminuír la vida
    disminuirVida() {
        this.vida = this.vida - this.puntos * 2.5;
        this.vidaEnTexto.setText('Vida: ' + this.vida + ' %');
        console.log(this.vida);
        if(this.vida <= 0){
            this.mostrarGameover();
        }
    }

    
    felicitar(){
        this.sonido2.stop();
        this.puntaje=0;
        this.vida=100;
        this.scene.start("WinLv1");     
    }

    mostrarGameover() {
        this.sonido2.stop();
        this.puntaje=0;
        this.vida=100;
        this.scene.start('GameOver')
    }

    update(time) {
        this.background3.tilePositionX = time * 0.1;
        //Movimiento de la nave
        if (this.cursors.up.isDown) {
            this.nave3.setVelocityY(-300);
            this.nave3.anims.play('sube3', true)
        }
        else if (this.cursors.down.isDown) {
            this.nave3.setVelocityY(300);
            this.nave3.anims.play('baja3', true)
        }
        else if (this.cursors.left.isDown) {
            this.nave3.setVelocityX(-300);
        }
        else if (this.cursors.right.isDown) {
            this.nave3.setVelocityX(300);
        }
        else {
            this.nave3.setVelocityY(0);
            this.nave3.setVelocityX(0);
            this.nave3.anims.play('normal3')
        }
        
        this.inputKeys.forEach(key => {
            if (Phaser.Input.Keyboard.JustDown(key)) {
                this.disparar();
                //this.felicitar();
            }

        });

        this.moverJefe();
        /*if(this.puntaje == 150){
            this.felicitar();
        }*/

    }
}

export default Escene3;