// src/scenes/MainMenuScene.js
export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenuScene" });
  }

  preload() {
    for (let i = 0; i < 8; i++) {
      this.load.image(
        `frame${i}`,
        `./src/Assets/Imagenes/Fondos/Background/frame${i}.png`
      );
    }
    this.load.audio(
      "backgroundMusic",
      "./src/Assets/Audio/MusicaVideojuego.MP3"
    );
  }

  create() {
    if (!this.game.global) {
      this.game.global = {};
      this.game.global.isLevel1Completed = false;
      this.game.global.isLevel2Completed = false;
    }

    const frames = [];
    for (let i = 0; i < 8; i++) {
      frames.push({ key: `frame${i}` });
    }

    this.anims.create({
      key: "backgroundAnim",
      frames: frames,
      frameRate: 10,
      repeat: -1,
    });

    // Crear el fondo animado y centrarlo
    const background = this.add
      .sprite(this.scale.width / 2, this.scale.height / 2, "frame0")
      .play("backgroundAnim");
    background.setDisplaySize(this.scale.width, this.scale.height);

    // Crear y centrar los textos
    const playText = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "Jugar", {
        fontSize: "32px",
        fill: "#fff",
        fontFamily: "Roboto",
      })
      .setOrigin(0.5);

    const configText = this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2 + 100,
        "Configuración",
        {
          fontSize: "32px",
          fill: "#fff",
          fontFamily: "Roboto",
        }
      )
      .setOrigin(0.5);

    // Hacer los textos interactivos y definir las acciones
    playText.setInteractive();
    playText.on("pointerdown", () => {
      this.scene.start("LevelSelectScene"); // Inicia la escena de selección de nivel
    });

    configText.setInteractive();
    configText.on("pointerdown", () => {
      this.scene.start("SettingsScene");
    });

    // Reproducir música de fondo si no está reproduciéndose
    if (!this.game.global.music || this.game.global.music.isPaused) {
      this.music = this.sound.add("backgroundMusic");
      this.music.play({
        loop: true,
        volume: 0.5,
      });

      this.game.global.music = this.music;
    }
  }

  update() {
    // Lógica de actualización si es necesario
  }
}
