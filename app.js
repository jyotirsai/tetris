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
    case 0:
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
let board = [];
for (var r = 0; r < height; r++) {
  board[r] = [];
  for (var c = 0; c < width; c++) {
    board[r][c] = 0;
  }
}

function initBoard() {
  for (var r = 0; r < height; r++) {
    for (var c = 0; c < width; c++) {
      square(c, r, board[r][c]);
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

// generate a random tetromino
function Generate() {
  let pieces = [Z, S, J, L, T, I, O];
  let random = Math.floor(Math.random() * pieces.length);
  return new Piece(pieces[random]);
}

let p = Generate();

// spawning tetrominoes
function Piece(tetromino) {
  this.tetromino = tetromino;
  this.tetrominoType = 0;
  this.activeTetromino = this.tetromino[this.tetrominoType];
  switch (tetromino) {
    case Z:
      this.colour = 2;
      break;
    case S:
      this.colour = 3;
      break;
    case J:
      this.colour = 4;
      break;
    case L:
      this.colour = 5;
      break;
    case T:
      this.colour = 6;
      break;
    case I:
      this.colour = 7;
      break;
    case O:
      this.colour = 8;
      break;
  }

  // spawn positions aka loading zone, x position will be generated randomly
  this.x = Math.floor(Math.random() * 6 + 1);
  this.y = -1;
}

// draw the piece to the canvas
Piece.prototype.draw = function () {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      if (this.activeTetromino[r][c]) {
        square(c + this.x, r + this.y, this.colour);
      }
    }
  }
};

//undraw previous piece when moving down
Piece.prototype.undraw = function () {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      if (this.activeTetromino[r][c]) {
        square(c + this.x, r + this.y, 0);
      }
    }
  }
};

// move piece down, piece cant move past walls
Piece.prototype.moveDown = function () {
  if (!this.detect(0, 1, this.activeTetromino)) {
    this.undraw();
    this.y++;
    this.draw();
  } else {
    this.lock();
    p = Generate();
  }
};

// move piece right, piece cant move past walls
Piece.prototype.moveRight = function () {
  if (!this.detect(1, 0, this.activeTetromino)) {
    this.undraw();
    this.x++;
    this.draw();
  }
};

// move piece left, piece cant move past walls
Piece.prototype.moveLeft = function () {
  if (!this.detect(-1, 0, this.activeTetromino)) {
    this.undraw();
    this.x = this.x - 1;
    this.draw();
  }
};

// rotate piece
Piece.prototype.rotate = function () {
  let nextType = this.tetromino[
    (this.tetrominoType + 1) % this.tetromino.length
  ];
  let kick = 0;

  if (this.detect(0, 0, nextType)) {
    if (this.x > width / 2) {
      kick = -1;
    } else {
      kick = 1;
    }
  }

  if (!this.detect(kick, 0, nextType)) {
    this.undraw();
    this.x += kick;
    this.tetrominoType = (this.tetrominoType + 1) % this.tetromino.length;
    this.activeTetromino = this.tetromino[this.tetrominoType];
    this.draw();
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
  } else if (event.keyCode == "38") {
    p.rotate();
  }
});

// piece moves down 1 unit every 1 second
let dropStart = Date.now();
let gameOver = false;
function drop() {
  let now = Date.now();
  let diff = now - dropStart;
  if (diff > 1000) {
    p.moveDown();
    dropStart = Date.now();
  }
  if (!gameOver) {
    requestAnimationFrame(drop);
  }
}

drop();

// detect other pieces
Piece.prototype.detect = function (x, y, activeTetromino) {
  /* for moveRight --> (1,0,this.activeTetromino)
     for moveLeft --> (-1,0,this.activeTetromino)
     for moveDown --> (0,1,this.activeTetromino)
  */
  for (r = 0; r < activeTetromino.length; r++) {
    for (c = 0; c < activeTetromino.length; c++) {
      if (!activeTetromino[r][c]) {
        continue;
      }
      let dx = c + this.x + x;
      let dy = r + this.y + y;
      if (dy < 0) {
        continue;
      }
      if (dx < 0 || dx >= width || dy >= height) {
        return true;
      }
      if (board[dy][dx]) {
        return true;
      }
    }
  }
  return false;
};

let score = 0;
// lock piece in place
Piece.prototype.lock = function () {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      if (!this.activeTetromino[r][c]) {
        continue;
      }
      if (this.y + r < 0) {
        alert("Game Over");
        gameOver = true;
        break;
      }
      board[this.y + r][this.x + c] = this.colour;
    }
  }
  for (r = 0; r < height; r++) {
    let isRowFull = true;
    for (c = 0; c < width; c++) {
      isRowFull = isRowFull && board[r][c] != 0;
    }
    if (isRowFull) {
      for (y = r; y > 1; y--) {
        for (c = 0; c < width; c++) {
          board[y][c] = board[y - 1][c];
        }
      }
      for (c = 0; c < width; c++) {
        board[0][c] = 0;
      }
      score += 10;
    }
  }
  initBoard();
};
