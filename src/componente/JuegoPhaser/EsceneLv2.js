import Phaser from "phaser";
import GrupoDisparos from "./GrupoDisparos";

const cantENEMIGOS = 10;
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
        this.load.image("fondo", "imagen/juegoPhaser/background2.jpg");
        this.load.spritesheet("nave", "imagen/juegoPhaser/nave2.png", {frameWidth: 69, frameHeight: 62});
        this.load.image("enemy", "imagen/juegoPhaser/enemy.png");
        this.load.image("disparo", "imagen/juegoPhaser/shoot.png");
        this.load.audio('nivel1', 'sonido/level1.mp3');
    }

    create() {
        //creando el fondo
        this.background2 = this.add.tileSprite(400, 300, 800, 600, 'fondo').
        setScrollFactor(0);//esto nos permitira crear un fondo infinito

        this.sonido2 = this.sound.add('nivel2');
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
        this.nave = this.physics.add. sprite(150, 300, "nave2").setImmovable();
        // se cancela la gravedad
        this.nave.body.allowGravity = false;
        this.nave.setCollideWorldBounds(true);
        // se agrega un objeto para mover la plataforma
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBoundsCollision(true);


        this.anims.create({
            key: 'sube',
            frames: [ {key: 'nave2' , frame: 2}],
            frameRate: 20
        });
        this.anims.create({
            key: 'normal',
            frames: [ {key: 'nave2' , frame: 0}],
            frameRate: 20
        })
        this.anims.create({
            key: 'baja',
            frames: [ {key: 'nave2' , frame: 1}],
            frameRate: 20
        });

        //this.time.delayedCall(5000, this.createEnemy(), [], this);

        //while(puntaje <= 100){
        //    this.createEnemy()
        //}

        //for (let i = 0; i < cantENEMIGOS; i++){
            //this.createEnemy()
        //}

        this.createEnemy()

    }

    disparar(){
        this.disparo.realizarDisparo(this.nave.x+43 , this.nave2.y)
    }

    createEnemy() {

        this.enemys = this.physics.add.group();
        
        
        for (let i = 0; i < cantENEMIGOS; i++){
            // Se crea una variable randomY que almacenará un valor entre 30 y 550
           
            this.enemys.create(0, 0, "enemy");

        }
        // Se crea la nave enemiga
        //this.enemy = this.physics.add.sprite(distanciaX + i * 100, randomY, "enemy").setImmovable();
        // Se cancela la gravedad
        //this.enemys.body.allowGravity = false;
        // Se cancela el choque contra bordes
        //this.enemy.setCollideWorldBounds(false);
        // Disminuímos la velocidad en x (hará que la nave enemiga se mueva hacia la izquierda)
        this.enemys.setVelocityX(-150);
        // Detectamos cuando la nave enemiga sale de la pantalla
        //this.enemy.checkWorldBounds = true;
        // ... Y luego lo eliminamos
        //this.enemy.outOfBoundsKill = true;
        // Cada 2000 milisegundos llamaremos de nuevo a esta función para que genere un nuevo enemigo
        //this.time.delayedCall(5000, this.enemy, [], this);
    };

    reciclarEnemigos(){
        const enemigosTemporales = [];
        var distanciaX = 900;
        //var randomY = Phaser.Math.Between(30,550);
        this.enemys.getChildren().forEach(
            (enemy) => {
                //enemigosTemporales.push(enemigo);
                var randomY = Phaser.Math.Between(30,550);
                enemy.x = distanciaX;
                enemy.y = randomY;
            }
        )
    }

    update(time) {
        this.background2.tilePositionX = time*0.1;
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
            if(Phaser.Input.Keyboard.JustDown(key)){
                this.disparar();
            }
            
        });

    }
}

export default Escene;