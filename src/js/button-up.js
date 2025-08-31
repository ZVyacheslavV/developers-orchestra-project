const scrollBtn = document.querySelector('.scroll-to-top');

let lastScroll = window.scrollY;
let isVisible = false;
let scrollTimeout;

window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    const currentScroll = window.scrollY;
    const scrollingUp = currentScroll < lastScroll - 30;
    const scrolledToBottom =
      window.innerHeight + currentScroll >= document.body.offsetHeight - 10;

    const shouldShow = scrolledToBottom || (scrollingUp && currentScroll > 350);

    if (shouldShow && !isVisible) {
      scrollBtn.classList.add('visible');
      isVisible = true;
    } else if (!shouldShow && isVisible) {
      scrollBtn.classList.remove('visible');
      isVisible = false;
    }

    lastScroll = currentScroll;
  }, 70);
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
