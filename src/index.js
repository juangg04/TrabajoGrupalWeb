// src/index.js
import MainMenuScene from './escene/MainMenuScene.js';
import SettingsScene from './escene/SettingsScene.js';
import Nivel1Scene from './escene/Nivel1Scene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [MainMenuScene, SettingsScene, Nivel1Scene] // Ensure Nivel1Scene is added here
};

const game = new Phaser.Game(config);

// Crear una propiedad global para almacenar datos compartidos
game.global = {};
