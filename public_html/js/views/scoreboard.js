define('scoreboard', [
    'backbone',
    'scoreboardTmpl',
    'scores'
], function(
    Backbone,
    tmpl,
    ScoreCollection
){

    var View = Backbone.View.extend({
        model: ScoreCollection,
        template: tmpl,
        initialize: function () {
          this.listenTo(this.model, "change", this.render);
        },
        render: function () {
          this.$el.html(this.template({players:this.model.models}));
          return this.$el;
        },
        show: function () {
            // TODO
        },
        hide: function () {
            // TODO
        }

    });
    return new View();
});
