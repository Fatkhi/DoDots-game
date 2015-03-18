define('router', [
    'backbone',
    'gameTmpl',
    'login',
    'scoreboard',
    'mainTmpl',
    'signin',
    'score'
], function(
    Backbone,
    gameTmpl,
    Login,
    scoreboard,
    mainTmpl,
    Signin,
    User
){

    var Router = Backbone.Router.extend({
        initialize: function() {
          this.login = new Login({model:Backbone.Model.definitions.current_user})
          this.signin = new Signin({model:Backbone.Model.definitions.current_user})
        },
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'main': 'mainAction',
            'signin': 'signinAction',
            'userpage': 'userpageAction',
            '': 'mainAction',
            "!/" : "mainAction"
        },
        mainAction: function () {
          $("#page").html(mainTmpl());
        },
        scoreboardAction: function () {
          $("#page").html(scoreboard.render());
        },
        gameAction: function () {
          $("#page").html(gameTmpl());
        },
        loginAction: function () {
          $("#page").html(this.login.render());
        },
        signinAction: function () {
          $("#page").html(this.signin.render());
        },
        userpageAction: function() {

        }
    });

    return Router;
});
