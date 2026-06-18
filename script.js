// Links to Leads — lead capture + modal

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const modal = document.getElementById("lead-modal");
  const heroFormAnchor = document.getElementById("book");
  const desktopQuery = window.matchMedia("(min-width: 901px)");

  // Header shadow on scroll
  window.addEventListener(
    "scroll",
    () => {
      header.style.boxShadow =
        window.scrollY > 20 ? "0 4px 24px rgba(0,0,0,0.25)" : "none";
    },
    { passive: true }
  );

  // Modal controls
  const openModal = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.querySelector("input")?.focus();
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  document.querySelectorAll("[data-open-lead-modal]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (desktopQuery.matches && heroFormAnchor) {
        heroFormAnchor.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          document.querySelector("#hero-form input")?.focus();
        }, 400);
        return;
      }
      openModal();
    });
  });

  document.querySelectorAll("[data-close-lead-modal]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  // All lead forms
  const handleSubmit = (form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = "You're booked! Check your email.";
      btn.style.background = "var(--green-600)";
      btn.style.color = "white";
      btn.disabled = true;

      if (modal.classList.contains("is-open")) {
        setTimeout(closeModal, 2500);
      }

      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = "";
        btn.style.color = "";
        btn.disabled = false;
        form.reset();
      }, 4000);
    });
  };

  document.querySelectorAll(".lead-form").forEach(handleSubmit);

  // Scroll reveal
  const revealEls = document.querySelectorAll(
    ".step, .testimonial, .problem-card, .compare-col, .faq-item"
  );

  revealEls.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
});
