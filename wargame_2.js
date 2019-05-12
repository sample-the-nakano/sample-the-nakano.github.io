//let _ = require('./lib/underscore-min');

//カード
function card(suit, num) {
    this.suit = suit;
    this.num = num;
}

//ゲーマー
function _gamer(name){
    //ゲーマーの名前
    this.name = name;

    //手札
    this.cardsOfHand = [];

    this.setACardsOfHand = function setACardsOfHand(card){
        this.cardsOfHand.push(card);
    }

    this.getOneCardFromHand = function getOneCardFromHand(){
        return this.cardsOfHand.shift();
    }

    this.getCountOfCardOfHand = function getCountOfCardOfHand(){
        return _.size(this.cardsOfHand);
    }

    //獲得ポイント札
    this.cardsOfPoint = [];

    this.setCardsOfPoint = function setCardsOfPoint(cards){
        this.cardsOfPoint = _.union(this.cardsOfPoint, cards);
    }

    this.getCountOfCardsOfPoint = function getCountOfCardsOfPoint(){
        return _.size(this.cardsOfPoint);
    }

}

//ゲームキーパー
function _gameKeeper(){

    this.you;
    this.cpu;

    this.pooledCards = [];

    this.prepareGame = function prepareGame(you, cpu){
        this.you = you;
        this.cpu = cpu;

        //トランプを生成
        var cards = [];
        _.each(["スペード","ハート","ダイヤ","クラブ"], function(suit){
            _.each([1,2,3,4,5,6,7,8,9,10,11,12,13], function(num){
                cards.push( new card(suit, num) )
            });
        });

        //トランプをシャッフル
        cards = _.shuffle(cards);

        this.distributeCards(cards, this.you, this.cpu);
    }

    this.distributeCards = function distributeCards(cards, you, cpu){
        while(_.size(cards) > 0){
            you.setACardsOfHand(cards.shift());
            cpu.setACardsOfHand(cards.shift());
        }
    }

    this.startGame = function startGame(){
        var duelTimes = 0;

        while(this.you.getCountOfCardOfHand() > 0 && this.cpu.getCountOfCardOfHand() > 0){
            duelTimes++;
            alert(
                "【" + duelTimes + "回戦】\r\n" +
                "せ～の・・・"
                );
    
            this.duel(this.you, this.cpu);
        };
    }

    this.duel = function duel(you, cpu){

        // 「you」のカード
        var yourCard = you.getOneCardFromHand();
    
        //「cpu」のカード
        var cpuCard = cpu.getOneCardFromHand();
    
        this.judge(yourCard, cpuCard);
    }
    
    this.poolCards = function poolCards(cards){
        this.pooledCards = _.union(this.pooledCards, cards)
    }

    this.getCountOfPooledCards = function getCountOfPooledCards(){
        return _.size(this.pooledCards);
    }

    this.judge = function judge(yourCard, cpuCard){
        var msg = this.you.name + "のカード：" + yourCard.suit + "の【" + yourCard.num + "】\r\n" +
        this.cpu.name + "のカード：" + cpuCard.suit + "の【" + cpuCard.num + "】\r\n";
    
        if (yourCard.num > cpuCard.num) {
            alert(msg + "で " + this.you.name + "の勝ち！");

            this.you.setCardsOfPoint(_.union([yourCard, cpuCard], this.pooledCards) );
            this.pooledCards = [];

        } else if(yourCard.num < cpuCard.num){
            alert(msg + "で " + this.cpu.name + "の勝ち！");

            this.cpu.setCardsOfPoint(_.union([yourCard, cpuCard], this.pooledCards) );
            this.pooledCards = [];
    
        }else{
            alert(msg + "で 引き分け！");
            this.poolCards([yourCard, cpuCard]);
        }
    
        alert(
            this.you.name + "の獲得カード枚数：" + this.you.getCountOfCardsOfPoint() + "\r\n" +
            this.cpu.name + "の獲得カード枚数：" + this.cpu.getCountOfCardsOfPoint() + "\r\n" +
            "引き分けで場に残っているカード枚数：" + this.getCountOfPooledCards()
        );
    }
    
    this.finalJudge = function finalJudge(){
        alert("最終結果の・・・");
        alert("最終結果の発表です！！！！！");
        
        var yourPoints = this.you.getCountOfCardsOfPoint();
        var cpuPoints = this.cpu.getCountOfCardsOfPoint();
        var pooledPoints = this.getCountOfPooledCards();

        var msg = this.you.name + "の獲得カード枚数：" + yourPoints + "\r\n" +
        this.cpu.name + "の獲得カード枚数：" + cpuPoints + "\r\n" +
        "引き分けで場に残っているカード枚数：" + pooledPoints + "\r\n\r\n"
        ;
    
        if (yourPoints > cpuPoints) {
            alert(msg + this.you.name + "の完全勝利！");
        } else if(yourPoints < cpuPoints){
            alert(msg + this.cpu.name + "の完全勝利！");
        }else{
            alert(msg + "全くの引き分け！");
        }
    }

}


function init_2(){

    var you = new _gamer("あなた");
    var cpu = new _gamer("CPU");
    var gameKeeper = new _gameKeeper();
    
    gameKeeper.prepareGame(you, cpu);

    gameKeeper.startGame();

    gameKeeper.finalJudge();
}



