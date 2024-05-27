class Jugador extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");

    // Agregar jugador a la escena y habilitar físicas
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setSize(30, 40);
    this.body.setOffset(15, 40);

    this.powerupActivo = false;
    this.gravedadInvertida = false; // Estado de la gravedad

    // Configurar las animaciones del jugador
    scene.anims.create({
      key: "idle",
      frames: scene.anims.generateFrameNumbers("player", { start: 0, end: 0 }),
      frameRate: 5,
      repeat: -1,
    });

    scene.anims.create({
      key: "walk",
      frames: scene.anims.generateFrameNumbers("player", { start: 1, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: "jump",
      frames: scene.anims.generateFrameNumbers("player", { start: 9, end: 12 }),
      frameRate: 5, // Ajusta este valor según sea necesario
      repeat: 0,
    });

    scene.anims.create({
      key: "hit",
      frames: scene.anims.generateFrameNumbers("player", {
        start: 13,
        end: 19,
      }),
      frameRate: 10, // Ajusta este valor según sea necesario
      repeat: 0,
    });

    // Configurar las físicas del jugador
    this.setGravityY(300); // Ajusta la gravedad

    // Agregar una variable para controlar la animación de golpe
    this.isHitting = false;
  }

  update(cursors) {
    // Lógica de movimiento del jugador
    if (!this.isHitting) {
      if (cursors.left.isDown) {
        this.setVelocityX(-160);
        if (
          this.body.onFloor() &&
          (!this.anims.isPlaying || this.anims.currentAnim.key !== "walk")
        ) {
          this.anims.play("walk", true);
        }
        this.flipX = true; // Voltear el sprite hacia la izquierda
      } else if (cursors.right.isDown) {
        this.setVelocityX(160);
        if (
          this.body.onFloor() &&
          (!this.anims.isPlaying || this.anims.currentAnim.key !== "walk")
        ) {
          this.anims.play("walk", true);
        }
        this.flipX = false; // Voltear el sprite hacia la derecha
      } else {
        this.setVelocityX(0);
        if (
          this.body.onFloor() &&
          (!this.anims.isPlaying || this.anims.currentAnim.key !== "idle")
        ) {
          this.anims.play("idle", true);
        }
      }

      if (cursors.up.isDown) {
        if (this.gravedadInvertida && this.body.onCeiling()) {
          this.setVelocityY(300); // Saltar hacia abajo si la gravedad está invertida
          this.anims.play("jump", true); // Reproducir la animación de salto
        } else if (this.body.onFloor()) {
          this.setVelocityY(-300); // Saltar hacia arriba si la gravedad es normal
          this.anims.play("jump", true); // Reproducir la animación de salto
        }
      }
    }

    // Lógica de golpear
    if (cursors.space.isDown && this.powerupActivo) {
      this.isHitting = true;
      this.setVelocityX(0); // Detener movimiento horizontal al golpear
      this.anims.play("hit", true);
      // Usar un temporizador para controlar la duración de la animación de golpe
      this.scene.time.delayedCall(700, () => {
        this.isHitting = false;
      });
    }
  }

  modifyGravity() {
    this.gravedadInvertida = !this.gravedadInvertida;
    if (this.gravedadInvertida) {
      this.setGravityY(-300);
      this.flipY = true;
      this.body.setSize(30, 40);
      this.body.setOffset(15, 0);
    } else {
      this.setGravityY(300);
      this.flipY = false;
      this.body.setSize(30, 40);
      this.body.setOffset(15, 40);
    }
  }
}

export default Jugador;
