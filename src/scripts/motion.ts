const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  const revealTargets = document.querySelectorAll<HTMLElement>(
    "main > section, .service-card, .project-card, .film-block, .stat-item",
  );

  revealTargets.forEach((element, index) => {
    element.classList.add("motion-reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6%" },
  );

  revealTargets.forEach((element) => observer.observe(element));

  const hero = document.querySelector<HTMLElement>(".hero-overlay");
  const heroVideo = document.querySelector<HTMLElement>(".intro-video video");
  let ticking = false;

  const updateHero = () => {
    const offset = Math.min(window.scrollY, window.innerHeight);
    hero?.style.setProperty("transform", `translate3d(0, ${offset * 0.08}px, 0)`);
    heroVideo?.style.setProperty("transform", `scale(1.04) translate3d(0, ${offset * 0.025}px, 0)`);
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateHero);
  }, { passive: true });

  document.querySelectorAll<HTMLElement>(".budget-btn, .btn-secondary, .projects-link").forEach((button) => {
    button.classList.add("motion-magnetic");
    button.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") return;
      const bounds = button.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
      const y = (event.clientY - bounds.top - bounds.height / 2) * 0.18;
      button.style.setProperty("--magnetic-x", `${x}px`);
      button.style.setProperty("--magnetic-y", `${y}px`);
    });
    button.addEventListener("pointerleave", () => {
      button.style.removeProperty("--magnetic-x");
      button.style.removeProperty("--magnetic-y");
    });
  });
}
