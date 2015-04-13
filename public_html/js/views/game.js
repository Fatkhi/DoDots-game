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

            this.$('.game__row__circle').click(function(){
              if (first == true && $(this).hasClass('game__row__circle_unselected')) {
                first = false;
                $(this).removeClass('game__row__circle_unselected');
                $(this).addClass('game__row__circle_clicked_first');
              }
              else if(first == false && $(this).hasClass('game__row__circle_unselected')) {
                first = true;
                $(this).removeClass('game__row__circle_unselected');
                $(this).addClass('game__row__circle_clicked_second');
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
