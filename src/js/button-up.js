const scrollBtn = document.querySelector('.scroll-to-top');

let lastScroll = window.scrollY;
let isVisible = false;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  const scrollingUp = currentScroll < lastScroll;
  const scrolledToBottom =
    window.innerHeight + currentScroll >= document.body.offsetHeight;

  const shouldShow = scrolledToBottom || (scrollingUp && currentScroll > 300);

  if (shouldShow && !isVisible) {
    scrollBtn.classList.add('visible');
    isVisible = true;
  } else if (!shouldShow && isVisible) {
    scrollBtn.classList.remove('visible');
    isVisible = false;
  }

  lastScroll = currentScroll;
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
