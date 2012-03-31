;(function () {
  var canvas = document.getElementById('viewport'),
      context = canvas.getContext('2d'),
      male, female, enemies = [],
      leftKeyDown = false,
      rightKeyDown = false,
      downKeyDown = false,
      upKeyDown = false,
      cursorX, cursorY, cursorOnScreen,
      sampleSpaceX, sampleSpaceY

  context.fillStyle = "rgb(90, 90, 255)"
  context.fillRect(0, 0, canvas.width, canvas.height)

  male = new Player(Math.round(Math.random() * canvas.width / 2),
                    Math.round(Math.random() * canvas.height),
                    16, canvas.width, canvas.height, "male.png")
  female = new Player(Math.round(Math.random() * canvas.width / 2)
                      + canvas.width / 2,
                      Math.round(Math.random() * canvas.height),
                      16, canvas.width, canvas.height, "female.png")

  refresh()

  function clear() {
    enemies.slice(0).forEach(function (sprite) {
      sprite.clear(context)
    })
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
    
    if (male.colliding(female)) {
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
      if (female.colliding(male))
        female.undoFollowCursor(direction)
    }
  }

  function updateEnemyPositions () {
    enemies.forEach(function (enemy) {
      enemy.move(canvas.width, canvas.height)
    })
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
      female.moving = false
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

  // Main rendering loop.
  window.setInterval(function () {
    clear()
    updateMalePosition()
    updateFemalePosition()
    updateEnemyPositions()
    refresh()
  }, 50)

  function spawnEnemy() {
    var spawnPosition = {
      x : Math.random() * Enemy.SPAWN_AREA_LENGTH * 2,
      y : Math.random() * Enemy.SPAWN_AREA_LENGTH * 2
    }

    if (spawnPosition.x >= Enemy.SPAWN_AREA_LENGTH)
      spawnPosition.x = spawnPosition - Enemy.SPAWN_AREA_LENGTH + canvas.width
    else
      spawnPosition.x = -spawnPosition.x

    if (spawnPosition.y >= Enemy.SPAWN_AREA_LENGTH)
      spawnPosition.y = spawnPosition - Enemy.SPAWN_AREA_LENGTH + canvas.height
    else
      spawnPosition.y = -spawnPosition.y

    enemies.push(new Enemy(spawnPosition.x, spawnPosition.y, 20,
                           canvas.width, canvas.height,  "undead.png"))
  }

  // Spawn enemies.
  spawnEnemy()
  window.setInterval(spawnEnemy, 5000)
})()