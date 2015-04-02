define('login', [
    'backbone',
    'loginTmpl',
    'score'
], function(
    Backbone,
    tmpl,
    User
){
  function dispatch(self, event, form) {
    var uname =    form.find('#name').val();
    var password = form.find('#password').val();
    self.model.set({name: uname,
                    password: password});
    self.model.authenticate().done(function(){
      if (self.model.get('is_authenticated')) {
        window.location.replace('#')
      }
      self.model.getInfo()
    })
    return false;
  }

  var View = Backbone.View.extend({
      template: tmpl,
      initialize: function () {
        this.listenTo(this.model, "change", this.re_render);
      },
      render: function () {
        var self = this;
        this.$el.html(this.template());
        this.$el.find('form').submit(function(event){
          event.preventDefault();
          return dispatch(self, event, $(this));
        })
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
  return View;
});
