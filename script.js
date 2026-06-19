// Links to Leads — Framer-style interactions

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav");
  const heroForm = document.getElementById("book");

  // Nav scroll state
  const onScroll = () => {
    nav?.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Scroll to form
  document.querySelectorAll('a[href="#book"], .nav .btn').forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      heroForm?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        document.querySelector("#hero-form input")?.focus();
      }, 500);
    });
  });

  // Form submit
  document.querySelectorAll(".lead-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = "You're booked! Check your email.";
      btn.style.background = "var(--green)";
      btn.style.color = "#fff";
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = "";
        btn.style.color = "";
        btn.disabled = false;
        form.reset();
      }, 4000);
    });
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));

  // Bento card stagger on hover group (subtle)
  document.querySelectorAll(".bento-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transitionDelay = "0ms";
    });
  });
});
