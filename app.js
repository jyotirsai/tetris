const canvas = document.getElementById("canvas");

// set canvas rendering context to 2d
const ctx = canvas.getContext("2d");

// set basic dimensions
const width = 10;
const height = 20;
const square_size = 25;

// set canvas width and height
ctx.canvas.width = width * square_size;
ctx.canvas.height = height * square_size;

// scaling pixels/units on canvas to square_size
ctx.scale(square_size, square_size);

// drawing squares on canvas

function square(x, y, color) {
  // pass a number which represents a color
  switch (color) {
    case 1:
      setColor = "white";
      break;
    case 2:
      setColor = "red";
      break;
    case 3:
      setColor = "orange";
      break;
    case 4:
      setColor = "yellow";
      break;
    case 5:
      setColor = "green";
      break;
    case 6:
      setColor = "cyan";
      break;
    case 7:
      setColor = "blue";
      break;
    case 8:
      setColor = "purple";
      break;
  }

  ctx.fillStyle = setColor;
  ctx.fillRect(x, y, 1, 1);
}

// initialize the board

var board = [];
for (var i = 0; i < width; i++) {
  board[i] = new Array(height);
}

function initBoard() {
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      square(i, j, 1);
    }
  }
}

initBoard();

// tetrominoes, numbers inside matrix represent their color

const Z = [
  [
    [2, 2, 0],
    [0, 2, 2],
    [0, 0, 0],
  ],
  [
    [0, 0, 2],
    [0, 2, 2],
    [0, 2, 0],
  ],
  [
    [0, 0, 0],
    [2, 2, 0],
    [0, 2, 2],
  ],
  [
    [0, 2, 0],
    [2, 2, 0],
    [2, 0, 0],
  ],
];

const S = [
  [
    [0, 3, 3],
    [3, 3, 0],
    [0, 0, 0],
  ],
  [
    [0, 3, 0],
    [0, 3, 3],
    [0, 0, 3],
  ],
  [
    [0, 0, 0],
    [0, 3, 3],
    [3, 3, 0],
  ],
  [
    [3, 0, 0],
    [3, 3, 0],
    [0, 3, 0],
  ],
];

const J = [
  [
    [4, 4, 4],
    [0, 0, 4],
    [0, 0, 0],
  ],
  [
    [0, 0, 4],
    [0, 0, 4],
    [0, 4, 4],
  ],
  [
    [0, 0, 0],
    [4, 0, 0],
    [4, 4, 4],
  ],
  [
    [4, 4, 0],
    [4, 0, 0],
    [4, 0, 0],
  ],
];

const L = [
  [
    [5, 5, 5],
    [5, 0, 0],
    [0, 0, 0],
  ],
  [
    [0, 5, 5],
    [0, 0, 5],
    [0, 0, 5],
  ],
  [
    [0, 0, 0],
    [0, 0, 5],
    [5, 5, 5],
  ],
  [
    [5, 0, 0],
    [5, 0, 0],
    [5, 5, 0],
  ],
];

const T = [
  [
    [6, 6, 6],
    [0, 6, 0],
    [0, 0, 0],
  ],
  [
    [0, 0, 6],
    [0, 6, 6],
    [0, 0, 6],
  ],
  [
    [0, 0, 0],
    [0, 6, 0],
    [6, 6, 6],
  ],
  [
    [6, 0, 0],
    [6, 6, 0],
    [6, 0, 0],
  ],
];

const I = [
  [
    [7, 7, 7, 7],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 7],
    [0, 0, 0, 7],
    [0, 0, 0, 7],
    [0, 0, 0, 7],
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [7, 7, 7, 7],
  ],
  [
    [7, 0, 0, 0],
    [7, 0, 0, 0],
    [7, 0, 0, 0],
    [7, 0, 0, 0],
  ],
];

const O = [
  [
    [8, 8, 0],
    [8, 8, 0],
    [0, 0, 0],
  ],
  [
    [0, 8, 8],
    [0, 8, 8],
    [0, 0, 0],
  ],
  [
    [0, 0, 0],
    [0, 8, 8],
    [0, 8, 8],
  ],
  [
    [0, 0, 0],
    [8, 8, 0],
    [8, 8, 0],
  ],
];

let pieces = [Z, S, J, L, T, I, O];

// spawning tetrominoes
function Piece(tetromino) {
  this.tetromino = tetromino;
  this.activeTetromino = tetromino[0];

  // spawn positions aka loading zone, x position will be generated randomly
  this.x = Math.floor(Math.random() * 6 + 1);
  this.y = 2;
}

let p = new Piece(pieces[0]);

// draw the piece to the canvas
Piece.prototype.draw = function () {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      if (this.activeTetromino[r][c]) {
        square(c + this.x, r + this.y, this.activeTetromino[r][c]);
      }
    }
  }
};

//undraw previous piece when moving down
Piece.prototype.undraw = function () {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      if (this.activeTetromino[r][c]) {
        square(c + this.x, r + this.y, 1);
      }
    }
  }
};

// move piece down, piece cant move past walls
Piece.prototype.moveDown = function () {
  if (this.y < 18) {
    this.undraw();
    this.y++;
    this.draw();
  }
};

// move piece right, piece cant move past walls
Piece.prototype.moveRight = function () {
  if (this.y < 18) {
    if (this.tetromino == I) {
      if (this.x < 6) {
        this.undraw();
        this.x++;
        this.draw();
      }
    } else {
      if (this.x < 7) {
        this.undraw();
        this.x++;
        this.draw();
      }
    }
  }
};

// move piece left, piece cant move past walls
Piece.prototype.moveLeft = function () {
  if (this.y < 18) {
    if (this.x > 0) {
      this.undraw();
      this.x = this.x - 1;
      this.draw();
    }
  }
};

// keyboard controls to control tetrominoes
document.addEventListener("keydown", (event) => {
  if (event.keyCode == "40") {
    p.moveDown();
  } else if (event.keyCode == "39") {
    p.moveRight();
  } else if (event.keyCode == "37") {
    p.moveLeft();
  }
});

// piece moves down 1 unit every 1 second
let dropStart = Date.now();
function drop() {
  let now = Date.now();
  let diff = now - dropStart;
  if (diff > 1000) {
    p.moveDown();
    dropStart = Date.now();
  }
  requestAnimationFrame(drop);
}

drop();

// need to lock pieces when they come into contact with another piece
