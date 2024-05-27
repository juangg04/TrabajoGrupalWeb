// src/escene/MainMenuScene.js
export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        for (let i = 0; i < 8; i++) {
            this.load.image(`frame${i}`, `./src/Assets/Imagenes/Fondos/Background/frame${i}.png`);
        }
        this.load.audio('backgroundMusic', './src/Assets/Audio/MusicaVideojuego.MP3');
    }

    create() {
        if (!this.game.global) {
            this.game.global = {};
        }

        const frames = [];
        for (let i = 0; i < 8; i++) { // Asegúrate de que el número de frames coincida con los cargados
            frames.push({ key: `frame${i}` });
        }

        this.anims.create({
            key: 'backgroundAnim',
            frames: frames,
            frameRate: 10,
            repeat: -1
        });

        const background = this.add.sprite(400, 300, 'frame0').play('backgroundAnim');
        background.setDisplaySize(800, 600);

        const playText = this.add.text(400, 300, 'Jugar', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Roboto'
        }).setOrigin(0.5);

        const configText = this.add.text(400, 400, 'Configuración', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Roboto'
        }).setOrigin(0.5);

        playText.setInteractive();
        playText.on('pointerdown', () => {
            this.scene.start('PrimerNivel'); // Inicia la escena de Nivel 1
        });

        configText.setInteractive();
        configText.on('pointerdown', () => {
            this.scene.start('SettingsScene');
        });

        if (!this.game.global.music || this.game.global.music.isPaused) {
            this.music = this.sound.add('backgroundMusic');
            this.music.play({
                loop: true,
                volume: 0.5
            });

            this.game.global.music = this.music;
        }
    }

    update() {
        // Lógica de actualización si es necesario
    }
}