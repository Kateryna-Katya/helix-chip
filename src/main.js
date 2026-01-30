/**
 * HELIX-CHIP.BLOG - Official Script 2026
 * Полный функционал: UI, Animations, Forms, Storage
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК ---
  if (window.lucide) {
      lucide.createIcons();
  }

  // --- 2. МОБИЛЬНОЕ МЕНЮ (BURGER) ---
  const burger = document.querySelector('.burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  const toggleMenu = () => {
      if (!burger || !mobileMenu) return;
      burger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      // Блокируем скролл при открытом меню
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  };

  if (burger) {
      burger.addEventListener('click', toggleMenu);
  }

  mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
          if (mobileMenu.classList.contains('active')) toggleMenu();
      });
  });


  // --- 3. HERO: ПОЯВЛЕНИЕ ТЕКСТА (STAGGER) ---
  const title = document.getElementById('hero-title');
  if (title) {
      const text = title.innerText;
      title.innerHTML = ''; // Очищаем для вставки спанов

      text.split(' ').forEach((word, i) => {
          const span = document.createElement('span');
          span.innerText = word + ' ';
          span.style.opacity = '0';
          span.style.transform = 'translateY(20px)';
          span.style.display = 'inline-block';
          span.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`;
          title.appendChild(span);
      });

      // Запуск анимации в следующем кадре
      requestAnimationFrame(() => {
          title.querySelectorAll('span').forEach(s => {
              s.style.opacity = '1';
              s.style.transform = 'translateY(0)';
          });
      });
  }


  // --- 4. ИНТЕРАКТИВНЫЙ ФОН (MOUSE PARALLAX) ---
  const bgCanvas = document.getElementById('canvas-bg');
  window.addEventListener('mousemove', (e) => {
      if (bgCanvas) {
          // Вычисляем смещение (амплитуда 30px)
          const moveX = (e.clientX / window.innerWidth - 0.5) * 40;
          const moveY = (e.clientY / window.innerHeight - 0.5) * 40;
          bgCanvas.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
  });


  // --- 5. REVEAL ANIMATION (INTERSECTION OBSERVER) ---
  // Для карточек в секциях About и Blog
  const revealOptions = { threshold: 0.1 };
  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              revealObserver.unobserve(entry.target);
          }
      });
  }, revealOptions);

  const revealElements = document.querySelectorAll('.about__card, .blog__item, .benefits__row');
  revealElements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
      revealObserver.observe(el);
  });


  // --- 6. МАГНИТНЫЙ ЭФФЕКТ ДЛЯ ЗАГОЛОВКОВ БЛОГА ---
  const blogItems = document.querySelectorAll('.blog__item');
  blogItems.forEach(item => {
      item.addEventListener('mousemove', (e) => {
          const title = item.querySelector('.blog__item-title');
          const rect = item.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
          title.style.transform = `translate(${x}px, ${y}px)`;
      });

      item.addEventListener('mouseleave', () => {
          const title = item.querySelector('.blog__item-title');
          title.style.transform = `translate(0, 0)`;
      });
  });


  // --- 7. ФОРМА КОНТАКТОВ: ВАЛИДАЦИЯ И AJAX ---
  const contactForm = document.getElementById('ai-form');
  const phoneInput = document.getElementById('phone-input');
  const captchaText = document.getElementById('captcha-question');
  const formMsg = document.getElementById('form-message');

  // Генерация капчи
  let num1 = Math.floor(Math.random() * 8) + 1;
  let num2 = Math.floor(Math.random() * 9) + 1;
  let total = num1 + num2;
  if (captchaText) captchaText.innerText = `${num1} + ${num2} = ?`;

  // Запрет ввода всего, кроме цифр в телефон
  if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/[^\d+]/g, '');
      });
  }

  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();

          const userAns = parseInt(document.getElementById('captcha-answer').value);
          if (userAns !== total) {
              alert("Ошибка: Неправильный ответ капчи.");
              return;
          }

          const btn = contactForm.querySelector('.form__submit');
          btn.innerText = 'Отправка данных...';
          btn.disabled = true;

          // Имитация AJAX
          setTimeout(() => {
              contactForm.style.opacity = '0';
              setTimeout(() => {
                  contactForm.innerHTML = `
                      <div class="form__message success">
                          <h3>Заявка успешно отправлена!</h3>
                          <p>Мы свяжемся с вами в ближайшее время.</p>
                      </div>
                  `;
                  contactForm.style.opacity = '1';
              }, 300);
          }, 1800);
      });
  }


  // --- 8. COOKIE POPUP ---
  const cookiePopup = document.getElementById('cookie-popup');
  const cookieBtn = document.getElementById('cookie-accept');

  if (cookiePopup && !localStorage.getItem('cookies_accepted')) {
      // Показываем через 3 секунды
      setTimeout(() => {
          cookiePopup.classList.add('active');
      }, 3000);
  }

  if (cookieBtn) {
      cookieBtn.addEventListener('click', () => {
          localStorage.setItem('cookies_accepted', 'true');
          cookiePopup.classList.remove('active');
      });
  }

  // --- 9. ПЛАВНЫЙ СКРОЛЛ ДЛЯ ССЫЛОК ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth'
              });
          }
      });
  });

});