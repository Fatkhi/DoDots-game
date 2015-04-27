define('cell', [
  'backbone'
], function(
  Backbone
){

  var Cell = Backbone.Model.extend({
    defaults: {
      "playerIndex": 0
    },
    chown: function() {
      this.get('parent').capture(this.get('i'), this.get('j'));
    }
  });

  return Cell;
});
