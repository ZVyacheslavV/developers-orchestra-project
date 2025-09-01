import { addNewFeedback } from './artists-api.js';
import { toastSuccessFeedbacks } from './helpers.js';
import "css-star-rating/css/star-rating.css";

document.addEventListener("DOMContentLoaded", () => {
  const backdrop = document.querySelector(".feedback-backdrop");
  const form = document.querySelector(".feedback-modal-form");
  const nameInput = document.getElementById("user-name");
  const messageInput = document.getElementById("user-feedback");
  const ratingInput = document.getElementById("ratingValue");
  const submitBtn = form.querySelector(".feedback-modal-btn");
  const stars = document.querySelectorAll("#myRating svg");
  const ratingError = document.getElementById("ratingError");

  function showRatingError(message) {
    ratingError.textContent = message;
  }

  function clearRatingError() {
    ratingError.textContent = "";
  }

 
  stars.forEach((star, idx) => {
    star.innerHTML = `<path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 
      1.402 8.173L12 18.897l-7.336 3.86 
      1.402-8.173L.132 9.21l8.2-1.192z"/>`;
    star.style.fill = "#ffffff";
    star.style.cursor = "pointer";

    star.addEventListener("click", () => {
      ratingInput.value = idx + 1;
      stars.forEach((s, i) => s.style.fill = i <= idx ? "#764191" : "#ffffff");
      clearRatingError(); 
    });
  });


  const openBtn = document.querySelector(".leave-feedback-button");
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      form.reset();
      ratingInput.value = "0";
      clearRatingError();
      stars.forEach(s => s.style.fill = "#ffffff");
      clearError(nameInput);
      clearError(messageInput);
      backdrop.classList.add("is-open");
      document.body.style.overflow = "hidden"; 
    });
  }

  const closeModal = () => {
    backdrop.classList.remove("is-open");
    document.body.style.overflow = "";
  };
  document.querySelector(".feedback-modal-close").addEventListener("click", closeModal);
  backdrop.addEventListener("click", e => { if (e.target === backdrop) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  
  const showError = (input, message) => {
    let errorEl = input.nextElementSibling;
    if (!errorEl || !errorEl.classList.contains("field-error")) {
      errorEl = document.createElement("div");
      errorEl.classList.add("field-error");
      input.insertAdjacentElement("afterend", errorEl);
    }
    errorEl.textContent = message;
    input.classList.add("input-error");
    input.setAttribute("aria-invalid", "true");
  };

  const clearError = input => {
    let errorEl = input.nextElementSibling;
    if (errorEl && errorEl.classList.contains("field-error")) errorEl.textContent = "";
    input.classList.remove("input-error");
    input.removeAttribute("aria-invalid");
  };

 
  form.addEventListener("submit", async e => {
    e.preventDefault();

    clearError(nameInput);
    clearError(messageInput);
    clearRatingError();

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    const rating = parseFloat(ratingInput.value);

    let hasError = false;

    if (name.length < 2 || name.length > 16) {
      showError(nameInput, "Name must be between 2 and 16 characters");
      hasError = true;
    }

    if (message.length < 10 || message.length > 512) {
      showError(messageInput, "Message must be between 10 and 512 characters");
      hasError = true;
    }

    if (rating < 1 || rating > 5) {
      showRatingError("Please provide a rating between 1 and 5");
      hasError = true;
    }

    if (hasError) return;

    submitBtn.disabled = true;

    try {
      await addNewFeedback(name, rating, message);
      toastSuccess("Thank you! Your feedback has been submitted.");

      form.reset();
      ratingInput.value = "0";
      stars.forEach(s => s.style.fill = "#ffffff");
      closeModal();
    } catch (err) {
      alert("Server error: " + (err.response?.data?.message || err.message));
    } finally {
      submitBtn.disabled = false;
    }
  });
});
