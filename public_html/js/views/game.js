define('game',[
    'backbone',
    'gameTmpl'
], function(
    Backbone,
    tmpl
){

var first = true;



    var View = Backbone.View.extend({
        template: tmpl,
        first: true,
        render: function () {
            this.$el.html(this.template());
            for (var i = 0; i < 7; i++) {
              this.$el.find('#wrap').append($('<div/>').addClass('row'));
            };
            for (var k = 0; k < 7; k++) {
                this.$el.find('.row').append($('<div/>').addClass('circle unselected'));
              }
            this.$el.find('.circle').click(function(){
              if (first == true && $(this).hasClass('unselected')) {
                first = false;
                $(this).removeClass('unselected');
                $(this).addClass('clicked_first');
              }
              else if(first == false && $(this).hasClass('unselected')) {
                first = true;
                $(this).removeClass('unselected');
                $(this).addClass('clicked_second');
              }
            });
            return this.$el
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
