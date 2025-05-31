const selectedWand = localStorage.getItem('selectedWand') || 'standard';
let gold = 0;
let clickPower = 1;

// Telegram WebApp init
Telegram.WebApp.ready();
Telegram.WebApp.expand();

const counterEl = document.getElementById("counter");
// Устанавливаем палочку по выбору
wandEl.style.backgroundImage = `url('images/wand-${selectedWand}.png')`;
wandEl.style.backgroundSize = 'contain';
wandEl.style.backgroundRepeat = 'no-repeat';
wandEl.style.backgroundPosition = 'center';
const wandImg = document.getElementById("wand");

async function loadProgress() {
  try {
    const keys = ['gold', 'clickPower'];
    const result = await Telegram.WebApp.CloudStorage.getItems(keys);

    gold = parseInt(result.gold || '0', 10);
    clickPower = parseInt(result.clickPower || '1', 10);
    updateCounter();
  } catch (e) {
    console.error('Ошибка при загрузке из CloudStorage', e);
  }
}

async function saveProgress() {
  try {
    await Telegram.WebApp.CloudStorage.setItems({
      gold: gold.toString(),
      clickPower: clickPower.toString()
    });
  } catch (e) {
    console.error('Ошибка при сохранении в CloudStorage', e);
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
    alert("Недостаточно галлеонов для покупки.");
  }
}

// Загрузка при старте
loadProgress();
