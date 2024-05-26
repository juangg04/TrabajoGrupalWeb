export default class Nivel1Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Nivel1Scene' });
    }

    preload() {
        // Carga del tileset
        this.load.image("tilesets", "src/Assets/Imagenes/nature-paltformer-tileset-16x16.png");
        // Carga del mapa en formato JSON
        this.load.tilemapTiledJSON("map", "src/Assets/Niveles/primermapa.json");
    }

    create() {
        // Inicializa el mapa de tiles
        this.mapa = this.make.tilemap({ key: 'map' });

        // Añade el tileset al mapa
        const hojaTiles = this.mapa.addTilesetImage("Assets2", "tilesets");

        // Calcula el desplazamiento para centrar el mapa
        const offsetX = (this.cameras.main.width - this.mapa.widthInPixels) / 2 -50;
        const offsetY = (this.cameras.main.height - this.mapa.heightInPixels) / 2;

        // Crea las capas del mapa
        this.Capa1 = this.mapa.createLayer("Capa de patrones 1", hojaTiles, offsetX, offsetY);
        this.Capa2 = this.mapa.createLayer("Capa de patrones 2", hojaTiles, offsetX, offsetY);
        this.Capa3 = this.mapa.createLayer("Capa de patrones 3", hojaTiles, offsetX, offsetY);

        // Ajusta la cámara para que se adapte al tamaño del mapa
        this.cameras.main.setBounds(0, 0, this.mapa.widthInPixels, this.mapa.heightInPixels);
        this.cameras.main.centerOn(this.mapa.widthInPixels / 2, this.mapa.heightInPixels / 2);
    }
}
