// set the stage variables
// hard coded model
const settings = {
  w: window.innerWidth*0.8,
  h: window.innerHeight*0.8,
  r: 10,
  n: 20,
  duration: 1500
};

// starting values for elements of the game
let mouse = { x: settings.w / 2, y: settings.h / 2 };
let score = 0, highScore = 0, collisions = 0;

// CSS pixel string generator for 
const pixelize = number => number + 'px';

// helper functions that makes random locations
const rand = n => Math.floor(Math.random() * n);
const randX = () => pixelize(rand(settings.w - settings.r * 2));
const randY = () => pixelize(rand(settings.h - settings.r * 2));

// to update the three score boards on the screen
const updateScore = () => {
  d3.select('.scoreboard .current span').text(score);
  d3.select('.scoreboard .highScore span').text(highScore);
  d3.select('.scoreboard .collisions span').text(collisions);
};

/////////////////////initializing D3 elements/////////////////////

// board with style of width settings w, height
const board = d3.select('.board').style({
  width: pixelize( settings.w ),
  height: pixelize( settings.h )
});

// FIX ME:  variable name added. if the mouse does not show up, delete things before =
// generate mouse
d3.select('.mouse').style({
  top: pixelize( mouse.y ),
  left: pixelize( mouse.x ),
  width: pixelize( settings.r * 2 ),
  height: pixelize( settings.r * 2),
  'border-radius': pixelize( settings.r )
  // D3 property needs ''????
  // border-radius maks the area circle
});


// select all the items with class asteroid
const asteroids = board.selectAll('.asteroid')
  // make these data points
  .data(d3.range(settings.n))
  .enter().append('div')
  .attr('class', 'asteroid')
  .style({
    top: randY,
    left: randX,
    width: pixelize( settings.r * 2 ),
    height: pixelize( settings.r * 2 )
});

board.on('mousemove', function(){
  var loc = d3.mouse(this);
  mouse = { x: loc[0], y: loc[1]};
  d3.select('.mouse').style({
    top: pixelize( mouse.y - settings.r ),
    left: pixelize( mouse.x - settings.r )
  })
});

var move = function(elements) {
  // transition starts for all 30 of the objects
  // ease defines tweenning of the animation (motion curve)
  elements.transition().duration(settings.duration).ease('linear').style({
    top: randY,
    left: randX
  // when the transition ends, apply single element to move
  }).each('end', function() {
    // move(); // invoke 30 together
    move( d3.select(this) ); // apply individual movement to each
  });
}

// D3 time is accurate. use above move recursion instead of the setInterval
// setInterval(move, 1000);

// with this code, each asteroid has their individual move
move(asteroids);

var scoreTicker = function() {
  score++;
  highScore = Math.max(score, highScore);
  updateScore();
}
setInterval(scoreTicker, 100);

var prevCollision = false;
var detectCollisions = function() {

  var collision = false;

  asteroids.each(function() {
    var cx = this.offsetLeft + settings.r;
    var cy = this.offsetTop + settings.r;

    var x = cx - mouse.x;
    var y = cy - mouse.y;
    if (Math.sqrt(x * x + y * y) < settings.r * 2) {  //?????
      collision = true;
    }
  });

  if (collision) {
    score = 0;
    board.style('background-color', 'red');
    if (prevCollision != collision) {
      collisions += 1;
    }
  } else {
    board.style('background-color', 'white');
  }
  prevCollision = collision;
}

// setInterval(detectCollisions, 1);
d3.timer(detectCollisions);



