/*
    姓名：李泽龙
    学号：14331144
    任务：作业5迷宫部分，完成迷宫游戏
    思路：先做基本的UI，再做事件处理，最后再返回去调整UI的样式
          用一个cheatBlock来检查游戏是否作弊
*/

var isGame = false;
var isCheat = false;

window.onload = function() {
    // 设置wall的mouseover和mouseout监听器
    var walls = document.getElementsByClassName("wall");
    for (var i = 0; i < walls.length; i++) {
        walls[i].addEventListener("mouseover", lose);
        walls[i].addEventListener("mouseout", leaveMaze);
    };

    // 设置startBlock的mouseover监听器
    var startBlock = document.getElementById("startBlock");
    startBlock.addEventListener("mouseover", startGame);

    //  设置endBlock的mouseover监听器
    var endBlock = document.getElementById("endBlock");
    endBlock.addEventListener("mouseover", endGame);

    //  设置cheatBlock的mouseover监听器
    var cheatBlock = document.getElementById("cheatBlock");
    cheatBlock.addEventListener("mouseover", function() {isCheat = true;});
}

function lose() {
    if (isGame) {
        var target = event.target;
        target.removeEventListener("mouseover", lose);
        target.removeEventListener("mouseout", leaveMaze);

        // 把wall更新为errWall
        target.className = "errWall";
        target.addEventListener("mouseover", lose);
        target.addEventListener("mouseout", leaveMaze);

        isGame = false;

        // 把result更新为normal
        var result = document.getElementById("result");
        result.textContent = "You Lose";
        result.className = "normal";
    }
}

function startGame() {
    isGame = true;
    document.getElementById("result").className = "disappear";
    isCheat = false;
}

function endGame() {
    if (isGame) {
        var result = document.getElementById("result");
        if (isCheat) {
            result.textContent = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
        } else {
            result.textContent = "You Win";
        }
        result.className = "normal";
        isGame = false;
    }
}

function leaveMaze() {
    var target = event.target;
    target.className = "wall";
}