const selectedWand = localStorage.getItem('selectedWand') || 'standard';
let gold = 0;
let clickPower = 1;

Telegram.WebApp.ready();
Telegram.WebApp.expand();

const counterEl = document.getElementById("counter");
const wandImg = document.getElementById("wand");

// Отображаем палочку
wandImg.style.backgroundImage = `url('images/wand-${selectedWand}.png')`;
wandImg.style.backgroundSize = 'contain';
wandImg.style.backgroundRepeat = 'no-repeat';
wandImg.style.backgroundPosition = 'center';

async function loadProgress() {
  try {
    const keys = ['gold', 'clickPower'];
    const result = await Telegram.WebApp.CloudStorage.getItems(keys);

    gold = parseInt(result.gold || '0', 10);
    clickPower = parseInt(result.clickPower || '1', 10);
    updateCounter();
  } catch (e) {
    console.error('Ошибка загрузки прогресса', e);
  }
}

async function saveProgress() {
  try {
    await Telegram.WebApp.CloudStorage.setItems({
      gold: gold.toString(),
      clickPower: clickPower.toString()
    });
  } catch (e) {
    console.error('Ошибка сохранения прогресса', e);
  }
}

function updateCounter() {
  counterEl.textContent = `Галлеонов: ${gold}`;
}

wandImg.addEventListener("click", () => {
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
  } else if (type === 'wand') {
    alert("Недостаточно галлеонов.");
  }
}

loadProgress();
