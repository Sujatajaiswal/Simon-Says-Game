document.addEventListener("DOMContentLoaded", function () {
    let gameSeq = [];
    let userSeq = [];

    let btns = ["yellow", "red", "green", "purple"];
    let started = false;
    let level = 0;
    let h2 = document.querySelector("h2");

    // Event listener to start the game on keypress
    document.addEventListener("keypress", function () {
        if (!started) {
            console.log("Game is started");
            started = true;
            levelUp(); // Call the levelUp function when the game starts
        }
    });

    // Function to add flash effect to a button
    function gameFlash(btn) {
        btn.classList.add("flash");
        setTimeout(function () {
            btn.classList.remove("flash");
        }, 250);
    }

    function userFlash(btn) {
        btn.classList.add("userflash");
        setTimeout(function () {
            btn.classList.remove("userflash");
        }, 250);
    }

    // Function to increase level and select a random button to flash
    function levelUp() {
        level++;
        h2.innerText = `Level ${level}`;  // Update the level on the screen

        // Generate a random index from 0 to 3
        let randIdx = Math.floor(Math.random() * 4);
        let randColor = btns[randIdx];  // Pick a random color based on the random index
        let randbtn = document.querySelector(`#${randColor}`);  // Select the corresponding button by id

        // Push the color to the game sequence and flash the button
        gameSeq.push(randColor);
        console.log("Game Sequence:", gameSeq);

        gameFlash(randbtn);  // Call the flash function on the selected button
    }

    // Function to check the user's answer
    function checkAns(idx) {
        if (userSeq[idx] === gameSeq[idx]) {
            if (userSeq.length === gameSeq.length) {
                setTimeout(levelUp, 1000);  // Move to the next level
                userSeq = [];  // Reset the user's sequence
            }
        } else {
            h2.innerHTML = `Game Over! Your score was <b>${level}</b>. Press any key to start again.`;
            document.querySelector("body").style.color = "red";
            setTimeout(function () {
                document.querySelector("body").style.color = "black";
            }, 150);
            reset();
        }
    }

    // Function for button press logic
    function btnPress() {
        console.log(this);
        let btn = this;
        userFlash(btn);
        let userColor = btn.getAttribute("id");  // Get the ID of the pressed button
        userSeq.push(userColor);  // Push the color to the user's sequence
        checkAns(userSeq.length - 1);  // Check the user's input against the game sequence
    }

    // Add event listeners to all buttons
    let allBtns = document.querySelectorAll(".btn");
    for (let btn of allBtns) {
        btn.addEventListener("click", btnPress);
    }

    // Function to reset the game
    function reset() {
        started = false;
        gameSeq = [];
        userSeq = [];
        level = 0;
    }
});
