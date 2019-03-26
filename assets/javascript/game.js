var game = {
    $charChoice: $(".char-choice"),
    $enemyChoice: $(".enemy-choice"),
    $chosenChar: "",
    $chosenEnemy: "",
};

// select character
game.$charChoice.on("click", function() {
    game.$chosenChar = $(this);
    // add chosen class
    game.$chosenChar.addClass("chosen");

    // hide other character options without chosen class
    $.each(game.$charChoice, function (i, choice) {
        if (!choice.classList.contains("chosen")) {
            $(this).parent().addClass("hide");
        }
    });
})

// select enemy
game.$enemyChoice.on("click", function () {
    game.$chosenEnemy = $(this);
    // add chosen class
    game.$chosenEnemy.addClass("chosen-enemy");

    // hide other character options without chosen class
    $.each(game.$enemyChoice, function (i, choice) {
        if (choice.classList.contains("chosen-enemy")) {
            // move chosen enemy to defender area
            var $enemyPosition = $("#enemy-position");
            $(this).parent().appendTo($enemyPosition);
        }
    });
})