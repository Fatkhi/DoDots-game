define('board', [
  'backbone'
], function(
  Backbone,
  Cell
){

  var Board = Backbone.Model.extend({
      inGame: false,
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
        var rowNum = this.get('rownum');
        var colNum = this.get('colnum');
      for (i = 0; i < rowNum; i++) {
        this.cells[i] = []
        for (j = 0; j < colNum; j++) {
          this.cells[i][j] = 0;
        }
      }
    },
    startGame: function() {
        this.inGame = true;
      this.set("message", "Waiting for another player");
        //badcode
        swal({
            title: "Waiting for another player...",
            type: "info",
            showConfirmButton: true,
            confirmButtonColor: "#CB4C57",
            confirmButtonText: "Return",
            showCancelButton: false
        }, function(){
            window.location.hash = '#main';
        });
      this.myIndex = this.currentStep = null;

      this.ws = new WebSocket("ws://"+location.host+"/game");

      this.ws.onopen = function (event) {
        this.set("status",  "Waiting...")
      }.bind(this);

      this.ws.onmessage = function (event) {
        this.dispatchMessage($.parseJSON(event.data));
      }.bind(this);

      this.ws.onclose = function (event) {
        this.set('Status', 'Connection closed');
          this.inGame = false;
      }.bind(this)
    },
    capture: function(row, col) {
      var sendData = {
        row: row.toString(),
        col: col.toString()
      };
      this.ws.send(JSON.stringify(sendData));
    },
    dispatchMessage: function(data) {
      if (data.status === "OK" &&
          data.message === "You get information about game.") {
        swal({
          title: "Reconnection",
          text: "Reconnected",
          type: "success",
          timer: 3000,
          showConfirmButton: true
        });
        this.updateStatus(data)
      }

      if (data.status === "Game start") {
        var string = "";
        this.currentStep = data.is_first;
        this.myIndex = data.is_first ? 0 : 1;

        this.set("status", "Game started");
          //swal.close();
        if (this.currentStep) {
          this.set("turn", "Your turn");
            string = "You first";
        } else {
          this.set("turn", "Not your turn");
            string = "You second";
        }

        this.set("message", data.message);
          swal({
              title: "Let the game start!",
              text: string,
              type: "success",
              timer: 3000,
              showConfirmButton: true
          });
      } else if (data.status === "Connected") {
        this.set("status",  "Waiting...")
        this.set("message", data.message)
      } else if (data.status === "OK" ||
                 data.status === "Error" ||
                 data.status === "GameEnd") {
        this.updateStatus(data)
      } else {
        this.set("status", data.status);
        this.set("message", data.message);
      }
    },

    updateStatus: function(data) {
      console.log(this)
      console.log(data)

      if ('board' in data)
        this.cells = data.board;
      this.trigger("boardChange");

      if ('is_first' in data)
        this.myIndex = data.is_first ? 0 : 1;

      if (data.game_end){
          this.inGame = false;
          this.set("status", "Game end!");
          swal({
              title: "The end!",
              type: "success",
              showCancelButton: false,
              confirmButtonColor: "#CB4C57",
              confirmButtonText: "Best results",
              closeOnConfirm: true
          }, function(){
              window.location.hash = '#scoreboard';
          });
      }

      this.set("score", data.score[this.myIndex]);
      this.currentStep = (data.who_moves == this.myIndex);

      if (this.currentStep) {
        this.set("turn", "Your turn!")
      } else {
        this.set("turn", "Not your turn!")
      }
    }
  });

  return Board;
});
