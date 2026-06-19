document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const optinForm = document.getElementById("optin-form");
  const stickyCta = document.getElementById("sticky-cta");
  const variant = document.body.dataset.variant || "a";

  window.addEventListener(
    "scroll",
    () => {
      if (header) {
        header.style.opacity = window.scrollY > 40 ? "0.98" : "1";
      }

      if (stickyCta && optinForm) {
        const formRect = optinForm.getBoundingClientRect();
        const formVisible = formRect.top < window.innerHeight && formRect.bottom > 0;
        stickyCta.hidden = formVisible || window.scrollY < 200;
      }
    },
    { passive: true }
  );

  const scrollToForm = () => {
    optinForm?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      optinForm?.querySelector('input:not([type="hidden"])')?.focus();
    }, 450);
  };

  document
    .querySelectorAll('[data-scroll-form], .header-cta, .hero-cta, .sticky-cta-btn, .compare-cta a')
    .forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToForm();
      });
    });

  if (optinForm) {
    optinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = optinForm.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = "Done! Check your email.";
      btn.style.background = "linear-gradient(135deg, #16a34a, #22c55e)";
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = "";
        btn.disabled = false;
        optinForm.reset();
      }, 4500);
    });
  }

  const revealEls = document.querySelectorAll(".reveal");
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

  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1200;
    let start = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(animate);
    };

    const countObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(animate);
          countObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    countObserver.observe(el);
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", { variant });
  }
});
