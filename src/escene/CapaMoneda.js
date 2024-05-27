class CapaMoneda extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'moneda');
      this.scene = scene;
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.allowGravity = false;
      this.body.setImmovable(true);
      this.body.moves = false;
    }
  
    update() {
      // Lógica de actualización si es necesario
    }
  }
  
  export default CapaMoneda;
  