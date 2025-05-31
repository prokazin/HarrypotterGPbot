document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Пример: простое определение палочки
  const answers = [...new FormData(this).values()];
  const score = answers.filter(a => a === 'fire' || a === 'defense' || a === 'brave' || a === 'gryff' || a === 'power').length;

  let wand = 'standard';
  if (score >= 4) wand = 'fire';
  else if (score === 3) wand = 'air';
  else if (score === 2) wand = 'earth';
  else wand = 'dark';

  localStorage.setItem('selectedWand', wand);
  window.location.href = 'index.html';
});
