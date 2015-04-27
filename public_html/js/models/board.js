define('board', [
  'backbone',
  'cell'
], function(
  Backbone,
  Cell
){

  var Board = Backbone.Model.extend({
    cells: [],
    ws: null,
    currentStep: null,
    myIndex: null,
    defaults: {
      "rownum": 10,
      "colnum": 10
    },
    initialize: function() {
      for (i = 0; i < this.get('rownum'); i++) {
        this.cells[i] = []
        for (j = 0; j < this.get('colnum'); j++) {
          this.cells[i][j] = new Cell();
          this.cells[i][j].set('parent', this);
          this.cells[i][j].set('i', i);
          this.cells[i][j].set('j', j);
        }
      }
    },
    startGame: function() {
      for (i = 0; i < this.get('rownum'); i++) {
        for (j = 0; j < this.get('colnum'); j++) {
          this.cells[i][j].set('playerIndex', 0);
        }
      }
      this.myIndex = this.currentStep = null;
      self = this;
      this.ws = new WebSocket("ws://localhost:8080/game");
      this.ws.onopen = function (event) {}
      this.ws.onmessage = function (event) {
        self.dispatchMessage($.parseJSON(event.data));
      }
      this.ws.onclose = function (event) {}
    },
    capture: function(row, col) {
      var sendData = {
        row: row.toString(),
        col: col.toString()
      }
      if (this.currentStep) {
        this.ws.send(JSON.stringify(sendData));
        this.currentStep = false;
      }
    },
    dispatchMessage: function(data) {
      if (data.status === "Game start") {
        this.currentStep = data.is_first;
        if (this.currentStep) {
          alert("Game started! You are the first player!")
        } else {
          alert("Game started! You are the second player!")
        }
        if (this.currentStep)
          this.myIndex = 0;
        else
          this.myIndex = 1;
        alert(data.message);
      } else if (data.status === "Connected") {
        alert(data.message)
      } else if (data.status === "OK" || data.status === "Error") {
        for (i = 0; i < this.get('rownum'); i++) {
          for (j = 0; j < this.get('colnum'); j++) {
            if (data.who_moves == this.myIndex)
              x = data.board[i][j]
            else {
              x = 0
              if (data.board[i][j] == 1)
                x = 2
              if (data.board[i][j] == 2)
                x = 1
            }
            this.cells[i][j].set('playerIndex', x);
          }
        }
        if (data.game_end) {
          alert("Game end!")
        }
        alert("Your score: " + data.score[this.myIndex]);
        if (data.who_moves == this.myIndex) {
          this.currentStep = true;
          alert("Your turn!")
        } else {
          this.currentStep = false;
          alert("Not your turn!")
        }
      }
    }
  });

  return Board;
});
