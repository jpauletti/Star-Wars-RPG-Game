var myChar = "";
var myEnemy = "";

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

// select character - click
$(document).on('click', '.char-choice', function (e) {
    console.log("character picked");
    console.log(game.$charChoice);
    console.log(game.$enemyChoice);
    // save char name
    game.$charName = $(this).children(".name").text().toLowerCase();
    myChar = $(this).children(".name").text().toLowerCase();
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

// select enemy - click
var enemyChosen = false;
$(document).on('click', '.enemy-choice', function (e) {
    console.log("enemy picked");
    // save enemy name
    game.$enemyName = $(this).children(".name").text().toLowerCase();
    myEnemy = $(this).children(".name").text().toLowerCase();

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
});



// click attack button
// counter variable for attack
var i = 1;

// get your character's health
var name = game.$charName;
console.log(game);
console.log(game.chars);
console.log(game.chars.name);
console.log(game.chars.myChar);
console.log(game.chars.name.HP);
console.log(game.chars.myChar.HP);
var yourHealth = game.chars[myChar].HP;
var baseAttack = game.chars.myChar.baseAttackPower;
var attackPower = baseAttack ^ i;
console.log(game.chars.name.HP);


// get enemy health
var enemyName = game.$enemyName;
var enemyHealth = game.chars.enemyName.HP;
var enemyCounterAttack = game.chars.enemyName.counterAttackPower;

game.$attackBtn.on("click", function() {
    // enemy only has counter attack

    // enemy health update
    enemyHeatlh = enemyHealth - attackPower;
    game.$chosenEnemy.children(".player-score").text(enemyHealth);

    // your health update
    yourHealth = yourHealth - enemyCounterAttack;
    game.$chosenChar.children(".player-score").text(yourHealth);
    i++;
    console.log("attack power: " + attackPower + ' ' + i);
    console.log('i: ' + i);

    // you attack - hit attack button
    // enemy HP - yourChar attack, attack ^ 2
    // your HP - enemy counterAttack, their attack ^2
});