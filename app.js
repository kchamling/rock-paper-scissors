const userChoice = document.querySelectorAll(".userChoice");
const message = document.querySelector("#msg");
const userScore = document.querySelector("#user-score");
const computerScore = document.querySelector("#computer-score");
const display = document.querySelector(".display");
const resetBtn = document.querySelector("[type='reset']");

const storedScore = JSON.parse(localStorage.getItem("score"));
const score =
  storedScore && storedScore.user && storedScore.comp
    ? storedScore
    : { user: 0, comp: 0 

if (score.user) {
  userScore.innerText = score.user;
}
if (score.comp) {
  computerScore.innerText = score.comp;
}

const outcomes = {
  rock: { rock: "draw", paper: "computer", scissor: "user" },
  paper: { rock: "computer", paper: "draw", scissor: "user" },
  scissor: { rock: "computer", paper: "user", scissor: "draw" },
};

const playGame = (user) => {
  const computer = getRandomChoice();
  checkWinner(user, computer);
};

const getRandomChoice = () => {
  const options = ["rock", "paper", "scissor"];
  const randIdx = Math.round(Math.random() * options.length);
  return options[randIdx];
};

const checkWinner = (user, computer) => {
  const result = outcomes[user][computer];
  const userWin = result === "user" ? true : false;
  const isDraw = result === "draw" ? true : false;
  if (isDraw) {
    drawGame(isDraw, user, computer);
  } else {
    showWinner(userWin, user, computer);
  }
};

const drawGame = (isDraw, user, computer) => {
  if (isDraw) {
    message.innerText = `GAME DRAW!!\nYou choose ${user} and Computer choose ${computer}.`;
    message.style.backgroundColor = "blue";
  }
};

const showWinner = (userWin, user, computer) => {
  if (userWin) {
    message.innerText = `YOU WIN!!\nYou choose ${user} and Computer choose ${computer}.`;
    message.style.backgroundColor = "green";
  } else {
    message.innerText = `COMPUTER WIN!!\nYou choose ${user} and Computer choose ${computer}.`;
    message.style.backgroundColor = "red";
  }
  scoreUpdate(userWin);
};

const scoreUpdate = (userWin) => {
  if (userWin) {
    score.user++;
    userScore.innerText = score.user;
    localStorage.setItem("score", JSON.stringify(score));
  } else {
    score.comp++;
    computerScore.innerText = score.comp;
    localStorage.setItem("score", JSON.stringify(score));
  }
};

userChoice.forEach((choice) => {
  choice.addEventListener("click", () => {
    const user = choice.getAttribute("id");
    playGame(user);
  });
});

resetBtn.addEventListener("click", () => {
  localStorage.setItem("score", JSON.stringify({ user: 0, comp: 0 }));
  score.user = 0;
  score.comp = 0;
  userScore.innerText = score.user;
  computerScore.innerText = score.comp;
});
