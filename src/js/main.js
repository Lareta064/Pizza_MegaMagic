document.addEventListener("DOMContentLoaded", function () {
    let bodyEl = document.body;
    /*COUNTER */
    const counters = document.querySelectorAll('.counter');
    // Перебираем каждый блок счетчика
    counters.forEach((counter) => {
      const minusButton = counter.querySelector('.counter-minus'); // Кнопка уменьшения
      const plusButton = counter.querySelector('.counter-plus'); // Кнопка увеличения
      const counterValue = counter.querySelector('.counter-value'); // Текущее значение (span)

      // Инициализируем значение (из текста span)
      let currentValue = parseInt(counterValue.textContent, 10) || 0;

      // Обновляем состояние кнопки уменьшения
      const updateMinusButtonState = () => {
        if (currentValue <= 0) {
          minusButton.setAttribute('disabled', 'disabled');
        } else {
          minusButton.removeAttribute('disabled');
        }
      };

      // Устанавливаем начальное состояние кнопки
      updateMinusButtonState();

      // Обработчик клика на кнопку уменьшения
      minusButton.addEventListener('click', () => {
        if (currentValue > 0) {
          currentValue -= 1; // Уменьшаем значение
          counterValue.textContent = currentValue; // Обновляем текст в span
          updateMinusButtonState(); // Обновляем состояние кнопки
        }
      });

      // Обработчик клика на кнопку увеличения
      plusButton.addEventListener('click', () => {
        currentValue += 1; // Увеличиваем значение
        counterValue.textContent = currentValue; // Обновляем текст в span
        updateMinusButtonState(); // Обновляем состояние кнопки
      });
    });
});
