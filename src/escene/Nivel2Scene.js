// src/escene/Nivel2Scene.js
class Nivel2Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Nivel2Scene' });
    }

    preload() {
        // Carga las imágenes
        this.load.image("tilesheet", "src/Assets/Imagenes/Fondos/TrapmoorTileset_v03.png");
        this.load.tilemapTiledJSON("map", "src/Assets/Niveles/segundonivel.json");
    }

    create() {
        // Inicializa el mapa de tiles
        this.mapa = this.make.tilemap({ key: 'map' });
        this.hojaTiles = this.mapa.addTilesetImage("Assets", "tilesheet");

        // Calcula el desplazamiento para centrar el mapa
        const offsetX = (this.cameras.main.width - this.mapa.widthInPixels) / 2;
        const offsetY = (this.cameras.main.height - this.mapa.heightInPixels) / 2 + 1300;

        // Crea las capas y establece su posición y profundidad
        this.Capa1 = this.mapa.createLayer("Capa de patrones 1", this.hojaTiles, offsetX, offsetY).setDepth(4);
        this.Capa2 = this.mapa.createLayer("Capa de patrones 2", this.hojaTiles, offsetX, offsetY).setDepth(3);
        this.Capa5 = this.mapa.createLayer("Capa de patrones 5", this.hojaTiles, offsetX, offsetY).setDepth(2); //Esta es la capa que tiene que matar al colisionar
        this.Capa3 = this.mapa.createLayer("Capa de patrones 3", this.hojaTiles, offsetX, offsetY).setDepth(1);
        this.Capa4 = this.mapa.createLayer("Capa de patrones 4", this.hojaTiles, offsetX, offsetY).setDepth(0);
    }
}

export default Nivel2Scene;
