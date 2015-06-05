define('game',[
    'backbone',
    'gameTmpl',
    'board',
    'sweetalert'
], function(
    Backbone,
    tmpl,
    Board
){
    var View = Backbone.View.extend({
        title: 'game',
        classes: [
          'game__row__circle_free',
          'game__row__circle_firstOwned',
          'game__row__circle_secondOwned',
          'game__row__circle_capturedByFirst',
          'game__row__circle_capturedBySecond',
          'game__row__circle_occupiedByFirst',
          'game__row__circle_occupiedBySecond'
        ],
        template: tmpl,
        first: true,
        smallViews: [],
        initialize: function() {
          this.model = new Board();
          this.listenTo(this.model, "change", this.update);
          this.listenTo(this.model, "boardChange", this.updateBoard);
            //событие load никогда не сработает
          //$(window).on('load', {self:this}, function(data) {
          //  self = data.data.self;
          //    console.log('here');
          //
          //  if (self.$el.is(':visible')) {
          //    Backbone.Model.definitions.current_user.getInfo();
          //    if (Backbone.Model.definitions.current_user.get('is_authenticated')) {
          //      self.model.startGame();
          //    } else {
          //      self.model.set("message", "You have to authorize");
          //    }
          //  }
          //})
        },
        render: function () {
          var height = $(window).innerHeight() - 60;
          var width = $(window).innerWidth();
          var margin = (width - height) / 2;
          var row_height = height / 10;
          var circle_size = (height - 80) / 10;
          this.$el.html(this.template());

          this.$('.game__row').each(function(index, element) {
            this.smallViews[index] = [];
            $(element).find('.game__row__circle').each(function(jndex, circle) {
              this.smallViews[index][jndex] = circle;
              $(this.smallViews[index][jndex]).click(function(event) {
                row = $(event.target).data("row");
                col = $(event.target).data("col");
                this.model.capture(row, col);
              }.bind(this))
            }.bind(this))
          }.bind(this));
          this.$('div.game').css({
            "margin-left": margin + "px",
            "margin-right": margin + "px",
            "width": height + "px",
            "height": height + "px"
          });

          this.$('div.game__row').css({
            "height": row_height + "px"
          });
          this.$('div.game__row__circle').css({
              "height": circle_size + "px",
              "width": circle_size + "px"
          });
          return this.$el
        },
        update: function() {
            //this.$('#message').text(this.model.get('message'));
            this.$('#status').text(this.model.get('status'));
            this.$('#score').text(this.model.get('score'));
            this.$('#turn').text(this.model.get('turn'));
        },
        updateBoard: function() {
          //console.log('update');
            var rowNum = this.model.get('rownum');
            var colNum = this.model.get('colnum');
          for(irow = 0; irow < rowNum; irow++) {
            for (icol = 0; icol < colNum; icol++) {
              this.classes.forEach(function(cssClass) {
                $(this.smallViews[irow][icol]).removeClass(cssClass);
              }.bind(this));
              $(this.smallViews[irow][icol]).addClass(this.classes[this.model.cells[irow][icol]]);
            }
          }
        },
        show: function (data) {
            this.$el.show();
            this.trigger("show");
            if (Backbone.Model.definitions.current_user.get('is_authenticated')) {
                this.model.startGame();
            }
            else if(!Backbone.Model.definitions.current_user.get('is_authenticated')){
                this.model.set("message", "You have to authorize");
                swal({
                    title: "Error!",
                    text: "You have to authorize!",
                    type: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#CB4C57",
                    confirmButtonText: "Back",
                    closeOnConfirm: true
                }, function(){
                    window.location.hash = '#main';
                });
            }
        },
        hide: function () {
            //this.model.set('ragequit', false);
            //if(this.model.ragequit == null){
            //    this.model.ragequit = true;
            //}
            //else this.model.ragequit = false;
            //this.model.ragequit = (this.model.ragequit == null);
            //this.model.set('ragequit', false);
            this.model.ragequit = false;
            if(this.model.ws != null) {
                console.log('here');
                this.model.ws.close();
            }
            this.$el.hide()
        }
    });

    return View;
});
