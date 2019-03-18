
// 创建食物
Game.prototype.createFood = function () {
    var x, y, flag = true, node = true;
    while(flag) {
        // x , y [1,28] 不要让他在墙上 也不要让他在蛇的身体上
        x = 1 + parseInt(Math.random() * (XLEN - 2));
        y = 1 + parseInt(Math.random() * (YLEN - 2));
        // 当node为null时 结束循环；
        // var ok = true;
        //  // 这种实现方式不好 可以用一个数据储存可用的地板 这样节省性能
        // for (node = snake.head; node; node = node.next) {
        //     if(x === node.x && y === node.y) {
        //         ok = false;
        //     }
        // }
        // ok不变号证明食物合格
        // if(ok) {
        //     flag = false;
        // }
        ground.fRowACols.indexOf(x + "" + y) === -1 ? flag = false : flag = true;
        
    }
    ground.remove(x, y);
    ground.append(SquareFactory.create("Food", x, y, "yellow"));
}
var game = new Game();
game.timer = null;
game.iSpeedInterval = 200;
game.score = 0;

game.event = function (e) {
    switch (e.which) {
        case 37:
            snake.driection = snake.driection === DIRECTION_ENUM.RIGHT ? DIRECTION_ENUM.RIGHT : DIRECTION_ENUM.LEFT;
            break; 
        case 38:
            snake.driection = snake.driection === DIRECTION_ENUM.DOWN ? DIRECTION_ENUM.DOWN : DIRECTION_ENUM.UP;
            break; 
        case 39:
            snake.driection = snake.driection === DIRECTION_ENUM.LEFT ? DIRECTION_ENUM.LEFT : DIRECTION_ENUM.RIGHT;
            break; 
        case 40:
            snake.driection = snake.driection === DIRECTION_ENUM.UP ? DIRECTION_ENUM.UP : DIRECTION_ENUM.DOWN;
            break; 
        default:
            return;
    }
}
game.init = function () {
    ground.init();
    snake.init(ground);
    game.createFood();
    // 绑定事件 监听事件 运用节流处理
    document.onkeydown = tool.throttle(game.event, 100)
}
game.init();
game.start = function () {
    clearInterval(game.timer);
    game.timer = setInterval(function () {
        // 一定时间后才会执行move 在执行move前改变运动方向 他就会变相 这就是运动原理
        snake.move(ground);
    }, game.iSpeedInterval)
}
game.over = function () {
    clearInterval(game.timer);
    alert("游戏结束！分数为" + game.score);
}
game.start();

