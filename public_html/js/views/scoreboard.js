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
        title: 'scoreboard',
        model: ScoreCollection,
        template: tmpl,
        initialize: function () {
          this.listenTo(this.model, "change", this.render);
          this.model.fetchData();
        },
        render: function () {
          this.$el.html(this.template({players:this.model.models}));
          return this.$el;
        },
        show: function () {
            this.model.fetchData();
            this.$el.html(this.template({players:this.model.models}));
            this.$el.show();
            this.trigger("show")
        },
        hide: function () {
            this.$el.hide();
        }

    });
    return View;
});
