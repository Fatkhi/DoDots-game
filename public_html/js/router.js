define('router', [
    'backbone',
    'game',
    'login',
    'scoreboard',
    'index',
    'signin',
    'score',
    'mainview',
    'userpage',
    'userpanel'
], function(
    Backbone,
    game,
    Login,
    scoreboard,
    main,
    Signin,
    User,
    MainView,
    Userpage,
    userpanel
){

    var Router = Backbone.Router.extend({
        initialize: function() {
          this.login = new Login({model:Backbone.Model.definitions.current_user})
          this.signin = new Signin({model:Backbone.Model.definitions.current_user})
          this.scoreboard = scoreboard;
          this.main = main;
          this.game = game;
          this.userpage = new Userpage({model:Backbone.Model.definitions.current_user});
          this.manager = new MainView();
          this.manager.add_view(this.login);
          this.manager.add_view(this.signin);
          this.manager.add_view(this.scoreboard);
          this.manager.add_view(this.main);
          this.manager.add_view(this.game);
          this.manager.add_view(this.userpage);

          var upanel = new userpanel();
          $("#topbar").html(upanel.render());
          $("#page").append(this.login.render());
          $("#page").append(this.signin.render());
          $("#page").append(this.scoreboard.render());
          $("#page").append(this.main.render());
          $("#page").append(this.game.render());
          $("#page").append(this.userpage.render());
        },
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'main': 'mainAction',
            'signin': 'signinAction',
            'userpage': 'userpageAction',
            '': 'mainAction',
            "!/" : "mainAction",
            "*path": "defaultAction"
        },
        mainAction: function () {
          this.main.show();
        },
        scoreboardAction: function () {
          this.scoreboard.show();
        },
        gameAction: function () {
          this.game.show()
        },
        loginAction: function () {
          this.login.show()
        },
        signinAction: function () {
          this.signin.show()
        },
        userpageAction: function () {
          this.userpage.show()
        },
        defaultAction: function(path) {
          this.main.show();
        }
    });

    return Router;
});
