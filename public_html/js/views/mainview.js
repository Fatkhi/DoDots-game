define('mainview', [
    'backbone'
], function(
    Backbone
){


    var View = Backbone.View.extend({
        views: [],
        add_view: function(viewObject) {
          this.views.push(viewObject);
          $("#page").append(viewObject.render());
          this.listenTo(viewObject, "show", function() {
            this.views.forEach(function(currentValue) {
              if(currentValue != viewObject)
                currentValue.hide();
            })
          })
        },
        hide_all: function() {
          this.views.forEach(function(currentValue) {
            currentValue.hide();
          })
        },
        get_view: function(viewName) {
          return _.findWhere(this.views, {title: viewName});
          //to add exception if undefined
        }
    });
    return View;
});
