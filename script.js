Array.prototype.chunk = function(chunkSize) {
  var array=this;
  return [].concat.apply([],
    array.map(function(elem,i) {
      return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
    })
  );
}

// var checkIfLose = function(scores) {
//   for (var i = 0; i < scores.length; i++) {
//
//     if (scores[i + 1] === scores[i] && i%4 !== 3)
//       return false;
//     if (scores[i - 1] === scores[i] && i%4 !== 0)
//       return false;
//     if (scores[i + 4] === scores[i] && i <= 11)
//       return false;
//     if (scores[i + 4] === scores[i] && i >= 4)
//       return false;
//     }
//   return true;
// }

var checkIfFull = function(grid) {

  var arr = _.flatten(grid);
  var new_arr = [];

  for(var i=0; i < arr.length; i++) {
    if (arr[i] !== null) {
        new_arr.push(arr[i])
      }
    }

  if (new_arr.length === 16) {
    return false;
  } else {
    return true;
  }
}

var reverseGrid = function(grid) {
  var temp_grid = [];
  var temp_arr = [];

  for(var i=0; i < grid.length; i++) {
    for(var j=0; j < grid[i].length; j++) {
      temp_arr.push(grid[j][i]);
    }
  }

  var reversed = temp_arr.chunk(4);
  return reversed;
};

var singleArray = function(arr) {
  var new_arr = [];

  for(var i=0; i < arr.length; i++) {
    if (arr[i] !== null) {
        new_arr.push(arr[i])
      }
    }

  var previous_value = 0;
  var bool_switch = false;
  var newer_arr = [];

  for(var i=0; i < new_arr.length; i++) {
    newer_arr.push(new_arr[i]);

    if (new_arr[i] == previous_value) {
      newer_arr.pop();
      newer_arr.pop();
      newer_arr.push(new_arr[i] * 2);
      previous_value = 0;
      bool_switch = true;
    }

    if (bool_switch == false) {
      previous_value = new_arr[i];
    }
    bool_switch = false;
  }

  return newer_arr;
};

var parseGrid = function(grid, direction) {
  var new_grid = [];
  var temp = [];
  var temp_grid = [];

  if (direction === "left") {
    for (var i=0; i < grid.length; i++) {
      temp = singleArray(grid[i]);
      while (temp.length < 4) {
        temp.push(null);
      }
      new_grid.push(temp);
    }
  } else if (direction === "right") {
    for (var i=0; i < grid.length; i++) {
      temp = singleArray(grid[i].reverse()).reverse();
      while (temp.length < 4) {
        temp.unshift(null);
      }
      new_grid.push(temp);
    }
  } else if (direction === "up") {
    var temp_grid = reverseGrid(grid);
    for (var i=0; i < temp_grid.length; i++) {
      temp = singleArray(temp_grid[i]);
      while (temp.length < 4) {
        temp.push(null);
      }
      new_grid.push(temp);
    }
    new_grid = reverseGrid(new_grid);
  } else if (direction === "down") {
    var temp_grid = reverseGrid(grid);
    for (var i=0; i < temp_grid.length; i++) {
      temp = singleArray(temp_grid[i].reverse()).reverse();
      while (temp.length < 4) {
        temp.unshift(null);
      }
      new_grid.push(temp);
    }
    new_grid = reverseGrid(new_grid);
  }
    return new_grid;
};

function render(board) {
  var $board = $('<div class="board"></div>');

  board.forEach(function (row) {
    var $row = $board.append('<div class="row"></div>');
    row.forEach(function (cell) {
      $row.append('<div class="cell hi' + cell + '">' + cell + '</div>');
    });
  });
  return $board;
};

function Game() {
  this.board = [
    [null,null,null,null],
    [null,null,null,null],
    [null,null,null,null],
    [null,null,null,null]
  ];
}

Game.prototype.fillRandomSquare = function() {
  var squares = _.flatten(this.board);
  var index = Math.floor((Math.random() * squares.length));
  while(squares[index] !== null) {
    index = Math.floor((Math.random() * squares.length));
  }
  squares[index] = Math.random() < 0.9 ? 2 : 4;
  this.board = squares.chunk(4);
}

$(document).ready(function() {

  var game = new Game();

  $('.board').html(render(game.board));

  var handleDirection = function(dir) {
    $('.board').empty();
    game.board = parseGrid(game.board, dir);
    if (checkIfFull(game.board)) {
      game.fillRandomSquare();
    }
    $('.board').append(render(game.board));
    // if (checkIfLose(_.flatten(game.board)) && checkIfFull(game.board)) {
    //   alert("You Lost!");
    // }
  }

  Mousetrap.bind("up", function() {
    handleDirection("up");
  });

  Mousetrap.bind("down", function() {
    handleDirection("down");
  });

  Mousetrap.bind("left", function() {
    handleDirection("left");
  });

  Mousetrap.bind("right", function() {
    handleDirection("right");
  });

  $(".reset-game" ).click(function() {
    game = new Game();
    $('.board').html(render(game.board));
  });
});
