// Plataformas.js
export default class Plataformas extends Phaser.Scene {
    constructor() {
        super({ key: 'Plataformas' });
    }

    preload() {
        // Cargar la imagen del suelo
        this.load.image('suelo', 'src/Assets/Imagenes/Plataformas/Suelo.png');
    }

    create() {
        // Colocar la imagen del suelo
        const suelo = this.add.image(400, 600, 'suelo'); // Posición (400, 600)
        suelo.setOrigin(-1, 1); // Establecer el origen en la parte inferior para que esté alineado con la parte inferior de la pantalla
    }
}