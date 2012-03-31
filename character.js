function Character(x, y, width, height, image_path) {
  this.SPEED = 2

  this.x = x || 0
  this.y = y || 0
  this.width = width || 10
  this.height = height || 10
  this.image = new Image()
  //this.image.src = image_path
}

Character.prototype = {
  sprite: function () {
    var buffer = document.createElement("canvas")
    buffer.setAttribute('width', this.width)
    buffer.setAttribute('height', this.height)
    var context = buffer.getContext("2d")
    //context.drawImage()
    context.fillRect(0, 0, this.width, this.height)
    return buffer
  },

  moveDown: function (context) {
    this.y += this.SPEED
  },

  moveUp: function (context) {
    this.y -= this.SPEED
  },

  moveLeft: function (context) {
    this.x -= this.SPEED
  },

  moveRight: function (context) {
    this.x += this.SPEED
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
    context.clearRect(this.x, this.y, this.width, this.height)
    context.restore()
  }
}
