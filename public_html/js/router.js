define('router', [
    'backbone',
    'gameTmpl',
    'loginTmpl',
    'scoreboardTmpl',
    'mainTmpl'
], function(
    Backbone,
    gameTmpl,
    loginTmpl,
    scoreboardTmpl,
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
          $.ajax({
							cache: false,
							success: function(html){
									$("#page").html(mainTmpl());
							}
					});
        },
				scoreboardAction: function () {
					$.ajax({
							cache: false,
							success: function(html){
									$("#page").html(scoreboardTmpl());
							}
					});
				},
				gameAction: function () {
					$.ajax({
							cache: false,
							success: function(html){
									$("#page").html(gameTmpl());
							}
					});
				},
				loginAction: function () {
					$.ajax({
							cache: false,
							success: function(html){
									$("#page").html(loginTmpl());
							}
					});
				}
		});

    return new Router();
});
