//Amount of asteroids
var dataArray = d3.range(1,15);

//Short hand for selecting body
var body = d3.select('body');

//Short hand for selecting the board
var svg = d3.select('.board');

//Short hand for asteroid images
var asteroid = svg.selectAll('image')
  .data(dataArray);

// theme variables
var theme;
var enemy;


//Adding the asteroids onto the page
function makeBoard(enemy) {
  asteroid.enter()
  .append('image')
  .attr("href", enemy)
  .attr("x", Math.floor(Math.random() * window.innerWidth) + 'px')
  .attr("y", Math.floor(Math.random() * window.innerHeight) + 'px')
  .attr("height", "50px")
  .attr("width", "50px")
  .each(function() {
    var x = Math.floor(Math.random() * window.innerWidth) + 'px';
    var y = Math.floor(Math.random() * window.innerHeight) + 'px';
    d3.select(this).attr({"x": x, "y" : y});
  });
};


//Function for moving the asteroids across the board
var updateLocation = function() {
  return setInterval(() => {
    asteroid.each(function () {
      var x = Math.floor(Math.random() * window.innerWidth) + 'px';
      var y = Math.floor(Math.random() * window.innerHeight) + 'px';
      d3.select(this).transition().duration(1000).attr({"x": x, "y" : y});
    });
  }, 1000)
};

//Run updateLocation on 1 second intervals & define interval key
var updateLocationInterval;

//Function to increase your score every second you survive
var increaseScore = function() {
  return setInterval(function() {
    d3.select('.currentScore').text(currentScore++);
  }, 1000);
}
//Run updateLocation on 1 second intervals & define interval key
var scoreCountInterval;


//Append the Lives, High Score, Current Score
var lives = 5;
var currentScore = 0;
var highScore = 0;
d3.select('.highScore').text(highScore);
d3.select('.currentScore').text(currentScore);
d3.select('.lives').text(lives);

//The mouse over function
  //Subtracts Lives
  //Resets CurrentScore
  //Changes HighScore if current score is higher then it.
  //Gives game over when out of lives
  //Flashes on the screen
  function enemyAttack () {
asteroid.on("mouseover", function () {
  if (lives > 0) {
    d3.select('.flash').style('visibility', 'visible');
    setTimeout(function() {
      d3.select('.flash').style('visibility', 'hidden');
    }, 30);
    if (currentScore > highScore) {
      highScore = currentScore;
      d3.select('.highScore').text(highScore);
    }
    currentScore = 0;
    d3.select('.currentScore').text(currentScore);
    lives--;
    d3.select('.lives').text(lives);
    if (enemy === 'robin.png') {
      $('audio')[0].play();
    }
  }
  if (lives === 0) {
    clearInterval(scoreCountInterval);
    clearInterval(updateLocationInterval);
    d3.select('.gameOver').style('visibility', 'visible');
    d3.select('.scoreboard').style('visibility', 'hidden');
  }
});
}

//Adding Game Over
d3.select('.gameOver')
  .selectAll('h1')
  .data([0])
  .enter()
  .append('h1')
    .attr('class', 'overTitle')
    .text('GAME OVER!');

d3.select('.gameOver')
  .selectAll('p')
  .data([0])
  .enter()
    .append('p')
    .attr('class', 'playAgain')
    .html(function () {
      return 'Play again?' + '<br>' + '<a href="">Click Here</a>';
    });

$('.welcome').append('<h1 class="overTitle">Choose your theme!</h1><br><p class="playAgain"><a class="hackR" href="#">Hack Reactor</a><br><a class="space" href="#">Space</a>');

$('.hackR').on('click', function () {
  $('.scoreboard').css('visibility', 'visible');
  $('.welcome').css('visibility', 'hidden');
  runBoard('hack', 'robin.png');
});
$('.space').on('click', function () {
  $('.scoreboard').css('visibility', 'visible');
  $('.welcome').css('visibility', 'hidden');
  runBoard('space', 'asteroid.png');
});

function runBoard(theme, enemy) {
  updateLocationInterval = updateLocation();
  scoreCountInterval = increaseScore();
  makeBoard(enemy);
  changeTheme(theme);
  enemyAttack();
}
// JQUERY

// Theme chooser variable

function changeTheme(newTheme) {
  if (newTheme === 'space') {
    enemy = 'asteroid.png';
    $('body').css('background-image', 'url(http://wallpapercave.com/wp/pEeUsp1.jpg)');
    $('.board').addClass('spaceBoard');
    $('.board').removeClass('hackBoard');
  } else if (newTheme === 'hack') {
    enemy = 'robin.png';
    $('body').css('background-image', 'url(whitebg.png)');
    $('.board').addClass('hackBoard');
    $('.board').removeClass('spaceBoard');
  }
};



    // $('.board').css({'cursor' : 'url("http://4.bp.blogspot.com/-HKe2vwr7g60/UM9kDbK_v8I/AAAAAAAAAPo/L_W6t4riGFA/s64/smallfreighterspr.png"), auto'});














