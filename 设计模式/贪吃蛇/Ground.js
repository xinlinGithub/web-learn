// 广场
var ground = new Ground(BASE_X_POINT,BASE_Y_POINT, XLEN * SQUAREWIDTH, YLEN * SQUAREWIDTH);
// 初始化样式
ground.initStyle = function () {
    // 渲染广场
    this.viewContent.style.position = "absolute";
    this.viewContent.style.backgroundColor = "#0ff";
    this.viewContent.style.left = this.x + "px";
    this.viewContent.style.top = this.y + "px";
    this.viewContent.style.width = this.width + "px";
    this.viewContent.style.height = this.height + "px";
    document.body.appendChild(this.viewContent);
}
ground.fRowACols = [];
ground.grade_1 = function () {
    var tempSquare, tempDiv;
    // 存储广场上的运动对象
    this.SquareTable = [];
    this.viewContent.innerHTMl = "";
    for(var i = 0; i < YLEN; i++) {
        this.SquareTable[i] = [];
        for(var j = 0; j < XLEN; j++) {
            if(i === 0 || j === 0 || i === YLEN - 1 || j === XLEN - 1) {
                // 围墙放到最外层 按数组的方式存放 不按实际的位置 这样好统一
                tempSquare = SquareFactory.create("Stone", i, j, "black");
            }else {
                // 地板放到内部 蛇撞到墙就死了
                tempSquare = SquareFactory.create("Floor", i, j, "orange")
            }
            this.viewContent.appendChild(tempSquare.viewContent)
            this.SquareTable[i][j] = tempSquare;
        }
    }
}
// 制定不同等级
ground.grade_2 = function () {
    var tempSquare, tempDiv;
    // 存储广场上的运动对象
    this.SquareTable = [];
    this.viewContent.innerHTMl = "";
    var x1 = parseInt(YLEN / 4);
    var x2 = parseInt(YLEN * 3 / 4);
    var my = parseInt(XLEN / 2);
    var y1 = parseInt(XLEN / 5);
    var y2 = parseInt(XLEN * 4 / 5);
    for(var i = 0; i < YLEN; i++) {
        this.SquareTable[i] = [];
        for(var j = 0; j < XLEN; j++) {
            if(i === 0 || j === 0 || i === YLEN - 1 || j === XLEN - 1) {
                // 围墙放到最外层 按数组的方式存放 不按实际的位置 这样好统一
                tempSquare = SquareFactory.create("Stone", i, j, "black");
            }else if(((i === x1 || i === x2) && j >= y1 && j <= y2) || (j === my && i >= x1 + 2 && i <= x2 - 2)  ){
                tempSquare = SquareFactory.create("Stone", i, j, "black");
                ground.fRowACols.push(i + "" + j);                
            }
            else {
                // 地板放到内部 蛇撞到墙就死了
                tempSquare = SquareFactory.create("Floor", i, j, "orange")
            }
            this.viewContent.appendChild(tempSquare.viewContent)
            this.SquareTable[i][j] = tempSquare;
        }
    }
}

// 初始化广场参数 ground.SquareTable存储所有的方块
ground.init = function () {
    this.initStyle();
    // 存储并管理广场中所有方块
    this.grade_2();
}

// ground.init();

// 会频繁的用到 因为涉及到蛇的运动
// 拆开地板 把蛇放进去 让蛇运动
ground.remove = function (x, y) {//拆掉哪一个方块
    // 根据坐标定位真正要拆除的方块
    var square = this.SquareTable[x][y];
    // 从视觉上抹去
    this.viewContent.removeChild(square.viewContent);
    // 数据也对应起来 数据与视图相统一
    this.SquareTable[x][y] = null;//数组会自动清除掉
}

// 安装方块 把蛇放进去 不仅可以放蛇 还可以放食物 放障碍物 一系列天马行空的想象；
ground.append = function (square) {
    // 从视觉上来添加方块 让蛇运动起来
    this.viewContent.appendChild(square.viewContent);
    // 数据与视图同步；简单的运用vue的思想 
    this.SquareTable[square.x][square.y] = square;
}