(() => {
  const wandEl = document.getElementById('wand');
  const counterEl = document.getElementById('counter');
  const testEl = document.getElementById('test');
  const gameEl = document.getElementById('game');
  const upgradesEl = document.getElementById('upgrades');
  const upgradeListEl = document.getElementById('upgrade-list');
  const btnUpgrades = document.getElementById('btn-upgrades');
  const btnBack = document.getElementById('btn-back');
  const btnReset = document.getElementById('btn-reset');
  const questionEl = document.getElementById('question');
  const answerButtonsEl = document.getElementById('answers');

  let gold = 0;
  let clickPower = 1;
  let selectedWandKey = null;

  const wandImages = {
    brave: 'images/wand-brave.png',
    wise: 'images/wand-wise.png',
    ambitious: 'images/wand-ambitious.png',
    loyal: 'images/wand-loyal.png'
  };

  const upgrades = [
    {
      name: 'Палочка Оливандера',
      level: 1,
      basePrice: 50,
      effect: () => { clickPower += 1; },
      price: function () { return this.basePrice * this.level; }
    }
  ];

  const questions = [
    {
      text: "Какой твой любимый предмет в Хогвартсе?",
      answers: [
        { text: "Заклинания", wand: "brave" },
        { text: "Зельеварение", wand: "ambitious" },
        { text: "История магии", wand: "wise" },
        { text: "Уход за магическими существами", wand: "loyal" }
      ]
    },
    {
      text: "Как бы ты провёл свободное время?",
      answers: [
        { text: "На дуэли", wand: "brave" },
        { text: "В библиотеке", wand: "wise" },
        { text: "Разгадывая тайны", wand: "ambitious" },
        { text: "С друзьями", wand: "loyal" }
      ]
    },
    {
      text: "Какой магический артефакт ты бы выбрал?",
      answers: [
        { text: "Мантия-невидимка", wand: "loyal" },
        { text: "Философский камень", wand: "ambitious" },
        { text: "Мозгошмыг", wand: "wise" },
        { text: "Снейпов мемуар", wand: "brave" }
      ]
    },
    {
      text: "Кем бы ты хотел стать?",
      answers: [
        { text: "Аврором", wand: "brave" },
        { text: "Министром магии", wand: "ambitious" },
        { text: "Профессором", wand: "wise" },
        { text: "Зоологом", wand: "loyal" }
      ]
    },
    {
      text: "Твоя любимая магическая тварь?",
      answers: [
        { text: "Гиппогриф", wand: "brave" },
        { text: "Сфинкс", wand: "ambitious" },
        { text: "Феникс", wand: "loyal" },
        { text: "Кентавр", wand: "wise" }
      ]
    }
  ];

  let currentQuestionIndex = 0;

  function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionEl.textContent = question.text;
    answerButtonsEl.innerHTML = '';
    question.answers.forEach(ans => {
      const btn = document.createElement('button');
      btn.textContent = ans.text;
      btn.onclick = () => {
        selectedWandKey = ans.wand;
        localStorage.setItem('selectedWandKey', selectedWandKey);
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          showQuestion();
        } else {
          startGame();
        }
      };
      answerButtonsEl.appendChild(btn);
    });
  }

  function startGame() {
    testEl.classList.add('hidden');
    gameEl.classList.remove('hidden');
    wandEl.style.backgroundImage = `url('${wandImages[selectedWandKey]}')`;
    updateCounter();
  }

  function updateCounter() {
    counterEl.textContent = `Галлеонов: ${gold}`;
  }

  wandEl.addEventListener("click", () => {
    gold += clickPower;
    updateCounter();
  });

  btnUpgrades.onclick = () => {
    gameEl.classList.add('hidden');
    upgradesEl.classList.remove('hidden');
    renderUpgrades();
  };

  btnBack.onclick = () => {
    upgradesEl.classList.add('hidden');
    gameEl.classList.remove('hidden');
  };

  function renderUpgrades() {
    upgradeListEl.innerHTML = '';
    upgrades.forEach(upg => {
      const btn = document.createElement('button');
      btn.textContent = `${upg.name} (Ур. ${upg.level}) — ${upg.price()} галлеонов`;
      btn.onclick = () => {
        if (gold >= upg.price()) {
          gold -= upg.price();
          upg.effect();
          upg.level++;
          updateCounter();
          renderUpgrades();
        } else {
          alert("Недостаточно галлеонов.");
        }
      };
      upgradeListEl.appendChild(btn);
    });
  }

  btnReset.onclick = () => {
    if (confirm("Сбросить игру?")) {
      localStorage.clear();
      location.reload();
    }
  };

  // Начать с теста или игры
  selectedWandKey = localStorage.getItem('selectedWandKey');
  if (selectedWandKey) {
    startGame();
  } else {
    showQuestion();
  }
})();
