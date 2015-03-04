define('Player', [
	'backbone'
], function(
	Backbone
){
	var Player = Backbone.Model.extend({
		constructor: function() {
			this.set({name: '', score: 0});
		}
	);
	return Player;
});
