;(function () {
	var canvas = document.getElementById("viewport"),
			context = canvas.getContext("2d")

	context.fillText("Lover", 0, 0)

	var male = new Character(88, 99),
			female = new Character(188, 199)
	
	function clear() {
		male.clear(context)
		female.clear(context)
	}
	
	function refresh() {
		male.draw(context)
		female.draw(context)
	}
	
	refresh()
	
	var leftKeyDown = false,
			rightKeyDown = false,
			downKeyDown = false,
			upKeyDown = false,
			cursorX, cursorY
	
	window.addEventListener('keydown', function (e) {
		switch (e.keyCode) {
		case 37:
			leftKeyDown = true
			break
		case 38:
			upKeyDown = true
			break
		case 39:
			rightKeyDown = true
			break
		case 40:
			downKeyDown = true
			break
		}
	}, true);

	window.addEventListener('keyup', function (e) {
		switch (e.keyCode) {
		case 37:
			leftKeyDown = false
			break
		case 38:
			upKeyDown = false
			break
		case 39:
			rightKeyDown = false
			break
		case 40:
			downKeyDown = false
			break
		}
	}, true);
	
	window.setInterval(function () {
		clear()
		if (updateMaleX())
			updateMaleY()
		else if (updateMaleY())
			updateMaleX()
		female.move(cursorX, cursorY)
		refresh()
	}, 50)
	
	function updateMaleX() {
		if (leftKeyDown) {
			male.moveLeft()
			return true
		} else if (rightKeyDown) {
			male.moveRight()
			return true
		}
		return false
	}

	function updateMaleY() {
		if (upKeyDown) {
			male.moveUp()
			return true
		} else if (downKeyDown) {
			male.moveDown()
			return true
		}
		return false
	}

	canvas.addEventListener("mousemove", function (e) {
		cursorX = e.clientX
		cursorY = e.clientY
	}, true)
})()