class Player {
    constructor(){
       this.width = 120;
       this.height = 120;
       this.posX = 50;
       this.posY = 0;
       this.domElement = null;
       //counter player image
       this.imageCounter = 0;
       this.imageFilenames = ["body.png", "body1.png", "body2.png", "body3.png", "body4.png", "body5.png"];
       this.createDomElement();
       this.updatePlayerImage();

      
    }

    createDomElement(){
        this.domElement = document.createElement("div");
        this.domElement.setAttribute("id", "player");
        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";
        this.domElement.style.left = this.posX + "px";
        this.domElement.style.bottom = this.posY + "px";

        const board = document.getElementById("board");
        board.appendChild(this.domElement);
    }

    updatePlayerImage(){
        const imageName = this.imageFilenames[this.imageCounter];
        this.domElement.style.backgroundImage = `url('./css/${imageName}')`;
    }

    moveLeft() {
        if(this.posX > 0){
          this.posX -= 10;
          this.domElement.style.left = this.posX + "px";
        }
    }

    moveRight() {
        if(this.posX + this.width < 800){
            this.posX += 10;
            this.domElement.style.left = this.posX + "px";
        }
    }

    jump() {
       if(this.posY === 0){
        this.posY += 100;
        this.domElement.style.bottom = this.posY + "px";
       } 
    }

    fall() {
        if(this.posY !== 0){
            this.posY -= 100;
            this.domElement.style.bottom = this.posY + "px";
        }
    }


}

class FallingBlocks {
    constructor() {
        this.width = 60;
        this.height = 90;
        this.posX = Math.floor(Math.random() * (800 - this.width + 1));
        this.posY = 900;
        this.domElement = null;
        this.type = Math.floor(Math.random() * 6);

        this.createDomElement();
    }

    createDomElement() {
        this.domElement = document.createElement("div");
    
        this.domElement.setAttribute("class", "block");
        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";
        this.domElement.style.left = this.posX + "px";
        this.domElement.style.bottom = this.posY + "px";

        if(this.type === 0){
            this.domElement.style.backgroundColor = "red";
        }

        if(this.type === 1){
            this.domElement.style.backgroundColor = "blue";
        }

        if(this.type === 2){
            this.domElement.style.backgroundColor = "yellow";
        }

        if(this.type === 3){
            this.domElement.style.backgroundColor = "green";
        }

        if(this.type === 4){
            this.domElement.style.backgroundColor = "purple";
        }

        if(this.type === 5) {
            this.domElement.style.backgroundColor = "black";
        }

        const board = document.getElementById("board");
        board.appendChild(this.domElement);
    }

    moveDown() {
        this.posY -= 3;
        this.domElement.style.bottom = this.posY + "px";
    }

}

const player = new Player();
const fallingBlocks = [];

//timer code

let timer;
let timeLeft = 60; // seconds

function gameOver() {
    clearInterval(timer);

    if(player.imageCounter >= 4) {
        window.location.href = "winner.html";
    } else {
        window.location.href = "loser.html";
    }
}

function updateTimer() {
    timeLeft = timeLeft - 1;
    if (timeLeft >= 0) {
        document.getElementById("timer").innerHTML = timeLeft;
    } else {
        gameOver();
    }
}

function startTimer() {
    // Start the timer only if it's not already running
    if (!timer) {
        timer = setInterval(updateTimer, 1000);
        // Call updateTimer once to update the timer immediately
        updateTimer();

        setInterval(() => {
            const newBlock = new FallingBlocks();
            fallingBlocks.push(newBlock);
        }, 1500);
        
    }
}

// Event listener to start timer
document.addEventListener("keydown", (e) => {
    if (e.code === 'ArrowLeft' || e.code === 'ArrowRight' || e.code === 'Enter') {
        startTimer();
    }
});

//timer code ends


document.addEventListener("keydown", (e) => {
    if(e.code === 'ArrowLeft') {
        player.moveLeft();
    } else if(e.code === 'ArrowRight') {
        player.moveRight();
    } else if(e.code === 'Enter') {
        player.jump();
    } 
});

document.addEventListener("keyup", (e) => {
    if(e.code === 'Enter') {
        player.fall();
    }
});

setInterval(() => {
    fallingBlocks.forEach((blockInstance) => {
        blockInstance.moveDown();

        if(
            player.posX < blockInstance.posX + blockInstance.width &&
            player.posX + player.width > blockInstance.posX &&
            player.posY < blockInstance.posY + blockInstance.height &&
            player.posY + player.height > blockInstance.posY
        ) {
                
        switch(blockInstance.type) {
            case 0:
                if(player.imageCounter < 1){
                player.imageCounter++;
                player.updatePlayerImage();
                console.log(player.imageCounter)
                }
                break;
            case 1:
                if(player.imageCounter < 2 && player.imageCounter === 1){
                player.imageCounter++;
                player.updatePlayerImage();
                console.log(player.imageCounter)
                }
                break;
            case 2:
                if(player.imageCounter < 3 && player.imageCounter === 2){
                player.imageCounter++;
                player.updatePlayerImage();
                console.log(player.imageCounter)
                }
                break;
            case 3:
                if(player.imageCounter < 4 && player.imageCounter === 3){
                player.imageCounter++;
                player.updatePlayerImage();
                console.log(player.imageCounter)
                }
                break;
            case 4:
                if(player.imageCounter < 5 && player.imageCounter === 4){
                player.imageCounter++;
                player.updatePlayerImage();
                //Game over on having all the body parts
                gameOver();
                console.log(gameOver());
                }
                break;
            case 5:
                if(player.imageCounter > 0){
                    player.imageCounter--;
                    player.updatePlayerImage();
                    
                }
                break;
        }
                
            
            const maxImageCount = 5;
            player.imageCounter = Math.min(maxImageCount - 1, player.imageCounter);

            player.updatePlayerImage();
            
            //remove block from the DOM
            blockInstance.domElement.remove()
        
        }
    });

}, 10);
