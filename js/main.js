let userName = document.getElementById('userName');

let startGameBtn = document.getElementById('startGame');

let duration = 500;

let blockContainer = document.querySelector('.memoryGame'); // Select The Parent Block

let blockContainerChildren = Array.from(blockContainer.children); // select all children in memoryGame and convert them to Array.

let orderRange = Array(...blockContainerChildren.keys()); // use spread Operator to include all keys in Array

let numberOfRightTimes = 0;

let numberOfWrongTimes = 0;


let successAudio = new Audio('audio/success-sound-effect.mp3');
let wrongAudio = new Audio('audio/fail-sound-effect.mp3');
let startPlay = new Audio('audio/Air Horn-SoundBible.mp3');
let endPlay = new Audio('audio/game-over.mp3');



shuffle(orderRange);

blockContainerChildren.forEach(function (block, index) {
    block.style.order = orderRange[index];

    block.addEventListener('click', function () {
        flipBlock(block);
    })
})

function StartGame(gameStartedBtn) { // Pass Btn as Parameter 
    document.getElementById("timer").innerHTML = 3;

    gameStartedBtn.addEventListener('click', function () {

        let name = prompt("What's Your Name : ");

        if (name == '' || name == null)
            userName.innerHTML = "anonymous";
        else
            userName.innerHTML = name;

        document.querySelector('.btn-control').remove();  // to remove layer from the page
        startPlay.play();

        Timer();
    })
}

StartGame(startGameBtn);

function Timer() {   //// Timer Function

    let minute = 2;
    let sec = 60;

    let timer = setInterval(function () {
        sec--;

        if (sec < 10)
            document.getElementById("timer").innerHTML = minute + " : " + "0" + sec;
        else
            document.getElementById("timer").innerHTML = minute + " : " + sec;

        if (minute == 0 && sec == 0) {

            clearInterval(timer);

            document.getElementById("timer").innerHTML = "Your Turn is EXPIRED";
            endPlay.play();

            createLayer();
        }

        if (sec == 0) {
            minute--;
            sec = 60;
        }

    }, 1000);
}

function createLayer() {

    let elem = document.createElement('div');
    blockContainer.appendChild(elem);

    let btn = document.createElement('button');
    let textNode = document.createTextNode('Start Game');
    btn.appendChild(textNode);
    btn.classList.add('startGame');
    btn.setAttribute('id', 'startGame');

    elem.classList.add('btn-control');
    elem.appendChild(btn);


    // Right Time

    let times1 = document.createElement('p');

    if (numberOfRightTimes == blockContainerChildren.length / 2) {
        let conc = document.createTextNode("congratulations , You Winner Bom Bom Bom ..")
        times1.appendChild(conc);
    }
    else {

        let rightTimes = document.createTextNode(`The Number OF Right Times = `);

        times1.appendChild(rightTimes)

        let spanChild = document.createElement('span');
        let spanChildText = document.createTextNode(numberOfRightTimes);
        spanChild.appendChild(spanChildText);

        times1.appendChild(spanChild);
    }

    // Wrong Time

    let times2 = document.createElement('p');

    if (numberOfWrongTimes == blockContainerChildren.length / 2) {
        let conc = document.createTextNode("Good Luck Next Time , You Loser HAHAHAH .. ")
        times2.appendChild(conc);
    }
    else {
        let wrongTimes = document.createTextNode(`The Number OF Wrong Times = `);

        times2.appendChild(wrongTimes)

        let spanChildWrong = document.createElement('span');
        let spanChildWrongText = document.createTextNode(numberOfWrongTimes);

        spanChildWrong.appendChild(spanChildWrongText);

        times2.appendChild(spanChildWrong);
    }

    elem.appendChild(times1);
    elem.appendChild(times2);

    StartGame(btn);
}


// Shuffle Block Function
function shuffle(array) {
    let currentIndex = array.length,
        temp = 0,
        random = 0;

    while (currentIndex > 0) {
        random = Math.floor(Math.random() * currentIndex);

        if (array.indexOf(random) !== -1) {
            currentIndex--;
            temp = array[currentIndex];
            array[currentIndex] = array[random];
            array[random] = temp;
        }
    }
}


// Flip Block Function
function flipBlock(selectedFlip) {
    selectedFlip.classList.add('flip');

    let allFlippedBlocks = blockContainerChildren.filter((blockFlipped) => blockFlipped.classList.contains('flip'));

    if (allFlippedBlocks.length === 2) {
        console.log("There is Two Flipped Photo");
        // Stop Clicking Function
        stopClicking();

        // Check Matched Blocked Function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}


// Stop Clicking Function
function stopClicking() {
    blockContainer.classList.add('no-clicking');

    setTimeout(function () {
        blockContainer.classList.remove('no-clicking');
    }, duration);
}

//Matched Blocked Function
function checkMatchedBlocks(firstBlock, secondBlock) {

    let tries = document.getElementById('wrongTries');

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

        numberOfRightTimes++;

        firstBlock.classList.remove('flip');
        secondBlock.classList.remove('flip');


        firstBlock.classList.add('Match');
        secondBlock.classList.add('Match');

        successAudio.play();
    }
    else {
        tries.textContent = parseInt(tries.textContent) + 1;
        numberOfWrongTimes++;
        setTimeout(function () {

            firstBlock.classList.remove('flip');
            secondBlock.classList.remove('flip');
        }, duration);

        wrongAudio.play();
    }
}