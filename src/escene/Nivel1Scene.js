// src/escene/Nivel1Scene.js
export default class Nivel1Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Nivel1Scene' });
    }

    preload() {
        this.load.image("tilesheet1", "src/Assets/Imagenes/Fondos/Fondo1.jpg");
        this.load.tilemapTiledJSON("map", "src/Assets/Niveles/primernivel.json");
    }

    create() {
        try {
            this.mapa = this.make.tilemap({ key: 'map' });
            console.log('Mapa:', this.mapa);

            const tileset1 = this.mapa.addTilesetImage("Fondo1", "tilesheet1");
            console.log('Tileset1:', tileset1);

            if (!tileset1) {
                console.error("Error al cargar el tileset");
                return;
            }

            const offsetX = (this.cameras.main.width - this.mapa.widthInPixels) / 2;
            const offsetY = (this.cameras.main.height - this.mapa.heightInPixels) / 2;

            this.Capa1 = this.mapa.createLayer("Capa de patrones 1", tileset1, offsetX, offsetY);
            console.log('Capa1:', this.Capa1);

            if (!this.Capa1) {
                console.error("Error al crear la capa");
            }
        } catch (e) {
            console.error('Error en la creación del mapa o capa:', e);
        }
    }
}