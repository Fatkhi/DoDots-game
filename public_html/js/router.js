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
    Game,
    Login,
    Scoreboard,
    Main,
    Signin,
    User,
    MainView,
    Userpage,
    Userpanel
){

    var Router = Backbone.Router.extend({
        initialize: function() {
          this.manager = new MainView();
          var manager = this.manager;

          manager.add_view(new Login({model:Backbone.Model.definitions.current_user}));
          manager.add_view(new Signin({model:Backbone.Model.definitions.current_user}));
          manager.add_view(new Scoreboard());
          manager.add_view(new Main());
          manager.add_view(new Game());
          manager.add_view(new Userpage({model:Backbone.Model.definitions.current_user}));

          var upanel = new Userpanel();
          $("#topbar").html(upanel.render());
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
          this.manager.get_view('main').show();
        },
        scoreboardAction: function () {
          this.manager.get_view('scoreboard').show();
        },
        gameAction: function () {
          this.manager.get_view('game').show();
        },
        loginAction: function () {
          this.manager.get_view('login').show();
        },
        signinAction: function () {
          this.manager.get_view('signin').show();
        },
        userpageAction: function () {
          this.manager.get_view('userpage').show();
        },
        defaultAction: function() {
          this.manager.get_view('main').show();
        }
    });

    return Router;
});
