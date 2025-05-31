Telegram.WebApp.ready();
Telegram.WebApp.expand();

let gold = 0;
let clickPower = 1;

const counterEl = document.getElementById("counter");
const wandEl = document.getElementById("wand");

async function loadProgress() {
  try {
    const keys = ['gold', 'clickPower'];
    const result = await Telegram.WebApp.CloudStorage.getItems(keys);

    gold = parseInt(result.gold || '0', 10);
    clickPower = parseInt(result.clickPower || '1', 10);
    updateCounter();
  } catch (e) {
    console.error('Ошибка загрузки:', e);
  }
}

async function saveProgress() {
  try {
    await Telegram.WebApp.CloudStorage.setItems({
      gold: gold.toString(),
      clickPower: clickPower.toString()
    });
  } catch (e) {
    console.error('Ошибка сохранения:', e);
  }
}

function updateCounter() {
  counterEl.textContent = `Галлеонов: ${gold}`;
}

wandEl.addEventListener("click", () => {
  gold += clickPower;
  updateCounter();
  saveProgress();
});

function buyUpgrade() {
  if (gold >= 50) {
    gold -= 50;
    clickPower += 1;
    updateCounter();
    saveProgress();
    alert("Усиление куплено! +1 к галлеонам за клик.");
  } else {
    alert("Недостаточно галлеонов.");
  }
}

loadProgress();
