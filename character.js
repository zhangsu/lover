function Character(x, y, width, height, imagePath) {
  this.SPEED = 2

  this.x = x || 0
  this.y = y || 0
  this.width = width || 10
  this.height = height || 10
  this.orientation = 0
  this.image = new Image()
  this.image.src = imagePath
}

Character.prototype = {
  sprite: function () {
    var buffer = document.createElement("canvas")
    buffer.setAttribute('width', this.width)
    buffer.setAttribute('height', this.height)
    var context = buffer.getContext("2d")
    context.drawImage(this.image, 0, this.orientation * this.height,
                      this.width, this.height, 0, 0, this.width, this.height)
    return buffer
  },

  moveDown: function (context) {
    this.y += this.SPEED
    this.orientation = 0
  },

  moveUp: function (context) {
    this.y -= this.SPEED
    this.orientation = 3
  },

  moveLeft: function (context) {
    this.x -= this.SPEED
    this.orientation = 1
  },

  moveRight: function (context) {
    this.x += this.SPEED
    this.orientation = 2
  },

  draw: function (context) {
    context.save()
    context.translate(-this.width / 2, -this.height / 2)
    context.drawImage(this.sprite(), this.x, this.y)
    context.restore()
  },

  clear: function (context) {
    context.save()
    context.translate(-this.width / 2, -this.height / 2)
    context.fillRect(this.x, this.y, this.width, this.height)
    context.restore()
  }
}
