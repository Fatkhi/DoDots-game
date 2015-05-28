define('board', [
  'backbone'
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
          this.cells[i][j] = 0;
        }
      }
    },
    startGame: function() {
      this.set("message", "Waiting for another player")
      this.myIndex = this.currentStep = null;

      this.ws = new WebSocket("ws://"+location.host+"/game");

      this.ws.onopen = function (event) {
        this.set("status",  "Waiting...")
      }.bind(this)

      this.ws.onmessage = function (event) {
        this.dispatchMessage($.parseJSON(event.data));
      }.bind(this)

      this.ws.onclose = function (event) {
        this.set('Status', 'Connection closed')
      }.bind(this)
    },
    capture: function(row, col) {
      var sendData = {
        row: row.toString(),
        col: col.toString()
      }
      this.ws.send(JSON.stringify(sendData));
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
          this.cells = data.board;
        this.trigger("boardChange");

        if (data.game_end)
          this.set("status", "Game end!")

        this.set("score", data.score[this.myIndex]);
        this.currentStep = (data.who_moves == this.myIndex);

        if (this.currentStep) {
          this.set("turn", "Your turn!")
        } else {
          this.set("turn", "Not your turn!")
        }
      } else {
        this.set("status", data.status);
        this.set("message", data.message);
      }
    }
  });

  return Board;
});
