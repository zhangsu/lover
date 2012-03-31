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

	direction: function (cursorX, cursorY) {
		var deltaY = Math.abs(cursorY - this.y),
				deltaX = Math.abs(cursorX - this.x)
		if (deltaX < deltaY)
			// Down or up
			return this.y < cursorY ? 0 : 1
		else
			// Right or left
			return this.x < cursorX ? 2 : 3
	},
	
	move: function (cursorX, cursorY) {
		switch(this.direction(cursorX, cursorY)) {
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
		context.drawImage(this.sprite(), this.x, this.y)
	},
	
	clear: function (context) {
		context.clearRect(this.x, this.y, this.width, this.height)		
	}
}
