import Phaser from "phaser";

var cantENEMIGOS = 20;
var score = 0;
var scoreText;
class Escene extends Phaser.Scene {
    constructor() {
        super({ key: 'Inicio' });
    }

    // Se emplean variables globales
    cursors = null;
    puntaje = 0;
    vida = 100;
    puntos = 10;
    sonido1 = null;
    disparo = null;

    preload() {
        this.load.image("fondo", "imagen/juegoPhaser/background.png");
        this.load.spritesheet("nave", "imagen/juegoPhaser/nave.png", { frameWidth: 69, frameHeight: 62 });
        this.load.image("enemy", "imagen/juegoPhaser/enemy.png");
        this.load.image("disparo", "imagen/juegoPhaser/shoot.png");
        this.load.audio('nivel1', 'sonido/2022/nivel1.mp3');
        this.load.audio('sonidoDisparo', 'sonido/2022/gunShot.mp3');
        this.load.audio('explosion', 'sonido/2022/explosion.mp3');
        this.load.audio('impacto', 'sonido/2022/impact.mp3');
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
        this.sonidoExplosion = this.sound.add('explosion'), {
            loop: false
        }
        this.sonidoImpacto = this.sound.add('impacto'), {
            loop: false
        }

        this.sonido1.play(soundConfig)

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
        this.nivel = this.add.text(725, 10, 'Nivel 1', {
            fontSize: '20px',
            fill: 'red',
            fontFamily: 'arial'
        });

        this.inputKeys = [this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)]
        // Se crea la nave
        this.nave = this.physics.add.sprite(150, 300, "nave").setImmovable();
        // Se cancela la gravedad
        this.nave.body.allowGravity = false;
        this.nave.setCollideWorldBounds(true);        
        //Se crea un disparo fuera del juego
        this.disparo = this.physics.add.sprite(0 , 900,'disparo').setImmovable();
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
        
        this.physics.add.collider(this.nave, this.enemys, this.destroyJugador, null, this);

    }

    disparar(){
        this.disparo = this.physics.add.sprite(this.nave.x+43 , this.nave.y,'disparo');
        this.disparo.setVelocityX(500);
        this.sonidoShot.play()        
    }


    createEnemy() {
        for (var i = 0; i < cantENEMIGOS; i++) {
            this.enemys.create(0, 600, "enemy");
        }
    };

    destroyEnemy(disparo, enemys) {
        this.sonidoExplosion.play()
        this.aumentarPuntaje();
        enemys.disableBody(true, true);
        disparo.disableBody(true);
        disparo.setActive(false);
        disparo.setVisible(false);
        
    }

    destroyJugador(nave, enemys) {
        this.sonidoImpacto.play()
        this.disminuirVida();
        enemys.disableBody(true, true);
    }

    reciclarEnemigos() {
        var distanciaX = 700;
        this.enemys.getChildren().forEach(
            (e) => {
                if (e.getBounds().right < 0) {
                    var randomY = Phaser.Math.Between(50, 550);
                    var distanciaEntreNaves = Phaser.Math.Between(50, 2000);
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

    //Método que permite disminuír la vida
    disminuirVida() {
        this.vida = this.vida - this.puntos * 2.5;
        this.vidaEnTexto.setText('Vida: ' + this.vida + ' %');
        console.log(this.vida);
        if(this.vida <= 0){
            this.nave.body.destroy();
            //this.scene.pause();
            this.sonido1.stop();
            this.mostrarGameover();
        }
    }
    
    felicitar(){
        this.sonido1.stop();
        this.puntaje=0;
        this.vida=100;
        this.scene.start("WinLv1");     
    }

    mostrarGameover() {
        this.sonido1.stop();
        this.puntaje=0;
        this.vida=100;
        this.scene.start('GameOver')
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
        
       

        this.physics.add.collider(this.disparo, this.enemys, this.destroyEnemy, null, this);

        this.inputKeys.forEach(key => {
            if (Phaser.Input.Keyboard.JustDown(key)) {
                this.disparar();
            }

        });
        this.physics.add.collider(this.disparo, this.enemys, this.destroyEnemy, null, this);

        if(this.puntaje == 150){
            this.felicitar();
        }
        if(this.disparo.x>800){
            this.disparo.disableBody(true);
            this.disparo.setActive(false);
            this.disparo.setVisible(false);
        }

    }
}

export default Escene;