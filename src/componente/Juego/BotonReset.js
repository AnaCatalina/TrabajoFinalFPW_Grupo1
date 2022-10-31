 export class BotonReset{
    constructor(escena){
        this.escenaR = escena;
    }
    precargar(){
        
        this.escenaR.load.spritesheet('boton','imagen/BotonReinicio.png',{frameWidth: 200 ,frameHeight: 79});
    }
    crear(){
        this.botoninicio = this.escenaR.add.sprite(400,500,'boton').setInteractive();

        this.botoninicio.on('pointerover', () => {
            this.botoninicio.setFrame(1);
        });

        this.botoninicio.on('pointerout', () => {
            this.botoninicio.setFrame(0);
        });

        this.botoninicio.on('pointerdown', () => {
            this.escenaR.scene.start('Inicio')

        });

    }
    crear2(){
        this.botoninicio = this.escenaR.add.sprite(400,500,'boton').setInteractive();

        this.botoninicio.on('pointerover', () => {
            this.botoninicio.setFrame(1);
        });

        this.botoninicio.on('pointerout', () => {
            this.botoninicio.setFrame(0);
        });

        this.botoninicio.on('pointerdown', () => {
            this.escenaR.scene.start('Escene2')

        });

    }


}
