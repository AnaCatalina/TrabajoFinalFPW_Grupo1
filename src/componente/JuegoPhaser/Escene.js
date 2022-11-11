import Phaser from "phaser";
import Disparo from "./Disparo";
import GrupoDisparos from "./GrupoDisparos";

var cantENEMIGOS = 15;
var score = 0;
var scoreText;
class Escene extends Phaser.Scene {
    constructor() {
        super({ key: 'Inicio' });
    }

    // Se emplean variables globales
    cursors = null;
    puntaje = 0;
    puntos = 10;
    sonido1 = null;
    disparo = null;

    preload() {
        this.load.image("fondo", "imagen/juegoPhaser/background.png");
        this.load.spritesheet("nave", "imagen/juegoPhaser/nave.png", { frameWidth: 69, frameHeight: 62 });
        this.load.image("enemy", "imagen/juegoPhaser/enemy.png");
        this.load.image("disparo", "imagen/juegoPhaser/shoot.png");
        this.load.audio('nivel1', 'sonido/2022/2022Lv1.mp3');
        this.load.audio('sonidoDisparo', 'sonido/2022/gunShot.mp3');
    }

    create() {
        // Creando el fondo
        this.background = this.add.tileSprite(400, 300, 800, 600, 'fondo').
            setScrollFactor(0); // Esto nos permitira crear un fondo infinito

        this.sonido1 = this.sound.add('nivel1');
        const soundConfig = {
            loop: true,
            volume: 0.2
        }

        this.sonidoShot = this.sound.add('sonidoDisparo'), {
            loop: false
        }

        this.sonido1.play(soundConfig)

        this.puntajeEnTexto = this.add.text(10, 10, 'Puntos: 0', {
            fontSize: '20px',
            fill: 'red',
            fontFamily: 'arial'
        });

        // Se crea el disparo
        this.disparo = new GrupoDisparos(this);

        this.inputKeys = [this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)]
        // Se crea la nave
        this.nave = this.physics.add.sprite(150, 300, "nave").setImmovable();
        // Se cancela la gravedad
        this.nave.body.allowGravity = false;
        this.nave.setCollideWorldBounds(true);
        // Se agrega un objeto para mover la plataforma
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBoundsCollision(true);

        this.anims.create({
            key: 'sube',
            frames: [{ key: 'nave', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'normal',
            frames: [{ key: 'nave', frame: 0 }],
            frameRate: 20
        })
        this.anims.create({
            key: 'baja',
            frames: [{ key: 'nave', frame: 1 }],
            frameRate: 20
        });

        this.enemys = this.physics.add.group();

        this.createEnemy();

        // Disminuímos la velocidad en x (hará que la nave enemiga se mueva hacia la izquierda)
        this.enemys.setVelocityX(-150);

        this.physics.add.collider(this.disparo, this.enemys, this.destroyEnemy, null, this);

    }



    disparar(){
        this.disparo.realizarDisparo(this.nave.x+43 , this.nave.y)
        this.sonidoShot.play()
    }

    createEnemy() {
        for (var i = 0; i < cantENEMIGOS; i++) {
            this.enemys.create(0, 600, "enemy");
        }
    };

    destroyEnemy(disparo, enemys) {
        this.aumentarPuntaje();
        enemys.disableBody(true, true);
        disparo.disableBody(true, true);
    }

    reciclarEnemigos() {
        var distanciaX = 700;
        this.enemys.getChildren().forEach(
            (e) => {
                if (e.getBounds().right < 0) {
                    var randomY = Phaser.Math.Between(50, 550);
                    var distanciaEntreNaves = Phaser.Math.Between(500, 900);
                    e.x = distanciaX + distanciaEntreNaves;
                    e.y = randomY;
                }
            }
        )
    }

    //Método que permite aumentar el puntaje
    aumentarPuntaje() {
        this.puntaje = this.puntaje + this.puntos;
        this.puntajeEnTexto.setText('Puntos: ' + this.puntaje);
        console.log(this.puntaje);
    }

    
    felicitar(){
        this.sonido1.stop();
        this.puntaje=0;
        this.scene.start("WinLv1");     
    }

    update(time) {
        this.background.tilePositionX = time * 0.1;
        //Movimiento de la nave
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
        

        this.reciclarEnemigos();
        
       



        this.inputKeys.forEach(key => {
            if (Phaser.Input.Keyboard.JustDown(key)) {
                this.disparar();
                //this.felicitar();
            }

        });


        if(this.puntaje == 150){
            this.felicitar();
        }

    }
}

export default Escene;