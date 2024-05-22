export default class SettingsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SettingsScene' });
    }

    preload() {
        for (let i = 0; i < 10; i++) {
            this.load.image(`frame${i}`, `./src/Assets/Imagenes/Fondos/Background/frame${i}.png`);
        }
    }

    create() {
        const frames = [];
        for (let i = 0; i < 10; i++) {
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

        const settingsText = this.add.text(400, 100, 'Configuración', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Roboto'
        }).setOrigin(0.5);

        const volumeText = this.add.text(400, 200, 'Volumen de la Música', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Roboto'
        }).setOrigin(0.5);

        const volumeSlider = this.add.graphics();
        this.updateVolumeSlider(volumeSlider, 0.5);

        const volumeSliderInteractive = this.add.rectangle(400, 250, 200, 20, 0xffffff, 0.5).setInteractive();
        volumeSliderInteractive.on('pointermove', (pointer) => {
            if (pointer.isDown) {
                const newVolume = Phaser.Math.Clamp((pointer.x - 300) / 200, 0, 1);
                this.updateVolumeSlider(volumeSlider, newVolume);
                this.game.global.music.setVolume(newVolume);
            }
        });

        const backButton = this.add.text(400, 500, 'Volver', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Roboto'
        }).setOrigin(0.5).setInteractive();

        backButton.on('pointerdown', () => {
            this.scene.start('MainMenuScene');
        });
    }

    updateVolumeSlider(graphics, volume) {
        graphics.clear();
        graphics.fillStyle(0x888888);
        graphics.fillRect(300, 250, 200, 20);
        graphics.fillStyle(0xffffff);
        graphics.fillRect(300, 250, volume * 200, 20);
    }
}