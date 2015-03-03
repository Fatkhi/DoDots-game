require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        mainTmpl: "tmpl/main",
        loginTmpl: "tmpl/login",
        gameTmpl: "tmpl/game",
        scoreboardTmpl: "tmpl/scoreboard"
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
    Backbone.history.start();
    $('#page').html(mainTmpl());
});
