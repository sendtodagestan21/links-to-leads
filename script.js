// Links to Leads — minimal interactions

document.addEventListener("DOMContentLoaded", () => {
  // Header shadow on scroll
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    header.style.boxShadow = window.scrollY > 20
      ? "0 4px 24px rgba(0,0,0,0.25)"
      : "none";
  }, { passive: true });

  // Form submission (placeholder — wire to Calendly/CRM later)
  const form = document.getElementById("book-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = "You're booked! Check your email.";
      btn.style.background = "var(--green-600)";
      btn.style.color = "white";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = "";
        btn.style.color = "";
        btn.disabled = false;
        form.reset();
      }, 4000);
    });
  }

  // Smooth reveal on scroll
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
