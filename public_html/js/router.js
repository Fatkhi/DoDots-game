define('router', [
    'backbone',
    'gameTmpl',
    'loginTmpl',
    'scoreboard',
    'mainTmpl'
], function(
    Backbone,
    gameTmpl,
    loginTmpl,
    scoreboard,
    mainTmpl
){

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'main': 'mainAction'
        },
        mainAction: function () {
          $("#page").html(mainTmpl());
        },
        scoreboardAction: function () {
          scoreboard.render();
        },
        gameAction: function () {
          $("#page").html(gameTmpl());
        },
        loginAction: function () {
          $("#page").html(loginTmpl());
        }
    });

    return new Router();
});
