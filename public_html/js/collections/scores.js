define('ScoreCollection', [
		'backbone'
], function(
		Backbone
){

		var ScoreCollection = Backbone.Collection.extend({
			model: Player
		});

		return new ScoreCollection();
});
