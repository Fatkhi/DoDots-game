define('scores', [
    'backbone',
    'score'
], function(
    Backbone,
    Player
){

    var ScoreCollection = Backbone.Collection.extend({
      model: Player,
      comparator: function(player) {
        return -player.get('score');
      },
      fetchData: function() {
        $.get("/best", function(data) {
          data = $.parseJSON(data);
          this.reset();
          for(i = 0; i < data.users.length; i++) {
            this.add(new Player({name:data.users[i].name, score:data.users[i].score}))
          }
          this.trigger("change")
        }.bind(this));
      }
    });

    return new ScoreCollection();
});
