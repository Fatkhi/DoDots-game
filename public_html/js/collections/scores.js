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
      }
    });

    return new ScoreCollection([
      new Player({name:'vasya',score:10}),
      new Player({name:'petya',score:5}),
      new Player({name:'petya2'}),
      new Player({name:'petya3',score:105}),
      new Player({name:'petya4',score:83}),
      new Player({name:'petya5',score:21}),
      new Player({name:'petya6',score:13}),
      new Player({name:'petya7',score:55}),
      new Player({name:'petya8',score:60}),
      new Player({name:'danya',score:15})
    ]);
});
