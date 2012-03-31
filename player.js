function Player(x, y, width, height, image_path) {
  Character.call(this, x, y, width, height, image_path)
  this.hp = 10
}

Player.prototype = Object.create(new Character())

Player.prototype.direction = function (cursorX, cursorY) {
  var deltaY = Math.abs(cursorY - this.y),
      deltaX = Math.abs(cursorX - this.x)
  if (deltaX < deltaY)
    // Down or up
    return this.y < cursorY ? 0 : 1
  else
    // Right or left
    return this.x < cursorX ? 2 : 3
}

Player.prototype.followCursor = function (cursorX, cursorY) {
  if (Math.abs(cursorX - this.x) <= 1 && Math.abs(cursorY - this.y) <= 1)
    return

  switch (this.direction(cursorX, cursorY)) {
  case 0:
    this.moveDown()
    break
  case 1:
    this.moveUp()
    break
  case 2:
    this.moveRight()
    break
  case 3:
    this.moveLeft()
    break
  }
}