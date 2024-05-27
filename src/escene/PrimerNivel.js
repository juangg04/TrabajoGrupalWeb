import Jugador from "./Jugador.js"; // Corrige la ruta de importación

class PrimerNivel extends Phaser.Scene {
  constructor() {
    super({ key: "PrimerNivel" });
    this.plataformasGeneradas = 0; // Variable de conteo para las plataformas generadas
    this.plataformas = []; // Array para almacenar las plataformas generadas
    this.totalMonedas = 20; // Total de monedas
    this.monedasRecogidas = 0; // Contador de monedas recogidas
  }

  preload() {
    console.log("Preloading assets in PrimerNivel");
    // Cargar la imagen del fondo
    this.load.image("background", "src/Assets/Imagenes/Fondos/FondoPNG.png");
    this.load.spritesheet(
      "player",
      "src/Assets/Imagenes/Jugador/Jugador_CorrerAnimación_PosiciónEstatica_Golpear.png",
      { frameWidth: 81, frameHeight: 85 }
    );
    // Cargar la imagen del suelo
    this.load.image("suelo", "src/Assets/Imagenes/Plataformas/Suelo.png");
    // Cargar la imagen de la moneda
    this.load.image("moneda", "src/Assets/Imagenes/Moneda.png");
    // Cargar el sonido de recogida de moneda
    this.load.audio("recogerSonido", "src/Assets/Audio/Sonido de moneda.mp3");
    // Powerup martillo
    this.load.image("powerupMartillo", "src/Assets/Imagenes/hammer.png");
  }

  create() {
    console.log("Creating PrimerNivel scene:", this);
    // Calcular el factor de escala para la imagen del fondo
    const scaleFactor =
      800 / this.textures.get("background").getSourceImage().width;
    const backgroundHeight =
      this.textures.get("background").getSourceImage().height * scaleFactor;

    // Crear varias instancias del fondo y ajustarlas para que tengan la misma resolución
    for (let i = 0; i < 5; i++) {
      let background = this.add.image(
        400,
        600 - i * backgroundHeight,
        "background"
      );
      background.setOrigin(0.5, 1); // Establecer el origen en la parte inferior para que se apile correctamente
      background.setScale(scaleFactor);
    }

    // Generar múltiples instancias del suelo
    const sueloGroup = this.physics.add.staticGroup(); // Crear un grupo estático para el suelo
    const sueloScale = 0.5; // Escala del suelo

    // Obtener el ancho de la imagen del suelo
    const sueloWidth = this.textures.get("suelo").getSourceImage().width;

    // Inicializar la posición x de la primera plataforma
    let xPos = 0;

    for (let i = 0; i < 30; i++) {
      // Ajustamos el bucle para crear 22 instancias de suelo
      const suelo = sueloGroup.create(xPos, 600, "suelo"); // Posición x se basa en xPos
      suelo.setOrigin(0, 1); // Establecer el origen en la parte inferior izquierda
      suelo.setScale(sueloScale); // Ajustar la escala del suelo
      suelo.refreshBody(); // Actualizar el cuerpo físico del suelo
      xPos += sueloWidth * sueloScale; // Incrementar la posición x para la próxima plataforma
    }

    // Desactivar la gravedad solo para las plataformas
    sueloGroup.getChildren().forEach((platform) => {
      platform.body.allowGravity = false;
    });

    // Crear instancia de jugador
    this.player = new Jugador(this, 100, 450);

    // Crear un grupo de powerups de gravedad
    this.powerupsMartillo = this.physics.add.group();

    // Crear powerup de martillo y agregarlo al grupo
    const powerupMartillo = this.powerupsMartillo.create(150, 540, 'powerupMartillo');
    powerupMartillo.body.allowGravity = false;
    powerupMartillo.setScale(0.1);
    
    this.physics.add.overlap(this.player, this.powerupsMartillo, this.activarMartillo, null, this);

    // Habilitar las colisiones entre el jugador y el suelo
    this.physics.add.collider(this.player, sueloGroup);

    // Agregar evento de clic para generar plataformas
    this.input.on("pointerdown", this.generarPlataforma, this);

    // Obtener cursores
    this.cursors = this.input.keyboard.createCursorKeys();

    // Crear un grupo para las monedas
    this.monedas = this.physics.add.staticGroup();

    // Generar 20 monedas en posiciones aleatorias
    for (let i = 0; i < 20; i++) {
      const x = Phaser.Math.Between(50, 750); // Posición x aleatoria
      const y = Phaser.Math.Between(50, 550); // Posición y aleatoria
      console.log(`Generating coin at (${x}, ${y})`); // Depuración
      const moneda = this.monedas.create(x, y, "moneda");
      moneda.setScale(2); // Ajustar la escala de la moneda
      moneda.refreshBody(); // Actualizar el cuerpo físico de la moneda para que sea estático
      console.log(
        `Coin ${i} created with scale ${moneda.scaleX}, ${moneda.scaleY}`
      ); // Depuración
    }

    // Habilitar las colisiones entre el jugador y las monedas
    this.physics.add.overlap(
      this.player,
      this.monedas,
      this.recogerMoneda,
      null,
      this
    );

    // Agregar el sonido de recogida de moneda
    this.recogerSonido = this.sound.add("recogerSonido");
  }

  generarPlataforma(pointer) {
    // Verificar si ya se han generado 10 plataformas
    if (this.plataformasGeneradas >= 10) {
      return; // Salir de la función si se alcanza el límite
    }

    // Crear una plataforma en la posición donde se hizo clic
    const plataforma = this.physics.add.image(pointer.x, pointer.y, "suelo");
    plataforma.setScale(0.5); // Ajustar la escala de la plataforma
    plataforma.setOrigin(0.5, 1); // Establecer el origen en la parte inferior

    // Ajustar el tamaño para el collider
    plataforma.body.setSize(
      plataforma.width * plataforma.scaleX,
      plataforma.height * plataforma.scaleY
    );

    // Agregar la plataforma al array de plataformas
    this.plataformas.push(plataforma);

    // Verificar si la plataforma tiene un cuerpo físico antes de establecerlo como estático
    if (plataforma.body) {
      plataforma.body.setAllowGravity(false); // Desactivar la gravedad
      plataforma.body.immovable = true; // Hacer que la plataforma sea inamovible
    }

    // Habilitar las colisiones entre el jugador y la plataforma
    this.physics.add.collider(
      this.player,
      plataforma,
      this.handleCollision,
      null,
      this
    );

    // Incrementar el contador de plataformas generadas
    this.plataformasGeneradas++;
  }

  // Manejar la colisión entre el jugador y las plataformas
  handleCollision(player, plataforma) {
    // Verificar si se ha presionado la tecla de espacio (código de la tecla 32)
    if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
      // Destruir la plataforma
      plataforma.destroy();

      // Eliminar la plataforma del array de plataformas
      const index = this.plataformas.indexOf(plataforma);
      if (index > -1) {
        this.plataformas.splice(index, 1);
      }

      // Decrementar el contador de plataformas generadas
      this.plataformasGeneradas--;
    }
  }

  // Manejar la recfogida de una moneda
  recogerMoneda(player, moneda) {
    moneda.destroy(); // Destruir la moneda
    this.recogerSonido.play(); // Reproducir el sonido de recogida de moneda
    console.log("Moneda recolectada"); // Depuración
    this.monedasRecogidas++;
    if (this.monedasRecogidas === this.totalMonedas) {
      // Si se han recogido todas las monedas acaba
      this.scene.start("LevelSelectScene");
    }
  }

  update() {
    // Lógica de actualización si es necesario
    // Actualizar jugador
    this.player.update(this.cursors);
  }

  activarMartillo(player, powerupMartillo) {
    powerupMartillo.destroy();
    this.player.powerupActivo = true;
  }  
}

export default PrimerNivel; // Exportar la clase PrimerNivel como predeterminada
