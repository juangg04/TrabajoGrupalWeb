import Jugador from "./Jugador.js";
class Nivel2Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Nivel2Scene" });
  }

  preload() {
    // Carga las imágenes
    this.load.image(
      "tilesheet",
      "src/Assets/Imagenes/Fondos/TrapmoorTileset_v03.png"
    );
    this.load.tilemapTiledJSON("map", "src/Assets/Niveles/segundonivel.json");
    this.load.spritesheet(
      "player",
      "src/Assets/Imagenes/Jugador/Jugador_CorrerAnimación_PosiciónEstatica_Golpear.png",
      { frameWidth: 81, frameHeight: 85 }
    );
  }

  create() {
    // Inicializa el mapa de tiles
    this.mapa = this.make.tilemap({ key: "map" });
    this.hojaTiles = this.mapa.addTilesetImage("Assets", "tilesheet");

    // Calcula el desplazamiento para centrar el mapa
    const offsetX = (this.cameras.main.width - this.mapa.widthInPixels) / 2;
    const offsetY =
      (this.cameras.main.height - this.mapa.heightInPixels) / 2 + 1300;

    // Crea las capas y establece su posición y profundidad
    this.capa1 = this.mapa
      .createLayer("Capa de patrones 1", this.hojaTiles, offsetX, offsetY)
      .setDepth(4);
    this.capa2 = this.mapa
      .createLayer("Capa de patrones 2", this.hojaTiles, offsetX, offsetY)
      .setDepth(3);
    this.capa5 = this.mapa
      .createLayer("Capa de patrones 5", this.hojaTiles, offsetX, offsetY)
      .setDepth(2); //Esta es la Capa que tiene que matar al colisionar
    this.capa3 = this.mapa
      .createLayer("Capa de patrones 3", this.hojaTiles, offsetX, offsetY)
      .setDepth(1);
    this.capa4 = this.mapa
      .createLayer("Capa de patrones 4", this.hojaTiles, offsetX, offsetY)
      .setDepth(0);

    // Crear instancia de jugador
    this.player = new Jugador(this, offsetX + 100, offsetY);
    this.player.setScale(0.6);

    // Habilitar las colisiones entre el jugador con el suelo y con la lava
    this.capa3.setCollisionBetween(1, 100, true, false, this.capa3);
    this.physics.add.collider(this.player, this.capa3);
    //this.capa5.setCollisionBetween(1, 100, true, false, this.capa5);
    //this.physics.add.collider(this.player, this.capa5);

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

export default Nivel2Scene;
