document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Close menu on navigation click
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // 2. Dynamic Year Updater in Footer
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 3. Formspree AJAX Submission Handling
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("form-status");
  const submitBtn = document.getElementById("submitBtn");

  if (contactForm && formStatus && submitBtn) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const actionUrl = contactForm.getAttribute("action");

      // Verification check for developer placeholder
      if (actionUrl.includes("YOUR_FORMSPREE_ID")) {
        formStatus.className = "error";
        formStatus.textContent =
          "Please replace YOUR_FORMSPREE_ID with your Formspree ID in index.html.";
        return;
      }

      const formData = new FormData(contactForm);
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      try {
        const response = await fetch(actionUrl, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          formStatus.className = "success";
          formStatus.textContent =
            "Thank you! Your message has been sent successfully.";
          contactForm.reset();
        } else {
          const data = await response.json();
          formStatus.className = "error";
          if (data && data.errors) {
            formStatus.textContent = data.errors
              .map((err) => err.message)
              .join(", ");
          } else {
            formStatus.textContent =
              "Oops! There was a problem submitting your form.";
          }
        }
      } catch (error) {
        formStatus.className = "error";
        formStatus.textContent =
          "Network error. Please check your connection and try again.";
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML =
          '<i class="fa-solid fa-paper-plane"></i> Send Message';
      }
    });
  }
});
