define('ScoreItem', [
		'backbone'
], function(
	Backbone
){
		var ScoreItem = new Backbone.View.extend({
			tagName: "li",
			className: "score_item",
			template: fest['player'],

			events: {
				"click .button_delete": "destroy"
			},
			initialize: function() {
				this.listenTo(this.model, "change", this.render);
			},
			render: function() {
				this.$el.html(this.template(this.model.attributes));
				return this;
			},
			destroy: function() {
			}
		});

		return new ScoreItem({
			model: Player,
			id: "player-"+player.name
		});
});
