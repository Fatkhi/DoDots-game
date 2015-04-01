define('signin', [
    'backbone',
    'signinTmpl',
    'score'
], function(
    Backbone,
    tmpl,
    User
){

function validateElement(name, form, validation) {
  if (!validation[name].valid) {
    $(form).find('#'+name+'help')
    .text(validation[name].message);

    $(form).find('#'+name)
    .addClass('login__form__inputgroup__line__input_invalid')
    .removeClass('login__form__inputgroup__line__input_valid')
  } else {
    $(form).find('#'+name+'help').empty();

    $(form).find('#'+name)
    .addClass('login__form__inputgroup__line__input_valid')
    .removeClass('login__form__inputgroup__line__input_invalid')
  }
}

function dispatch(self, event, form) {
  var uname =    form.find('#name').val();
  var email =    form.find('#email').val();
  var password = form.find('#password').val();
  self.model.set({name: uname,
                  email: email,
                  password: password});
  event.preventDefault();
  return false;
}

    var View = Backbone.View.extend({
        template: tmpl,
        initialize: function () {
          this.listenTo(this.model, "register", this.re_render);
        },
        render: function () {
          var self = this;
          this.$el.html(this.template());
          this.$el.find('form').submit(function(event){
            event.preventDefault();
            dispatch(self, event, $(this));
            self.re_render();
            return false;
          })
          return this.$el;
        },
        re_render: function() {
          var validation = this.model.validate();
          var form = this.$el.find('form')

          validateElement('name', form, validation);
          validateElement('email', form, validation);
          validateElement('password', form, validation);

          var res = this.model.register()
          if(res!=null)
            res.done(function(data){
              data = $.parseJSON(data)
              alert(data.message);
              if(data.status=="OK") {
                self.model.authencticate().done(function(){
                  if (self.model.get('is_authenticated')) {
                    window.location.replace('#')
                  }
                })
              }
            })
          this.model.getInfo();
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
