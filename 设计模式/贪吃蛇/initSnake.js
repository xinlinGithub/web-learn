// 游戏场景 俗称广场 宽度系数 高度系数
// 方块个数
var XLEN = 20;
var YLEN = 20;

// 方块 宽高
var SQUAREWIDTH = 20;

// 广场 位置
var BASE_X_POINT = 200;
var BASE_Y_POINT = 10;
// 定义基类
function Square(x, y, width, height, viewContent) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    // 抽象方块
    this.viewContent = viewContent || document.createElement("div");
}

Square.prototype.update = function (x, y) {
    // 手动去更改蛇头单例
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SQUAREWIDTH + "px";
    this.viewContent.style.right = y * SQUAREWIDTH + "px";
}

// 定义子类 以下都继承原型 方便扩展
// 地板 不是单例
var Floor = tool.extends(Square);
// 围墙 撞上就死
var Stone = tool.extends(Square);
// 创建一个单例实物  每个食物都是同一个对象 
var Food = tool.extends(Square);
// 蛇头蛇身组成蛇的全部
// 蛇头 是一个单例 每一个蛇头都一样 如果多个蛇就不能是单例了
var SnakeHead = tool.extends(Square);
// 蛇身 不是单例 因为位置不同 
var SnakeBody = tool.extends(Square);
// 组成蛇 因为蛇是由蛇头和蛇身组成的 所以不需要继承任何东西
var Snake = function () {};
// 游戏场景 是单例
var Ground = tool.single(Square);
// 游戏是个单例  不用继承东西
var Game = tool.single();

// 集合所有策略消息
// 当地板被触碰后就会返回这个消息 然后让策略去执行此消息
var STRATEGIE_ENUM = {
    move: "MOVE",
    eat: "EAT",
    die: "DIE"
}