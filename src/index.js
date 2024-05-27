import MainMenuScene from "./escene/MainMenuScene.js";
import SettingsScene from "./escene/SettingsScene.js";
import PrimerNivel from "./escene/PrimerNivel.js";
import LevelSelectScene from "./escene/LevelSelectScene.js";
import Nivel1Scene from "./escene/Nivel1Scene.js";
import Nivel2Scene from "./escene/Nivel2Scene.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [
    MainMenuScene,
    SettingsScene,
    PrimerNivel,
    LevelSelectScene,
    Nivel1Scene,
    Nivel2Scene,
  ],
};

const game = new Phaser.Game(config);

// Crear una propiedad global para almacenar datos compartidos
game.global = {
  isLevel1Completed: boolean,
  isLevel2Completed: booelan,
};
