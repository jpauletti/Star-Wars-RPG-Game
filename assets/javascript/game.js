var game = {
    $charChoice: $(".char-choice"),
    $enemyChoice: $(".enemy-choice"),
    $chosenChar: "",
    $chosenEnemy: "",
    $yourCharacter: $("#your-character"),
    $enemiesSection: $(".enemies"),
    $fightSection: $(".fight"),

    // enemies: [
    //     {
    //         name: ,
    //         healthPoints: ,
    //         counterAttackPower: ,
    //     }
    // ],

    // characters: [
    //     {
    //         name: ,
    //         healthPoints: ,
    //         attackPower: , // multiples every time ex 6 12 18 24 etc
    //         counterAttackPower: ,
    //     }
    // ],

    attack: function () {
        // you attack - hit attack button
        // enemy HP - yourChar attack, attack ^ 2
        // your HP - enemy counterAttack, their attack ^2
    },


};

// select character
game.$charChoice.on("click", function() {
    game.$chosenChar = $(this);
    // add chosen class
    game.$chosenChar.addClass("chosen");
    game.$yourCharacter.text("Your Character");
    game.$enemiesSection.removeClass("hide");

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
    game.$fightSection.removeClass("hide");

    // hide other character options without chosen class
    $.each(game.$enemyChoice, function (i, choice) {
        if (choice.classList.contains("chosen-enemy")) {
            // move chosen enemy to defender area
            var $enemyPosition = $("#enemy-position");
            $(this).parent().appendTo($enemyPosition);
        }
    });
})