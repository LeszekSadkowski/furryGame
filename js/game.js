var Coin = require('./coin.js');
var Furry = require('./furry.js');

function Game() {
    const self= this;
    this.board= document.querySelectorAll('#board div');
    this.furry=new Furry();
    this.coin=new Coin();
    this.score= 0;

    this.index = function(x,y) {
        return x + (y * 10);
    };

    this.showFurry= function () {
        if (document.querySelector('.furry') != null) {
            this.hideVisibleFurry();
        }
        this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
    };

    this.showCoin=function () {
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    };
    this.moveFurry= function () {
        if(this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left"){
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;
        }

        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();

    };
    this.hideVisibleFurry=function () {
        var currFurry=document.querySelector('.furry');
        currFurry.classList.remove('furry');
    };
    document.addEventListener('keydown', function (event) {
        self.turnFurry(event);
    });

    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    };

    this.checkCoinCollision=function () {
        if(this.furry.x===this.coin.x && this.furry.y===this.coin.y){
            var currCoin=document.querySelector('.coin');
            currCoin.classList.remove('coin');
            this.score++;
            var displScore=document.querySelector('#score strong');
            displScore.innerText= this.score;
            this.coin= new Coin();
            this.showCoin();
        }
    }
    this.gameOver=function () {
        var endGame=document.querySelector('#over');
        var endScore=document.querySelector('#over span')
        if(this.furry.x>9||this.furry.x<0||this.furry.y>9||this.furry.y<0){
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            endGame.classList.remove('invisible')
            endScore.innerText= this.score;



        }
    }

    this.startGame=function () {
        this.idSetInterval= setInterval(function () {
            self.moveFurry();
        },250);
    }
}

module.exports = Game;