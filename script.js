const questions = [
  {
    question: "Какой твой любимый цвет?",
    options: ["Красный", "Синий", "Зелёный", "Жёлтый"]
  },
  {
    question: "Что ты больше всего ценишь?",
    options: ["Храбрость", "Мудрость", "Хитрость", "Верность"]
  },
  {
    question: "Кто ты по духу?",
    options: ["Лидер", "Учёный", "Манипулятор", "Дружелюбный"]
  },
  {
    question: "Какой предмет твой любимый?",
    options: ["Заклинания", "Зельеварение", "Трансфигурация", "Уход за магическими существами"]
  },
  {
    question: "Какое животное тебе ближе?",
    options: ["Грифон", "Орел", "Змея", "Барсук"]
  }
];

const wandTypes = ['gryffindor', 'ravenclaw', 'slytherin', 'hufflepuff'];

let currentQuestion = 0;
let answers = [];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      answers.push(option);
      nextQuestion();
    };
    answersEl.appendChild(btn);
  });
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    assignWand();
  }
}

function assignWand() {
  const index = answers.reduce((acc, _, i) => acc + i, 0) % wandTypes.length;
  const selected = wandTypes[index];
  localStorage.setItem('selectedWand', selected);
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  initGame();
}

nextBtn.onclick = nextQuestion;
showQuestion();

// Игра
let gold = 0;
let clickPower = 1;

function initGame() {
  const wandImg = document.getElementById("wand");
  const counterEl = document.getElementById("counter");

  const selectedWand = localStorage.getItem('selectedWand') || 'gryffindor';
  wandImg.style.backgroundImage = `url('images/wand-${selectedWand}.png')`;

  function updateCounter() {
    counterEl.textContent = `Галлеонов: ${gold}`;
  }

  function saveProgress() {
    localStorage.setItem('gold', gold);
    localStorage.setItem('clickPower', clickPower);
  }

  function loadProgress() {
    gold = parseInt(localStorage.getItem('gold') || '0', 10);
    clickPower = parseInt(localStorage.getItem('clickPower') || '1', 10);
    updateCounter();
  }

  wandImg.addEventListener("click", () => {
    gold += clickPower;
    updateCounter();
    saveProgress();
  });

  window.buyUpgrade = function (type) {
    if (type === 'wand' && gold >= 50) {
      gold -= 50;
      clickPower += 1;
      updateCounter();
      saveProgress();
      alert("Палочка Оливандера куплена!");
    } else {
      alert("Недостаточно галлеонов.");
    }
  };

  loadProgress();
}
