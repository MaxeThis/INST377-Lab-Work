document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const doodler = document.createElement('div')
  let isGameOver = false
  let speed = 3
  let platformCount = 5
  let platforms = []
  let score = 0
  let doodlerLeftSpace = 50
  let startPoint = 150
  let doodlerBottomSpace = startPoint
  const gravity = 0.9
  let upTimerId
  let downTimerId
  let isJumping = true
  let isGoingLeft = false
  let isGoingRight = false
  let leftTimerId
  let rightTimerId
  let horizontalMovementId
  let horizontalVelocity = 0

  class Platform {
    constructor(newPlatBottom) {
      this.left = Math.random() * 315
      this.bottom = newPlatBottom
      this.visual = document.createElement('div')

      const visual = this.visual
      visual.classList.add('platform')
      visual.style.left = this.left + 'px'
      visual.style.bottom = this.bottom + 'px'
      grid.appendChild(visual)
    }
  }


  function createPlatforms() {
    for(let i =0; i < platformCount; i++) {
      let platGap = 600 / platformCount
      let newPlatBottom = 100 + i * platGap
      let newPlatform = new Platform (newPlatBottom)
      platforms.push(newPlatform)
      console.log(platforms)
    }
  }

  function movePlatforms() {
    if (doodlerBottomSpace > 200) {
        platforms.forEach(platform => {
          platform.bottom -= 4
          let visual = platform.visual
          visual.style.bottom = platform.bottom + 'px'

          if(platform.bottom < 10) {
            let firstPlatform = platforms[0].visual
            firstPlatform.classList.remove('platform')
            platforms.shift()
            console.log(platforms)
            score++
            var newPlatform = new Platform(600)
            platforms.push(newPlatform)
          }
      }) 
    }
    
  }

  function createDoodler() {
    grid.appendChild(doodler)
    doodler.classList.add('doodler')
    doodlerLeftSpace = platforms[0].left
    doodler.style.left = doodlerLeftSpace + 'px'
    doodler.style.bottom = doodlerBottomSpace + 'px'
  }

function fall() {
  isJumping = false
    clearInterval(upTimerId)
    downTimerId = setInterval(function () {
      doodlerBottomSpace -= 1
      doodler.style.bottom = doodlerBottomSpace + 'px'
      if (doodlerBottomSpace <= 0) {
        gameOver()
      }
      platforms.forEach(platform => {
        if (
          (doodlerBottomSpace >= platform.bottom) &&
          (doodlerBottomSpace <= (platform.bottom + 15)) &&
          ((doodlerLeftSpace + 60) >= platform.left) && 
          (doodlerLeftSpace <= (platform.left + 85)) &&
          !isJumping
          ) {
            console.log('tick')
            startPoint = doodlerBottomSpace
            jump()
            console.log('start', startPoint)
            isJumping = true
          }
      })

    },4)
}

  function jump() {
    clearInterval(downTimerId)
    isJumping = true
    upTimerId = setInterval(function () {
      console.log(startPoint)
      console.log('1', doodlerBottomSpace)
      doodlerBottomSpace += 2
      doodler.style.bottom = doodlerBottomSpace + 'px'
      console.log('2',doodlerBottomSpace)
      console.log('s',startPoint)
      if (doodlerBottomSpace > (startPoint + 200)) {
        fall()
        isJumping = false
      }
    },3)
  }


  horizontalMovementId = setInterval(function(){
    if(isGoingLeft){
      if (doodlerLeftSpace >= 0) {
        console.log('going left')
        doodlerLeftSpace += horizontalVelocity //was -=2
         doodler.style.left = doodlerLeftSpace + 'px'
      } else{
        horizontalVelocity = -horizontalVelocity
        isGoingLeft = false
        isGoingRight = true
      } 
    }
    else if(isGoingRight){
      if (doodlerLeftSpace <= 313) {
        console.log('going right')
        doodlerLeftSpace += horizontalVelocity
        doodler.style.left = doodlerLeftSpace + 'px'
      } else{
        horizontalVelocity = -horizontalVelocity
        isGoingRight = false
        isGoingLeft = true
      } 
    }
  }, 8)

  function control(e) {
    doodler.style.bottom = doodlerBottomSpace + 'px'
    if(e.key === 'ArrowLeft') {
      if(isGoingLeft){
        horizontalVelocity -= 2
      }
      else{
        horizontalVelocity = -2
      }
      isGoingLeft = true
      isGoingRight = false
    } else if (e.key === 'ArrowRight') {
      if(isGoingRight){
        horizontalVelocity += 2
      }
      else{
        horizontalVelocity = 2
      }
      isGoingRight = true
      isGoingLeft = false
    } else if (e.key === 'ArrowUp') {
      isGoingLeft = false
      isGoingRight = false
    }
  }

  function gameOver() {
    isGameOver = true
    while (grid.firstChild) {
      console.log('remove')
      grid.removeChild(grid.firstChild)
    }
    grid.innerHTML = score
    clearInterval(upTimerId)
    clearInterval(downTimerId)
    clearInterval(leftTimerId)
    clearInterval(rightTimerId)
  }


  function start() {
    if (!isGameOver) {
      createPlatforms()
      createDoodler()
      setInterval(movePlatforms,30)
      jump(startPoint)
      document.addEventListener('keydown', control)
    } 
  }
  start()
})