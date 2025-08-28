/* Artists additional */
document.querySelectorAll('.dropdown').forEach(dropdown => {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  const menu = dropdown.querySelector('.dropdown-menu');

  toggle.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });

  menu.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
      toggle.textContent = item.textContent;
      toggle.dataset.value = item.dataset.value;
      menu.style.display = 'none';
    });
  });

  // закриваємо, якщо клік поза дропдауном
  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) {
      menu.style.display = 'none';
    }
  });
});
