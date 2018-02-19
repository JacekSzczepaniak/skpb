$(function () {
    var question;
    var source;

    var correct = 1;
    var error = 0;
    var start = 0;

    $.getJSON( "js/szlak-gsb.json", function( json ) {
        question = source = json;
        //run();
    });

    run = function(){
        $("#kontener").empty();
        $("#kontenerOk").empty();
        correct = 1;
        error = 0;
        $(".count-ok").html(correct);
        $(".count-err").html(error);
        var btn = [];

        $(question).each(function(a,b) {
            var miejsce = b.miejsce;
            var res = miejsce.match(/([a-z_]{0,100}.svg)/ig);
            $(res).each(function(a,b) {
                miejsce = miejsce.replace(b, '');
            });
            btn.push('<span class="badge sprawdz" data-id="' + a + '" id="btn' + a + '">' + miejsce + '</span>');
        });

        $("#kontenerOk").append( btn.shift() );

        // przemieszac tablice
        shuffle(btn);

        //dodac
        $(btn).each(function() {
            $("#kontener").append(this);
        });

    }

    $('body').delegate('.sprawdz','click',function() {
        dtId = $(this).data('id');
        id="btn" + dtId;
        $('#kontener').remove(id);
        if(dtId == start + 1){
            $("#kontenerOk").append( this );
            ++ start;
            ++ correct;
            $(".count-ok").html(correct);
        } else {
            ++error;
            $(".count-err").html(error);
        }

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

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


});