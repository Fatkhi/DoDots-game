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
          this.$('form').submit(function(event){
            event.preventDefault();
            dispatch(self, event, $(this));
            self.re_render();
            return false;
          })
          if (localStorage['name'] &&
              localStorage['email'] &&
              localStorage['password']) {
            this.$('#name').val(localStorage['name']);
            this.$('#email').val(localStorage['email']);
            this.$('#password').val(localStorage['password']);
          }

          this.$('#name').change(this, this.remember);
          this.$('#email').change(this, this.remember);
          this.$('#password').change(this, this.remember);
          return this.$el;
        },
        remember: function(self) {
          console.log(self)
          self = self.data
          console.log(self)
          localStorage['name'] = self.$('#name').val();
          localStorage['email'] = self.$('#email').val();
          localStorage['password'] = self.$('#password').val();
        },
        re_render: function() {
          var validation = this.model.validate();
          var form = this.$el.find('form')
          var self = this;

          validateElement('name', form, validation);
          validateElement('email', form, validation);
          validateElement('password', form, validation);

          var res = this.model.register()
          if(res!=null)
            res.done(function(data){
              data = $.parseJSON(data)
              alert(data.message);
              if(data.status=="OK") {
                self.model.authenticate().done(function(){
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
          this.trigger("show")
        },
        hide: function () {
          this.$el.hide()
        }
    });
    return View;
});
