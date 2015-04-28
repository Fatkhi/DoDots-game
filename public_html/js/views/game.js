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
          this.listenTo(this.model, "change", this.update);
          $(window).on('load', {self:this}, function(data) {
            self = data.data.self

            if (self.$el.is(':visible')) {
              Backbone.Model.definitions.current_user.getInfo()
              if (Backbone.Model.definitions.current_user.get('is_authenticated')) {
                self.model.startGame();
              } else {
                self.model.set("message", "You have to authorize first to start a game!");
              }
            }
          })
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
        update: function() {
          this.$('#message').text(this.model.get('message'))
          this.$('#status').text(this.model.get('status'))
          this.$('#score').text(this.model.get('score'))
          this.$('#turn').text(this.model.get('turn'))
        },
        show: function (data) {
            self = this
            self.$el.show()
            self.trigger("show")
            if (Backbone.Model.definitions.current_user.get('is_authenticated')) {
              self.model.startGame();
            } else {
              self.model.set("message", "You have to authorize first to start a game!");
            }
        },
        hide: function () {
            this.$el.hide()
        }
    });

    return new View();
});
