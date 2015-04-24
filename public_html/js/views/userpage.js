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
      template: tmpl,
      initialize: function () {
        this.listenTo(this.model, "change", this.re_render);
      },
      render: function () {
        var self = this;
        this.$el.html(this.template());
        this.$el.append('<div id="userpage_admininfo">');
        this.re_render();
        return this.$el;
      },
      re_render: function() {
        this.$('#name' ).text(this.model.get('name'));
        this.$('#email').text(this.model.get('email'));
        this.$('#score').text(this.model.get('score'));

        $('#userpage_admininfo').empty();
        if(this.model.get('name') === 'admin') {
          var self = this;
          $.ajax({
            url: "/getadmin",
            type: "GET"
          }).success(function(data) {
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
      show: function () {
        this.$el.show()
        this.trigger("show")
        this.re_render();
      },
      hide: function () {
        this.$el.hide()
      }

    });
    return View;
});
