import Two from './two';
import _ from 'underscore';

const increment = Math.PI / 256;
const TWO_PI = Math.PI * 2;
const PI = Math.PI;

// var type = /(canvas|webgl)/.test(url.type) ? url.type : 'svg';
const type = 'canvas';
const two = new Two({
  type: Two.Types[type],
  fullscreen: true,
}).appendTo(document.getElementById('triangles'));

// var background = two.makeGroup();
// const back = two.makeGroup();
const triangleGroup = two.makeGroup();
// var foreground = two.makeGroup();

// var tri1 = makeTriangle(two, 300);
// tri1.translation.set(two.width / 2, two.height / 2);
// middleground.add(tri1);

const triangles = [];

// triangleGroup.scale = 0;

const logo = document.getElementById('sl-logo');

const sl = two.interpret(logo).center();
sl.translation.set(two.width / 2, two.height / 2);
sl.fill = 'rgba(0,0,0,0.66)';
sl.scale = 2;

// back.add(sl);

two.bind('update', function(frameCount) {
  if (sl.scale > 1) {
    sl.scale = sl.scale - 0.1;
  }
});

_.each([0, 1, 2, 3, 4, 5, 6, 7, 8], function(n) {
  triangles[n] = makeTriangle(two);
  triangles[n].translation.set(two.width / 2, two.height / 2);
  triangleGroup.add(triangles[n]);
});

_.defer(function() {
  two.play();
});


function makeTriangle(two) {
  const TWO_PI = Math.PI * 2,
      side0 = new Two.Anchor(-randSize() / 2, 0),
      side1 = new Two.Anchor(randSize() / 2, 0),
      side2 = new Two.Anchor(0, randSize());

// console.log(side0, side1, side2);
// var tri = two.makePolygon(- randSize() / 2, 0, randSize() / 2, 0, 0, randSize());
  const tri = two.makePolygon([side0, side1, side2]);

  tri.fill = 'rgba(200,200,200,0.24)';
// tri.fill = 'rgba(0,0,0,0.26)';
  tri.rotation = Math.PI - randSize();
  tri.noStroke();
  tri.rAmt = _.random(5, 24) * 0.0001;
  tri.rDir = randDir();
  tri.sideScale = ['up', 'up', 'down'];
  tri.sideMax = [randSize(), randSize(), randSize()];
  tri.sideSpeed = [randSideSpeed(), randSideSpeed(), randSideSpeed()];

  two.bind('update', function(frameCount) {
    // spin
    if (tri.rotation > TWO_PI) {
      tri.rotation = 0;
    }
    if (tri.rDir === 'r') {
      tri.rotation += tri.rAmt;
    } else {
      tri.rotation -= tri.rAmt;
    }
    // size/shape

    shiftX(0);
    shiftX(1);
    shiftY(2);

    function shiftX(i) {
      const v = tri.vertices[i];
      let x = v._x;
      const y = v._y;
      if (x === tri.sideMax[i]) {
        tri.sideMax[i] = randSize();
        tri.sideSpeed = randSideSpeed();
      }

      if (v._x > tri.sideMax[i]) { tri.sideScale[i] = 'down'; }

      if (v._x < -tri.sideMax[i]) { tri.sideScale[i] = 'up';}

      if (tri.sideScale[i] === 'up') {
        x = x + tri.sideSpeed[i];
      }
      if (tri.sideScale[i] === 'down') {
        x = x - tri.sideSpeed[i];
      }
      v._x = x;
    }

    function shiftY(i) {
      const v = tri.vertices[i];
      const x = v._x;
      let y = v._y;
      if (y === tri.sideMax[i]) {
        tri.sideMax[i] = randSize();
        tri.sideSpeed = randSideSpeed();
      }
      if (v._x > tri.sideMax[i]) { tri.sideScale[i] = 'down'; }

      if (v._x < -tri.sideMax[i]) { tri.sideScale[i] = 'up';}

      if (tri.sideScale[i] === 'up') {
        y = y + tri.sideSpeed[i];
      }
      if (tri.sideScale[i] === 'down') {
        y = y - tri.sideSpeed[i];
      }
      v._y = y;
    }
    // tri.translation.set(two.width / 2, two.height / 2);
  });

  tri.center();
  // console.log(tri.sideSpeed);
  return tri;
}

function randSideSpeed() {
  let num = _.random(5, 100);
  num = num * .001;
  return num;
}

function randSize() {
  const num = _.random(200, 427);
  Math.floor(num);
  return num;
}

function randDir() {
  const i = _.random(1, 2);
  return (i === 1) ? 'r' : 'l';
}
  

  

