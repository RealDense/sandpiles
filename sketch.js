let wid = 960;
let hig = 960;
let cellSize = 8;

let row = wid / cellSize;
let col = hig / cellSize;
let sandpiles = new Array(row);
for(let x = 0; x < row; x++){
  sandpiles[x] = new Array(col);
}

// let cellSize = 4;
// for (let r = 0; r < row; r++){
//   for (let c = 0; c < col; c++){
//     sandpiles[r][c] = 0;
//   }
// }
// sandpiles[row/2][col/2] = 1000;

function setup() {
  createCanvas(wid, hig);
  // cellSize = 400/row;
  // sandpiles = new int[row][col];
  for (let r = 0; r < row; r++){
    for (let c = 0; c < col; c++){
      sandpiles[r][c] = 0;
      if(r + 1 >= row) sandpiles[r][c] += 1000;
      if(r - 1 < 0)  sandpiles[r][c] += 1000;
      if(c + 1 >= col) sandpiles[r][c] += 1000;
      if(c - 1 < 0)  sandpiles[r][c] += 1000;
    }
  }
  // addSand(floor((Math.random() * row)), floor((Math.random() * col)));
  // addSand(floor((Math.random() * row)), floor((Math.random() * col)));
  // addSand(floor((Math.random() * row)), floor((Math.random() * col)));

  // sandpiles[row/2-1][col/2-1] = 10000;
  // sandpiles[row-1][col-1] = 100000;
  // console.log(cellSize);

  // console.log(sandpiles[0][0]);
}

function addSand(x1, y1){
  let x2 = -(x1 - row/2) + row/2-1;
  let y2 = -(y1 - row/2) + row/2-1;
  // sandpiles[floor(mouseX/cellSize)][floor(mouseY/cellSize)] += 1000;
  let pileSize = 500;
  sandpiles[x1][y1] += pileSize;
  sandpiles[x1][y2] += pileSize;
  sandpiles[x2][y1] += pileSize;
  sandpiles[x2][y2] += pileSize;
  sandpiles[y1][x1] += pileSize;
  sandpiles[y1][x2] += pileSize;
  sandpiles[y2][x1] += pileSize;
  sandpiles[y2][x2] += pileSize;
}

function singleHexPile(x1,y1){
  // console.log(x1, y1)
  y1 = round(y1/cellSize);
  if(y1%2 == 0)  x1 = x1 - cellSize/2;
  x1 = round(x1/cellSize);
  // console.log(x1, y1)
  let x2 = -(x1 - row/2) + row/2-1;
  let y2 = -(y1 - row/2) + row/2-1;
  // sandpiles[floor(mouseX/cellSize)][floor(mouseY/cellSize)] += 1000;
  let pileSize = 500;
  sandpiles[x1][y1] += pileSize;
  // sandpiles[x2][y2] += pileSize;
  
}

function addSandHex(x1, y1){
  // singleHexPile(x1,y1);
  // let distttt = dist(x1, y1, row/2, col/2)
  // let deg = atan2(y1-row/2,x1-col/2)+PI/3;
  // console.log(distttt*cos(deg))
  // console.log(distttt)
  // singleHexPile(round(distttt* cos(deg)+row/2), round(distttt*sin(deg)+row/2));
  // deg = deg + PI/3;
  // singleHexPile(round(distttt* cos(deg)+row/2), round(distttt*sin(deg)+row/2));

  //first6
  //loop
  for(let i = 0; i < 2; i ++){
    let distttt = dist(x1, y1, width/2, height/2)
    console.log(distttt)
    let deg = atan2(y1-width/2,x1-height/2);
    for(let j = 0; j < 6; j++){
      singleHexPile((distttt* cos(deg+ PI/3*j)+width/2), (distttt*sin(deg+PI/3*j)+height/2));

    }
    y1 = -(y1 - width/2) + width/2;
  }

  //mirror
}

function mouseClicked(event) {
  let x1 = floor(mouseX/cellSize);
  let y1 = floor(mouseY/cellSize);
  addSand(x1, y1);
  // addSandHex(x1, y1);
}

function topple3(){
  // let nextPiles = sandpiles.slice(0);
  let nextPiles = [];
  // console.log(nextPiles)
  for (let r = 0; r < row; r++){
    nextPiles.push([]);
    for (let c = 0; c < col; c++){
      nextPiles[r][c] = 0;
    }
  }
  // console.log(nextPiles[0])
  for (let r = 0; r < row; r++){
    for (let c = 0; c < col; c++){
      // nextPiles[r][c] = sandpiles[r][c];
      if (sandpiles[r][c] > 2){
        // nextPiles[r][c] += (-4);
        nextPiles[r][c] += sandpiles[r][c] - 3;
        if(r + 1 < row){
          nextPiles[r+1][c] += 1;
        }
        if(r - 1 >= 0){
          nextPiles[r-1][c] += 1;
        }
        if(r % 2 == c % 2){
          if(c + 1 < col) nextPiles[r][c+1] += 1;
        }else{
          if(c - 1 >= 0) nextPiles[r][c-1] += 1;

        }
      }else{
        nextPiles[r][c] += sandpiles[r][c];
      }
    }
  }

  sandpiles = nextPiles;
}

function topple4x4(){
  // let nextPiles = sandpiles.slice(0);
  let nextPiles = [];
  // console.log(nextPiles)
  for (let r = 0; r < row; r++){
    nextPiles.push([]);
    for (let c = 0; c < col; c++){
      nextPiles[r][c] = 0;
    }
  }
  // console.log(nextPiles[0])
  for (let r = 0; r < row; r++){
    for (let c = 0; c < col; c++){
      // nextPiles[r][c] = sandpiles[r][c];
      if (sandpiles[r][c] > 3){
        // nextPiles[r][c] += (-4);
        nextPiles[r][c] += sandpiles[r][c] - 4;
        if(r + 1 < row){
          nextPiles[r+1][c] += 1;
        }
        if(r - 1 >= 0){
          nextPiles[r-1][c] += 1;
        }
        if(c + 1 < col){
          nextPiles[r][c+1] += 1;
        }
        if(c - 1 >= 0){
          nextPiles[r][c-1] += 1;
        }
      }else{
        nextPiles[r][c] += sandpiles[r][c];
      }
    }
  }

  sandpiles = nextPiles;
}

function topple6x6(){
  // let nextPiles = sandpiles.slice(0);
  let nextPiles = [];
  // console.log(nextPiles)
  for (let r = 0; r < row; r++){
    nextPiles.push([]);
    for (let c = 0; c < col; c++){
      nextPiles[r][c] = 0;
    }
  }
  // console.log(nextPiles[0])
  for (let r = 0; r < row; r++){
    for (let c = 0; c < col; c++){
      // nextPiles[r][c] = sandpiles[r][c];
      if (sandpiles[r][c] > 5){
        // nextPiles[r][c] += (-4);
        nextPiles[r][c] += sandpiles[r][c] - 6;
        if(r + 1 < row) nextPiles[r+1][c] += 1;
        if(r - 1 >= 0)  nextPiles[r-1][c] += 1;
        if(c + 1 < col) nextPiles[r][c+1] += 1;
        if(c - 1 >= 0)  nextPiles[r][c-1] += 1;
        if(c %2 == 0){
          if(c - 1 >= 0 && r - 1 >= 0)  nextPiles[r-1][c-1] += 1;
          if(r - 1 >= 0 && c + 1 < col)  nextPiles[r-1][c+1] += 1;
        }else{
          if(c - 1 >= 0 && r + 1 < row)  nextPiles[r+1][c-1] += 1;
          if(r + 1 < row && c + 1 < col)  nextPiles[r+1][c+1] += 1;
        }
      }else{
        nextPiles[r][c] += sandpiles[r][c];
      }
    }
  }

  sandpiles = nextPiles;
}


function topple8x8(){
  // let nextPiles = sandpiles.slice(0);
  let nextPiles = [];
  // console.log(nextPiles)
  for (let r = 0; r < row; r++){
    nextPiles.push([]);
    for (let c = 0; c < col; c++){
      nextPiles[r][c] = 0;
    }
  }
  // console.log(nextPiles[0])
  for (let r = 0; r < row; r++){
    for (let c = 0; c < col; c++){
      // nextPiles[r][c] = sandpiles[r][c];
      if (sandpiles[r][c] > 7){
        // nextPiles[r][c] += (-4);
        nextPiles[r][c] += sandpiles[r][c] - 8;
        if(r + 1 < row) nextPiles[r+1][c] += 1;
        if(r - 1 >= 0)  nextPiles[r-1][c] += 1;
        if(c + 1 < col) nextPiles[r][c+1] += 1;
        if(c - 1 >= 0)  nextPiles[r][c-1] += 1;

        if(r + 1 < row && c + 1 < col) nextPiles[r+1][c+1] += 1;
        if(r - 1 >= 0 && c - 1 >= 0)  nextPiles[r-1][c-1] += 1;
        if(c + 1 < col && r - 1 >= 0) nextPiles[r-1][c+1] += 1;
        if(c - 1 >= 0 && r + 1 < row)  nextPiles[r+1][c-1] += 1;
      }else{
        nextPiles[r][c] += sandpiles[r][c];
      }
    }
  }

  sandpiles = nextPiles;
}

function toppleGrowth(){
  // let nextPiles = sandpiles.slice(0);
  let nextPiles = [];
  // console.log(nextPiles)
  for (let r = 0; r < row; r++){
    nextPiles.push([]);
    for (let c = 0; c < col; c++){
      nextPiles[r][c] = 0;
    }
  }
  // console.log(nextPiles[0])
  for (let r = 0; r < row; r++){
    for (let c = 0; c < col; c++){
      // nextPiles[r][c] = sandpiles[r][c];
      if(r + 1 >= row) nextPiles[r][c] += 1;
      if(r - 1 < 0)  nextPiles[r][c] += 1;
      if(c + 1 >= col) nextPiles[r][c] += 1;
      if(c - 1 < 0)  nextPiles[r][c] += 1;

      if (sandpiles[r][c] > 7){
        // nextPiles[r][c] += (-4);
        nextPiles[r][c] += sandpiles[r][c] - 8;
        if(r + 1 < row) nextPiles[r+1][c] += 1;
        if(r - 1 >= 0)  nextPiles[r-1][c] += 1;
        if(c + 1 < col) nextPiles[r][c+1] += 1;
        if(c - 1 >= 0)  nextPiles[r][c-1] += 1;

        if(r + 1 < row && c + 1 < col) nextPiles[r+1][c+1] += 1;
        if(r - 1 >= 0 && c - 1 >= 0)  nextPiles[r-1][c-1] += 1;
        if(c + 1 < col && r - 1 >= 0) nextPiles[r-1][c+1] += 1;
        if(c - 1 >= 0 && r + 1 < row)  nextPiles[r+1][c-1] += 1;
      }else{
        nextPiles[r][c] += sandpiles[r][c];
      }
    }
  }

  sandpiles = nextPiles;
}

function render3(){
  noStroke();
  let n;
  for (let r = 0; r < row; r++){
    for (let c = 0; c < col; c++){
      n = sandpiles[r][c];
      // console.log(n);
      let col = color(255);
      if      (n == 0) col = color(0,255,0);
      else if (n == 1) col = color(255,0,0);
      else col = color(0,0,255);
      noStroke();
      // if(r == 99 && c == 99){
      //   console.log(sandpiles.length);
      // }
      fill(col);
      rect(r*cellSize, c*cellSize, cellSize, cellSize);
    }
  }
}

function render4(){
  noStroke();
  let n;
  for (let r = 0; r < row; r++){
    for (let c = 0; c < col; c++){
      n = sandpiles[r][c];
      // console.log(n);
      let col = color(255);
      if (n == 0){
          col = color(255,255,0);
      }
      else if (n == 1){
          col = color(0,185,63);
      }
      else if (n == 2){
          col = color(0,104,225);
      }
      else{
          col = color(122,0,229);
      }
      noStroke();
      // if(r == 99 && c == 99){
      //   console.log(sandpiles.length);
      // }
      fill(col);
      rect(r*cellSize, c*cellSize, cellSize, cellSize);
    }
  }
}

function render6(){
  noStroke();
  let n;
  for (let r = 0; r < row; r++){
    for (let c = 0; c < col; c++){
      n = sandpiles[r][c];
      // console.log(n);
      let col = color(255);
      if      (n == 0) col = color(0,0,0);
      else if (n == 1) col = color(29,11,69);
      else if (n == 2) col = color(84,19,109);
      // else if (n == 3) col = color(135,33,107);
      else if (n == 3) col = color(0);
      else if (n == 4) col = color(187,54,84);
      // else if (n == 5) col = color(225,86,53);
      else if (n == 5) col = color(0);
      else if (n == 6) col = color(249,140,9);
      else col = color(249,201,50);
      noStroke();
      // if(r == 99 && c == 99){
      //   console.log(sandpiles.length);
      // }
      fill(col);
      if(c%2 == 0){
        // console.log(r*cellSize, c*cellSize-(cellSize/2), cellSize, cellSize);
        rect(r*cellSize-(cellSize/2), c*cellSize, cellSize, cellSize);
      }else{
        rect(r*cellSize, c*cellSize, cellSize, cellSize);
      }
    }
  }
}

function render8(){
  noStroke();
  let n;
  for (let r = 0; r < row; r++){
    for (let c = 0; c < col; c++){
      n = sandpiles[r][c];
      // console.log(n);
      let col = color(255);
      if      (n == 0) col = color(0,0,0);
      else if (n == 1) col = color(29,11,69);
      else if (n == 2) col = color(84,19,109);
      else if (n == 3) col = color(135,33,107);
      else if (n == 4) col = color(187,54,84);
      else if (n == 5) col = color(225,86,53);
      else if (n == 6) col = color(249,140,9);
      else col = color(249,201,50);
      noStroke();
      // if(r == 99 && c == 99){
      //   console.log(sandpiles.length);
      // }
      fill(col);
      rect(r*cellSize, c*cellSize, cellSize, cellSize);
    }
  }
}

function draw() {
  background(0);
  render8();
  topple8x8();
}

