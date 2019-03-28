
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
    $defender: $(".defender"),


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
            counterAttackPower: 2,
        },
        {
            name: "Char3",
            HP: 100,
            baseAttackPower: 2, // multiples every time ex 6 12 18 24 etc
            counterAttackPower: 2,
        },
        {
            name: "Char4",
            HP: 100,
            baseAttackPower: 2, // multiples every time ex 6 12 18 24 etc
            counterAttackPower: 2,
        }

    ]


};

var yourHealth = "";
var baseAttack = "";
var attackPower = "";

// select character - click
$(document).on('click', '.char-choice', function (e) {
    console.log("character picked");
    console.log(game.$charChoice);
    console.log(game.$enemyChoice);
    // save char name

    game.$charName = $(this).children(".name").text().toLowerCase();

    // pull character's data
    for (var i = 0; i < game.chars.length; i++) {
        if (game.$charName === game.chars[i].name.toLowerCase()) {
            console.log("name match")
            yourHealth = game.chars[i].HP;
            console.log(yourHealth);
            baseAttack = game.chars[i].baseAttackPower;
            attackPower = baseAttack * i;
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
            $(this).addClass("enemy-choice"); // html is updated, but old char-choice items are still getting click events
        }
    });

    game.$charChoice = $(".char-choice"); // update so it doesn't include old ones ????? not working
    game.$enemyChoice = $(".enemy-choice"); // update to include new ones ?????
    console.log(game.$charChoice);
    console.log(game.$enemyChoice);
});


var enemyHealth = "";
var enemyCounterAttack = "";

// select enemy - click
var enemyChosen = false;
$(document).on('click', '.enemy-choice', function (e) {

    game.$chosenEnemy = $(this);
    if (!enemyChosen) {
        console.log("enemy picked");
        // save enemy name
        game.$enemyName = $(this).children(".name").text().toLowerCase();

        // pull enemy's data
        for (var i = 0; i < game.chars.length; i++) {
            if (game.$enemyName === game.chars[i].name.toLowerCase()) {
                console.log("enemy name match")
                enemyHealth = game.chars[i].HP;
                console.log(yourHealth);
                enemyCounterAttack = game.chars[i].counterAttackPower;
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
        enemyChosen = true;
    }
});



// click attack button
// counter variable for attack
var i = 1;

game.$attackBtn.on("click", function() {
    // enemy only has counter attack

    if (enemyHealth > 0 && yourHealth > 0) {
        attackPower = baseAttack * i;

        // enemy health update
        enemyHealth = enemyHealth - attackPower;
        game.$chosenEnemy.children(".player-score").text(enemyHealth);

        // your health update
        yourHealth = yourHealth - enemyCounterAttack;
        game.$chosenChar.children(".player-score").text(yourHealth);
        i++;
        console.log("attack power: " + attackPower + ' ' + i);
        console.log('i: ' + i);

        if (enemyHealth <= 0) {
            console.log("you win");
            // remove enemy from game
            game.$chosenEnemy.parent().remove();
            game.$defender.append($("<p>Choose a new opponent!</p>"));
            enemyChosen = false;
        } else if (yourHealth <= 0) {
            console.log("you lose");
        }
    }

});