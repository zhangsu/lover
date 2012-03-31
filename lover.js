;(function () {
  var canvas = document.getElementById('viewport'),
      context = canvas.getContext('2d'),
      male = new Player(88, 99, 16, 128 / 4, 192 / 4, "male.png"),
      female = new Player(188, 199, 16, 128 / 4, 192 / 4, "female.png"),
      enemies = []

  context.fillStyle = "rgb(90, 90, 255)"
  context.fillRect(0, 0, canvas.width, canvas.height)

  function clear() {
    male.clear(context)
    female.clear(context)
  }

  function refresh() {
    var sprites = enemies.slice(0)
    sprites.push(male)
    sprites.push(female)
    sprites.sort(function (a, b) {
      return a.y - b.y
    })
    sprites.forEach(function (sprite) {
      sprite.draw(context)
    })
  }

  refresh()

  var leftKeyDown = false,
      rightKeyDown = false,
      downKeyDown = false,
      upKeyDown = false,
      cursorX, cursorY, cursorOnScreen

  function overflow(character) {
    return character.x < 0 || character.y < 0 ||
           character.x >= canvas.width || character.y >= canvas.height
  }

  function updateMalePosition() {
    male.moving = true
    if (leftKeyDown)
      male.moveLeft()
    else if (rightKeyDown)
      male.moveRight()
    else if (upKeyDown)
      male.moveUp()
    else if (downKeyDown)
      male.moveDown()
    else {
      male.moving = false
      return
    }

    if (overflow(male) || male.colliding(female)) {
      if (leftKeyDown)
        male.undoMoveLeft()
      else if (rightKeyDown)
        male.undoMoveRight()
      else if (upKeyDown)
        male.undoMoveUp()
      else if (downKeyDown)
        male.undoMoveDown()
      male.moving = false
    }
  }

  function updateFemalePosition() {
    if (cursorOnScreen) {
      var direction = female.followCursor(cursorX, cursorY)
      if (overflow(female) || female.colliding(male))
        female.undoFollowCursor(direction)
    }
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

  window.addEventListener("blur", function (e) {
    leftKeyDown = false
    upKeyDown = false
    rightKeyDown = false
    downKeyDown = false
    cursorOnScreen = false
    female.moving = false
  }, true)

  window.setInterval(function () {
    clear()
    updateMalePosition()
    updateFemalePosition()
    refresh()
  }, 50)

})()