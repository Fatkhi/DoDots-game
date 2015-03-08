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
        scoreboard: "views/scoreboard",
        signin:     "views/signin",
        score:      "models/score",
        scores:     "collections/scores"
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
    'jquery'
], function(
    Backbone,
    router,
    mainTmpl
){
    $(function(){
      new router();
      Backbone.history.start();
    });
});
