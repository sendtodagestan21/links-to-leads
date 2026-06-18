// Links to Leads — lead capture

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const modal = document.getElementById("lead-modal");
  const heroForm = document.getElementById("book");

  window.addEventListener(
    "scroll",
    () => {
      header.style.boxShadow =
        window.scrollY > 20 ? "0 4px 24px rgba(0,0,0,0.25)" : "none";
    },
    { passive: true }
  );

  const scrollToForm = () => {
    if (!heroForm) return;
    heroForm.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      document.querySelector("#hero-form input")?.focus();
    }, 400);
  };

  document.querySelectorAll('a[href="#book"], .header-cta').forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToForm();
    });
  });

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  if (modal) {
    document.querySelectorAll("[data-close-lead-modal]").forEach((el) => {
      el.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  const handleSubmit = (form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = "You're booked! Check your email.";
      btn.style.background = "var(--green-600)";
      btn.style.color = "white";
      btn.disabled = true;

      if (modal?.classList.contains("is-open")) {
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
