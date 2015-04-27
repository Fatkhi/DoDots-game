define('game',[
    'backbone',
    'gameTmpl'
], function(
    Backbone,
    tmpl
){

var black = true;
var width = $(window).width();
var height = $(window).height();
var margin = (width - height) / 2;
var row_height = height / 10;
var circle_size = (height - 80) / 10;
var STATE = {};
STATE.black = 0;
STATE.red = 1;
var array = [];
for (var i = 0; i < 10; i++) {
    array[i] = [];
};

function setPos(circle_object){
    pos = circle_object.position();
    var y = Math.round((pos.top - $('div#wrap').position().top) / row_height);
    var x = Math.round((pos.left - $('div#wrap').offset().left) / (circle_size + 8));
    if (circle_object.hasClass('clicked_black')) {
        array[x][y] = STATE.black;
        alert("x:" + x + " y:" + y);
        // var temp = point(x, y, STATE.black);
        // arrayBlack.push(temp);
        // search(STATE.black);
        
    }
    else if (circle_object.hasClass('clicked_red')) {
        array[x][y] = STATE.red;
        alert("x:" + x + " y:" + y);
        // var temp = point(x, y, STATE.red);
        // arrayRed.push(temp);
        // search(STATE.red);
        //
    };
    //alert(x + " " + y + " " + array[x][y]);  
}



    var View = Backbone.View.extend({
        template: tmpl,
        first: true,
        render: function () {
            this.$el.html(this.template());

             this.$el.find('div#wrap').css({
            "margin-left": margin + "px",
            "margin-right": margin + "px",
            "width": height + "px",
            "height": height + "px",
        });
        for (var i = 0; i < 10; i++) {
            this.$el.find('div#wrap').append($('<div/>').addClass('row'));
        };
        for (var k = 0; k < 10; k++) {
                this.$el.find('div.row').append($('<div/>').addClass('circle unselected'));
        };
        this.$el.find('div.row').css({
            "height": row_height + "px",

        });
        this.$el.find('div.circle').css({
            "height": circle_size + "px",
            "width": circle_size + "px",
        });

        this.$el.find('div.circle').click(function(){
            if (black == true && $(this).hasClass('unselected')) {
                black = false;
                $(this).removeClass('unselected');
                $(this).addClass('clicked_black');

                setPos($(this));

            }
            else if(black == false && $(this).hasClass('unselected')) {
                black = true;
                $(this).removeClass('unselected');
                $(this).addClass('clicked_red');

                setPos($(this));

            }
        });

            // for (var i = 0; i < 7; i++) {
            //   this.$el.find('#wrap').append($('<div/>').addClass('row'));
            // };
            // for (var k = 0; k < 7; k++) {
            //     this.$el.find('.row').append($('<div/>').addClass('circle unselected'));
            //   }
            // this.$el.find('.circle').click(function(){
            //   if (first == true && $(this).hasClass('unselected')) {
            //     first = false;
            //     $(this).removeClass('unselected');
            //     $(this).addClass('clicked_first');
            //   }
            //   else if(first == false && $(this).hasClass('unselected')) {
            //     first = true;
            //     $(this).removeClass('unselected');
            //     $(this).addClass('clicked_second');
            //   }
            // });
            return this.$el
        },
        show: function () {
            this.$el.show()
            this.trigger("show")
        },
        hide: function () {
            this.$el.hide()
        }
    });

    return new View();
});
