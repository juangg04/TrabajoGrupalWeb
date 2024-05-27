import Jugador from "./Jugador.js";
import CapaMoneda from "./CapaMoneda.js";

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
    // Moneda
    this.load.image("moneda", "src/Assets/Imagenes/Moneda.png");
    // Powerup gravedad
    this.load.image("powerupGravedad", "src/Assets/Imagenes/gravitySwapper.png");
    // Powerup martillo
    this.load.image("powerupMartillo", "src/Assets/Imagenes/hammer.png");
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
    this.add.existing(this.player); // Asegurar que el jugador se añada a la escena
    this.player.setScale(0.6);
    // Habilitar las colisiones entre el jugador y el suelo
    this.capa2.setCollisionBetween(1, 100, true, false, this.capa2);
    this.physics.add.collider(this.player, this.capa2);

    // Obtener cursores
    this.cursors = this.input.keyboard.createCursorKeys();

    // Crear un grupo de monedas
    this.monedas = this.physics.add.group();

    // Iterar sobre los tiles de la capa 3 y crear monedas donde corresponda
    this.capa3.forEachTile(tile => {
      if (tile.index === 55) {
        const x = tile.getCenterX();
        const y = tile.getCenterY();
        const moneda = new CapaMoneda(this, x, y);
        this.monedas.add(moneda);
        // Quitar el tile de la capa para que no sea visible
        this.capa3.removeTileAt(tile.x, tile.y);
      }
    });

    // Añadir colisión entre el jugador y las monedas
    this.physics.add.overlap(this.player, this.monedas, this.recogerMoneda, null, this);

    // Crear un grupo de powerups de gravedad
    this.powerupsGravedad = this.physics.add.group();

    // Crear powerup de gravedad y agregarlo al grupo
    const powerupGravedad = this.powerupsGravedad.create(456, 2521, 'powerupGravedad');
    powerupGravedad.body.allowGravity = false;

    // Habilitar colisión entre el jugador y los powerups de gravedad
    this.physics.add.overlap(this.player, this.powerupsGravedad, this.activarGravedad, null, this);

    // Cargar el sonido de recoger moneda
    this.recogerSonido = this.sound.add("recogerSonido");
  }

  update() {
    // Actualizar jugador
    this.player.update(this.cursors);

    // Centrar la cámara en el jugador
    this.cameras.main.scrollX = this.player.x - this.cameras.main.width / 2;
    this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2;

    if (this.player.x < 0) {
      this.player.x = 0;
    }

    if (this.player.x > 475) {
      this.player.x = 475;
    }
  }

  recogerMoneda(player, moneda) {
    this.recogerSonido.play(); // Reproducir el sonido de recogida de moneda
    moneda.destroy(); // Destruir la moneda
  }

  activarGravedad(player, powerupGravedad) {
    player.gravedadInvertida = !player.gravedadInvertida;
    this.physics.world.gravity.y *= -1;
    powerupGravedad.destroy(); 
  }
}
