// src/scenes/LevelSelectScene.js
export default class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: "LevelSelectScene" });
  }

  preload() {
    // Cargar los assets necesarios
    for (let i = 0; i < 8; i++) {
      this.load.image(
        `frame${i}`,
        `./src/Assets/Imagenes/Fondos/Background/frame${i}.png`
      );
    }
  }

  create() {
    // Crear la animación de fondo
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

    // Crear los textos de los niveles y hacerlos interactivos
    const level1Text = this.add
      .text(this.scale.width / 2, this.scale.height / 2 - 50, "Nivel 1", {
        fontSize: "32px",
        fill: "#fff",
        fontFamily: "Roboto",
      })
      .setOrigin(0.5);

    const specialLevelText = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "Nivel Especial", {
        fontSize: "32px",
        fill: "#fff",
        fontFamily: "Roboto",
      })
      .setOrigin(0.5);

    const level2Text = this.add
      .text(this.scale.width / 2, this.scale.height / 2 + 50, "Nivel 2", {
        fontSize: "32px",
        fill: "#fff",
        fontFamily: "Roboto",
      })
      .setOrigin(0.5);

    level1Text.setInteractive();
    level1Text.on("pointerdown", () => {
      this.scene.start("Nivel1Scene");
    });

    specialLevelText.setInteractive();
    specialLevelText.on("pointerdown", () => {
      this.scene.start("PrimerNivel");
    });

    level2Text.setInteractive();
    level2Text.on("pointerdown", () => {
      this.scene.start("Nivel2Scene");
    });
  }

  update() {
    // Lógica de actualización si es necesario
  }
}
