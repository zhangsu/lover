Player.RETAIN_CURSOR_DIRECTION_COUNT = 3

function Player(x, y, unitWidth, canvasWidth, canvasHeight, imagePath) {
  Character.call(this, x, y, unitWidth, canvasWidth, canvasHeight, imagePath)
  this.speed = 3
  this.hp = 10
  this.retainCursorDirectionCount = Player.RETAIN_CURSOR_DIRECTION_COUNT
}

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
  this.moveToward(direction)
  this.moving = true
  return direction
}

Player.prototype.die = function (context) {
  this.alive = false
}

Player.prototype.draw = function(context) {
  if (this.alive)
    Character.prototype.draw.call(this, context)
  else {
  }
}