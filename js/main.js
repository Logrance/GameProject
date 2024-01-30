class Player {
    constructor(){
       this.width = 120;
       this.height = 120;
       this.positionX = 50;
       this.positionY = 0;
       this.domElm = null;

       this.createDomElement();
    }

    createDomElement(){
        this.domElm = document.createElement("div");
    
        this.domElm.setAttribute("id", "player");
        this.domElm.style.width = this.width + "px";
        this.domElm.style.height = this.height + "px";
        this.domElm.style.left = this.positionX + "px";
        this.domElm.style.bottom = this.positionY + "px";

        const board = document.getElementById("board");
        board.appendChild(this.domElm);
    }

    moveLeft() {
        if(this.positionX > 0){
          this.positionX -= 10;
          this.domElm.style.left = this.positionX + "px";
        }
    }

    moveRight() {
        if(this.positionX + this.width < 800){
            this.positionX += 10;
            this.domElm.style.left = this.positionX + "px";
        }
    }

    jump() {
       if(this.positionY === 0){
        this.positionY += 100;
        this.domElm.style.bottom = this.positionY + "px";
       } 
    }

    fall() {
        if(this.positionY !== 0){
            this.positionY -= 100;
            this.domElm.style.bottom = this.positionY + "px";
        }
    }


}

const player = new Player();

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

