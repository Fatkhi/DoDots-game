require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery:     "lib/jquery",
        underscore: "lib/underscore",
        backbone:   "lib/backbone",
        mainTmpl:       "tmpl/main",
        loginTmpl:      "tmpl/login",
        gameTmpl:       "tmpl/game",
        scoreboardTmpl: "tmpl/scoreboard",
        signinTmpl:     "tmpl/signin",
        userpanelTmpl:  "tmpl/userpanel",
        userpageTmpl:   "tmpl/userpage",
        scoreboard: "views/scoreboard",
        signin:     "views/signin",
        login:      "views/login",
        userpanel:  "views/userpanel",
        userpage:   "views/userpage",
        score:      "models/score",
        scores:     "collections/scores",
        mainview:   "views/mainview",
        index:      "views/main",
        game:       "views/game",
        board:      "models/board"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

define([
    'backbone',
    'router',
    'jquery'
], function(
    Backbone,
    router
){
    $(function(){
      new router();
      Backbone.history.start();
    });
});
