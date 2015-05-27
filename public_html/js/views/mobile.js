define('mobile', [
    'backbone',
    'mobileTmpl',
    'js-cookie'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        title: 'mobile',
        template: tmpl,
        ws: null,
        initialize: function () {

        },
        render: function () {
          this.$el.html(this.template());
          this.re_render();
          return this.$el;
        },
        re_render: function() {
          this.$("#mobile__sessionid").val($.cookie('JSESSIONID'));
          this.$("#mobile__token").val($.cookie('JSESSIONID'));

          this.$("#mobile__connectMobile").one('click', this.connectAsMobile.bind(this));
          this.$("#mobile__connectDesktop").one('click', this.connectAsDesktop.bind(this));
          this.$("#mobile__submit").click(this.sendMessage.bind(this));
        },
        connectAsDesktop: function(event) {
          if(event.handled !== true) {
            this.ws = new WebSocket("ws://localhost:8080/mobile");
            this.ws.onmessage = this.dispatchMessage.bind(this);
            console.log(this.ws)
            event.handled = true;
          }
        },
        disable: function(){
          this.$("#mobile__connectMobile").attr("disabled", true);
          this.$("#mobile__connectDesktop").attr("disabled", true);
        },
        enable: function(){
          this.$("#mobile__connectMobile").attr("disabled", false);
          this.$("#mobile__connectDesktop").attr("disabled", false);
        },
        connectAsMobile: function(event) {
          if(event.handled !== true) {
            this.ws = new WebSocket(
              "ws://localhost:8080/mobile?isMobile=true&token="+
              this.$("#mobile__token").val()
            );
            this.ws.onmessage = this.dispatchMessage.bind(this);
            console.log(this.ws);
            event.handled = true;
          }
        },
        sendMessage: function(event){
          if(event.handled !== true) {
            this.ws.send(this.$("#mobile__message").val());
            event.handled = true;
          }
        },
        dispatchMessage: function(message) {
          console.log(message);
          this.$('#mobile__chat').val(this.$('#mobile__chat').val()+"\n"+message.data);
        },
        show: function () {
            this.$el.show();
            this.re_render();
            this.trigger("show")
        },
        hide: function () {
            this.$el.hide();
        }

    });
    return View;
});
