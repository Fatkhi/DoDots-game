define('userpage', [
    'backbone',
    'userpageTmpl',
    'score'
], function(
    Backbone,
    tmpl,
    User
){

    var View = Backbone.View.extend({
      title: 'userpage',
      template: tmpl,
      initialize: function () {
        this.listenTo(this.model, "change", this.re_render);
        this.listenTo(this.model, "change:is_admin", this.draw_admin);
      },
      render: function () {
        var self = this;
        this.$el.html(this.template());
        this.re_render();
        return this.$el;
      },
      draw_admin: function() {
        if(this.model.get('is_admin')) {
          $.ajax({
            url: "/getadmin",
            type: "GET"
          }).success(function(data) {
            $('#userpage_admininfo').empty();
            $('#userpage_admininfo').append('<h2>Admin data</h2>')
            data = $.parseJSON(data)
            if(data.status === "OK") {
              for(i=0; i<data.users.length; i++) {
                var newRow = '<div>username: '+data.users[i].username+' id: '+data.users[i].userid+'</div>';
                $('#userpage_admininfo').append(newRow);
              }
            }
          });
        }
      },
      re_render: function() {
        this.$('#name' ).text(this.model.get('name'));
        this.$('#email').text(this.model.get('email'));
        this.$('#score').text(this.model.get('score'));

        this.$('#results').empty();
        this.$('#results').append(
         '<div class="userpage__row__table__row userpage__row__table__row_header">\
            <div class="userpage__row__table__row__col">User1</div>\
            <div class="userpage__row__table__row__col">Score1</div>\
            <div class="userpage__row__table__row__col">User2</div>\
            <div class="userpage__row__table__row__col">Score2</div>\
          </div>')
        this.model.get('results').forEach(function(item, i, arr) {
          this.$('#results').append(
         '<div class="userpage__row__table__row">\
            <div class="userpage__row__table__row__col">'+item.user1+'</div>\
            <div class="userpage__row__table__row__col">'+item.score1+'</div>\
            <div class="userpage__row__table__row__col">'+item.user2+'</div>\
            <div class="userpage__row__table__row__col">'+item.score2+'</div>\
          </div>')
        }.bind(this));
        this.draw_admin();
      },
      show: function () {
        this.$el.show()
        this.trigger("show")
        this.model.getInfo();
        this.re_render();
      },
      hide: function () {
        this.$el.hide()
      }

    });
    return View;
});
