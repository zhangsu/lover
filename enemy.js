function Enemy(x, y, unitWidth, canvasWidth, canvasHeight, imagePath) {
  Character.call(this, x, y, unitWidth, canvasWidth, canvasHeight, imagePath)
  this.speed = 5
  this.retainDirectionCount = Enemy.RETAIN_DIRECTION_COUNT
}

Enemy.RETAIN_DIRECTION_COUNT = 10
Enemy.SPAWN_AREA_LENGTH = 50

Enemy.prototype = Object.create(new Character())

Enemy.prototype.move = function (width, height) {
  if (this.x < 0)
    this.moveRight()
  else if (this.y < 0)
    this.moveDown()
  else if (this.x >= width)
    this.moveLeft()
  else if (this.y >= height)
    this.movUp()
  else {

    if ((--this.retainDirectionCount) > 0)
      this.moveToward(this.orientation)
    else {
      this.retainDirectionCount = Enemy.RETAIN_DIRECTION_COUNT
      this.moveToward(Math.round(Math.random() * 4))
    }
  }
}