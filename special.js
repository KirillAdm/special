document.addEventListener('DOMContentLoaded', function () {
  let button = document.getElementById('but');
  if (button) {
    // Check if button exists before assigning onclick
    button.onclick = function () {
      alert('123');
    };
  }
});
// Проверяет, виден ли элемент полностью в viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Проверяет, виден ли элемент частично с учетом порога
function isElementPartiallyInViewport(el, threshold = 0.1) {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  // Вычисляем, какая часть элемента видна по вертикали
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
  
  // Элемент считается видимым, если видно хотя бы threshold (10%) его площади
  const elementHeight = rect.height;
  const elementWidth = rect.width;
  
  const verticalVisible = (visibleHeight / elementHeight) >= threshold;
  const horizontalVisible = (visibleWidth / elementWidth) >= threshold;
  
  return verticalVisible && horizontalVisible;
}

function animateScrollingElements() {
  const elements = document.querySelectorAll('.block3');
  
  elements.forEach((element) => {
    const isInViewport = isElementPartiallyInViewport(element, 0.1);
    
    if (isInViewport) {
      element.classList.add('animated');
    } else {
      // Убираем класс, когда элемент скрывается
      element.classList.remove('animated');
    }
  });
}

// Функция для ограничения частоты вызовов (оптимизация)
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Инициализация
document.addEventListener('DOMContentLoaded', animateScrollingElements);
window.addEventListener('scroll', throttle(animateScrollingElements, 100));
window.addEventListener('resize', throttle(animateScrollingElements, 100));

function animateScrollingElements() {
  const elements = document.querySelectorAll('.block3');
  let animatedCount = 0;
  
  elements.forEach((element, index) => {
    const isInViewport = isElementPartiallyInViewport(element, 0.1);
    
    if (isInViewport) {
      element.classList.add('animated');
      animatedCount++;
    } else {
      element.classList.remove('animated');
    }
  });
}

