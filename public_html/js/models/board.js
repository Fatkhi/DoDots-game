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
      "colnum": 10,
      "score":  0,
      "turn": "Not your turn",
      "status": "Authorize first!",
      "message": ""
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
      this.set("message", "Waiting for another player")
      this.myIndex = this.currentStep = null;
      self = this;
      this.ws = new WebSocket("ws://"+location.host+"/game");
      this.ws.onopen = function (event) {
        self.set("status",  "Waiting...")
      }
      this.ws.onmessage = function (event) {
        self.dispatchMessage($.parseJSON(event.data));
      }
      this.ws.onclose = function (event) {
        self.set('Status', 'Connection closed')
      }
    },
    capture: function(row, col) {
      var sendData = {
        row: row.toString(),
        col: col.toString()
      }
      //if (this.currentStep) {
        this.ws.send(JSON.stringify(sendData));
      //  this.currentStep = false;
      //}
    },
    dispatchMessage: function(data) {
      console.log(data)
      if (data.status === "Game start") {
        this.currentStep = data.is_first;
        this.set("status", "Game started");
        if (this.currentStep) {
          this.set("turn", "Your turn");
        } else {
          this.set("turn", "Not your turn");
        }
        if (this.currentStep)
          this.myIndex = 0;
        else
          this.myIndex = 1;
        this.set("message", data.message);
      } else if (data.status === "Connected") {
        this.set("status",  "Waiting...")
        this.set("message", data.message)
      } else if (data.status === "OK" ||
                 data.status === "Error" ||
                 data.status === "GameEnd") {
        if ('board' in data)
        for (i = 0; i < this.get('rownum'); i++)
          for (j = 0; j < this.get('colnum'); j++)
            this.cells[i][j].set('playerIndex', data.board[i][j]);

        if (data.game_end)
          this.set("status", "Game end!")

        this.set("score", data.score[this.myIndex]);
        this.currentStep = (data.who_moves == this.myIndex);

        if (this.currentStep) {
          this.set("turn", "Your turn!")
        } else {
          this.set("turn", "Not your turn!")
        }
      }
    }
  });

  return Board;
});
