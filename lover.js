;(function () {
  var canvas = document.getElementById("viewport"),
      context = canvas.getContext("2d")

  context.fillText("Lover", 0, 0)

  var male = new Player(88, 99),
      female = new Player(188, 199)

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
      cursorX, cursorY, cursorOnScreen

  function updateMalePosition() {
    if (leftKeyDown)
      male.moveLeft()
    else if (rightKeyDown)
      male.moveRight()
    else if (upKeyDown)
      male.moveUp()
    else if (downKeyDown)
      male.moveDown()
  }

  function updateFemalePosition() {
    if (cursorOnScreen)
      female.followCursor(cursorX, cursorY)
  }

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
    default:
      return true
    }
    e.preventDefault()
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
    default:
      return true
    }
    e.preventDefault()
  }, true);

  window.addEventListener("mousemove", function (e) {
    var x = e.clientX - canvas.offsetLeft
    var y = e.clientY - canvas.offsetTop
    if (0 < x && x < canvas.width && 0 < y && y < canvas.height) {
      cursorOnScreen = true
      cursorX = x
      cursorY = y
      e.preventDefault()
    } else {
      cursorOnScreen = false
    }
  }, true)

  window.setInterval(function () {
    clear()
    updateMalePosition()
    updateFemalePosition()
    refresh()
  }, 50)

})()