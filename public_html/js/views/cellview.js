define('cellview',[
    'backbone'
], function(
    Backbone
){
    var View = Backbone.View.extend({
      setModel: function(model) {
        this.model = model;
        this.listenTo(this.model, "change", this.modelChange);
      },
      setEl: function(el) {
        this.$el = $(el);
        var self = this;
        this.$el.click(function(){
          self.model.chown();
        });
      },
      modelChange: function() {
        this.$el.removeClass('game__row__circle_unselected');
        this.$el.removeClass('game__row__circle_first');
        this.$el.removeClass('game__row__circle_second');
        switch (this.model.get('playerIndex')) {
          case 1:
            this.$el.addClass('game__row__circle_first');
          break;
          case 2:
            this.$el.addClass('game__row__circle_second');
          break;
          default:
            this.$el.addClass('game__row__circle_unselected');
        }
      }
    });

    return View;
});
