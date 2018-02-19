$(function () {
    var question;
    var source;

    var current;
    var start = 0;

    $.getJSON( "js/szlak-gsb.json", function( json ) {
        question = source = json;
        //run();
    });

    run = function(){
        //var count = question.length;


        current = question[start];

        $(".miejsce").html(current.miejsce);
        //$(".odleglosc").html(current.odlegosc);
        //$(".czas").html(current.czas);
        $(".wysokosc").html(current.wysokosc);
        //$(".atrakcje").html(current.atrakcje);
        $(".wezly").html(current.wezly_szlakow);
        replaceIcon('.atrakcje');
        replaceIcon('.wezly');
        replaceIcon('.miejsce');

        if (typeof question[start - 1] == 'undefined') {
            $(".prev").hide();
        } else {
            $(".prev").show();
        }

        if (typeof question[start + 1] == 'undefined') {
            $(".next").hide();
        } else {
            $(".next").show();
        }
    }

    replaceIcon = function(content){
        var txt = $(content).text();
        var res = txt.match(/([a-z_]{0,100}.svg)/ig);

        $(res).each(function(a,b) {
            var patt = b.replace('.svg','');
            $(content).html( $(content).html().replace(b,'<img src="images/' + patt + '.png" class="icon" title="' + patt + '"/>' ) );
        });
    }

    $('body').delegate('.next','click',function() {
        ++ start;
         run();
    });
    $('body').delegate('.prev','click',function() {
        -- start;
        run();
    });
    $('body').delegate('.reverse','click',function() {
        question.reverse();
        start = 0;
        run();
    });

    $('body').delegate('.menu','click',function() {
        var id = $(this).prop('id');
        if(id == 'all'){
            return void(0);
        }
        question = [];
        $(source).each(function() {
            if(this.id_szlaku == id) {
                question.push(this);
            }
        });
        start = 0;
        run();
        return void(0);
    });



});