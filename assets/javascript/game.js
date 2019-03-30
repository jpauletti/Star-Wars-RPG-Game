
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
    $enemyName: "",
    $defender: $(".defender"),
    yourHealth: "",
    baseAttack: "",
    attackPower: "",
    enemyHealth: "",
    enemyCounterAttack: "",
    enemyChosen: false,


    chars: [
        {
            name: "Rey",
            HP: 120,
            baseAttackPower: 3, // multiples every time ex 6 12 18 24 etc
            counterAttackPower: 2,
        },
        {
            name: "Yoda",
            HP: 150,
            baseAttackPower: 4, // multiples every time ex 6 12 18 24 etc
            counterAttackPower: 15,
        },
        {
            name: "Char3",
            HP: 100,
            baseAttackPower: 2, // multiples every time ex 6 12 18 24 etc
            counterAttackPower: 2,
        },
        {
            name: "Char4",
            HP: 80,
            baseAttackPower: 1, // multiples every time ex 6 12 18 24 etc
            counterAttackPower: 2,
        }

    ]


};

// select character - click
$(document).on('click', '.char-choice', function (e) {
    console.log("character picked");
    console.log(game.$charChoice);
    console.log(game.$enemyChoice);
    // save char name

    // save character name
    game.$charName = $(this).children(".name").text().toLowerCase();

    // pull character's data
    for (var i = 0; i < game.chars.length; i++) {
        if (game.$charName === game.chars[i].name.toLowerCase()) {
            console.log("name match")
            game.yourHealth = game.chars[i].HP;
            console.log(game.yourHealth);
            game.baseAttack = game.chars[i].baseAttackPower;
            game.attackPower = game.baseAttack * i;
        }
    }

    console.log(game.$charName);



    game.$chosenChar = $(this);
    // add chosen class
    game.$chosenChar.addClass("chosen");
    // change text for this section
    game.$yourCharacter.text("Your Character");
    // show enemy section
    game.$enemiesSection.removeClass("hide");

    $.each(game.$charChoice, function (i, choice) {
        if (!choice.classList.contains("chosen")) {
            // move leftover characters to enemy choices
            $(this).parent().appendTo($("#enemy-cards"));
            // remove char-class, give them enemy class
            $(this).removeClass("char-choice");
            $(this).addClass("enemy-choice");
        }
    });
});


// select enemy - click
$(document).on('click', '.enemy-choice', function (e) {

    if (!game.enemyChosen) {
        $(".defender > p").empty();
        game.$chosenEnemy = $(this);
        console.log("enemy picked");
        // save enemy name
        game.$enemyName = $(this).children(".name").text();

        // pull enemy's data
        for (var i = 0; i < game.chars.length; i++) {
            if (game.$enemyName.toLowerCase() === game.chars[i].name.toLowerCase()) {
                game.enemyHealth = game.chars[i].HP;
                console.log(game.yourHealth);
                game.enemyCounterAttack = game.chars[i].counterAttackPower;
            }
        }
        
        // add chosen class
        game.$chosenEnemy.addClass("chosen-enemy");
        // show fight section
        game.$fightSection.removeClass("hide");

        // move chosen enemy to defender area
        var $enemyPosition = $("#enemy-position");
        $(this).parent().appendTo($enemyPosition);

        // enemy chosen - can't pick multiple enemies
        game.enemyChosen = true;
    }
});



// click attack button
// counter variable for attack
var i = 1;
var wins = 0;

game.$attackBtn.on("click", function() {
    // enemy only has counter attack

    if (game.enemyHealth > 0 && game.yourHealth > 0) {
        game.attackPower = game.baseAttack * i;

        // enemy health update
        game.enemyHealth = game.enemyHealth - game.attackPower;
        game.$chosenEnemy.children(".player-score").text(game.enemyHealth);

        // your health update
        game.yourHealth = game.yourHealth - game.enemyCounterAttack;
        game.$chosenChar.children(".player-score").text(game.yourHealth);
        i++;

        if ($(".attack-right > p").length === 0) {
            $(".attack-right").append($("<p>You attacked " + game.$enemyName + " for " + game.attackPower + " damage.</p>"));
            $(".attack-right").append($("<p>" + game.$enemyName + " attacked you back for " + game.enemyCounterAttack + " damage.</p>"));
        } else {
            $(".attack-right > p:nth-of-type(1)").text("You attacked " + game.$enemyName + " for " + game.attackPower + " damage.");
            $(".attack-right > p:nth-of-type(2)").text(game.$enemyName + " attacked you back for " + game.enemyCounterAttack + " damage.");
        }

        console.log("attack power: " + game.attackPower);
        console.log('i: ' + i);

        if (game.enemyHealth <= 0) {
            console.log("you win");
            // remove enemy from game
            game.$chosenEnemy.parent().remove();
            // clear text about attacks
            $(".attack-right > p:nth-of-type(1)").text("");
            $(".attack-right > p:nth-of-type(2)").text("");

            if (wins === 0) {
                game.$defender.append($("<p>Choose a new opponent!</p>"));
            } else if ($("#enemy-cards > div").length === 0) {
                $(".defender > p").text("You won! Game over.");
            } else {
                $(".defender > p").text("Choose a new opponent!");
            }

            game.enemyChosen = false;
            wins++;

        } else if (game.yourHealth <= 0) {
            console.log("you lose");
            // clear text about attacks
            $(".attack-right > p:nth-of-type(1)").text("");
            $(".attack-right > p:nth-of-type(2)").text("");
        }

    }

});