
// @ts-nocheck

let pageScrollY = 0;
let pageScrollLocked = false;

function lockPageScroll() {
  if (pageScrollLocked) return;

  pageScrollY = window.scrollY;
  pageScrollLocked = true;

  document.body.style.position = "fixed";
  document.body.style.top = `-${pageScrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
}

function unlockPageScroll() {
  if (!pageScrollLocked) return;

  pageScrollLocked = false;

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";

  window.scrollTo({
    top: pageScrollY,
    left: 0,
    behavior: "instant"
  });
}

const nav       = document.getElementById("main-navigation");
const toggleBtn = document.querySelector(".menu-toggle");

const menu = document.querySelector(".floating-menu");

if (nav && toggleBtn && menu) {

  function openMobileMenu() {
    nav.classList.add("open");
    menu.classList.remove("hide");            // garante que o menu aparece
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.innerHTML = `<i class="fas fa-times"></i>`;
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

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      closeMobileMenu();
      toggleBtn.focus();
    }
  });

  document.addEventListener("pointerdown", (e) => {
    if (!nav.classList.contains("open")) return;

    if (
      !nav.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1023 && nav.classList.contains("open")) {
      closeMobileMenu();
    }
  });
}




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



const teamModal = document.querySelector<HTMLElement>("#teamModal");

if (teamModal) {
  document.body.appendChild(teamModal);

  const teamModalImage =
    teamModal.querySelector<HTMLImageElement>("#teamModalImage");

  const teamModalName =
    teamModal.querySelector<HTMLElement>("#teamModalName");

  const teamModalRole =
    teamModal.querySelector<HTMLElement>("#teamModalRole");

  const teamModalDescription =
    teamModal.querySelector<HTMLElement>("#teamModalDescription");

  const closeButton =
    teamModal.querySelector<HTMLButtonElement>(".team-modal-close");

  const backdrop =
    teamModal.querySelector<HTMLElement>(".team-modal-backdrop");

  const teamButtons =
    document.querySelectorAll<HTMLButtonElement>(".team-photo-button");

  if (
    teamModalImage &&
    teamModalName &&
    teamModalRole &&
    teamModalDescription &&
    closeButton &&
    backdrop
  ) {
    let previousFocus: HTMLElement | null = null;
    let scrollPosition = 0;

    function openTeamModal(button: HTMLButtonElement) {
      const image = button.querySelector<HTMLImageElement>("img");

      if (!image) return;

      previousFocus = button;

      teamModalImage.src = image.src;
      teamModalImage.alt = image.alt;

      teamModalName.textContent = button.dataset.name || "";
      teamModalRole.textContent = button.dataset.role || "";

      const description = button.dataset.description || "";

      teamModalDescription.textContent = description;

      teamModal.classList.toggle(
        "is-long-description",
        description.length > 400
      );

      teamModal.classList.add("is-open");
      teamModal.setAttribute("aria-hidden", "false");

      lockPageScroll();

      closeButton.focus({ preventScroll: true });
    }

    function closeTeamModal() {
      teamModal.classList.remove("is-open");
      teamModal.classList.remove("is-long-description");
      teamModal.setAttribute("aria-hidden", "true");

      unlockPageScroll();

      previousFocus?.focus({ preventScroll: true });
    }

    teamButtons.forEach((button) => {
      button.addEventListener("click", () => {
        openTeamModal(button);
      });
    });

    closeButton.addEventListener("click", closeTeamModal);

    backdrop.addEventListener("click", closeTeamModal);

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        teamModal.classList.contains("is-open")
      ) {
        closeTeamModal();
      }
    });
  }
}
