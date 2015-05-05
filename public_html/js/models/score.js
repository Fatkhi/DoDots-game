define('score', [
  'backbone'
], function(
  Backbone
){

  function validateName(name) {
    var reg1 = /^[a-zA-Z0-9]*$/
    var reg2 = /^[a-zA-Z0-9][a-zA-Z0-9]*$/
    if (!reg1.test(name))
      return {
        message: "Username can contain only letters or digits",
        valid:   false
      }
    if (!reg2.test(name))
      return {
        message: "Username cannot be empty",
        valid:   false
      }
    return {
      message: "OK",
      valid:   true
    }
  }

  function validateEmail(email) {
    if(email.search('@') == -1) {
      return {
        message: "Email should contain @ character",
        valid:   false
      }
    }

    return {
      message: "OK",
      valid:   true
    }
  }

  function validatePassword(password) {
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(!re.test(password)) {
      return {
        message: "Password should include "+
                 "at least one number, "+
                 "one lowercase and one uppercase letter "+
                 "and at least six characters",
        valid:   false
      }
    }

    return {
      message: "OK",
      valid:   true
    }
  }

  var Player = Backbone.Model.extend({
    defaults: {
      "name": "",
      "email" : "",
      "password" : "",
      "is_authenticated" : false,
      "score": 0,
      "results": []
    },

    validate: function(attrs, options){
      return {
        name: validateName(this.get('name')),
        email: validateEmail(this.get('email')),
        password: validatePassword(this.get('password'))
      }
    },

    authenticate: function() {
      var json = this.toJSON()
      var self = this
      return $.ajax({
        url: "/login",
        type: "POST",
        data: json
      }).success(function(data) {
        data = $.parseJSON(data)
        if(data.status === "OK") {
          self.set('is_authenticated', true);
        }
      });
    },

    logout: function() {
      var self=this;
      $.ajax({
        url: "/logout",
        type: "POST"
      }).success(function() {
        self.getInfo();
      });
    },

    isValid: function(){
      var validity = this.validate();
      return validity.name.valid  &&
             validity.email.valid &&
             validity.password.valid;
    },

    register: function(){
      var json = this.toJSON()
      if(this.isValid()) {
        var data = $.ajax({
          url: "/signin",
          type: "POST",
          data: json
        });
        this.getInfo();
        return data;
      }
      return null;
    },

    getInfo: function(){
      var self = this;
      $.ajax({
        url: "/getinfo",
        type: "GET"
      }).success(function(data) {
        data = $.parseJSON(data);
        if (data.results == null)
          data.results = []
        self.set({
          name: data.username,
          is_authenticated: data.loggedIn,
          email: data.email,
          score: data.score,
          results: data.results
        })
      });
    }
  });
  Backbone.Model.definitions = {
    current_user: new Player()
  }

  return Player;
});
