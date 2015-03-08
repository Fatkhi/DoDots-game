define('router', [
    'backbone',
    'gameTmpl',
    'loginTmpl',
    'scoreboard',
    'mainTmpl',
    'signin'
], function(
    Backbone,
    gameTmpl,
    loginTmpl,
    scoreboard,
    mainTmpl,
    signin
){

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'main': 'mainAction',
            'signin': 'signinAction',
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
          $("#page").html(loginTmpl());
        },
        signinAction: function () {
          $("#page").html(signin.render());
        }
    });

    return Router;
});
