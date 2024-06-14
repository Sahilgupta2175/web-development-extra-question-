let gameSeq = [];
let userSeq = [];

let btns = ['yellow', 'red', 'purple','green'];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');

document.addEventListener('keypress',function(){
    if(started == false){
        console.log('game is started');
        started = true;
        levelUp();
    }
});

function gameflash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    }, 250);
};

function userflash(btn){
    btn.classList.add('userflash');
    setTimeout(function(){
        btn.classList.remove('userflash');
    }, 250);
};

function levelUp(){
    userSeq = [];
    level++;
    h2.innerHTML = `Level ${level}`;

    let randomNumber = Math.floor(Math.random() * 3);
    let randomColor = btns[randomNumber];
    let randomButton = document.querySelector(`.${randomColor}`);
    // console.log(randomNumber);
    // console.log(randomColor);
    // console.log(randomButton);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameflash(randomButton);
};

function checkAns(index){
    if(userSeq[index] === gameSeq[index]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        let highestScore = localStorage.getItem('highestScore');
        if (highestScore === null || level > highestScore) {
            highestScore = level;
            localStorage.setItem('highestScore', highestScore);
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Your highest score was ${highestScore} <br> Press any key to start.`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = 'white'
        }, 150);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute('id');
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allbtns = document.querySelectorAll('.btn');
for(btn of allbtns){
    btn.addEventListener('click', btnPress);
}

function reset(){
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}
