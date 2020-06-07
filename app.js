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

// spawning tetrominoes
function Piece(tetromino) {
  this.startOrientation = tetromino[0];
  this.tetromino = tetromino;

  // spawn positions aka loading zone, x position will be generated randomly
  this.x = Math.floor(Math.random() * 6 + 1);
  this.y = 2;

  /* add moveDown function that changes this.spawnY to ++ */
  function moveDown() {
    this.y = this.y + 1;
  }
}

// randomly generate a tetromino and pass to Spawn
var tetromino;
function Generate() {
  let tetrominos = [Z, S, J, L, T, I, O];
  let spawnPiece = tetrominos[Math.floor(Math.random() * tetrominos.length)];

  tetromino = new Piece(spawnPiece);

  for (r = 0; r < tetromino.startOrientation.length; r++) {
    for (c = 0; c < tetromino.startOrientation.length; c++) {
      if (tetromino.startOrientation[r][c]) {
        square(
          c + tetromino.x,
          r + tetromino.y,
          tetromino.startOrientation[r][c]
        );
      }
    }
  }
}

Generate();

Piece.prototype.moveDown = function () {
  this.y++;
  this.Generate();
};

// NEED TO MOVE THIS INSIDE SPAWN FUNCTION

document.addEventListener("keydown", function (event) {
  // change this to call piece.moveDown function inside Spawn
  if (event.keyCode == 40) {
    tetromino.moveDown();
    /*tetromino.y = tetromino.y + 1;
    for (r = 0; r < tetromino.startOrientation.length; r++) {
      for (c = 0; c < tetromino.startOrientation.length; c++) {
        if (tetromino.startOrientation[r][c]) {
          square(
            c + tetromino.x,
            r + tetromino.y,
            tetromino.startOrientation[r][c]
          );
        }
      }
    }*/
  }
});
