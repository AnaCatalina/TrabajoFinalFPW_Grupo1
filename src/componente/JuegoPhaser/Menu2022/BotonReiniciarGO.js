export class BotonResetGO{
    constructor(escena){
        this.escenaRst = escena;
    }
    precargar(){
        
        this.escenaRst.load.spritesheet('boton','imagen/juegoPhaser/menu/BotonReinicio.png',{frameWidth: 200 ,frameHeight: 79});
    }
    crear(){
        this.botoninicio = this.escenaRst.add.sprite(400,500,'boton').setInteractive();

        this.botoninicio.on('pointerover', () => {
            this.botoninicio.setFrame(1);
        });

        this.botoninicio.on('pointerout', () => {
            this.botoninicio.setFrame(0);
        });

        this.botoninicio.on('pointerdown', () => {
            this.escenaRst.scene.start('Inicio')

        });

    }
}
