// @ts-nocheck


/* =========================
   MENU — MOBILE TOGGLE
========================= */

const nav       = document.getElementById("main-navigation");
const toggleBtn = document.querySelector(".menu-toggle");

const menu = document.querySelector(".floating-menu");

if (nav && toggleBtn && menu) {

  function openMobileMenu() {
    nav.classList.add("open");
    menu.classList.remove("hide");            // garante que o menu aparece
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.innerHTML = `<i class="fas fa-bars"></i>`;
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden";  // trava scroll da pagina
  }

  function closeMobileMenu() {
    nav.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.innerHTML = `<i class="fas fa-bars"></i>`;
    document.body.classList.remove("menu-open");
    document.body.style.overflow = "";
  }

  toggleBtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    nav.classList.contains("open") ? closeMobileMenu() : openMobileMenu();
  });

  // Fecha ao clicar em qualquer link
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Fecha com Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      closeMobileMenu();
      toggleBtn.focus();
    }
  });

  // Fecha ao clicar fora do menu
document.addEventListener("pointerdown", (e) => {

    if (!nav.classList.contains("open")) return;

    if (
        !nav.contains(e.target) &&
        !toggleBtn.contains(e.target)
    ) {
        closeMobileMenu();
    }

});

  // Fecha ao passar para desktop (ex: rotacao de tela)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1023 && nav.classList.contains("open")) {
      closeMobileMenu();
    }
  });
}


/* =========================
   METODO SLIDER
========================= */

const methodSlides  = document.querySelectorAll(".method-slide");
const prevMethodBtn = document.getElementById("prevMethod");
const nextMethodBtn = document.getElementById("nextMethod");

if (methodSlides.length && prevMethodBtn && nextMethodBtn) {

  let currentMethod = 0;

  function updateMethod() {
    methodSlides.forEach(s => s.classList.remove("active"));
    methodSlides[currentMethod].classList.add("active");

    prevMethodBtn.disabled = currentMethod === 0;
    nextMethodBtn.disabled = currentMethod === methodSlides.length - 1;

    prevMethodBtn.classList.toggle("disabled", currentMethod === 0);
    nextMethodBtn.classList.toggle("disabled", currentMethod === methodSlides.length - 1);
  }

  function moveMethod(dir) {
    currentMethod = Math.max(0, Math.min(methodSlides.length - 1, currentMethod + dir));
    updateMethod();
  }

  prevMethodBtn.addEventListener("click", () => moveMethod(-1));
  nextMethodBtn.addEventListener("click", () => moveMethod(1));

  // Swipe touch
  const methodSlider = document.querySelector(".method-slider");
  if (methodSlider) {
    let touchStartX = 0;
    methodSlider.addEventListener("touchstart", e => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    methodSlider.addEventListener("touchend", e => {
      const delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) < 40) return;
      moveMethod(delta < 0 ? 1 : -1);
    }, { passive: true });
  }

  // Teclado (só quando a seção está visível)
  document.addEventListener("keydown", (e) => {
    const section = document.querySelector("#metodo");
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    if (e.key === "ArrowLeft")  moveMethod(-1);
    if (e.key === "ArrowRight") moveMethod(1);
  });

  updateMethod();
}


/* =========================
   SERVIÇOS: PAINÉIS EDITORIAIS
========================= */

const serviceTabs = document.querySelectorAll<HTMLButtonElement>(".service-tab");
const serviceCards = document.querySelectorAll<HTMLElement>(".service-card[data-service-card]");
const servicesSection = document.querySelector<HTMLElement>(".services-section");

function activateService(index: string) {
  const selectedCard = Array.from(serviceCards).find((card) => card.dataset.serviceCard === index);
  servicesSection?.classList.toggle("is-service-expanded", selectedCard?.dataset.expandable === "true");

  serviceTabs.forEach((tab) => {
    const active = tab.dataset.service === index;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });

  serviceCards.forEach((card) => {
    card.classList.toggle("is-active", card.dataset.serviceCard === index);
  });
}

serviceTabs.forEach((tab) => {
  tab.addEventListener("click", () => activateService(tab.dataset.service ?? "0"));
});

serviceCards.forEach((card) => {
  card.addEventListener("click", () => activateService(card.dataset.serviceCard ?? "0"));
});


/* =========================
   HOVER -> TOQUE (MOBILE)
   Ativa estados de :hover (service-card, projects-gallery img)
   atraves de toque em telas sem mouse.
========================= */

(function enableTouchHover() {

  const touchHoverSelectors = [
    ".service-card",
    ".projects-gallery img"
  ];

  const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  if (!isTouchDevice) return;

  const activeClass = "is-touch-active";

  function clearActive(except) {
    document.querySelectorAll("." + activeClass).forEach(el => {
      if (el !== except) el.classList.remove(activeClass);
    });
  }

  touchHoverSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener("touchstart", () => {
        const alreadyActive = el.classList.contains(activeClass);
        clearActive(el);
        el.classList.toggle(activeClass, !alreadyActive);
      }, { passive: true });
    });
  });

  document.addEventListener("touchstart", (e) => {
    const insideTarget = touchHoverSelectors.some(sel => e.target.closest(sel));
    if (!insideTarget) clearActive();
  }, { passive: true });

})();
