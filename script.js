
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

    if (direction === "left") {
      for (var i=0; i < grid.length; i++) {
        temp = singleArray(grid[i])
        while (temp.length < 5) {
          temp.push(null);
        }
        new_grid.push(temp);
      }
    } else if (direction === "right") {
      for (var i=0; i < grid.length; i++) {
        temp = singleArray(grid[i]).reverse();
        while (temp.length < 5) {
          temp.unshift(null);
        }
        new_grid.push(temp);
      }
    }
      return new_grid;


  };

  // console.log(singleArray([8,16,16,8]));



  var gameGrid = [
    [8,16,16,8],
    [4,4,4,null],
    [8,8,8,null],
    [16,null,16,null]
  ];

 $('body').on('keydown', function(event.keyCode){
     var keyboardInput = {
         37: function(){ parseGrid(gameGrid, "left")},
         38: function(){ parseGrid(gameGrid, "up")},
         39: function(){ parseGrid(gameGrid, "right")},
         40: function(){ parseGrid(gameGrid, "down")}
     };
  });


console.log(parseGrid(gameGrid, "right"));



var startingState = [
  [1, 2, 3, 4],
  [1, 2, 3, 4],
  [1, 2, 3, 4],
  [1, 2, 3, 4]
];

function renderBoard(board) {
  var $board = $('<div class="board"></div>');

  board.forEach(function (row) {
    var $row = $board.append('<div class="row"></div>');
    row.forEach(function (cell) {
      $row.append('<div class="cell">' + cell + '</div>');
    });
  });

  return $board;
}

var myNewBoard = renderBoard(startingState);

function Game() {
  this.board = [
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4]
  ];
}

Game.prototype.render = function () {
  var $board = $('<div class="board"></div>');

  this.board.forEach(function (row) {
    var $row = $board.append('<div class="row"></div>');
    row.forEach(function (cell) {
      $row.append('<div class="cell">' + cell + '</div>');
    });
  });

  return $board;
};

var game = new Game();
var game2 = new Game();

$('body').append(game.render());
