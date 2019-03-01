// 可配置性 单一职责原则；
var squareBoard = document.getElementById("my2048");
var squareAttr = {
  rows: 4,
  cols: 4,
  space: 10,
  width: 60,
  height: 60,
  colors: {
    "0": "#ccc0b3",
    "2": "#eee4da",
    "4": "#ede0c8",
    "8": "#f2b179",
    "16": "#f59563",
    "32": "#f67e5f",
    "64": "#f65e3b",
    "128": "#edcf72",
    "256": "#edcc61",
    "512": "#9c0",
    "1024": "#33b5e5",
    "2048": "#09c"
  }
};
var score = 0;
var scoreObj = {
  _4: 0,
  _5: 0,
  _6: 0
};
var squareScore = document.getElementsByClassName("score")[0];
var hisStore = document.getElementsByClassName("history_highest")[0];
var squareSet = [];
var boardSquareValues;
var directionEnum = {
  left: { x: -1, y: 0, key: "left", ord: "col", area: "width" },
  right: { x: 1, y: 0, key: "left", ord: "col", area: "width" },
  up: { x: 0, y: -1, key: "top", ord: "row", area: "height" },
  down: { x: 0, y: 1, key: "top", ord: "row", area: "height" }
};
var isFlag = false;
var isChange = false;
var BFC = (() => {
  return {
    add(val) {
      localStorage.setItem("score", JSON.stringify(val));
    },
    clear() {
      localStorage.clear();
    },
    get() {
      return JSON.parse(localStorage.getItem("score"));
    }
  };
})();
// 初始化面板
function initBoard() {
  squareBoard.innerHTML = null;
  squareSet = [];
  score = 0;
  squareBoard.style.position = "relative";
  squareBoard.style.width =
    squareAttr.cols * squareAttr.width +
    squareAttr.space * (squareAttr.cols + 1) +
    "px";
  squareBoard.style.height =
    squareAttr.rows * squareAttr.height +
    squareAttr.space * (squareAttr.rows + 1) +
    "px";
}
// 初始化静止方块
function initBoardSquare() {
  for (var i = 0; i < squareAttr.rows; i++) {
    for (var j = 0; j < squareAttr.cols; j++) {
      var domSquare = createSquare(
        0,
        i * squareAttr.width + (i + 1) * squareAttr.space,
        j * squareAttr.height + (j + 1) * squareAttr.space,
        i,
        j
      );
      squareBoard.appendChild(domSquare);
    }
  }
  boardSquareValues = generateNullSquare(0);
}
// 产生值可选的二维数组
function generateNullSquare(result) {
  // var tempArr = new Array(squareAttr.cols).fill(null);
  // var nullSquare = new Array(squareAttr.rows).fill(tempArr);
  // 这样不行是因为nullSquare每次填的都是一个tempArr nullSquare 里面的四个tempArr都一样
  var nullSquare = [];
  for (var i = 0; i < squareAttr.rows; i++) {
    nullSquare[i] = [];
    for (var j = 0; j < squareAttr.cols; j++) {
      nullSquare[i][j] = result;
    }
  }
  return nullSquare;
}
// 随机产生运动方块
function randerGenerateSquare() {
  for (;;) {
    var randomCol = Math.floor(Math.random() * squareAttr.cols);
    var randomRow = Math.floor(Math.random() * squareAttr.rows);
    if (boardSquareValues[randomRow][randomCol] === 0) {
      var tempSquare = createSquare(
        Math.random() > 0.65 ? 4 : 2,
        randomCol * squareAttr.width + (randomCol + 1) * squareAttr.space,
        randomRow * squareAttr.height + (randomRow + 1) * squareAttr.space,
        randomRow,
        randomCol
      );
      squareSet.push(tempSquare);
      squareBoard.appendChild(tempSquare);
      boardSquareValues[randomRow][randomCol] = tempSquare.num;
      return false;
    }
  }
}
// 创造运动方块
function createSquare(value, left, top, row, col) {
  var boardSquare = document.createElement("div");
  if (value != 0) {
    boardSquare.innerText = value;
    boardSquare.next = null;
  }
  boardSquare.style.left = left + "px";
  boardSquare.style.top = top + "px";
  boardSquare.style.width = squareAttr.width + "px";
  boardSquare.style.height = squareAttr.height + "px";
  boardSquare.style.background = squareAttr.colors[value];
  boardSquare.style.lineHeight = squareAttr.height + "px";
  boardSquare.style.textAlign = "center";
  boardSquare.style.fontSize = squareAttr.width * 0.5 + "px";
  boardSquare.num = value;
  boardSquare.col = col;
  boardSquare.row = row;
  return boardSquare;
}
// 判断是否失败
function isOver() {
  for (var i = 0; i < squareAttr.rows; i++) {
    for (var j = 0; j < squareAttr.cols; j++) {
      if (
        boardSquareValues[i][j] === 0 ||
        (i + 1 < squareAttr.rows &&
          boardSquareValues[i][j] === boardSquareValues[i + 1][j]) ||
        (j + 1 < squareAttr.cols &&
          boardSquareValues[i][j] === boardSquareValues[i][j + 1])
      ) {
        return false;
      }
    }
  }
  return true;
}
// 运动一次后获取新位置
function getNewLocation(moveArr) {
  var len = moveArr.length;
  if (len < 2) {
    return moveArr;
  }
  var temp = [moveArr[0]];
  for (var i = 1; i < len; i++) {
    if (
      temp[temp.length - 1].num === moveArr[i].num &&
      !temp[temp.length - 1].next
    ) {
      moveArr[i].next = temp[temp.length - 1];
      temp[temp.length - 1] = moveArr[i];
    } else {
      temp.push(moveArr[i]);
    }
  }
  return temp;
}
// 运动辅助函数
function run(dom, position, num) {
  dom.style[position.key] =
    num * squareAttr[position.area] + (num + 1) * squareAttr.space + "px";
  dom.style.transition = position.key + " 0.3s ease-in-out";
  dom[position.ord] = num;
}
// 方块动画运动
function animateSquare(animateArr, direction, jump) {
  for (var i = 0; i < animateArr.length; i++) {
    var newJump = jump;
    for (var j = 0; j < animateArr[i].length; j++) {
      jump === 0
        ? run(animateArr[i][j], direction, j)
        : run(animateArr[i][j], direction, --newJump);
      if (animateArr[i][j].next) {
        jump === 0
          ? run(animateArr[i][j].next, direction, j)
          : run(animateArr[i][j].next, direction, newJump);
      }
    }
  }
}
// 分析方块如何运动
function analysisAction(direction) {
  var len = squareSet.length;
  var tempArr = generateNullSquare(null);
  var locationSquare = [];
  for (let s = 0; s < len; s++) {
    tempArr[squareSet[s].row][squareSet[s].col] = squareSet[s];
  }
  if (direction.key === "left") {
    for (var i = 0; i < squareAttr.rows; i++) {
      var temp = [];
      if (direction.x < 0) {
        //向左
        for (var j = 0; j < squareAttr.cols; j++) {
          if (tempArr[i][j] != null) {
            temp.push(tempArr[i][j]);
          }
        }
      } else {
        // 向右
        for (var j = squareAttr.cols - 1; j >= 0; j--) {
          if (tempArr[i][j] != null) {
            temp.push(tempArr[i][j]);
          }
        }
      }
      locationSquare.push(getNewLocation(temp));
    }
    animateSquare(
      locationSquare,
      direction,
      direction.x < 0 ? 0 : squareAttr.cols
    );
  } else if (direction.key === "top") {
    for (var j = 0; j < squareAttr.cols; j++) {
      var temp = [];
      if (direction.y > 0) {
        //向下
        for (var i = squareAttr.rows - 1; i >= 0; i--) {
          if (tempArr[i][j] != null) {
            temp.push(tempArr[i][j]);
          }
        }
      } else {
        // 向上
        for (var i = 0; i < squareAttr.rows; i++) {
          if (tempArr[i][j] != null) {
            temp.push(tempArr[i][j]);
          }
        }
      }
      locationSquare.push(getNewLocation(temp));
    }
    animateSquare(
      locationSquare,
      direction,
      direction.y > 0 ? squareAttr.rows : 0
    );
  }
}
// 更新数据库内容
function refreshStorageData() {
  var nowData = BFC.get();
  if (nowData == null) {
    BFC.add(0);
  } else {
    if (nowData < score) {
      BFC.add(score);
      justHighestScore();
    }
  }
}
// 运动完后更新方块
function refreshSquare() {
  var tempValue = generateNullSquare(0);
  var tempSquare = [];
  for (var i = 0; i < squareSet.length; i++) {
    var temp = squareSet[i];
    if (temp != null && temp.next) {
      var square = createSquare(
        temp.num * 2,
        temp.col * squareAttr.width + (temp.col + 1) * squareAttr.space,
        temp.row * squareAttr.height + (temp.row + 1) * squareAttr.space,
        temp.row,
        temp.col
      );
      tempValue[temp.row][temp.col] = temp.num * 2;
      tempSquare.push(square);
      squareSet[squareSet.indexOf(temp)] = null;
      squareSet[squareSet.indexOf(temp.next)] = null;
      squareBoard.removeChild(temp);
      squareBoard.removeChild(temp.next);
      squareBoard.appendChild(square);
      score += temp.num * 2;
      squareScore.innerText = score;
    }
  }
  squareSet.forEach(item => {
    if (item != null) {
      tempValue[item.row][item.col] = item.num;
      tempSquare.push(item);
    }
  });
  tempValue.forEach((i, row) => {
    i.forEach((j, col) => {
      if (j != boardSquareValues[row][col]) {
        //此时证明square已经动了
        isChange = true;
      }
    });
  });
  if (isChange) {
    boardSquareValues = tempValue;
    squareSet = tempSquare;
  }
  refreshStorageData();
}
// 判断游戏是否成功
function appear2048() {
  for (var i = 0; i < squareAttr.rows; i++) {
    for (var j = 0; j < squareAttr.cols; j++) {
      if (boardSquareValues[i][j] === 2048) {
        return true;
      }
    }
  }
}
// 方块运动总函数
function moveSquare(direction) {
  if (isOver()) {
    alert("this game is over,please play again!");
    init();
    return false;
  }
  analysisAction(direction);
  setTimeout(() => {
    refreshSquare();
    if (appear2048()) {
      alert("恭喜你，顺利过关！");
    }
    if (isChange) {
      randerGenerateSquare();
      isChange = false;
    }
    isFlag = false;
  }, 300);
}
// 绑定键盘事件
function bindKeycodeEvent() {
  document.onkeydown = function(e) {
    if (isFlag) {
      return false;
    }
    isFlag = true;
    e.preventDefault();
    switch (e.key) {
      case "ArrowUp":
        moveSquare(directionEnum["up"]);
        break;
      case "ArrowDown":
        moveSquare(directionEnum["down"]);
        break;
      case "ArrowLeft":
        moveSquare(directionEnum["left"]);
        break;
      case "ArrowRight":
        moveSquare(directionEnum["right"]);
        break;
      default:
        isFlag = false;
        break;
    }
  };
}
// 判断是否更新显示最高分内容
function justHighestScore() {
  var highestScore = BFC.get();
  if (highestScore) {
    hisStore.innerText = highestScore;
  } else {
    hisStore.innerText = "0";
  }
}
// 一系列初始化操作
function init(row = 4, col = 4) {
  squareAttr.cols = col;
  squareAttr.rows = row;
  squareScore.innerText = 0;
  justHighestScore();
  // 初始化面板
  initBoard();
  // 初始化底板上上的小方块
  initBoardSquare();
  // 随机生成2048游戏方块
  randerGenerateSquare();
  randerGenerateSquare();
  // 绑定键盘事件
  bindKeycodeEvent();
}

window.onload = function() {
  init();
  selectBindEvent();
};

function selectBindEvent() {
  var select = document.getElementsByClassName("select")[0];
  var select_con = document.getElementsByClassName("selector_content")[0];
  var i = 0,
    j = 0;
  select.addEventListener("click", disappear);
  select_con.onclick = function select(e) {
    var num = parseInt(e.target.innerText.slice(0, 1));
    init(num, num);
    appear();
  };
  function disappear() {
    select.style.opacity = 0;
    select.style.transform = "rotateZ(" + ++i * 360 + "deg)";
    select.style.transition = "all 0.4s ease-in-out";
    select_con.style.transform = "translateY(-50%)";
    select_con.style.opacity = 1;
    select_con.style.transition = "all 0.3s ease-in-out 0.4s";
  }
  function appear() {
    select.style.opacity = 1;
    select.style.transform = "rotateZ(" + ++j * 360 + "deg)";
    select.style.transition = "all 0.4s ease-in-out 0.3";
    select_con.style.transform = "translateY(-200%)";
    select_con.style.opacity = 0;
    select_con.style.transition = "all 0.3s ease-in-out";
  }
}
