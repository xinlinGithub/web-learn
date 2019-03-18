// 创建方块工厂
// 使用工厂模式
function SquareFactory() {

}

// 工厂函数静态方法
// 创建指定类型的方块
SquareFactory.create = function (type, x, y, color) {
    if(!SquareFactory.prototype[type]){
        throw "SquareFactory is no type!"
    }
    if(Object.getPrototypeOf(SquareFactory.prototype[type].prototype) !== SquareFactory.prototype){
        // 让工厂车间函数 都继承工厂上的方法
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }
    return new SquareFactory.prototype[type](x, y, color); 
}
// 初始化每个类型方块的样式
SquareFactory.prototype.init = function (square, color, message) {
    square.viewContent.style.position = "absolute";
    square.viewContent.style.width = square.width + "px";
    square.viewContent.style.height = square.height + "px";
    // 这儿left top一定不要混
    square.viewContent.style.left = square.y * SQUAREWIDTH + "px";
    square.viewContent.style.top = square.x * SQUAREWIDTH + "px";
    square.viewContent.style.backgroundColor = color;
    // 每个方块被触碰以后会把消息返回 执行相关操作
    square.touch = function () {
        // 把要触发的消息返回
        return message;
    }
    return square;
}
// 相当于每个生产车间
SquareFactory.prototype.Floor = function (x, y, color) {
    var floor = new Floor(x , y , SQUAREWIDTH, SQUAREWIDTH);
    // 告诉这个方块 触碰后应该去执行什么操作 吃 移动 或死亡
    return this.init(floor, color, STRATEGIE_ENUM.move);
}

SquareFactory.prototype.Stone = function (x, y, color) {
    var stone = new Stone(x , y , SQUAREWIDTH, SQUAREWIDTH);
    return this.init(stone, color, STRATEGIE_ENUM.die);
}
SquareFactory.prototype.Food = function (x, y, color) {
    var food = new Food(x , y , SQUAREWIDTH, SQUAREWIDTH);
    return this.init(food, color, STRATEGIE_ENUM.eat);
}
SquareFactory.prototype.SnakeHead = function (x, y, color) {
    var snakehead = new SnakeHead(x , y , SQUAREWIDTH, SQUAREWIDTH);
    snakehead.update(x,y);//更新蛇头位置
    return this.init(snakehead, color, STRATEGIE_ENUM.die);
}
SquareFactory.prototype.SnakeBody = function (x, y, color) {
    var snakebody = new SnakeBody(x , y , SQUAREWIDTH, SQUAREWIDTH);
    return this.init(snakebody, color, STRATEGIE_ENUM.die);
}
