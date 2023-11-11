var canvas = document.getElementById("matrixCanvas");
var context = canvas.getContext("2d");
let graph = [];

colorTheBlocks = () => {
  var blockSizewidth = canvas.width / graph[0].length;
  var blockSizeheight = canvas.height / graph.length;
  for (var i = 0; i < graph.length; i++) {
    for (var j = 0; j < graph[0].length; j++) {
      var x = j * blockSizewidth;
      var y = i * blockSizeheight;
      context.fillStyle = graph[i][j];
      context.fillRect(x, y, blockSizewidth, blockSizeheight);
      context.strokeStyle = "black";
      context.strokeRect(x, y, blockSizewidth, blockSizeheight);
    }
  }
};

let speed = document.getElementsByName("speed")[0];

function timewaster(time) {
  let temp = Math.abs(time - 10);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("done");
    }, temp * 100);
  });
}

let colorScheme = [
  "red",
  "yellow",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
  "brown",
];
let runningFun = false;
let matrixCreated = false;
bsf = async (arr) => {
  runningFun = true;
  colorTheBlocks();
  await timewaster(speed.value);
  let Q = [];
  for (let i = 0; i < arr.length; i++) {
    Q.push(arr[i]);
    graph[arr[i][0]][arr[i][1]] = colorScheme[i];
  }

  colorTheBlocks();
  await timewaster(speed.value);
  while (Q.length) {
    let len = Q.length;
    for (let i = 0; i < len; i++) {
      if (Q[0][0] - 1 >= 0 && graph[Q[0][0] - 1][Q[0][1]] === "grey") {
        Q.push([Q[0][0] - 1, Q[0][1]]);
        graph[Q[0][0] - 1][Q[0][1]] = graph[Q[0][0]][Q[0][1]];
      }
      if (
        Q[0][0] + 1 <= graph.length - 1 &&
        graph[Q[0][0] + 1][Q[0][1]] === "grey"
      ) {
        Q.push([Q[0][0] + 1, Q[0][1]]);
        graph[Q[0][0] + 1][Q[0][1]] = graph[Q[0][0]][Q[0][1]];
      }
      if (Q[0][1] - 1 >= 0 && graph[Q[0][0]][Q[0][1] - 1] === "grey") {
        Q.push([Q[0][0], Q[0][1] - 1]);
        graph[Q[0][0]][Q[0][1] - 1] = graph[Q[0][0]][Q[0][1]];
      }
      if (
        Q[0][1] + 1 <= graph[0].length - 1 &&
        graph[Q[0][0]][Q[0][1] + 1] === "grey"
      ) {
        Q.push([Q[0][0], Q[0][1] + 1]);
        graph[Q[0][0]][Q[0][1] + 1] = graph[Q[0][0]][Q[0][1]];
      }
      Q.shift();
    }
    colorTheBlocks();
    await timewaster(speed.value);
  }
  runningFun = false;
};

let start = document.getElementById("start");
start.style.display = "none";
let create = document.getElementById("create");
let row = document.getElementsByName("row")[0];
let col = document.getElementsByName("col")[0];

create.addEventListener("click", (e) => {
  graph = [];
  e.preventDefault();
  if (!runningFun) {
    for (let i = 0; i < row.value; i++) {
      let temp = [];
      for (let j = 0; j < col.value; j++) {
        temp.push("grey");
      }
      graph.push(temp);
      temp = [];
    }
    colorTheBlocks();
    matrixCreated = true;
    if (matrixCreated) {
      start.style.display = "block";
    } else {
      start.style.display = "none";
    }
  } else {
    alert("code is running");
  }
});

start.addEventListener("click", (e) => {
  let inputArr = [];
  for (let i = 1; i <= 8; i++) {
    let row1 = document.getElementsByName(`row${i}`)[0];
    let col1 = document.getElementsByName(`col${i}`)[0];
    if (Number(row1.value) > 0 && Number(col1.value) > 0) {
      inputArr.push([Number(row1.value) - 1, Number(col1.value) - 1]);
    }
  }
  console.log(inputArr);
  e.preventDefault();
  if (inputArr.length == 0) {
    alert("input field");
  } else {
    if (!runningFun) {
      bsf(inputArr);
    } else {
      alert("code is running");
    }
  }
});
