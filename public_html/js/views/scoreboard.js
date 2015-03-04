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
            var self = this
            $(document).ready(function(){
              $("#page").html(self.template({players:self.model.models}));
            });
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
