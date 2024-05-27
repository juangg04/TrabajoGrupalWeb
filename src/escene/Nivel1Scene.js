import Jugador from "./Jugador.js";

export default class Nivel1Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Nivel1Scene" });
  }

  preload() {
    // Carga del tileset
    this.load.image(
      "tilesets",
      "src/Assets/Imagenes/nature-paltformer-tileset-16x16.png"
    );
    // Carga del mapa en formato JSON
    this.load.tilemapTiledJSON("map", "src/Assets/Niveles/primermapa.json");
    // Personaje
    this.load.spritesheet(
      "player",
      "src/Assets/Imagenes/Jugador/Jugador_CorrerAnimación_PosiciónEstatica_Golpear.png",
      { frameWidth: 81, frameHeight: 85 }
    );
    // Sonido moneda
    this.load.audio("recogerSonido", "src/Assets/Audio/Sonido de moneda.mp3");
  }

  create() {
    // Inicializa el mapa de tiles
    this.mapa = this.make.tilemap({ key: "map" });

    // Añade el tileset al mapa
    const hojaTiles = this.mapa.addTilesetImage("Assets2", "tilesets");

    // Crea las capas del mapa
    this.capa1 = this.mapa.createLayer("Capa de patrones 1", hojaTiles);
    this.capa2 = this.mapa.createLayer("Capa de patrones 2", hojaTiles);
    this.capa3 = this.mapa.createLayer("Capa de patrones 3", hojaTiles);

    // Ajusta la cámara para que se adapte al tamaño del mapa
    this.cameras.main.setBounds(
      0,
      0,
      this.mapa.widthInPixels,
      this.mapa.heightInPixels
    );

    // Crear instancia de jugador
    this.player = new Jugador(this, 10, this.mapa.heightInPixels - 100);
    this.player.setScale(0.4);
    // Habilitar las colisiones entre el jugador y el suelo
    this.capa2.setCollisionBetween(1, 100, true, false, this.capa2);
    this.physics.add.collider(this.player, this.capa2);

    // Obtener cursores
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // Actualizar jugador
    this.player.update(this.cursors);

    // Centrar la cámara en el jugador
    this.cameras.main.scrollX = this.player.x - this.cameras.main.width / 2;
    this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2;
  }
}
