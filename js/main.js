class Player {
    constructor(){
       this.width = 120;
       this.height = 120;
       this.posX = 50;
       this.posY = 0;
       this.domElement = null;

       this.createDomElement();
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
//Try and make it more personalised
class FallingBlocks {
    constructor() {
        this.width = 60;
        this.height = 90;
        this.posX = Math.floor(Math.random() * (800 - this.width + 1));
        this.posY = 900;
        this.domElement = null;
        this.type = Math.floor(Math.random() * 5);

        this.createDomElement();
    }

    createDomElement() {
        this.domElement = document.createElement("div");
    
        this.domElement.setAttribute("class", "block");
        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";
        this.domElement.style.left = this.posX + "px";
        this.domElement.style.bottom = this.posY + "px";

        const board = document.getElementById("board");
        board.appendChild(this.domElement);
    }

    moveDown() {
        this.posY--;
        this.domElement.style.bottom = this.posY + "px";
    }

}

const player = new Player();
const fallingBlocks = [];

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

//Try and personalise it a bit
setInterval(() => {
    const newBlock = new FallingBlocks();
    fallingBlocks.push(newBlock);
}, 1500);

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
                player.domElement.style.backgroundColor = "red";
                break;
            case 1:
                player.domElement.style.backgroundColor = "blue";
                break;
            case 2:
                player.domElement.style.backgroundColor = "yellow";
                break;
            case 3:
                player.domElement.style.backgroundColor = "brown";
                break;
            case 4:
                player.domElement.style.backgroundColor = "black";
                break;
            default:
                player.domElement.style.backgroundColor = "blueviolet"
            }


            //remove block from the DOM
            blockInstance.domElement.remove()
        }
    });

}, 10);




