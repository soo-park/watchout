const settings = {
  w: window.innerWidth * 0.8,
  h: window.innerHeight * 0.8,
  r: 10,
  n: 20,
  duration: 1000
};

let mouse = { x: settings.w / 2, y: settings.h / 2 };
let score = 0;
let highScore = 0;
let collisions = 0;

const pixelize = number => number + 'px';

const rand = n => Math.floor(Math.random() * n);
const randX = () => pixelize(rand(settings.w - settings.r * 2));
const randY = () => pixelize(rand(settings.h - settings.r * 2));

const updateScore = () => {
  d3.select('.scoreboard .current span').text(score);
  d3.select('.scoreboard .highScore span').text(highScore);
  d3.select('.scoreboard .collisions span').text(collisions);
};

const board = d3.select('.board').style({
  width: pixelize(settings.w),
  height: pixelize(settings.h)
});

d3.select('.mouse').style({
  top: pixelize(mouse.y),
  left: pixelize(mouse.x),
  width: pixelize(settings.r * 2),
  height: pixelize(settings.r * 2),
  'border-radius': pixelize(settings.r)
});

const asteroids = board
  .selectAll('.asteroid')
  .data(d3.range(settings.n))
  .enter()
  .append('div')
  .attr('class', 'asteroid')
  .style({
    top: randY,
    left: randX,
    width: pixelize(settings.r * 2),
    height: pixelize(settings.r * 2)
  });

board.on('mousemove', function() {
  const loc = d3.mouse(this);
  mouse = { x: loc[0], y: loc[1] };
  d3.select('.mouse').style({
    top: pixelize(mouse.y - settings.r),
    left: pixelize(mouse.x - settings.r)
  });
});

const move = elements => {
  elements
    .transition()
    .duration(settings.duration)
    .ease('linear')
    .style({
      top: randY,
      left: randX
    })
    .each('end', function() {
      move(d3.select(this));
    });
};
move(asteroids);

const scoreTicker = () => {
  score++;
  highScore = Math.max(score, highScore);
  updateScore();
};
setInterval(scoreTicker, 100);

let prevCollision = false;
const detectCollisions = () => {
  let collision = false;
  asteroids.each(function() {
    const cx = this.offsetLeft + settings.r;
    const cy = this.offsetTop + settings.r;
    const x = cx - mouse.x;
    const y = cy - mouse.y;
    if (Math.sqrt(x * x + y * y) < settings.r * 2) {
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
};

d3.timer(detectCollisions);
