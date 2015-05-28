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
      "results": [],
      "is_admin": false
    },

    validity: {
      name: {message: "OK", valid: true},
      email: {message: "OK", valid: true},
      password: {message: "OK", valid: true}
    },

    getValidity: function() {
      this.validate();
      return this.validity;
    },

    validate: function(){
      this.validity = {
        name: validateName(this.get('name')),
        email: validateEmail(this.get('email')),
        password: validatePassword(this.get('password'))
      }
      if (!this.validity.name.valid)
        return this.validity.name.message;
      if (!this.validity.email.valid)
        return this.validity.email.message;
      if (!this.validity.password.valid)
        return this.validity.password.message;
    },

    authenticate: function() {
      var json = this.toJSON()

      return $.ajax({
        url: "/login",
        type: "POST",
        data: json
      }).success(function(data) {
        data = $.parseJSON(data)
        if(data.status === "OK") {
          this.set('is_authenticated', true);
        }
      }.bind(this));
    },

    logout: function() {
      $.post("/logout", function() {
        this.fetch();
      }.bind(this));
    },

    register: function(){
      if(this.isValid())
        this.save();
    },

    getInfo: function(){
      this.fetch();
    },

    sync: function(method, model) {
      if (method == "create") {
        var json = this.toJSON();
        $.post("/signin", json);
      } else if (method == "read") {
        $.get("/getinfo", function(data) {
          data = $.parseJSON(data);
          if (data.results == null)
            data.results = []
          this.set({
            name: data.name,
            is_authenticated: data.loggedIn,
            email: data.email,
            score: data.score,
            results: data.results,
            is_admin: data.is_admin
          })
        }.bind(this));
      } else if (method == "update") {

      } else if (method == "delete") {

      }
    }
  });

  Backbone.Model.definitions = {
    current_user: new Player()
  }

  return Player;
});
