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
        scoreboard: "views/scoreboard",
        signin:     "views/signin",
        login:      "views/login",
        userpanel:  "views/userpanel",
        score:      "models/score",
        scores:     "collections/scores",

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
    'mainTmpl',
    'userpanel',
    'jquery'
], function(
    Backbone,
    router,
    mainTmpl,
    userpanel
){
    $(function(){
      var upanel = new userpanel();
      new router();
      Backbone.history.start();
      $("#topbar").html(upanel.render());
    });
});
