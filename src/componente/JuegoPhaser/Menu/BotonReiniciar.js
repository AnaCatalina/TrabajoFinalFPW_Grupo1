export class BotonReset {
    constructor(escena) {
        this.escenaR = escena;
    }
    precargar() {

        this.escenaR.load.spritesheet('botonR', 'imagen/juegoPhaser/menu/BotonReinicio.png', { frameWidth: 200, frameHeight: 79 });
        this.escenaR.load.spritesheet('botonN', 'imagen/juegoPhaser/menu/BotonSiguienteNivel.png', { frameWidth: 200, frameHeight: 79 });
    }

    /*---Se crea los botenes de victoria al ganar el nivel 1 */
    crear() {
        this.botonReset = this.escenaR.add.sprite(250, 500, 'botonR').setInteractive();
        this.botonNext = this.escenaR.add.sprite(550, 500, 'botonN').setInteractive();

        this.botonReset.on('pointerover', () => {
            this.botonReset.setFrame(1);
        });

        this.botonReset.on('pointerout', () => {
            this.botonReset.setFrame(0);
        });

        this.botonNext.on('pointerover', () => {
            this.botonNext.setFrame(1);
        });

        this.botonNext.on('pointerout', () => {
            this.botonNext.setFrame(0);
        });

        this.botonReset.on('pointerdown', () => {
            this.escenaR.scene.start('Inicio')

        });
        this.botonNext.on('pointerdown', () => {
            this.escenaR.scene.start('Escene2')

        });

    }
    /*---Se crea los botenes de victoria al ganar el nivel 2 */
    crear2() {
        this.botonReset = this.escenaR.add.sprite(250, 500, 'botonR').setInteractive();
        this.botonNext = this.escenaR.add.sprite(550, 500, 'botonN').setInteractive();

        this.botonReset.on('pointerover', () => {
            this.botonReset.setFrame(1);
        });

        this.botonReset.on('pointerout', () => {
            this.botonReset.setFrame(0);
        });

        this.botonNext.on('pointerover', () => {
            this.botonNext.setFrame(1);
        });

        this.botonNext.on('pointerout', () => {
            this.botonNext.setFrame(0);
        });

        this.botonReset.on('pointerdown', () => {
            this.escenaR.scene.start('Escene2')

        });
        this.botonNext.on('pointerdown', () => {
            this.escenaR.scene.start('Escene3')

        });
    }
    /*---Se crea los botenes de victoria al ganar el nivel 3 */
    crear3() {
        this.botonReset = this.escenaR.add.sprite(250, 500, 'botonR').setInteractive();
        this.botonNext = this.escenaR.add.sprite(550, 500, 'botonN').setInteractive();

        this.botonReset.on('pointerover', () => {
            this.botonReset.setFrame(1);
        });

        this.botonReset.on('pointerout', () => {
            this.botonReset.setFrame(0);
        });

        this.botonNext.on('pointerover', () => {
            this.botonNext.setFrame(1);
        });

        this.botonNext.on('pointerout', () => {
            this.botonNext.setFrame(0);
        });

        this.botonReset.on('pointerdown', () => {
            this.escenaR.scene.start('Escene3')

        });
        this.botonNext.on('pointerdown', () => {
            this.escenaR.scene.start('Inicio')

        });

    }

    /*---Se crea los botenes de Game Over al perder el nivel 1 */
    crearGO() {
        this.botonReset = this.escenaR.add.sprite(400, 500, 'botonR').setInteractive();

        this.botonReset.on('pointerover', () => {
            this.botonReset.setFrame(1);
        });

        this.botonReset.on('pointerout', () => {
            this.botonReset.setFrame(0);
        });

        this.botonReset.on('pointerdown', () => {
            this.escenaR.scene.start('Inicio')

        });
    }
    /*---Se crea los botenes de Game Over al perder el nivel 2 */
    crearGO2() {
        this.botonReset = this.escenaR.add.sprite(400, 500, 'botonR').setInteractive();

        this.botonReset.on('pointerover', () => {
            this.botoninicio.setFrame(1);
        });

        this.botonReset.on('pointerout', () => {
            this.botoninicio.setFrame(0);
        });

        this.botonReset.on('pointerdown', () => {
            this.escenaR.scene.start('Escene2')

        });
    }
    /*---Se crea los botenes de Game Over al perder el nivel 3 */
    crearGO3() {
        this.botonReset = this.escenaR.add.sprite(400, 500, 'botonR').setInteractive();

        this.botonReset.on('pointerover', () => {
            this.botonReset.setFrame(1);
        });

        this.botonReset.on('pointerout', () => {
            this.botonReset.setFrame(0);
        });

        this.botonReset.on('pointerdown', () => {
            this.escenaR.scene.start('Escene3')

        });
    }
}

