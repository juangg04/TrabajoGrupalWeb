
import MainMenuScene from './escene/MainMenuScene.js';
import SettingsScene from './escene/SettingsScene.js';
import PrimerNivel from './escene/PrimerNivel.js'; // Asegúrate de importar correctamente


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [MainMenuScene, SettingsScene, PrimerNivel,] // Asegúrate de que PrimerNivel esté en la configuración
};

const game = new Phaser.Game(config);

// Crear una propiedad global para almacenar datos compartidos
game.global = {};