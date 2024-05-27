// PrimerNivel.js
import Jugador from './Jugador.js'; // Corrige la ruta de importación

class PrimerNivel extends Phaser.Scene {
    constructor() {
        super({ key: 'PrimerNivel' });
    }

    preload() {
        console.log('Preloading assets in PrimerNivel');
        // Cargar la imagen del fondo
        this.load.image('background', 'src/Assets/Imagenes/Fondos/FondoPNG.png');
        this.load.spritesheet('player', 'src/Assets/Imagenes/Jugador/Jugador_CorrerAnimación_PosiciónEstatica_Golpear.png', { frameWidth: 81, frameHeight: 85 });
    }

    create() {
        console.log('Creating PrimerNivel scene:', this);
        // Calcular el factor de escala para la imagen del fondo
        const scaleFactor = 800 / this.textures.get('background').getSourceImage().width;
        const backgroundHeight = this.textures.get('background').getSourceImage().height * scaleFactor;

        // Crear varias instancias del fondo y ajustarlas para que tengan la misma resolución
        for (let i = 0; i < 5; i++) {
            let background = this.add.image(400, 600 - (i * backgroundHeight), 'background');
            background.setOrigin(0.5, 1); // Establecer el origen en la parte inferior para que se apile correctamente
            background.setScale(scaleFactor);
        }

        // Crear instancia de jugador
        this.player = new Jugador(this, 100, 450);

        // Obtener cursores
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // Lógica de actualización si es necesario
        // Actualizar jugador
        this.player.update(this.cursors);
    }
}

export default PrimerNivel; // Exportar la clase PrimerNivel como predeterminada