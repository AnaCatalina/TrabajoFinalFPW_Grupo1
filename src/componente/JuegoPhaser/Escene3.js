import Phaser from "phaser";

var cantENEMIGOS = 15;
var score = 0;
var scoreText;
var velBossY = 400;
var cooldown = false;
class Escene3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Escene3' });
    }

    // Se emplean variables globales
    cursors = null;
    puntaje = 0;
    vida = 100;
    vidaJefe = 100;
    puntos = 10;
    disparo = null;
    

    preload() {
        this.load.image("fondo3", "imagen/juegoPhaser/background3.png");
        this.load.spritesheet("nave3", "imagen/juegoPhaser/nave3.png", { frameWidth: 69, frameHeight: 62 });
        this.load.image("boss", "imagen/juegoPhaser/boss.png");
        this.load.image("disparo", "imagen/juegoPhaser/shoot.png");
        this.load.image("disparoJefe", "imagen/juegoPhaser/shootBoss.png");
        this.load.audio('nivel3', 'sonido/2022/nivel3.mp3');
        this.load.audio('sonidoDisparo', 'sonido/2022/gunShot.mp3');
        this.load.audio('explosion', 'sonido/2022/explosion.mp3');    
        this.load.audio('impacto', 'sonido/2022/impact.mp3');    
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

        this.vidaJefeEnTexto = this.add.text(650, 30, 'Boss: 100 %', {
            fontSize: '20px',
            fill: 'red',
            fontFamily: 'arial'
        });

        this.nivel = this.add.text(725, 10, 'Nivel 3', {
            fontSize: '20px',
            fill: 'red',
            fontFamily: 'arial'
        });

        this.inputKeys = [this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)]
        // Se crea la nave
        this.nave3 = this.physics.add.sprite(150, 300, "nave3").setImmovable(); 
        // Se cancela la gravedad
        this.nave3.body.allowGravity = false;
        this.nave3.setCollideWorldBounds(true);    
        this.jefe = this.physics.add.sprite(700, 300, "boss").setImmovable();
        //Se crea un disparo de Jefe fuera del juego
        this.disparoDeJefe = this.physics.add.sprite(-100,-100,'disparoJefe')        
        //Se crea un disparo fuera del juego
        this.disparo = this.physics.add.sprite(0 , 900,'disparo').setImmovable();
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
    }

    moverJefe(){
        this.jefe.setVelocityY(velBossY);
        if(this.jefe.y>=600){
            velBossY = -400;
        }
        if(this.jefe.y<=0){
            velBossY = 400;
        }
    }
    dispararJefe(){
        this.disparoDeJefe = this.physics.add.sprite(this.jefe.x,this.jefe.y,'disparoJefe').setImmovable();        
        this.disparoDeJefe.setVelocityX(Phaser.Math.Between((-300),(-500)));
        this.disparoDeJefe.setVelocityY((Phaser.Math.Between((-1),(1)))*30);
        cooldown = true;        
    }

    disparar(){
        this.disparo = this.physics.add.sprite(this.nave3.x+43 , this.nave3.y,'disparo');
        this.disparo.setVelocityX(500);
        this.sonidoShot.play()
    }

    destroyJugador(nave3, disparoDeJefe) {
        this.sonidoImpacto.play()
        this.disminuirVida();
        disparoDeJefe.disableBody(true);
        disparoDeJefe.setVisible(false)
        cooldown=false;
    }

    destroyJefe(jefe, disparo) {
        this.sonidoExplosion.play()
        this.aumentarPuntaje();
        disparo.disableBody(true);
        disparo.setActive(false);
        disparo.setVisible(false);
        cooldown=false;
    }

    //Método que permite aumentar el puntaje
    aumentarPuntaje() {
        this.puntaje = this.puntaje + this.puntos;
        this.puntajeEnTexto.setText('Puntos: ' + this.puntaje);
        //console.log(this.puntaje);
    }

    //Método que permite disminuír la vida
    disminuirVida() {
        this.vida = this.vida - 25;
        this.vidaEnTexto.setText('Vida: ' + this.vida + ' %');
        //console.log(this.vida);
        if(this.vida <= 0){
            this.mostrarGameover();
        }
    }

    disminuirVidaJefe() {
        this.vidaJefe = this.vidaJefe - 2;
        this.vidaJefeEnTexto.setText('Boss: ' + this.vidaJefe + ' %');
        //console.log(this.vida);
        if(this.vidaJefe <= 0){
            this.felicitar();
        }
    }
    
    felicitar(){
        this.sonido3.stop();
        this.puntaje=0;
        this.vida=100;
        this.vidaJefe=100;
        this.scene.start("WinLv1");     
    }

    mostrarGameover() {
        this.sonido3.stop();
        this.puntaje=0;
        this.vida=100;
        this.vidaJefe=100;
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
            }

        });

        this.physics.add.collider(this.nave3, this.disparoDeJefe, this.destroyJugador, null, this);
        this.physics.add.collider(this.disparo, this.jefe, this.disminuirVidaJefe, null, this);
        this.moverJefe();
        
        if(cooldown==false){
            this.dispararJefe();
        }
        this.physics.add.collider(this.disparo, this.enemys, this.destroyEnemy, null, this);
        if((this.disparoDeJefe.x<400)||(this.disparoDeJefe.x<200)){
            cooldown = false;
        }
        if(this.disparo.x>800){
            this.disparo.disableBody(true);
            this.disparo.setActive(false);
            this.disparo.setVisible(false);
        }
        if(this.disparoDeJefe.x<0){
            this.disparoDeJefe.disableBody(true);
            this.disparoDeJefe.setActive(false);
            this.disparoDeJefe.setVisible(false);
        }
    }
}

export default Escene3;