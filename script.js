// Links to Leads — motion & scroll effects

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav");
  const heroForm = document.getElementById("book");
  const orbs = document.querySelectorAll("[data-parallax]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Nav scroll
  const onScroll = () => {
    nav?.classList.toggle("scrolled", window.scrollY > 20);

    if (!reducedMotion && orbs.length) {
      const y = window.scrollY;
      orbs.forEach((orb) => {
        const speed = parseFloat(orb.dataset.parallax) || 0.1;
        orb.style.transform = `translateY(${y * speed}px)`;
      });
    }
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
      btn.style.background = "var(--green-600)";
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

  // Scroll reveal + stagger
  const revealEls = document.querySelectorAll(".reveal, .stagger-group");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);

        entry.target.querySelectorAll(".stat-value").forEach((stat) => {
          stat.classList.add("pop");
        });
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));

  // Hero pills stagger on load
  if (!reducedMotion) {
    document.querySelectorAll(".hero-pills li").forEach((li, i) => {
      li.style.opacity = "0";
      li.style.transform = "translateX(-12px)";
      li.style.transition = `opacity 0.5s ease ${0.5 + i * 0.1}s, transform 0.5s var(--ease-spring) ${0.5 + i * 0.1}s`;
      requestAnimationFrame(() => {
        li.style.opacity = "1";
        li.style.transform = "translateX(0)";
      });
    });
  }

  // Magnetic button hover (subtle)
  if (!reducedMotion) {
    document.querySelectorAll(".btn-primary").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px) scale(1.02)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }
});
