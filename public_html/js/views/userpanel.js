define('userpanel', [
    'backbone',
    'userpanelTmpl',
    'score'
], function(
    Backbone,
    tmpl
){
  var View = Backbone.View.extend({
      template: tmpl,
      initialize: function () {
        this.model = Backbone.Model.definitions.current_user
        this.model.getInfo();
        this.listenTo(this.model, "change", this.render);
      },
      render: function () {
        var self = this;
        this.$el.html(this.template(self.model));
        this.$el.find('.userpanel__btns__btn__logout').on('click', function() {
          self.model.logout();
        });
        return this.$el;
      },
      show: function () {
        this.$el.show()
      },
      hide: function () {
        this.$el.hide()
      }
  });
  return View;
});
