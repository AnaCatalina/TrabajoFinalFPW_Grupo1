import Phaser from "phaser";

class Escene extends Phaser.Scene {
    constructor() {
        super({ key: 'Inicio' });
    }

    //Init(){
    // this.puntos = 0;   
    //}

    //Se emplean variables globales
    plataforms = null;
    cursors = null;
    puntaje = 0;
    puntos = 10;
    sonido1 = null;

    preload() {
        this.load.image("fondo", "imagen/juegoPhaser/background.png");
        this.load.spritesheet("nave", "imagen/juegoPhaser/nave.png", {frameWidth: 70, frameHeight: 62});
        this.load.image("enemy", "imagen/juegoPhaser/enemy.png");
        /*this.load.image("bloqueAzul", "imagen/blue1.png");
        this.load.image("bloqueRojo", "imagen/red1.png");
        this.load.image("bloqueAmarillo", "imagen/yellow1.png");
        this.load.image("ball", "imagen/ball1.png");*/
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



        //se crea los bloques
        this.enemigo = this.physics.add.staticGroup({
            key: ['enemigo'],
            frameQuantity: 3,
            gridAlign: { width: 70, height: 62, cellWidth: 62, cellHeight: 70, x: 400, y: 200 }
        });

        // se crea la pelota con sus fisicas
        /*this.ball = this.physics.add.image(400, 480, "ball").setCollideWorldBounds(true).setBounce(1);
        this.ball.setData('apagada', true);

        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        this.teclaA = this.input.keyboard.addKey(keyCodes.A);*/

        // se crea la nave
        this.nave = this.physics.add. sprite(150, 300, "nave").setImmovable();
        // se cancela la gravedad
        this.nave.body.allowGravity = false;
        this.nave.setCollideWorldBounds(true);
        // se agrega un objeto para mover la plataforma
        this.cursors = this.input.keyboard.createCursorKeys();




        /*this.physics.add.collider(this.ball, this.plataforms, this.contarColision, null, this);
        this.physics.add.collider(this.ball, this.bloques, this.colisionPelotaBloque, null, this);*/

        this.physics.world.setBoundsCollision(true);


        this.anims.create({
            key: 'up',
            frames: [ {key: 'nave' , frame: 2}],
            frameRate: 20
        });
        this.anims.create({
            key: 'turn',
            frames: [ {key: 'nave' , frame: 0}],
            frameRate: 20
        });
        this.anims.create({
            key: 'down',
            frames: [ {key: 'nave' , frame: 1}],
            frameRate: 20
        });
    }

    //Método que detecta colisión entre la pelota y los bloques
    /*colisionPelotaBloque(ball, bloques) {
        bloques.disableBody(true, true);
        this.aumentarPuntaje();
        if(this.bloques.countActive()===0){
            this.felicitar();
        }
       }
    felicitar(){
       this.sonido1.stop();
       this.puntaje=0;
       this.scene.start("Escene2");     
   }

    //Método que permite aumentar el puntaje
    aumentarPuntaje() {
        this.puntaje = this.puntaje + this.puntos;
        this.puntajeEnTexto.setText('Puntos: ' + this.puntaje);
        console.log(this.puntaje);
    }

    //Método que detecta colisión entre la pelota y la plataforma
    contarColision(ball, plataforms) {
        let lugarDeImpacto = ball.x - plataforms.x
        if (lugarDeImpacto > 0) {
            ball.setVelocityX(2 * lugarDeImpacto);
        } else if (lugarDeImpacto < 0) {
            ball.setVelocityX(2 * lugarDeImpacto);
        } else {
            ball.setVelocityX(Phaser.Math.Between(-10, 10))
        }
    }*/
    update() {
        //Movimientos laterales de la plataforma
        if (this.cursors.up.isDown) {
            this.nave.setVelocityY(-300);
            this.nave.anims.play('up', true)
        }
        else if (this.cursors.down.isDown) {
            this.nave.setVelocityY(300);
            this.nave.anims.play('down', true)
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
            this.nave.anims.play('turn')
        }
        /*if (this.ball.getData('apagada')) {
            this.ball.x = this.plataforms.x;

        }
        if (this.cursors.space.isDown && this.ball.getData('apagada', true)) {
            this.ball.setVelocity(50, -450);
            this.ball.setData('apagada', false);
        }
        if (this.ball.y > 600) {
            this.sonido1.stop();
            this.puntaje=0;
            this.mostrarGameover();
        }*/
    }

    /*mostrarGameover() {
        this.scene.start('GameOver')
    }*/
}

export default Escene;