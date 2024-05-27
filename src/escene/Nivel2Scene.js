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
    // Carga la imagen de la bandera
    this.load.image("bandera", "src/Assets/Imagenes/bandera.png");
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

    // Habilitar las colisiones con el jugador
    this.capa3.setCollisionBetween(1, 100, true, false, this.capa3);
    this.physics.add.collider(this.player, this.capa3);
    this.capa5.setCollisionBetween(1, 100, true, false, this.capa5);
    this.physics.add.collider(this.player, this.capa5, this.morir, null, this);

    // Obtener cursores
    this.cursors = this.input.keyboard.createCursorKeys();

    // Crear bandera y agregarla al juego
    this.bandera = this.physics.add.staticImage(offsetX + 100, 3080, "bandera");
    this.bandera.setScale(0.1); // Ajustar la escala de la bandera
    this.bandera.refreshBody(); // Actualizar el cuerpo físico de la bandera

    // Habilitar colisión entre el jugador y la bandera
    this.physics.add.overlap(
      this.player,
      this.bandera,
      this.nivelCompletado,
      null,
      this
    );
  }

  update() {
    // Actualizar jugador
    this.player.update(this.cursors);

    // Centrar la cámara en el jugador
    this.cameras.main.scrollX = this.player.x - this.cameras.main.width / 2;
    this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2;

    if (this.player.x < 180) {
      this.player.x = 180;
    }

    if (this.player.x > 610) {
      this.player.x = 610;
    }
  }

  morir(player, capa5) {
    const offsetX = (this.cameras.main.width - this.mapa.widthInPixels) / 2;
    const offsetY =
      (this.cameras.main.height - this.mapa.heightInPixels) / 2 + 1300;
    player.x = offsetX + 100;
    player.y = offsetY;
    //Aqui un contador de muertes
  }

  nivelCompletado(player, bandera) {
    this.destroy();
    this.scene.start("LevelSelectScene");
    // this.game.global.isLevel2Completed = true;
  }
}

export default Nivel2Scene;
