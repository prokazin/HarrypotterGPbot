const selectedWand = localStorage.getItem('selectedWand') || 'standard';
let gold = 0;
let clickPower = 1;

// Telegram WebApp init
Telegram.WebApp.ready();
Telegram.WebApp.expand();

const counterEl = document.getElementById("counter");
const wandEl = document.getElementById("wand");

// Устанавливаем картинку палочки
wandEl.style.backgroundImage = `url('images/wand-${selectedWand}.png.png')`;

function updateCounter() {
  counterEl.textContent = `Галлеонов: ${gold}`;
}

async function loadProgress() {
  try {
    const result = await Telegram.WebApp.CloudStorage.getItems(['gold', 'clickPower']);
    gold = parseInt(result.gold || '0');
    clickPower = parseInt(result.clickPower || '1');
    updateCounter();
  } catch (err) {
    console.error('Ошибка загрузки прогресса:', err);
  }
}

async function saveProgress() {
  try {
    await Telegram.WebApp.CloudStorage.setItems({
      gold: gold.toString(),
      clickPower: clickPower.toString()
    });
  } catch (err) {
    console.error('Ошибка сохранения прогресса:', err);
  }
}

wandEl.addEventListener("click", () => {
  gold += clickPower;
  updateCounter();
  saveProgress();
});

function buyUpgrade(type) {
  if (type === 'wand' && gold >= 50) {
    gold -= 50;
    clickPower += 1;
    updateCounter();
    saveProgress();
    alert("Вы купили Палочку Оливандера! +1 к галлеонам за клик.");
  } else {
    alert("Недостаточно галлеонов.");
  }
}

// Загрузка при старте
loadProgress();
