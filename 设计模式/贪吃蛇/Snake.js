
var snake = new Snake();
snake.head = null;
snake.tail = null;

// 方向枚举 用来控制蛇的运动
var DIRECTION_ENUM = {
    // 以数组为参考
    LEFT: {
        x: 0,
        y: -1
    },
    RIGHT:{
        x: 0,
        y: 1
    },
    UP: {
        x: -1,
        y: 0
    },
    DOWN: {
        x: 1,
        y: 0
    }
}
snake.init = function (ground) {
    // 创建蛇头蛇身 渲染视图
    var SnakeHead = SquareFactory.create("SnakeHead", 1,3,"red");
    var SnakeBody1 = SquareFactory.create("SnakeBody", 1,2, "blue");
    var SnakeBody2 = SquareFactory.create("SnakeBody", 1,1,"blue");
    ground.fRowACols.push("11","12","13");
    // 使用数据结构链表 将蛇连接起来 通过next指针找到下面的值 通过prev指针找到上面的值
    // 双向链表
    SnakeHead.next = SnakeBody1;
    SnakeHead.prev = null;
    SnakeBody1.next = SnakeBody2;
    SnakeBody1.prev = SnakeHead;
    SnakeBody2.next = null;
    SnakeBody2.prev = SnakeBody1;
    // 记录蛇的头和尾
    this.head = SnakeHead;
    this.tail = SnakeBody2;
    // 渲染视图 拆方块 安装方块
    ground.remove(SnakeHead.x, SnakeHead.y);
    ground.append(SnakeHead);
    ground.remove(SnakeBody1.x, SnakeBody1.y);
    ground.append(SnakeBody1);
    ground.remove(SnakeBody2.x, SnakeBody2.y);
    ground.append(SnakeBody2);
    // 默认向右运动 回头让蛇的x与此进行运算 加一或减一
    this.driection = DIRECTION_ENUM.RIGHT;
}

// snake.init(ground)

// 用策略模式去扩展 处理一些事件
snake.strateties = {
    // 移动的时候如果遇到地板 则起地板 按蛇头 去蛇尾 如果遇到食物则消除食物 不去蛇尾
    MOVE: function (snake, square, ground,fromEat) {
        // 创建一个新的身体代替蛇头 再创建一个新的蛇头连起来 更新链表
        // 但这个头始终都是原来的头 因为他是单例吗！ 然后调用update去更新他的位置
        var newBody = SquareFactory.create("SnakeBody", snake.head.x, snake.head.y, "blue");
        newBody.next = snake.head.next;
        snake.head.next.prev = newBody;
        // newBody.prev = null;
        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);
        // 移动头
        var newHead = SquareFactory.create("SnakeHead", square.x, square.y, "red");
        newHead.next = newBody;
        newBody.prev = newHead;
        newHead.prev = null;
        snake.head = newHead;
        ground.remove(newHead.x, newHead.y);
        ground.append(newHead);
        ground.fRowACols.push(square.x + "" + square.y);
        // 去掉蛇尾 如果不吃食物则去掉蛇尾 如果吃掉食物则不去蛇尾 相当于加了一节
        if(!fromEat) {
            snake.tail.prev.next = null;
            var newFloor = SquareFactory.create("Floor", snake.tail.x, snake.tail.y, "orange");
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor);
            snake.tail = snake.tail.prev;
            var t = ground.fRowACols.indexOf(snake.tail.x + "" + snake.tail.y);
            ground.fRowACols.splice(t,1);
        }
    },
    EAT: function (snake, square, ground) {
        game.score += 1;
        this.MOVE(snake, square, ground, true);
        game.createFood();
        if(parseInt(game.score) % 10 === 0) {
            this.ADDSPEED();
        }
        console.log("eat")
    },
    DIE: function () {
        // 变量提升后 此时game已经有值了
        game.over();
    },
    ADDSPEED: function () {
        var c = Math.round(game.iSpeedInterval / 1.5)
        game.iSpeedInterval = c > 100 ? c : 100;
    }
}
// 做一个预测 预判蛇下一个可触碰的方向
snake.move = function (ground) {
    // 在这里判断下一个方块被触碰后返回的消息 看是接着运动还是吃还是死
    var square = ground.SquareTable[this.head.x + this.driection.x][this.head.y + this.driection.y];
    // 去触发下一个方块的touch事件；
    if (typeof square.touch === "function") {
        // 执行返回的信息 运动时运用策略执行一些操作
        this.strateties[square.touch()](this, square, ground);
    }
}

