define('score', [
  'backbone'
], function(
  Backbone
){
  var Player = Backbone.Model.extend({
    defaults: {
      "name": "",
      "score": 0
    }
  });
  return Player;
});
