var boxes       = document.querySelectorAll('.box'),
    timer       = document.querySelector('#time'),
    startBtn    = document.querySelector('#start'),
    shuffleBtn  = document.querySelector('#shuffle'),
    stopBtn     = document.querySelector('#stop'),
    repeatBtn   = document.querySelector('#repeat');
    sound       = document.querySelector('#audio');
    

var counter = 0, currentNumber = 0, uIndex = 0, myTimer=0, holdSetTime, x, repeatID;
myTimer = timer.value;
holdSetTime = timer.value;

 const init = () => {
    disablBoxes();
    repeatBtn.disabled = true;
    stopBtn.disabled = true;
 }
 function PlaySound() {
    var sound = document.getElementById("audio");
    sound.play()
}

 timer.onchange = () => {
    myTimer = timer.value;
    holdSetTime = timer.value;
    if(myTimer <= 0){
        checkTimeValue();
        timer.value = 20;
    }
 }

startBtn.onclick = () => {
    myTimer = timer.value;
    holdSetTime = timer.value;
    counter = 0;
    currentNumber = 0;

    stopBtn.disabled = false;
    repeatBtn.disabled = true;
    startBtn.disabled = true;

    enableBoxes();
    shuffle.newShuffle();
    startTiming();
    changeBgColor();
}

stopBtn.onclick = () => {
    stopBtn.disabled = true;
    repeatBtn.disabled = false;
    startBtn.disabled = false;

    disablBoxes();
    hideBoxesValue();
    clearInterval(x);
    timer.value = holdSetTime;
}

repeatBtn.onclick = () => {
    myTimer = timer.value;
    holdSetTime = timer.value;
    counter = 0;
    currentNumber = 0;
    
    shuffle.repeatIt();
    enableBoxes();
    startTiming();

    stopBtn.disabled = false;
    repeatBtn.disabled = true;
    startBtn.disabled = true;
}

//Disable box upon click and check the logic
boxes.forEach( (box) => {
    box.onclick = () => {
        currentNumber = Number(box.value);
        if(currentNumber === counter + 1){
            box.disabled = true;
            box.classList.add('dim');
            counter ++;
            if(currentNumber === boxes.length){
                success();
                clearInterval(x);
                timer.value = holdSetTime;
                startBtn.disabled = false;
                stopBtn.disabled = true;
                repeatBtn.disabled = false;
                hideBoxesValue(); 
            }
        }   
    }
});

//Disable Boxes Initially
const disablBoxes = () => {
    for (const box of boxes) {
        box.disabled = true;
        box.classList.add('dim');
    }
}

//Enanble boxes upon start
const enableBoxes =  () =>{
    for (const box of boxes) {
        box.disabled = false;
        box.classList.remove('dim');
    }
}

const hideBoxesValue = () => {
    for (const box of boxes) {
        box.disabled = false;
        box.value = '';
    }
}
const startTiming = () => {
    x = setInterval(function() {
        timer.value = myTimer--;
        console.log(timer); 
        if(myTimer < 0){ 
            disablBoxes();
            failure();
            clearInterval(x); 
            timer.value = holdSetTime;
            startBtn.disabled = false;
            stopBtn.disabled = true;
            repeatBtn.disabled = false;
            hideBoxesValue();     
        } 
    }, 1000);
}

const numbers = [
    [
        // [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        [20,1,19,2,18,3,17,4,16,5,15,6,14,7,13,8,12,9,11,10,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
        [10,2,11,18,12,7,13,6,14,5,15,4,16,3,17,9,1,19,8,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
        [1,3,5,7,9,11,13,15,17,19,2,4,6,8,10,12,14,16,18,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
        [3,1,2,18,19,20,4,6,5,15,17,16,7,9,8,14,12,13,10,11,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
        [1,4,7,9,2,10,3,5,18,6,8,19,11,12,14,17,20,13,15,16,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
        [9,2,10,3,11,4,12,5,13,6,14,7,20,17,1,18,15,16,19,8,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]
    ]
]

const shuffle = {
    newShuffle: () => {
        var randomNumbersIndex = Math.floor(Math.random()*numbers[uIndex].length);
        for (var i = 0; i < boxes.length; i++){
            boxes[i].value = numbers[uIndex][randomNumbersIndex][i]; 
        }
        repeatID = randomNumbersIndex;
    },
    repeatIt: () => {
        for (var i = 0; i < boxes.length; i++){
            boxes[i].value = numbers[uIndex][repeatID][i];
        }
    }
}
const changeBgColor = () => {
    const colors = [ "#ffe3e3","#FAE7B5","#c1ffc1","#D5FFFB","#C5D0E6","#e9fac8","#A2ADD0","#fff9db","#FCB4D5","#d8dee9"]
        

        
    


    var pickColor = Math.floor(Math.random()*colors.length);

    for (var i in boxes){
        //  if (i%2 == 0){
            box = boxes[i];
            box.style.backgroundColor = colors[pickColor];
             box.style.color = "black";
         }
    }
    

    

init();
