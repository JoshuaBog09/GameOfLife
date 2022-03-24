/*
Game of life implementation written in JavaScript 

by Joshua Bogaert

https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
*/

let Width;
let Height;
let block;
let columns;
let rows;

let run = false;

const roundTo = (x) => Math.floor(x / block) * block;

function generateGrid() {
  const grid = new Array();
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      row[j] = 0;
    }
    grid[i] = row;
  }
  return grid;
}

function gameOfLife(current_grid) {
  var next_grid = current_grid.map((arr) => arr.slice());

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      var neighbours = 0;

      // count the amount of alive neighbours
      for (let v = -1; v < 2; v++) {
        for (let h = -1; h < 2; h++) {
          if (h != 0 || v != 0) {
            var indexI = i + v;
            var indexJ = j + h;

            if (i + v < 0) {
              indexI = rows - 1;
            } else if (i + v >= rows) {
              indexI = 0;
            }

            if (j + h < 0) {
              indexJ = columns - 1;
            } else if (j + h >= columns) {
              indexJ = 0;
            }

            if (current_grid[indexI][indexJ] == 1) {
              neighbours++;
            }
          }
        }
      }
      /*
      ------
      To debug the amount of neigbours
      ------
      
      textSize(32);
      text(neighbours, j * block, i * block + block);
      */

      // create new board
      if (current_grid[i][j] == 1) {
        if (neighbours < 2) {
          next_grid[i][j] = 0;
        } else if (neighbours == 2 || neighbours == 3) {
          next_grid[i][j] = 1;
        } else if (neighbours > 3) {
          next_grid[i][j] = 0;
        }
      } else if (current_grid[i][j] == 0) {
        if (neighbours == 3) {
          next_grid[i][j] = 1;
        }
      }
    }
  }
  return next_grid;
}

function drawGrid(grid) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      stroke(145);
      strokeWeight(1);

      var value = grid[i][j];
      if (value == 0) {
        fill(255);
      } else if (value == 1) {
        fill(35);
      }
      square(j * block, i * block, block);
    }
  }
}

function mousePressed() {
  if (run == false){
    var val = grid[mouseY_][mouseX_];
    if (val == 0) {
      grid[mouseY_][mouseX_] = 1;
    } else if (val == 1) {
      grid[mouseY_][mouseX_] = 0;
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER && run == false) {
    run = true;
  } else {
    run = false;
  }
}

function setup() {
  block = 50;
  Width = roundTo(displayWidth);
  Height = roundTo(displayHeight);
  columns = Width / block;
  rows = Height / block;

  createCanvas(Width, Height);
  frameRate(15);

  // Initialize a n by m grid
  grid = generateGrid();

  // create a starting pattern pattern
  grid[2][2] = 1;
  grid[2][3] = 1;
  grid[2][4] = 1;
  grid[1][4] = 1;
  grid[0][3] = 1;
}

function draw() {
  if (run == true) {
    drawGrid(grid);
    grid = gameOfLife(grid);
    drawGrid(grid);
  } else if (run == false) {
    drawGrid(grid);
    mouseX_ = roundTo(mouseX) / block;
    mouseY_ = roundTo(mouseY) / block;
  }
}
