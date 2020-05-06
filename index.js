document.addEventListener('DOMContentLoaded', () => {

    const displayScore = document.querySelector('#score');
    let score = 0;
    displayScore.textContent = score;

    const squares = document.querySelectorAll('.square');
    const startButton = document.querySelector('.start__button');
    const resultContainer = document.querySelector('#container');
    const result = document.querySelector('#result');

    let width = 20; //grid 20x20 squares
    let currentIndex = 0;
    let appleIndex = 0;
    let currentSnake = [2, 1, 0]; //2 head 0 tail
    let direction = 1 //one div down on the array
    let speed = .9;
    let intervalTime = 0;
    let interval = 0;

    //start game
    function start() {
        resultContainer.classList.add('displayNone');
        result.classList.remove('clickable');
        result.textContent = "";

        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        randomApple();
        score = 0;
        direction = 1;
        displayScore.textContent = score;
        intervalTime = 1000;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime)
    }

    //
    function moveOutcomes() {

        //snake hitting borders or/and bitting itself
        if (
            (currentSnake[0] + width >= (width * width) && direction == width) || //bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || //right
            (currentSnake[0] % width === 0 && direction === -1) || //left
            (currentSnake[0] - width < 0 && direction == -width) || //top
            squares[currentSnake[0] + direction].classList.contains('snake') //snake bites itslef
        ) {

            resultContainer.classList.remove('displayNone');
            result.textContent = "Game Over";
            setTimeout(() => {
                result.textContent = "Play again!";
                result.classList.add('clickable');
                result.addEventListener('click', start)
            }, 2000);
            return clearInterval(interval);
        }

        const tail = currentSnake.pop();
        squares[tail].classList.remove('snake'); //erases the tail
        currentSnake.unshift(currentSnake[0] + direction); // adds the next div into the array & gives direction to the head
        // adds the index on the first position of the array
        // the unshifted item turns out to be the new currentSnake[0]

        //snake bites the apple
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail); //increases the width by adding an item on the last position of the array
            randomApple()
            score++;
            displayScore.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
        }
        squares[currentSnake[0]].classList.add('snake');
    }


    //randomize the place where the apple will be
    function randomApple() {
        let index = Math.floor(Math.random() * squares.length);
        let noSnake = squares[index].classList.contains('snake');
        if (!noSnake) {
            appleIndex = index;
            squares[appleIndex].classList.add('apple');
        } else {
            index = Math.floor(Math.random() * squares.length);
            noSnake = squares[index].classList.contains('snake');
            if(!noSnake){
                appleIndex = index;
                squares[appleIndex].classList.add('apple');
            }else{
                index = Math.floor(Math.random() * squares.length);
                appleIndex = index;
            }
        }
    }


    //assign keyCodes
    function controlPC(e) {
        squares[currentIndex].classList.remove('snake');

        if (e.keyCode === 39) { //right
            direction = 1; //one div to the right
        } else if (e.keyCode === 38) { //up
            direction = -width; //20 divs left meaning 1 div up
        } else if (e.keyCode === 37) { //left
            direction = - 1 //one div to the left
        } else if (e.keyCode === 40) { //down
            direction = +width //20 divs right meaning 1 div down
        }
    }


    function controlMP(event) {
        let id = event.srcElement.id;
        squares[currentIndex].classList.remove('snake');
        if (id === 'right') { //right
            direction = 1; //one div to the right
        } else if (id === 'up') { //up
            direction = -width; //20 divs left meaning 1 div up
        } else if (id === 'left') { //left
            direction = - 1 //one div to the left
        } else if (id === 'down') { //down
            direction = +width //20 divs right meaning 1 div down
        }
    }

    document.addEventListener('keyup', controlPC);
    //startButton.addEventListener('click', start);

    const up = document.querySelector('#up');
    up.addEventListener('click', controlMP);
    const down = document.querySelector('#down');
    down.addEventListener('click', controlMP);
    const left = document.querySelector('#left');
    left.addEventListener('click', controlMP);
    const right = document.querySelector('#right');
    right.addEventListener('click', controlMP);


    resultContainer.classList.remove('displayNone');
    result.classList.add('clickable');
    result.textContent = "START";
    result.addEventListener('click', start)

})
