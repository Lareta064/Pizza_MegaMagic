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

    /* profile-menu*/
    const profileMenuOpen = document.querySelector('#open-profile-menu');
    const profileMenu = document.querySelector('#profile-menu');
    if(profileMenuOpen){
      const profileMenuClose = profileMenu.querySelector('#close-profile-menu');
      profileMenuOpen.addEventListener('click',()=>{
        profileMenu.classList.add('active');
      });
      profileMenuClose.addEventListener('click',()=>{
        profileMenu.classList.remove('active');
      });
    }
    /*CUSTOM SELECT */
    document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
      const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
      const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
      const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
      const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');
      const dropDownSelected = dropDownList.querySelector('.selected');

      // Клик по кнопке. Открыть/Закрыть select
      dropDownBtn.addEventListener('click', function (e) {
        dropDownList.classList.toggle('dropdown__list--visible');
        this.classList.toggle('dropdown__button--active');
      });
        

      // Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
      dropDownListItems.forEach(function (listItem) {
        listItem.addEventListener('click', function (e) {
        e.stopPropagation();
        dropDownListItems.forEach(function (item){item.classList.remove('selected')});
        
        dropDownBtn.innerText = this.dataset.value;
        dropDownBtn.focus();
        if(dropDownInput){dropDownInput.value = this.dataset.value;}
        this.classList.add('selected')
        dropDownList.classList.remove('dropdown__list--visible');
        dropDownBtn.classList.remove('dropdown__button--active');
        
        });
      });

      // Клик снаружи дропдауна. Закрыть дропдаун
      document.addEventListener('click', function (e) {
        if (e.target !== dropDownBtn) {
        dropDownBtn.classList.remove('dropdown__button--active');
        dropDownList.classList.remove('dropdown__list--visible');
        }
      });

      // Нажатие на Tab или Escape. Закрыть дропдаун
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
        dropDownBtn.classList.remove('dropdown__button--active');
        dropDownList.classList.remove('dropdown__list--visible');
        }
      });
    });
});
