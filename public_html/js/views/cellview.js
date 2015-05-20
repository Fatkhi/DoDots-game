define('cellview',[
    'backbone'
], function(
    Backbone
){
    var View = Backbone.View.extend({
      classes: [
        'game__row__circle_free',
        'game__row__circle_firstOwned',
        'game__row__circle_secondOwned',
        'game__row__circle_capturedByFirst',
        'game__row__circle_capturedBySecond',
        'game__row__circle_occupiedByFirst',
        'game__row__circle_occupiedBySecond'
      ],
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
        this.classes.forEach(function(cssClass) {
          this.$el.removeClass(cssClass);
        }.bind(this))
        this.$el.addClass(this.classes[this.model.get('playerIndex')]);
      }
    });

    return View;
});
