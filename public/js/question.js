$(function () {
    var question;
    var correct;
    var current;
    var incorrect;
    var proc = 2.5;
    var pro = 0;
    exists = [];
    $.getJSON("js/pytania.json", function (json) {
        question = json;
        run();
    });

    $('.summary-correct, .summary-alert').hide();
    totalCount = 0;
    correctCount = 0;
    incorrectCount = 0;

    run = function () {
        if (totalCount === 40) {
            if (correctCount > 25) {
                $(".test-info").html("<span class='alert-success'> sukcesem </span>");
            } else {
                $(".test-info").html("<span class='alert-danger'> porażką</span> ");
            }
            $("#summary").modal();
        }
        var count = question.length;

        while (true) {
            var rand = Math.floor((Math.random() * count) + 1);
            var proc = totalCount * 2.5;
            $(function () {
                $("#progressbar").progressbar({
                    value: pro

                });
            });
             // document.getElementById("pro").innerHTML = pro;
//            document.getElementById("pro").innerHTML = pro;
            $('.pro').html(pro);

            if ($.inArray(rand, exists) === -1) {
                exists.push(rand);
                break;
            }
        }
        current = question[rand];
        correct = 'answer-' + current.correct;
        pro = proc + 2.5;


        $(".question").html(current.question);
        $(".answer-a").html(current.a);
        $(".answer-b").html(current.b);
        $(".answer-c").html(current.c);

        $(".total").html(totalCount);
        $(".correct").html(correctCount);
        $(".incorrect").html(incorrectCount);
    }

    $('body').delegate('.answer', 'click', function () {
        ++totalCount;
        if ($(this).hasClass(correct)) {
            ++correctCount;
            $(".summary-alert").hide();
            $(".summary-correct").show();
            $(".proc").html(proc);
        } else {
            $(".quest").html(current.question);
            $(".correct-answer").html(current[current.correct]);
            $(".summary-alert").show();
            $(".summary-correct").hide();
            $(".proc").html(proc[proc]);

        }
        run();
    });

    $(".koniec").click(function () {
        location.reload();
    })



});


        