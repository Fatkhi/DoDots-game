define('index',[
    'backbone',
    'mainTmpl'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        template: tmpl,
        render: function () {
            this.$el.html(this.template());
            return this.$el;
        },
        show: function () {
            this.$el.show()
            this.trigger("show")
        },
        hide: function () {
            this.$el.hide()
        }
    });

    return new View();
});
