var game = {
    $charChoice: $(".char-choice"),
    $enemyChoice: $(".enemy-choice"),
    $chosenChar: "",
    $chosenEnemy: "",
    $yourCharacter: $("#your-character"),
    $enemiesSection: $(".enemies"),
    $fightSection: $(".fight"),
    $attackBtn: $("#attack"),
    $charName: "",


    chars: {
        rey : {
            name: "Rey",
            HP: 120,
            baseAttackPower: 10, // multiples every time ex 6 12 18 24 etc
            counterAttackPower: 8,
        },
        yoda: {
            name: "Yoda",
            HP: 150,
            baseAttackPower: 10, // multiples every time ex 6 12 18 24 etc
            counterAttackPower: 8,
        },
        char3: {
            name: "Char3",
            HP: 100,
            baseAttackPower: 10, // multiples every time ex 6 12 18 24 etc
            counterAttackPower: 8,
        },
        char4: {
            name: "Char4",
            HP: 100,
            baseAttackPower: 10, // multiples every time ex 6 12 18 24 etc
            counterAttackPower: 8,
        }

    }


};

// select character
game.$charChoice.on("click", function() {
    console.log("character picked");
    // save char name
    game.$charName = $(this).children(".name").text().toLowerCase();
    console.log($(this).children(".name").text());
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
            // move leftover characters to enemy choices
            $(this).parent().appendTo($("#enemy-cards"));
            // remove char-class, give them enemy class
            $(this).removeClass("char-choice");
            $(this).addClass("enemy-choice");
        }
    });

    game.$charChoice = $(".char-choice"); // update so it doesn't include old ones



    ////////////////// move others to the enemy options instead of having duplicates
})

// select enemy
var enemyChosen = false;
game.$enemyChoice.on("click", function () {
    console.log("enemy picked");
    // save enemy name
    game.$enemyName = $(this).children(".name").text().toLowerCase();

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
    // enemy only has counter attack

    // counter variable for attack
    var i = 2;

    // get your character's health
    var yourHealth = game.chars[game.$charName].HP;
    var baseAttack = game.chars[game.$charName].baseAttackPower;
    var attackPower = baseAttack;
    console.log(game.chars[game.$charName].HP);

    // get enemy health
    var enemyHealth = game.chars[game.$enemyName].HP;
    var enemyCounterAttack = game.chars[game.$enemyName].counterAttackPower;

    enemyHeatlh = enemyHealth - attackPower;
    game.$chosenEnemy.children(".player-score").text(enemyHealth);

    attackPower = baseAttack ^ i;
    yourHealth = yourHealth - enemyCounterAttack;
    game.$chosenChar.children(".player-score").text(yourHealth);
    i++;
    console.log(attackPower + ' ' + i);

    // you attack - hit attack button
    // enemy HP - yourChar attack, attack ^ 2
    // your HP - enemy counterAttack, their attack ^2
});