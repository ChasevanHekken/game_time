$(function() {

 $('body').keyup(function(event){
     var keyboardHandler = {
         38: function(){board.move('up')},
         40: function(){board.move('down')},
         37: function(){board.move('left')},
         39: function(){board.move('right')}
     };

     if(keyboardHandler[event.which] !== undefined){
         keyboardHandler[event.keyCode]();
     }
 });
});

//==========================================================

var Board = function(size) {
    this.current_color = Board.BLACK;
    this.size = size;
    this.board = this.create_board(size);
    this.last_move_passed = false;
    this.in_atari = false;
    this.attempted_suicide = false;
};

Board.EMPTY = 0;
Board.BLACK = 1;
Board.WHITE = 2;

/*
 * Returns a size x size matrix with all entries initialized to Board.EMPTY
 */
Board.prototype.create_board = function(size) {
    var m = [];
    for (var i = 0; i < size; i++) {
        m[i] = [];
        for (var j = 0; j < size; j++)
            m[i][j] = Board.EMPTY;
    }
    return m;
};


