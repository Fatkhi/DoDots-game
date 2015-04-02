define('mainview', [
    'backbone'
], function(
    Backbone
){


    var View = Backbone.View.extend({
        views: [],
        add_view: function(listenee) {
          this.views.push(listenee)
          this.listenTo(listenee, "show", function() {
            this.views.forEach(function(currentValue, index, array) {
              if(currentValue != listenee)
                currentValue.hide();
            })
          })
        },
        hide_all: function() {
          this.views.forEach(function(currentValue, index, array) {
            currentValue.hide();
          })
        }
    });
    return View;
});
