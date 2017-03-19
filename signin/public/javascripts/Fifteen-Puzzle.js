// matrix数组保存16个拼图碎片的位置
var matrix;
// 保存游戏状态
var gameStatus = false;

// 加载页面之后执行
$(function() {
    matrix = getMatrix();
    initGameBody();
    $("#startButton").click(begin);
});

// 返回6X6的二维数组
function getMatrix() {
    var newMatrix = new Array();
    for (var i = 0; i < 6; i++) {
        newMatrix[i] = new Array();
        for (var j = 0; j < 6; j++)
            newMatrix[i][j] = 0;
    }
    return newMatrix;
}

// 生成16个拼图碎片
function initGameBody() {
    var documentFragment = document.createDocumentFragment();
    for (var i = 1; i <= 4; i++)
        for (var j = 1; j <= 4; j++) {
            var div = document.createElement("div");
            matrix[i][j] = getNumberByXY(i, j);
            setClassNameAndId(div, matrix[i][j]);
            div.addEventListener("click", move);
            documentFragment.appendChild(div); }
    $("#gameBody").append(documentFragment);
}

// 由坐标(x, y)得到一维序号
function getNumberByXY(x, y) { return (x - 1) * 4 + y; }

// 为每个拼图加上className(代表在背景图像的哪部分), id(代表在整个界面的位置), 不过要隐藏第16个拼图碎片
function setClassNameAndId(div, index) {
    var className = "piece" + index;
    if (index == 16)
        div.className = className + " hide";
    else
        div.className = className;
    div.id = "p" + index;
}

// 游戏开始, tempMatrix保存之前的matrix的位置, 清空matrix
function begin() {
    gameStatus = true;
    var tempMatrix = matrix;
    matrix = getMatrix();
    randomInMatrix(matrix, tempMatrix);
    adjustment();
    updateGameBody();
}

// 每次都随机生成新位置(x, y), 将tempMatrix的一个元素放在matrix的(x, y)上
function randomInMatrix(matrix, tempMatrix) {
    for (var i = 1; i <= 16; i++)
        do {
            var x = _.random(1, 4);
            var y = _.random(1, 4);
            if (matrix[x][y] == 0) {
                matrix[x][y] = tempMatrix[getX(i)][getY(i)];
                break;
            }
        } while(1)
}

// 由一维序号得到坐标(x, y)
function getX(i) { return parseInt((i + 3) / 4); }

function getY(i) { return parseInt(i - (parseInt((i + 3) / 4) - 1) * 4); }

// 由于随机算法可能生成不可还原的拼图。而不可还原的拼图的逆序数为奇数。所以需要把奇排列改为偶数列。
// 改变的方式就是对调两个数的位置，且这两个数都不是空白块。
function adjustment() {
    var number = countInverseNumber();
    // 需要对调时，空白块最多出现在matrix[1][1]~matrix[4][4]这四个位置的其中一个。
    if (number % 2 == 1) {
        var temp;
        if (matrix[1][1] != 16 && matrix[2][2] != 16)
            [matrix[1][1], matrix[2][2]] = [matrix[2][2], matrix[1][1]];
        else
            [matrix[3][3], matrix[4][4]] = [matrix[4][4], matrix[3][3]];
    }
}

// 计算逆序数
function countInverseNumber() {
    var number = 0;
    for (var i = 1; i <= 16; i++)
        for (var j = i + 1; j <= 16; j++)
            if (matrix[getX(i)][getY(i)] > matrix[getX(j)][getY(j)] && matrix[getX(i)][getY(i)] != 16 && matrix[getX(j)][getY(j)] != 16)
                // 不计空白块的
                number = number + 1;
    return number;
}

// 将与matrix[i][j]的值对应的拼图碎片的位置改为(i, j)
function updateGameBody() {
    for (var i = 1; i <= 4; i++)
        for (var j = 1; j <= 4; j++) {
            var piece = $(".piece" + matrix[i][j]);
            piece[0].id = "p" + getNumberByXY(i, j);
        }
}

// 判断能否移动, 寻找空白块
function canMove(array, id) {
    array[0] = getX(id);
    array[1] = getY(id);
    for (var i = -1; i <= 1; i++)
        for (var j = -1; j <= 1; j++)
            if ((i + j == -1 || i + j == 1) && matrix[array[0] + i][array[1] + j] == 16) {
                array[2] = array[0] + i; 
                array[3] = array[1] + j;
                return true;
            }
    return false;
}

// 移动拼图, 并互换位置
function move() {
    var a = new Array();
    if (gameStatus && canMove(a, parseInt(this.id.substr(1)))) {
        var black = document.getElementById("p" + getNumberByXY(a[2], a[3]));
        [matrix[a[0]][a[1]], matrix[a[2]][a[3]], black.id, this.id] = [matrix[a[2]][a[3]], matrix[a[0]][a[1]], this.id, black.id];
        isWin();
    }
}

// 判断是否胜利
function isWin() {
    for (var i = 1; i <= 4; i++)
        for (var j = 1; j <= 4; j++)
             if (matrix[i][j] != getNumberByXY(i, j))
                return false;
    gameStatus = false;
    alert("You win!");
    return true;
}