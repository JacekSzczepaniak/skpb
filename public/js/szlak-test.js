        $(function () {
            var question;
            var source;
            var correct = 1;
            var error = 0;
            $.getJSON("js/szlak-gsb.json", function (json) {
                question = source = json;
                //run();
            });

            run = function () {
                $("#kontener").empty();
                $("#kontenerOk").empty();
                correct = 1;
                error = 0;
                $(".count-ok").html(correct);
                $(".count-err").html(error);

                ;
                var btn = [];

                $(question).each(function (a, b) {
                    var miejsce = b.miejsce;
                    var res = miejsce.match(/([a-z_]{0,100}.svg)/ig);
                    $(res).each(function (a, b) {
                        miejsce = miejsce.replace(b, '');
                    });
                    btn.push('<span class="badge sprawdz" data-id="' + a + '" id="btn' + a + '">' + miejsce + '</span>');
                });

                $("#kontenerOk").append(btn.shift());
                // przemieszac tablice
                shuffle(btn);

                //dodac
                $(btn).each(function () {
                    $("#kontener").append(this);
                });

            }
            var x = 0;
            $('body').delegate('.sprawdz', 'click', function () {
                dtId = $(this).data('id');
                id = "btn" + dtId;
                $('#kontener').remove(id);
                if (dtId == start + 1) {
                    $("#kontenerOk").append(this);
                    ++start;
                    ++correct;
                    $(".count-ok").html(correct);
                    window.corr = correct;
                    if ($('#kontener').is(':empty')) {
                        $(".test-info").html("<span class='alert-success'></span>");
                        $("#summary").modal();
                        var x = document.getElementsByClassName("corr");
                        x[0].innerHTML = window.corr;
                        var y = document.getElementsByClassName("er");
                        y[0].innerHTML = window.err;



                    }
                } else {
                    ++error;
                    $(".count-err").html(error);
                    window.err = error;
                   



                }

            });






            var x = window.x;

            $('body').delegate('.menu', 'click', function () {
                var id = $(this).prop('id');
                if (id == 'all') {
                    return void(0);
                }
                question = [];
                $(source).each(function () {
                    if (this.id_szlaku == id) {
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

        // Nazwy miesiêcy
        var nazwy_mies = ['Styczeñ', 'Luty', 'Marzec', 'Kwiecieñ', 'Maj',
            'Czerwiec', 'Lipiec', 'Sierpieñ', 'Wrzesieñ', 'PaŸdziernik',
            'Listopad', 'Grudzieñ'];

        // Odczytanie bie¿¹cej daty i czasu, i rozbicie ich na sk³adowe
        var data = new Date();
        var rok = data.getFullYear();
        var mies = data.getMonth();
        var dzien = data.getDate();
        var godz = data.getHours();
        var min = data.getMinutes();
        var sec = data.getSeconds();

        // Dodanie zera na pocz¹tku minut i sekund je¿eli trzeba
        if (min < 10)
            min = '0' + min;
        if (sec < 10)
            sec = '0' + sec;

        // Utworzenie odpowiednio sformatowanej daty i czasu
        var data_i_czas = dzien + ' ' + nazwy_mies[mies] + ' ' + rok
                + ', ' + godz + ':' + min + ':' + sec;

        var czas = godz + ':' + min + ':' + sec;
        var data = dzien + ' ' + nazwy_mies[mies] + ' ' + rok;


        function zapisz() {

            var xxx = window.corr + window.err;
//            window.alert(xxx);
            var pp = window.corr * 100 / xxx;
//            window.alert(ppp + "%");

            var ppp = (pp.toFixed(2))
            var sss = ppp + " %";
            var statystykas = Lockr.set('test szlak' + data_i_czas, [{date: data}, {czas: czas}, {score: window.corr}, {neg: window.err}, {name: "Szlak"}, {procent: sss}]);
            window.alert("Zapisano wynik!");
            location.reload();
            return;

        }


