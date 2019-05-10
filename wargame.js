//let _ = require('./lib/underscore-min');

function card(suit, num) {
    this.suit = suit;
    this.num = num;
}

var yourPoints = 0;
var cpuPoints = 0;
var pooledPoints = 0;

var cards = [];

function init(){

    yourPoints = 0;
    cpuPoints = 0;
    pooledPoints = 0;
    
    //トランプを生成
    cards = [];
    _.each(["スペード","ハート","ダイヤ","クラブ"], function(suit){
        _.each([1,2,3,4,5,6,7,8,9,10,11,12,13], function(num){
            cards.push( new card(suit, num) )
        });
    });

    //トランプをシャッフル
    cards = _.shuffle(cards);

    var duelTimes = 0;

    while(_.size(cards) > 0){
        duelTimes++;
        alert(
            "【" + duelTimes + "回戦】\r\n" +
            "せ～の・・・"
            );

        duel(cards);
    };

    finalJudge(yourPoints, cpuPoints);
}

function duel(cards){

    // 「you」のカード
    var yourCard = cards.pop();

    //「cpu」のカード
    var cpuCard = cards.pop();

    judge(yourCard, cpuCard);
}

function judge(yourCard, cpuCard){
    var msg = "あなたのカード：" + yourCard.suit + "の【" + yourCard.num + "】\r\n" +
    "CPUのカード：" + cpuCard.suit + "の【" + cpuCard.num + "】\r\n";

    if (yourCard.num > cpuCard.num) {
        alert(msg + "で あなたの勝ち！");
        yourPoints += 2 + pooledPoints;
        pooledPoints = 0;

    } else if(yourCard.num < cpuCard.num){
        alert(msg + "で CPUの勝ち！");
        cpuPoints += 2 + pooledPoints;
        pooledPoints = 0;

    }else{
        alert(msg + "で 引き分け！");
        pooledPoints += 2;
    }

    alert(
        "あなたの獲得カード枚数：" + yourPoints + "\r\n" +
        "CPUの獲得カード枚数：" + cpuPoints + "\r\n" +
        "引き分けで場に残っているカード枚数：" + pooledPoints
    );
}

function finalJudge(yourPoints, cpuPoints){
    alert("最終結果の・・・");
    alert("最終結果の発表です！！！！！");

    var msg = "あなたの獲得カード枚数：" + yourPoints + "\r\n" +
    "CPUの獲得カード枚数：" + cpuPoints + "\r\n" +
    "引き分けで場に残ったカード枚数：" + pooledPoints + "\r\n\r\n"
    ;

    if (yourPoints > cpuPoints) {
        alert(msg + "あなたの完全勝利！");
    } else if(yourPoints < cpuPoints){
        alert(msg + "CPUの完全勝利！");
    }else{
        alert(msg + "全くの引き分け！");
        pooledPoints += 2;
    }
}


