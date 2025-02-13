document.addEventListener("DOMContentLoaded", function () {
    let bodyEl = document.body;
    /*PROMO SLIDER */
    let mainSlider = new Swiper('.main-slider', {
      slidesPerView: 1,
      speed: 800,
      spaceBetween:20,
      // autoplay: {
      //   delay: 3500,
      //   disableOnInteraction: false,
      // },
      pagination: {
        el: ".main-slider-pagination",
        clickable: true,
      },
    });
    
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
        bodyEl.classList.add('lock');
      });
      profileMenuClose.addEventListener('click',()=>{
        profileMenu.classList.remove('active');
        bodyEl.classList.remove('lock');
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

    // modal с атрибутом [data-modal]
    const modalOpen = document.querySelectorAll('[data-btn]');
    const modalFrames = document.querySelectorAll('[data-modal]');
    
    if( modalFrames.length > 0){
      const modalFramesClose = document.querySelectorAll('[data-close]');

    for(let item of modalOpen){
      item.addEventListener('click', function(e){
        for(let item of  modalFrames){
          item.classList.remove('visible');
          bodyEl.classList.remove('lock');
        }
        e.preventDefault();
        const itemAttr = item.getAttribute('data-btn');

        for(let frame of modalFrames){
          const frameAttr =frame.getAttribute('data-modal');	
          if(frameAttr == itemAttr){
           
          frame.classList.add('visible');
          bodyEl.classList.add('lock');
          }
        }
      });
    }
    
    /*=============== закрыть модалки по клику вне ===============*/
      // for(let frame of modalFrames){
      //   frame.addEventListener('click', function(e){
      //     if(e.target === e.currentTarget){
      //       this.classList.remove(`visible`);
      //       bodyEl.classList.remove('lock');
      //     }
      //   });
      // }

      if(modalFramesClose){
        modalFramesClose.forEach((closeItem)=>{
          closeItem.addEventListener('click', ()=>{
              bodyEl.classList.remove('lock');
              closeItem.closest('.visible').classList.remove('visible')
          });
        });
        
      }
    }
    /*PIZZA SIZE */
    const sizeToggleWrapper = document.querySelector('.switch-group--size');
    if(sizeToggleWrapper){
      const productItem =  document.querySelector('#scale-img');
      const sizeToggleSwith =  sizeToggleWrapper.querySelectorAll('[data-size]');
      sizeToggleSwith.forEach((item)=>{
        item.addEventListener('click', ()=>{
           const swithAttr = item.getAttribute('data-size');

           productItem.className = swithAttr;
        });
      });
    }
    const showAddProduct= document.querySelector('show-add-product');
    if(showAddProduct){
      
      const addProductFrame = document.querySelector('.modal-addProducts');
     
      showAddProduct.addEventListener('click', ()=>{
       
       
        addProductFrame.classList.add('visible');
        showAddProduct.classList.add('hide-item');
        });
      }
  
    /*SHOW HIDE CARDS */
    const showAllBtn = document.querySelector('.show-all-product');
   
    if(showAllBtn){
      
      const hideCards = document.querySelectorAll('.hide-card');
     
      showAllBtn.addEventListener('click', ()=>{
        
        hideCards.forEach((item)=>{
          item.classList.remove('hide-card');
          showAllBtn.remove();
        });
      });
    }
});
document.addEventListener("DOMContentLoaded", function () {
  const scrollWrapper = document.querySelector(".scroll-wrapper");
  const catWrapper = document.querySelector(".cat-wrapper");

  function smoothScrollTo(element, target, duration = 500) {
      if ("scrollBehavior" in document.documentElement.style) {
          element.scrollTo({ left: target, behavior: "smooth" });
      } else {
          const start = element.scrollLeft;
          const startTime = performance.now();

          function scrollStep(timestamp) {
              const elapsed = timestamp - startTime;
              const progress = Math.min(elapsed / duration, 1);
              element.scrollLeft = start + (target - start) * progress;

              if (progress < 1) {
                  requestAnimationFrame(scrollStep);
              }
          }

          requestAnimationFrame(scrollStep);
      }
  }

  document.querySelectorAll(".cat-card").forEach((card) => {
      card.addEventListener("click", function () {
          // 🔹 Удаляем `active` у всех карточек
          document.querySelectorAll(".cat-card").forEach(c => c.classList.remove("active"));
          // 🔹 Добавляем `active` к текущей
          this.classList.add("active");

          // 🔹 Логика центрирования карточки
          const scrollWrapperWidth = scrollWrapper.offsetWidth;
          const catWrapperWidth = catWrapper.scrollWidth;
          const cardRect = this.getBoundingClientRect();
          const wrapperRect = scrollWrapper.getBoundingClientRect();

          const cardCenter = cardRect.left + cardRect.width / 2;
          const wrapperCenter = wrapperRect.left + scrollWrapperWidth / 2;

          let scrollOffset = scrollWrapper.scrollLeft + (cardCenter - wrapperCenter);
          scrollOffset = Math.max(0, Math.min(scrollOffset, catWrapperWidth - scrollWrapperWidth));

          smoothScrollTo(scrollWrapper, scrollOffset, 500);
      });
  });
});
// активируем checked  у свитч по загрузке
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".switch-group input:checked").forEach((input) => {
    console.log('123');
      input.dispatchEvent(new Event("change"));
  });
});
