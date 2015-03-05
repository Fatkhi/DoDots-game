define('router', [
    'backbone',
    'gameTmpl',
    'loginTmpl',
    'scoreboard',
    'mainTmpl',
    'signinTmpl'
], function(
    Backbone,
    gameTmpl,
    loginTmpl,
    scoreboard,
    mainTmpl,
    signinTmpl
){

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'main': 'mainAction',
            'signin': 'signinAction'
        },
        mainAction: function () {
          $(document).ready(function(){
            $("#page").html(mainTmpl());
          });
        },
        scoreboardAction: function () {
          scoreboard.render();
        },
        gameAction: function () {
          $(document).ready(function(){
            $("#page").html(gameTmpl());
          });
        },
        loginAction: function () {
          $(document).ready(function(){
            $("#page").html(loginTmpl());
          });
        },
        signinAction: function () {
          $(document).ready(function(){
            $("#page").html(signinTmpl());
          });
        }
    });

    return new Router();
});
