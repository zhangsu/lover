function Enemy(x, y, unitWidth, imagePath) {
  Character.call(this, x, y, unitWidth, imagePath)
  this.speed = 5
}

Enemy.SPAWN_AREA_LENGTH = 50

Enemy.prototype = Object.create(new Character())

Enemy.prototype.move = function (width, height) {
  if (this.x < 0)
    ++this.x
  else if (this.y < 0)
    ++this.y
  else if (this.x >= width)
    --this.x
  else if (this.y >= height)
    -- this.y
  else {
    
  }
}