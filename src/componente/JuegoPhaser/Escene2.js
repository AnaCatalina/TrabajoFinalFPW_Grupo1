import Phaser from "phaser";

var cantENEMIGOS = 20;
var score = 0;
var scoreText;
class Escene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Escene2' });
    }

    // Se emplean variables globales
    cursors = null;
    puntaje = 0;
    vida = 100;
    puntos = 10;
    disparo = null;

    preload() {
        this.load.image("fondo2", "imagen/juegoPhaser/background2.png");
        this.load.spritesheet("nave2", "imagen/juegoPhaser/nave2.png", { frameWidth: 69, frameHeight: 62 });
        this.load.image("enemy", "imagen/juegoPhaser/enemy.png");
        this.load.image("enemy2", "imagen/juegoPhaser/enemy2.png");
        this.load.image("disparo", "imagen/juegoPhaser/shoot.png");
        this.load.audio('nivel2', 'sonido/2022/nivel2.mp3');
        this.load.audio('sonidoDisparo', 'sonido/2022/gunShot.mp3');
        this.load.audio('explosion', 'sonido/2022/explosion.mp3');
        this.load.audio('impacto', 'sonido/2022/impact.mp3');
    }

    create() {
        // Creando el fondo
        this.background2 = this.add.tileSprite(400, 300, 800, 600, 'fondo2').
            setScrollFactor(0); // Esto nos permitira crear un fondo infinito
        // Sonido del nivel
        this.sonido2 = this.sound.add('nivel2');
        const soundConfig = {
            loop: true,
            volume: 0.3
        }
        // Efectos de sonidos del nivel
        this.sonidoShot = this.sound.add('sonidoDisparo'), {
            loop: false
        }
        this.sonidoExplosion = this.sound.add('explosion'), {
            loop: false
        }
        this.sonidoImpacto = this.sound.add('impacto'), {
            loop: false
        }
        // Se reproduce el sonido del nivel
        this.sonido2.play(soundConfig)
        // Muestra la puntuacion
        this.puntajeEnTexto = this.add.text(10, 10, 'Puntos: 0 / 300', {
            fontSize: '20px',
            fill: 'red',
            fontFamily: 'arial'
        });
        // Muestra la vida del jugador
        this.vidaEnTexto = this.add.text(10, 30, 'Vida: 100 %', {
            fontSize: '20px',
            fill: 'red',
            fontFamily: 'arial'
        });
        // Muestra el nivel actual 
        this.nivel = this.add.text(725, 10, 'Nivel 2', {
            fontSize: '20px',
            fill: 'red',
            fontFamily: 'arial'
        });
        //Se crean las teclas que se usaran
        this.inputKeys = [this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)]
        // Se crea la nave
        this.nave2 = this.physics.add.sprite(150, 300, "nave2").setImmovable();
        // Se cancela la gravedad
        this.nave2.body.allowGravity = false;
        //Colisiones con los bordes
        this.nave2.setCollideWorldBounds(true);
        //Se crea un disparo fuera del juego
        this.disparo = this.physics.add.sprite(0, 900, 'disparo').setImmovable();
        // Se agregan las flechas del teclado
        this.cursors = this.input.keyboard.createCursorKeys();
        //Fisicas del mundo
        this.physics.world.setBoundsCollision(true);
        //Se crean las animaciones que tendra la nave al estar quieta y al momento de desplazarse arriba y abajo
        this.anims.create({
            key: 'sube2',
            frames: [{ key: 'nave2', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'normal2',
            frames: [{ key: 'nave2', frame: 0 }],
            frameRate: 20
        })
        this.anims.create({
            key: 'baja2',
            frames: [{ key: 'nave2', frame: 1 }],
            frameRate: 20
        });
        //Se crean a los enemigos
        this.enemys = this.physics.add.group();
        //Se crean al 2do tipo de enemigos
        this.enemys2 = this.physics.add.group();
        //Metodos para crear a cada tipo de enemigo
        this.createEnemy();
        this.createEnemy2();

        //Se asigna la velocidad de las naves enemigas
        // Disminuímos la velocidad en x (hará que la nave enemiga se mueva hacia la izquierda)
        this.enemys.setVelocityX(-150);
        this.enemys2.setVelocityX(-250);
        //Se agregan las colisiones entre los enemigos con el jugador
        this.physics.add.collider(this.nave2, this.enemys, this.destroyJugador, null, this);
        this.physics.add.collider(this.nave2, this.enemys2, this.destroyJugador, null, this);
    }
    //Disparos de la nave del jugador
    disparar() {
        this.disparo = this.physics.add.sprite(this.nave2.x + 43, this.nave2.y, 'disparo');
        this.disparo.setVelocityX(500);
        this.sonidoShot.play({ volume: 0.5 })
    }
    //Metodo que crea los enemigos
    createEnemy() {
        for (var i = 0; i < cantENEMIGOS; i++) {
            this.enemys.create(0, 600, "enemy");
        }
    };
    //Se crean los enemigos tipo 2
    createEnemy2() {
        for (var i = 0; i < cantENEMIGOS; i++) {
            this.enemys2.create(0, 600, "enemy2");
        }
    };
    //Daño que recibe el enemigo tipo 1 de los disparos del jugador
    destroyEnemy(disparo, enemys) {
        this.sonidoExplosion.play({ volume: 0.3 })
        this.aumentarPuntaje();
        enemys.disableBody(true, true);
        disparo.disableBody(true, true);
    }
    //Daño que recibe el enemigo tipo 2 de los disparos del jugador
    destroyEnemy2(disparo, enemys2) {
        this.sonidoExplosion.play({ volume: 0.3 })
        this.aumentarPuntaje();
        enemys2.disableBody(true, true);
        disparo.disableBody(true, true);

    }
    //Daño que recibe el jugador del enemigo tipo 1
    destroyJugador(nave2, enemys) {
        this.sonidoImpacto.play({ volume: 0.5 })
        this.disminuirVida();
        enemys.disableBody(true, true);
    }
    //Daño que recibe el jugador del enemigo tipo 2
    destroyJugador(nave2, enemys2) {
        this.sonidoImpacto.play({ volume: 0.5 })
        this.disminuirVida();
        enemys2.disableBody(true, true);
    }
    //Devuelve a ambos tipos de enemigos una posicion aleatoria X positiva fuera del lienzo
    //cuando llegan a pasar el lienzo x negativo
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
        this.enemys2.getChildren().forEach(
            (e2) => {
                if (e2.getBounds().right < 0) {
                    var randomY2 = Phaser.Math.Between(50, 550);
                    var distanciaEntreNaves2 = Phaser.Math.Between(50, 2000);
                    e2.x = distanciaX + distanciaEntreNaves2;
                    e2.y = randomY2;
                }
            }
        )
    }

    //Método que permite aumentar el puntaje
    aumentarPuntaje() {
        this.puntaje = this.puntaje + this.puntos;
        this.puntajeEnTexto.setText('Puntos: ' + this.puntaje + ' / 300');
        //console.log(this.puntaje);
    }

    //Método que permite disminuír la vida
    disminuirVida() {
        this.vida = this.vida - this.puntos * 2.5;
        this.vidaEnTexto.setText('Vida: ' + this.vida + ' %');
        //console.log(this.vida);
        if (this.vida <= 0) {
            this.mostrarGameover();
        }
    }
    //Método que se ejecuta al ganar
    felicitar() {
        this.sonido2.stop();
        this.puntaje = 0;
        this.vida = 100;
        this.scene.start("WinLv2");
    }
    //Método que se ejecuta al perder
    mostrarGameover() {
        this.sonido2.stop();
        this.puntaje = 0;
        this.vida = 100;
        this.scene.start('GameOver2')
    }
    //crea las colisiones entre el disparo y los 2 tipos de enemigos
    crearColliders() {
        this.physics.add.collider(this.disparo, this.enemys, this.destroyEnemy, null, this);
        this.physics.add.collider(this.disparo, this.enemys2, this.destroyEnemy2, null, this);
    }
    //comportamiento de los disparos del jugador
    condicionarDisparos() {
        //Si el disparo de jugador se sale del lienzo se destruye
        if (this.disparo.x > 800) {
            this.disparo.disableBody(true);
            this.disparo.setActive(false);
            this.disparo.setVisible(false);
        }
    }


    update(time) {
        //Movimiento del escenario
        this.background2.tilePositionX = time * 0.1;
        //Movimiento de la nave
        if (this.cursors.up.isDown) {
            this.nave2.setVelocityY(-300);
            this.nave2.anims.play('sube2', true)
        }
        else if (this.cursors.down.isDown) {
            this.nave2.setVelocityY(300);
            this.nave2.anims.play('baja2', true)
        }
        else if (this.cursors.left.isDown) {
            this.nave2.setVelocityX(-300);
        }
        else if (this.cursors.right.isDown) {
            this.nave2.setVelocityX(300);
        }
        else {
            this.nave2.setVelocityY(0);
            this.nave2.setVelocityX(0);
            this.nave2.anims.play('normal2')
        }
        //llama a crear colisiones de cada bala
        this.crearColliders();
        //llama al comportamiento de los disparos
        this.condicionarDisparos();
        //llama al metodo para reposicionar a los enemigos
        this.reciclarEnemigos();
        //Cada vez que se presione Ctrl o Espacio
        this.inputKeys.forEach(key => {
            if (Phaser.Input.Keyboard.JustDown(key)) {
                this.disparar();
            }
        });
        //Condicion de Victoria
        if (this.puntaje == 300) {
            this.felicitar();
        }
    }
}

export default Escene2;