//global variables
var userWins = Math.abs(0);
var gamesPlayed = Math.abs(0);

var currentMode = "enter username";
var userName = "";

//ai selects its pick
var aiPick = function(aiRandomNumber) {
    var aiRandomNumber = Math.floor(Math.random() * 3);
    if (aiRandomNumber == 0) {
        return (aiRandomNumber = "stone ✊");
    }
    if (aiRandomNumber == 1) {
        return (aiRandomNumber = "paper ✋");
    }
    if (aiRandomNumber == 2) {
        return (aiRandomNumber = "scissors ✌️");
    }
};

var main = function(input) {
    var myOutputValue = "";
    if (currentMode == "enter username") {
        myOutputValue = firstFrame(input);
    } else if (currentMode == "your name") {
        myOutputValue = clarifications(input);
    } else if (currentMode == "are you sure") {
        myOutputValue = greetings(input);
    } else if (currentMode == "normal") {
        myOutputValue = normalGame(input);
    } else if (currentMode == "reversed") {
        myOutputValue = reverseGame(input);
    } else if (currentMode == "A.I.") {
        myOutputValue = artIntel(input);
    } else if (currentMode == "korean") {
        myOutputValue = kPoy(input);
    } else if (input === "refresh") {
        myOutputValue = firstFrame(input);
    }
    return myOutputValue;
};

var firstFrame = function(input) {
    userName = input;
    currentMode = "your name";
    var myOutputValue = `Hello <strong>${userName}</strong>!<br>Is your name correct? Yes or no?<br>Please click submit button twice.`;
    userWins = Math.abs(0);
    gamesPlayed = Math.abs(0);
    return myOutputValue;
};
//name clarifications. just to be sure if typo
var clarifications = function(input) {
    answer = input.toLowerCase();
    currentMode = "are you sure";
    var myOutputValue = "Please type your name again";
    if (answer == "yes") {
        myOutputValue = gameSelect();
    } else {
        currentMode = "enter username";
    }

    return myOutputValue;
};
//game selection and greetings
var greetings = function(input) {
    var myOutputValue = `SUUUP <strong>${userName}</strong>!!!!<br>Choose the following game you wish to play!<br><strong>normal</strong><br><strong>reversed</strong><br><strong>auto</strong><br><strong>korean</strong>`;
    selected = input.toLowerCase();
    if (selected == "normal") {
        currentMode = "normal";
        myOutputValue = `Let's play the regular game, <strong>${userName}</strong>!<br>Pick stone, paper, or scissors!`;
    }
    if (selected == "reversed") {
        currentMode = "reversed";
        myOutputValue = `⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️
        <br>!<strong>${userName}</strong>, emag desrever eht yalp s'teL<br>!srossics ro ,repap , enots kciP`;
    }
    if (selected == "auto") {
        currentMode = "A.I.";
        myOutputValue = `Just watch, <strong>${userName}</strong>, while I play with my self.<br>ಥ_ಥ`;
    }
    if (selected == "korean") {
        currentMode = "korean";
        myOutputValue = `안녕 <strong>${userName}</strong>! 한국어 버전을 재생하자!<br>Hi <strong>${userName}</strong>! Let's play the korean version!<br>돌, 종이 또는 가위를 선택하십시오!<br>Pick stone, paper, or scissors!`;
    }

    return myOutputValue;
};
//the normal game mode
var normalGame = function(input) {
    currentMode = "normal";
    gamesPlayed += 1;

    //this will read your input. it will also accept all caps input

    var userInput = function() {
        var userOutput = input.toLowerCase();

        if (userOutput === "stone") {
            return (userOutput = "stone ✊");
        }
        if (userOutput === "paper") {
            return (userOutput = "paper ✋");
        }
        if (userOutput === "scissors") {
            return (userOutput = "scissors ✌️");
        }
        if (userOutput === "refresh") {
            return (userOutput = "refresh");
        }
        if (
            userOutput != "stone" ||
            userOutput != "paper" ||
            userOutput != "scissors"
        ) {
            return (userOutput = `ERROR 😡!!!This game is called "stone, paper, and scissors"!<br>"${input}" is not included in this game 😡.`);
        }
    };

    var pcPick = aiPick();
    var userPick = userInput();

    //this code will tell who wins the game
    var formula = function() {
        if (userPick === pcPick) {
            gamesPlayed -= 1;
            return "draw 🙄";
        } else if (userPick === "stone ✊") {
            if (pcPick === "paper ✋") {
                return `🤣🤣🤣 !!!!<strong>${userName}</strong> LOOOOOSEEEE!!!! 🤣🤣🤣<br>PAPER BEATS STOOOONE!!!`;
            } else {
                userWins += 1;
                return `Wow! ${userName} won! 🎉`;
            }
        } else if (userPick === "paper ✋") {
            if (pcPick === "scissors ✌️") {
                return `🤣🤣🤣 !!!!<strong>${userName}</strong> LOOOOOSEEEE!!!! 🤣🤣🤣<br>SCISSORS BEATS PAPER!!!`;
            } else {
                userWins += 1;
                return `Wow! ${userName} won! 🎉`;
            }
        } else if (userPick === "scissors ✌️") {
            if (pcPick === "stone ✊") {
                return `🤣🤣🤣 !!!!<strong>${userName}</strong> LOOOOOSEEEE!!!! 🤣🤣🤣<br>STONE BEATS SCISSORS!!!`;
            } else {
                userWins += 1;
                return `Wow! ${userName} won! 🎉`;
            }
        }
        gamesPlayed -= 1;
        return "uhmm. I'm confused 🤔.<br>I dont know how to judge that 😟...";
    };

    var judge = formula();
    var stats = Number(userWins) / Number(gamesPlayed);

    var myOutputValue =
        `<strong>${userName} chose:</strong>${userPick} <br><br><strong>pc chose:</strong>${pcPick} <br><br><strong>results:</strong> ${judge}<br><br><strong>Games played:</strong>${gamesPlayed}<br><br><strong>Games won:</strong>${userWins}<br><br><strong>Win rate:</strong>` +
        stats.toFixed(2) * 100 +
        "%" +
        `<br><br>` +
        "Type <strong>refresh</strong > to return home ";

    if (userPick === "refresh") {
        myOutputValue = firstFrame();
    }
    console.log(gamesPlayed, userWins);
    return myOutputValue;
};

//this is the reverse game mode
var reverseGame = function(input) {
    currentMode = "reversed";
    gamesPlayed += 1;

    //this will read your input. it will also accept all caps input
    var userInput = function() {
        var userOutput = input.toLowerCase();
        if (userOutput === "stone") {
            return (userOutput = "stone ✊");
        }
        if (userOutput === "paper") {
            return (userOutput = "paper ✋");
        }
        if (userOutput === "scissors") {
            return (userOutput = "scissors ✌️");
        }
        if (userOutput === "refresh") {
            return (userOutput = "refresh");
        }

        if (
            userOutput != "stone" ||
            userOutput != "paper" ||
            userOutput != "scissors"
        ) {
            return (userOutput = `ERROR 😡!!!This game is called "stone, paper, and scissors"!<br>"${input}" is not included in this game 😡.`);
        }
    };

    var pcPick = aiPick();
    var userPick = userInput();
    //this code will tell who wins the game
    var formula = function() {
        if (userPick === pcPick) {
            userWins += 1;
            return "draw 🙄";
        } else if (userPick === "stone ✊") {
            if (pcPick === "scissors ✌️") {
                return `🤣🤣🤣 !!!!<strong>${userName}</strong> LOOOOOSEEEE!!!! 🤣🤣🤣<br><strong>SCISSORS</strong> BEATS <strong>${userPick}</strong>!!!`;
            } else {
                userWins += 1;
                return `Wow! ${userName} won! 🎉`;
            }
        } else if (userPick === "paper ✋") {
            if (pcPick === "stone ✊") {
                return `🤣🤣🤣 !!!!<strong>${userName}</strong> LOOOOOSEEEE!!!! 🤣🤣🤣<br><strong>STONE</strong> BEATS <strong>${userPick}</strong>!!!`;
            } else {
                userWins += 1;
                return `Wow! ${userName} won! 🎉`;
            }
        } else if (userPick === "scissors ✌️") {
            if (pcPick === "paper ✋") {
                return `🤣🤣🤣 !!!!<strong>${userName}</strong> LOOOOOSEEEE!!!! 🤣🤣🤣<br><strong>PAPER</strong> BEATS <strong>${userPick}</strong>!!!`;
            } else {
                userWins += 1;
                return `Wow! ${userName} won! 🎉`;
            }
        }
        return "uhmm. I'm confused 🤔.<br>I dont know how to judge that 😟...";
    };

    var judge = formula();
    var stats = Number(userWins) / Number(gamesPlayed);

    var myOutputValue =
        `<strong>${userName} chose:</strong>${userPick} <br><br><strong>pc chose:</strong>${pcPick} <br><br><strong>results:</strong> ${judge}<br><br><strong>Games played:</strong>${gamesPlayed}<br><br><strong>Games won:</strong>${userWins}<br><br><strong>Win rate:</strong>` +
        stats.toFixed(2) * 100 +
        "%" +
        `<br><br>` +
        "Type <strong>refresh</strong > to return home ";
    if (userPick === "refresh") {
        myOutputValue = firstFrame();
    }
    return myOutputValue;
};

//this is the a i mode
var artIntel = function(input) {
    currentMode = "A.I.";
    gamesPlayed += 1;
    var pcPick = aiPick();
    var userPick = aiPick();

    //this code will tell who wins the game
    var formula = function() {
        if (userPick === pcPick) {
            userWins += 1;
            return "draw 🙄";
        } else if (userPick === "stone ✊") {
            if (pcPick === "paper ✋") {
                return `🤣🤣🤣 !!!!<strong>${userName}</strong> LOOOOOSEEEE!!!! 🤣🤣🤣<br>PAPER BEATS STOOOONE!!!`;
            } else {
                userWins += 1;
                return `Wow! ${userName} won! 🎉`;
            }
        } else if (userPick === "paper ✋") {
            if (pcPick === "scissors ✌️") {
                return `🤣🤣🤣 !!!!<strong>${userName}</strong> LOOOOOSEEEE!!!! 🤣🤣🤣<br>SCISSORS BEATS PAPER!!!`;
            } else {
                userWins += 1;
                return `Wow! ${userName} won! 🎉`;
            }
        } else if (userPick === "scissors ✌️") {
            if (pcPick === "stone ✊") {
                return `🤣🤣🤣 !!!!<strong>${userName}</strong> LOOOOOSEEEE!!!! 🤣🤣🤣<br>STONE BEATS SCISSORS!!!`;
            } else {
                userWins += 1;
                return `Wow! ${userName} won! 🎉`;
            }
        }
        gamesPlayed -= 1;
        return "uhmm. I'm confused 🤔.<br>I dont know how to judge that 😟...";
    };

    var judge = formula();
    var stats = Number(userWins) / Number(gamesPlayed);

    var myOutputValue =
        `<strong>${userName} chose:</strong>${userPick} <br><br><strong>pc chose:</strong>${pcPick} <br><br><strong>results:</strong> ${judge}<br><br><strong>Games played:</strong>${gamesPlayed}<br><br><strong>Games won:</strong>${userWins}<br><br><strong>Win rate:</strong>` +
        stats.toFixed(2) * 100 +
        "%" +
        `<br><br>` +
        "Type <strong>refresh</strong > to return home ";
    if (input === "refresh") {
        myOutputValue = firstFrame();
    }
    return myOutputValue;
};

var kPoy = function(input) {
    currentMode = "korean";

    // gamesPlayed += Math.abs(1);

    //this will read your input. it will also accept all caps input

    var userInput = function() {
        var userOutput = input.toLowerCase();

        if (userOutput === "stone") {
            return (userOutput = "stone ✊");
        }
        if (userOutput === "paper") {
            return (userOutput = "paper ✋");
        }
        if (userOutput === "scissors") {
            return (userOutput = "scissors ✌️");
        }
        if (userOutput === "refresh") {
            return (userOutput = "refresh");
        }
        if (
            userOutput != "stone" ||
            userOutput != "paper" ||
            userOutput != "scissors"
        ) {
            return (userOutput = `ERROR 😡!!!This game is called "stone, paper, and scissors"!<br>"${input}" is not included in this game 😡.`);
        }
    };

    var pcPick = aiPick();
    var userPick = userInput();

    //this code will tell who wins the game
    var formula = function() {
        if (userPick === pcPick) {
            return `AAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHH!!!!!!!! ${inFavorOf} WON THE GAAAME!!!`;
        } else if (userPick === "stone ✊") {
            if (pcPick === "paper ✋") {
                gamesPlayed = 1;
                userWins = 0;
                return `🤣🤣🤣 !!!!<strong>${userName}</strong> LOOOOOSEEEE!!!! 🤣🤣🤣<br>PAPER BEATS STOOOONE!!!`;
            } else {
                gamesPlayed = 0;
                userWins = 1;
                return `Wow! ${userName} won! 🎉`;
            }
        } else if (userPick === "paper ✋") {
            if (pcPick === "scissors ✌️") {
                gamesPlayed = 1;
                userWins = 0;
                return `🤣🤣🤣 !!!!<strong>${userName}</strong> LOOOOOSEEEE!!!! 🤣🤣🤣<br>SCISSORS BEATS PAPER!!!`;
            } else {
                gamesPlayed = 0;
                userWins = 1;
                return `Wow! ${userName} won! 🎉`;
            }
        } else if (userPick === "scissors ✌️") {
            if (pcPick === "stone ✊") {
                gamesPlayed = 1;
                userWins = 0;
                return `🤣🤣🤣 !!!!<strong>${userName}</strong> LOOOOOSEEEE!!!! 🤣🤣🤣<br>STONE BEATS SCISSORS!!!`;
            } else {
                gamesPlayed = 0;
                userWins = 1;
                return `Wow! ${userName} won! 🎉`;
            }
        }
        gamesPlayed = 0;
        userWins = 0;
        return "uhmm. I'm confused 🤔.<br>I dont know how to judge that 😟...";
    };

    var judge = formula();

    //korean mode game tracker
    var currentWinner = function() {
        if (userWins === 1 && gamesPlayed === 0) {
            return `${userName}`;
        }
        if (gamesPlayed === 1 && userWins === 0) {
            return "The Artificial intelligence";
        }
    };
    var inFavorOf = currentWinner();

    var myOutputValue =
        `<strong>${userName} chose:</strong>${userPick} <br><br><strong>pc chose:</strong>${pcPick} <br><br><strong>results:</strong> ${judge}<br><br><strong>Currently in favor of </strong>${inFavorOf}<br><br>` +
        `<br><br>` +
        "Type <strong>refresh</strong > to return home ";

    if (userPick === "refresh") {
        myOutputValue = firstFrame();
    }
    console.log(gamesPlayed, userWins);
    return myOutputValue;
};