function Character(x, y, unitWidth, spriteWidth, spriteHeight, imagePath) {
  this.speed = 5
  this.x = x || 0
  this.y = y || 0
  this.unitWidth = unitWidth || 20
  this.spriteWidth = spriteWidth || 32
  this.spriteHeight = spriteHeight || 32
  this.spriteFrame = 0
  this.orientation = 0
  if (imagePath) {
    this.image = new Image()
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
  sprite: function () {
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

  moveDown: function () {
    this.y += this.speed
    this.orientation = 0
  },

  moveUp: function () {
    this.y -= this.speed
    this.orientation = 3
  },

  moveLeft: function () {
    this.x -= this.speed
    this.orientation = 1
  },

  moveRight: function () {
    this.x += this.speed
    this.orientation = 2
  },
  undoMoveDown: function () {
    this.y -= this.speed
  },

  undoMoveUp: function () {
    this.y += this.speed
  },

  undoMoveLeft: function () {
    this.x += this.speed
  },

  undoMoveRight: function () {
    this.x -= this.speed
  },

  colliding: function (character) {
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

  draw: function (context) {
    context.save()
    context.translate(-this.spriteWidth / 2, -this.spriteHeight / 2)
    context.drawImage(this.sprite(), this.x, this.y)
    context.restore()
  },

  clear: function (context) {
    context.save()
    context.translate(-this.spriteWidth / 2, -this.spriteHeight / 2)
    context.fillRect(this.x, this.y, this.spriteWidth, this.spriteHeight)
    context.restore()
  }
}
