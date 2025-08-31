const stars = document.querySelectorAll('#myRating svg');
const hiddenInput = document.getElementById('ratingValue');

stars.forEach((star, idx) => {
  star.innerHTML = `<path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 
  1.402 8.173L12 18.897l-7.336 3.86 
  1.402-8.173L.132 9.21l8.2-1.192z"/>`;
  star.style.fill = '#ffff';
  star.style.cursor = 'pointer';
  star.addEventListener('click', () => {
    hiddenInput.value = idx + 1;
    stars.forEach((s, i) => s.style.fill = i <= idx ? '#764191' : '#ffff');
  });
});

const closeBtn = document.querySelector('.feedback-modal-close');
const backdrop = document.querySelector('.feedback-backdrop');

closeBtn.addEventListener('click', ()=> {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
});

backdrop.addEventListener('click', (e) => {
    if(e.target === backdrop) {
        backdrop.classList.remove('is-open');
        document.body.style.overflow = '';
    }
});

const openBtn = document.querySelector('.leave-feedback-button');
openBtn.addEventListener('click', ()=> {
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
});





