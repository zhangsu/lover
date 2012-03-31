function Player(x, y, unitWidth, spriteWidth, spriteHeight, imagePath) {
  Character.call(this, x, y, unitWidth, spriteWidth, spriteHeight, imagePath)
  this.speed = 3
  this.hp = 10
  this.retainCursorDirectionCount = Player.RETAIN_CURSOR_DIRECTION_COUNT
}

Player.RETAIN_CURSOR_DIRECTION_COUNT = 3

Player.prototype = Object.create(new Character())

Player.prototype.cursorDirection = function (deltaX, deltaY, cursorX, cursorY) {
  if ((--this.retainCursorDirectionCount) > 0)
    return this.orientation
  else
    this.retainCursorDirectionCount = Player.RETAIN_CURSOR_DIRECTION_COUNT

  // Down or up
  if (deltaX < deltaY)
    return this.y < cursorY ? 0 : 3
  // Right or left
  else
    return this.x < cursorX ? 2 : 1
}

Player.prototype.followCursor = function (cursorX, cursorY) {
  var deltaX = Math.abs(cursorX - this.x),
      deltaY = Math.abs(cursorY - this.y)
  if (deltaX <= this.speed && deltaY <= this.speed) {
    this.moving = false
    return
  }

  var direction = this.cursorDirection(deltaX, deltaY, cursorX, cursorY)
  switch (direction) {
  case 0:
    this.moveDown()
    break
  case 1:
    this.moveLeft()
    break
  case 2:
    this.moveRight()
    break
  case 3:
    this.moveUp()
    break
  }
  this.moving = true
  return direction
}

Player.prototype.undoFollowCursor = function (direction) {
  switch (direction) {
  case 0:
    this.undoMoveDown()
    break
  case 1:
    this.undoMoveUp()
    break
  case 2:
    this.undoMoveRight()
    break
  case 3:
    this.undoMoveLeft()
    break
  }
  this.moving = false
}