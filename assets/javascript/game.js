var game = {
    $charChoice: $(".char-choice"),
    $enemyChoice: $(".enemy-choice"),
    $chosenChar: "",
    $chosenEnemy: "",
    $yourCharacter: $("#your-character"),
    $enemiesSection: $(".enemies"),
    $fightSection: $(".fight"),
    $attackBtn: $("#attack"),

    
    // enemies: [
    //     {
    //         name: ,
    //         healthPoints: ,
    //         counterAttackPower: ,
    //     }
    // ],

    // enemies don't have attackPower
    // characters: [
    //     {
    //         name: Rey,
    //         healthPoints: 100,
    //         attackPower: 10, // multiples every time ex 6 12 18 24 etc
    //         counterAttackPower: 8,
    //     }
    // ],

    chars: {
        rey : {
            name: "Rey",
            healthPoints: 100,
            attackPower: 10, // multiples every time ex 6 12 18 24 etc
            counterAttackPower: 8,
        }

    }


};

// select character
game.$charChoice.on("click", function() {
    game.$chosenChar = $(this);
    // add chosen class
    game.$chosenChar.addClass("chosen");
    // change text for this section
    game.$yourCharacter.text("Your Character");
    // show enemy section
    game.$enemiesSection.removeClass("hide");

    // hide other character options without chosen class
    $.each(game.$charChoice, function (i, choice) {
        if (!choice.classList.contains("chosen")) {
            $(this).parent().addClass("hide");
        }
    });
})

// select enemy
var enemyChosen = false;
game.$enemyChoice.on("click", function () {
    game.$chosenEnemy = $(this);
    if (!enemyChosen) {
        // add chosen class
        game.$chosenEnemy.addClass("chosen-enemy");
        // show fight section
        game.$fightSection.removeClass("hide");

        // move chosen enemy to defender area
        var $enemyPosition = $("#enemy-position");
        $(this).parent().appendTo($enemyPosition);

        // enemy chosen - can't pick multiple enemies
        enemyChosen = true;
    }
})

// click attack button
game.$attackBtn.on("click", function() {
    // you attack - hit attack button
    // enemy HP - yourChar attack, attack ^ 2
    // your HP - enemy counterAttack, their attack ^2
});