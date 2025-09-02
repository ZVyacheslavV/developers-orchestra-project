import { addNewFeedback } from './artists-api.js';
import { toastSuccessFeedbacks, toastErrorFeedbacks} from './helpers.js';
import axios from 'axios';

document.addEventListener("DOMContentLoaded", () => {
  const backdrop = document.querySelector(".feedback-backdrop");
  const form = document.querySelector(".feedback-modal-form");
  const nameInput = document.getElementById("user-name");
  const messageInput = document.getElementById("user-feedback");
  const ratingInput = document.getElementById("ratingValue");
  const submitBtn = form.querySelector(".feedback-modal-btn");
  const stars = document.querySelectorAll(".modal-star");
  const ratingError = document.getElementById("ratingError");

  function showRatingError(message) {
    ratingError.textContent = message;
  }

  function clearRatingError() {
    ratingError.textContent = "";
  }

  function fillStars(value) {
    stars.forEach((s, i) => {
      if (i + 1 <= value) {
        s.style.background = "linear-gradient(to right, #764191 100%, #ffffff 0%)";
      } else if (i < value) {
        const fraction = value - i;
        s.style.background = `linear-gradient(to right, #764191 ${fraction * 100}%, #ffffff ${fraction * 100}%)`;
      } else {
        s.style.background = "linear-gradient(to right, #764191 0%, #ffffff 100%)";
      }
    });
  }

  function updateStars() {
    const rating = parseFloat(ratingInput.value) || 0;
    fillStars(rating);
  }

  stars.forEach((star, idx) => {
    star.addEventListener("mousemove", (e) => {
      const rect = star.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = x / rect.width;
      const quarter = Math.ceil(percent * 4) / 4;
      fillStars(idx + quarter);
    });

    star.addEventListener("click", (e) => {
      const rect = star.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = x / rect.width;
      const quarter = Math.ceil(percent * 4) / 4;
      ratingInput.value = idx + quarter;
      updateStars();
      clearRatingError();
    });

    star.addEventListener("mouseleave", updateStars);
  });

  const openBtn = document.querySelector(".leave-feedback-button");
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      form.reset();
      ratingInput.value = "0";
      updateStars();
      clearRatingError();
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

    if (rating < 0.25 || rating > 5) {
      showRatingError("Please provide a rating between 0.25 and 5");
      hasError = true;
    }

    if (hasError) return;

    submitBtn.disabled = true;

    try {
      await addNewFeedback(name, rating, message);
      toastSuccessFeedbacks("Thank you! Your feedback has been submitted.");
      form.reset();
      ratingInput.value = "0";
      updateStars();
      closeModal();
    } catch (err) {
      toastErrorFeedbacks("Server error: " + (err.response?.data?.message || err.message));
    } finally {
      submitBtn.disabled = false;
    }
  });

  updateStars();
});
