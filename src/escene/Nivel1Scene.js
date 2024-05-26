// src/escene/Nivel1Scene.js
export default class Nivel1Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Nivel1Scene' });
    }

    preload() {
        this.load.image("tilesheet1", "src/Assets/Imagenes/Fondos/Fondo.jpg");
        this.load.image("tilesheet2", "src/Assets/Imagenes/Plataformas/PlataformaIzquierda.png");
        this.load.image("tilesheet3", "src/Assets/Imagenes/Plataformas/PlataformaMedia.png");
        this.load.image("tilesheet4", "src/Assets/Imagenes/Plataformas/Suelo.png");
        this.load.image("tilesheet5", "src/Assets/Imagenes/Fondos/Fondo1.jpg");
        this.load.tilemapTiledJSON("map", "src/Assets/Niveles/primernivel.json");
    }

    create() {
        this.mapa = this.make.tilemap({ key: 'map' });

        const tileset1 = this.mapa.addTilesetImage("Fondo2", "tilesheet1");
        const tileset2 = this.mapa.addTilesetImage("PlataformaIzquierda", "tilesheet2");
        const tileset3 = this.mapa.addTilesetImage("PlataformaMedia", "tilesheet3");
        const tileset4 = this.mapa.addTilesetImage("Suelo", "tilesheet4");
        const tileset5 = this.mapa.addTilesetImage("Fondo1", "tilesheet5");

        const offsetX = (this.cameras.main.width - this.mapa.widthInPixels) / 2;
        const offsetY = (this.cameras.main.height - this.mapa.heightInPixels) / 2;

        this.Capa1 = this.mapa.createLayer("Capa de patrones 1", [tileset1, tileset5], offsetX, offsetY);
        this.Capa2 = this.mapa.createLayer("Capa de patrones 2", [tileset2, tileset3, tileset4, tileset5], offsetX, offsetY);
    }
}
