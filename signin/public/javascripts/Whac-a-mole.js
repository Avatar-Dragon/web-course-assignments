/*
    姓名：李泽龙
    学号：14331144
    任务：作业5打地鼠部分，完成打地鼠游戏
    思路：先做基本的UI，再做事件处理，最后再返回去调整UI的样式
*/

var isGame = false;

// 加载页面之后执行
// 用js在gameBody加入60个button，并对每个button加上click监听器
$(function() {
    _.times(60, function(){
        var newButton = document.createElement("button");
        newButton.className = "normalButton";
        newButton.addEventListener("click", chickButton);
        $("#gameBody").append(newButton);
    });
    $("#startOrStopButton").click(changeStatus);
});

// 如果点到moleButton，则加分并生成新的moleButton, 否则减分
function chickButton() {
    if (isGame) {
        var c = parseInt($("#scoreBox").val());
        if (event.target.className == "moleButton") {
            $("#scoreBox").val(c + 1);
            newMoleButton();
        } else if (c > 0)
            $("#scoreBox").val(c - 1);
        event.target.className = "normalButton";
    }
}

// 在0~59随机生成一个与原来不同位置的moleButton
function newMoleButton() {
    var buttons = $("#gameBody").children();
    while (true)
    {
        var index = _.random(59);
        if (buttons[index].className != "moleButton") {
            buttons[index].className = "moleButton";
            break;
        }
    }
}

// startOrStopButton一共有三种状态，start，stop，continue
function changeStatus() {
    if (parseInt($("#timeBox").val()) > 0) {
        if (isGame)
            stopGame();
        else
            continueGame();
    } else {
        startGame();
    }
}

var t; // 保存计时器

function startGame() {
    isGame = true;
    $("#timeBox").val(30);
    $("#scoreBox").val(0);
    t = setInterval(countDown, 1000);
    $("#startOrStopButton").text("Stop Game");
    $("#statusBox").val("Playing");
    newMoleButton();
}

function continueGame() {
    isGame = true;
    t = setInterval(countDown, 1000);
    $("#startOrStopButton").text("Stop Game");
    $("#statusBox").val("Playing");
}

function stopGame() {
    isGame = false;
    clearInterval(t);
    $("#startOrStopButton").text("Continue Game");
    $("#statusBox").val("Pending");
}

// 倒计时，每次减少一秒
function countDown() {
    var c = parseInt($("#timeBox").val());
    $("#timeBox").val(c - 1);
    if (c <= 1)
        gameOver();
}

function gameOver() {
    clearInterval(t);
    isGame = false;
    $("#startOrStopButton").text("Start Game");
    $("#statusBox").val("Game Over");
    $(".moleButton").attr("class", "normalButton");
    alert("Game Over.\n You score is: " + $("#scoreBox").val());
}