define('game',[
    'backbone',
    'gameTmpl',
    'board',
    'cellview'
], function(
    Backbone,
    tmpl,
    Board,
    CellView
){
    var View = Backbone.View.extend({
        template: tmpl,
        first: true,
        smallViews: [],
        initialize: function() {
          this.model = new Board();
          for (i = 0; i < this.model.get('rownum'); i++) {
            this.smallViews[i] = []
            for (j = 0; j < this.model.get('colnum'); j++) {
              this.smallViews[i][j] = new CellView();
            }
          }

        },
        render: function () {
            var self = this;
            this.$el.html(this.template());
            this.$('.game__row').each(function(index, element) {
              $(element).find('.game__row__circle').each(function(jndex, circle) {
                self.smallViews[index][jndex].setEl(circle);
                self.smallViews[index][jndex].setModel(self.model.cells[index][jndex]);
              })
            })

            return this.$el
        },
        show: function () {
            this.$el.show()
            this.trigger("show")
            if (Backbone.Model.definitions.current_user.get('is_authenticated')) {
              this.model.startGame();
            } else {
              alert("You have to authorize first to start a game!");
            }
        },
        hide: function () {
            this.$el.hide()
        }
    });

    return new View();
});
