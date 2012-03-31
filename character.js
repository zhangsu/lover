function Character(x, y, unitWidth, canvasWidth, canvasHeight, imagePath) {
  this.speed = 5
  this.x = x || 0
  this.y = y || 0
  this.unitWidth = unitWidth || 20
  this.canvasWidth = canvasWidth || 800
  this.canvasHeight = canvasHeight || 600
  this.spriteFrame = 0
  this.orientation = 0
  if (imagePath) {
    this.image = new Image()
    var self = this
    this.image.onload = function () {
      self.spriteWidth = this.width / 4
      self.spriteHeight = this.height / 4
    }
    this.image.src = imagePath
  }

  var self = this
  window.setInterval(function () {
    if (self.moving) {
      ++self.spriteFrame
      self.spriteFrame %= Character.FRAME_COUNT
    } else {
      self.spriteFrame = 0
    }
  }, this.speed * 50)
}

Character.FRAME_COUNT = 4

Character.prototype = {
  sprite : function () {
    var buffer = document.createElement("canvas")
    buffer.setAttribute('width', this.spriteWidth)
    buffer.setAttribute('height', this.spriteHeight)
    var context = buffer.getContext("2d")
    context.drawImage(this.image, this.spriteFrame * this.spriteWidth,
                      this.orientation * this.spriteHeight,
                      this.spriteWidth, this.spriteHeight, 0, 0,
                      this.spriteWidth, this.spriteHeight)
    return buffer
  },

  overflow : function () {
    return this.x < 0 || this.y < 0 ||
           this.x >= canvas.width || this.y >= canvas.height
  },

  moveToward : function (direction) {
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
  },

  undoMove : function (direction) {
    switch (direction) {
    case 0:
      this.undoMoveDown()
      break
    case 1:
      this.undoMoveLeft()
      break
    case 2:
      this.undoMoveRight()
      break
    case 3:
      this.undoMoveUp()
      break
    }
    this.moving = false
  },

  moveDown : function () {
    var y = this.y + this.speed
    if (y < this.canvasHeight)
      this.y = y
    this.orientation = 0
  },

  moveUp : function () {
    var y = this.y - this.speed
    if (y >= 0)
      this.y = y
    this.orientation = 3
  },

  moveLeft : function () {
    var x = this.x - this.speed
    if (x >= 0)
      this.x = x
    this.orientation = 1
  },

  moveRight : function () {
    var x = this.x + this.speed
    if (x < this.canvasWidth)
      this.x = x
    this.orientation = 2
  },
  undoMoveDown : function () {
    this.y -= this.speed
  },

  undoMoveUp : function () {
    this.y += this.speed
  },

  undoMoveLeft : function () {
    this.x += this.speed
  },

  undoMoveRight : function () {
    this.x -= this.speed
  },

  colliding : function (character) {
    var thisOffset = this.unitWidth / 2,
        thisX1 = this.x - thisOffset,
        thisY1 = this.y - thisOffset,
        thisX2 = this.x + thisOffset,
        thisY2 = this.y + thisOffset,
        offset = character.unitWidth / 2,
        x1 = character.x - offset,
        y1 = character.y - offset,
        x2 = character.x + offset,
        y2 = character.y + offset
    return thisX1 <= x2 && thisX2 >= x1 && thisY1 <= y2 && thisY2 >= y1
  },

  draw : function (context) {
    context.save()
    context.translate(-this.spriteWidth / 2, -this.spriteHeight / 2)
    context.drawImage(this.sprite(), this.x, this.y)
    context.restore()
  },

  clear : function (context) {
    context.save()
    context.translate(-this.spriteWidth / 2, -this.spriteHeight / 2)
    context.fillRect(this.x, this.y, this.spriteWidth, this.spriteHeight)
    context.restore()
  }
}
