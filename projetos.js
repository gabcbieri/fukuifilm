/* =========================
   GALERIA DE PROJETOS
========================= */

const projectGalleryItems = [
    {
        title: "Retratos Corporativos | Growth",
        image: "img/growthlogo.webp",
    },
    {
        title: "Lançamento de Produto | Ozoncare",
        image: "img/ozoncare4.webp",
    },
    {
        title: "Fotografia de Cardápio | Seu Conde",
        image: "img/foto4.webp",
    },
    {
        title: "Delas Summit | Sebrae",
        image: "img/delassummitpreenchimento.webp",
    },
    {
        title: "Produção de Conteúdo | Casa Inti Café",
        image: "img/foto1tortinha.webp",
    },
    {
        title: "Léo Stronda | Fábrica de Monstros",
        image: "img/fabricademontros.webp",
    },
    {
        title: "Editorial de Moda | Laura Brocco",
        image: "img/colagemmariana3.webp",
    },
    {
        title: "Campanha Institucional | Bar do Dragão",
        image: "img/bardodragaodecima.webp",
    },
    {
        title: "Videoclipe | FATO Duorum",
        image: "img/fatoduarumcapa.webp",
    },
    {
        title: "Med Plus Nova Geração | Philozon",
        image: "img/medplusphilozon.webp",
    },
    {
        title: "La Cocina Mescla | Encontro de grandes nomes da gastronomia",
        image: "img/coccina.webp",
    },
    {
        title: "Camvel Porto Belo | Vídeo Promocional",
        image: "img/camvel.webp",
    },
];

const projectShowcase = document.querySelector(".project-showcase");
const projectTitle = document.getElementById("project-showcase-title");
const projectCounter = document.getElementById("project-counter");
const projectPrevButton = document.querySelector(".project-nav-prev");
const projectNextButton = document.querySelector(".project-nav-next");
const projectImages = [
    document.getElementById("project-image-wide"),
    document.getElementById("project-image-tall"),
    document.getElementById("project-image-square"),
];

let currentProjectIndex = 0;
let currentProjectId = 1;
let projectChangeTimer = null;
let projectSwipeStartX = 0;

function renderProject(index) {
    if (!projectShowcase || !projectTitle || !projectCounter) return;

    const total = projectGalleryItems.length;
    currentProjectIndex = (index + total) % total;

    const project = projectGalleryItems[currentProjectIndex];
    currentProjectId = currentProjectIndex + 1;

    window.clearTimeout(projectChangeTimer);
    projectShowcase.classList.add("is-changing");

    projectTitle.textContent = project.title;
    projectCounter.textContent = `${currentProjectIndex + 1} / ${total}`;

    projectImages.forEach((image) => {
        if (!image) return;
        image.src = project.image;
        image.alt = project.title;
    });

    projectChangeTimer = window.setTimeout(() => {
        projectShowcase.classList.remove("is-changing");
    }, 160);
}

if (projectShowcase && projectPrevButton && projectNextButton) {
    projectPrevButton.addEventListener("click", () => {
        renderProject(currentProjectIndex - 1);
    });

    projectNextButton.addEventListener("click", () => {
        renderProject(currentProjectIndex + 1);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            renderProject(currentProjectIndex - 1);
        }

        if (event.key === "ArrowRight") {
            renderProject(currentProjectIndex + 1);
        }
    });

    projectShowcase.addEventListener("touchstart", (event) => {
        projectSwipeStartX = event.touches[0].clientX;
    }, { passive: true });

    projectShowcase.addEventListener("touchend", (event) => {
        const swipeDistance = event.changedTouches[0].clientX - projectSwipeStartX;

        if (Math.abs(swipeDistance) < 45) return;

        if (swipeDistance > 0) {
            renderProject(currentProjectIndex + 1);
        } else {
            renderProject(currentProjectIndex - 1);
        }
    }, { passive: true });

    renderProject(0);
}

/* =========================
   MODAL FILMES
========================= */

const films = {

    cadafalso: {

        image: "img/cadafalsohorizontal.webp",

        description:
            "Um drama psicológico que acompanha diferentes personagens marcados por traumas, culpa e violência, revelando como cada escolha pode conduzir a um inevitável confronto com as próprias consequências.",

        genre: "DRAMA PSICOLÓGICO",
        duration: "14 MIN",
        year: "2024",
        rating: "14",
        classification: "CLASSIFICAÇÃO 14 ANOS",

        director: "Yohana Fukui",
        editor: "—",
        producer: "Jade Monteiro<br>Taly Lima<br>Yohana Fukui",
        cast: "Vêronica Bornhofen (Carla)<br>Sarah Motta (Bárbara)<br>Guilherme Klabunde (Mateus)<br>Sabrina Vianna (Ana)",
        script: "Julia Souza<br>Nicole Cunha<br>Ella Pierreserra",
        runtime: "14 minutos",
        photo: "Juliano Freitas<br>Bruno BM<br>Yohana Fukui<br>Junior Lara",

        trailer: "https://www.youtube.com/watch?v=ilqoIrWkjSc",

        festivals:
            "Tainha Dourada • FAM • Cine Capivara",

        platforms: "Prime Video • Claro TV • Box Brazil Play",

    },

    etre: {

        image: "img/etrehorizontal.webp",

        description:
            "Um curta que explora identidade, pertencimento e a experiência humana através de uma narrativa sensível e intimista.",

        genre: "DRAMA",
        duration: "10 MIN",
        year: "2024",
        rating: "LIVRE",
        classification: "LIVRE PARA TODOS OS PÚBLICOS",

        director: "Yohana Fukui",
        editor: "Pedro Garcia",
        producer: "—",
        cast: "Ella Pierreserra<br>Melyssa Mell Gomes<br>Isadora Tavares",
        script: "Ana Claudia Sguário",
        runtime: "10 minutos",
        photo: "Yohana Fukui",

        trailer: "",

        festivals:
            "Tainha Dourada • FAM • Fastcine • FICSC",

        platforms: "Prime Video • Claro TV • Box Brazil Play",

    }

};

const filmButtons = document.querySelectorAll(".film-btn");
const filmModal = document.querySelector(".film-modal");
const filmClose = document.querySelector(".film-close");

const filmImage1 = document.getElementById("film-image-1");

const filmDescription = document.getElementById("film-description");

const filmGenre = document.getElementById("film-genre");
const filmDuration = document.getElementById("film-duration");
const filmYear = document.getElementById("film-year");
const filmRating = document.getElementById("film-rating");
const filmClassification = document.getElementById("film-classification");

const filmDirector = document.getElementById("film-director");
const filmEditor = document.getElementById("film-editor");
const filmProducer = document.getElementById("film-producer");
const filmCast = document.getElementById("film-cast");
const filmScript = document.getElementById("film-script");
const filmRuntime = document.getElementById("film-runtime");
const filmPhoto = document.getElementById("film-photo");

const filmTrailer = document.getElementById("film-trailer");
const filmFestivals = document.getElementById("film-festivals");

const filmLineTech = document.getElementById("film-line-tech");
const filmTechBlock = document.getElementById("film-tech-block");
const filmLineBottom = document.getElementById("film-line-bottom");
const filmBottomBlock = document.getElementById("film-bottom-block");
const filmWatchBlock = document.getElementById("film-watch-block");
const filmFestivalsBlock = document.getElementById("film-festivals-block");
const filmPlatforms = document.getElementById("film-platforms");
const filmPlatformsBlock = document.getElementById("film-platforms-block");

let lastFocusedFilmTrigger = null;

if (filmButtons.length && filmModal && filmClose) {

    filmButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filmId = button.dataset.film;
            const film = films[filmId];

            if (!film) return;

            lastFocusedFilmTrigger = button;

            filmImage1.src = film.image;
            filmImage1.alt = filmId;

            filmDescription.textContent = film.description;

            filmGenre.textContent = film.genre;
            filmDuration.textContent = film.duration;
            filmYear.textContent = film.year;
            filmRating.textContent = film.rating;
            filmClassification.textContent = film.classification;

            // FICHA TECNICA — so exibe se o filme tiver esses dados
            const hasTechSheet = !!film.director;

            if (hasTechSheet) {
                filmDirector.innerHTML = film.director;
                filmEditor.innerHTML = film.editor;
                filmProducer.innerHTML = film.producer;
                filmCast.innerHTML = film.cast;
                filmScript.innerHTML = film.script;
                filmRuntime.innerHTML = film.runtime;
                filmPhoto.innerHTML = film.photo;
            }

            filmLineTech.style.display = hasTechSheet ? "" : "none";
            filmTechBlock.style.display = hasTechSheet ? "" : "none";

            // ASSISTIR — so exibe se houver link de trailer
            const hasTrailer = !!film.trailer;

            if (hasTrailer) {
                filmTrailer.href = film.trailer;
            }

            filmWatchBlock.style.display = hasTrailer ? "" : "none";

            // FESTIVAIS E EXIBICOES — so exibe se houver essa informacao
            const hasFestivals = !!film.festivals;

            if (hasFestivals) {
                filmFestivals.textContent = film.festivals;
            }

            filmFestivalsBlock.style.display = hasFestivals ? "" : "none";

            // Linha e bloco inferior somem por completo se nao houver
            // nem trailer nem festivais para mostrar
            const showBottomRow = hasTrailer || hasFestivals;

            filmLineBottom.style.display = showBottomRow ? "" : "none";
            filmBottomBlock.style.display = showBottomRow ? "" : "none";
            filmBottomBlock.classList.toggle("film-bottom--single", showBottomRow && (!hasTrailer || !hasFestivals));

            filmModal.classList.add("active");
            document.body.classList.add("modal-open");
            filmClose.focus();

            const hasPlatforms = !!film.platforms;

            if (hasPlatforms) {
                filmPlatforms.textContent = film.platforms;
            }

            filmPlatformsBlock.style.display = hasPlatforms ? "" : "none";

        });

    });

    function closeFilmModal() {
        filmModal.classList.remove("active");
        document.body.classList.remove("modal-open");
        if (lastFocusedFilmTrigger) lastFocusedFilmTrigger.focus();
    }

    filmClose.addEventListener("click", closeFilmModal);

    filmModal.addEventListener("click", (e) => {
        if (e.target === filmModal) {
            closeFilmModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (!filmModal.classList.contains("active")) return;
        if (e.key === "Escape") {
            closeFilmModal();
        }
    });

}

/* =========================
   MENU — MOBILE TOGGLE
========================= */

const menu = document.querySelector(".floating-menu");
const nav = document.getElementById("main-navigation");
const toggleBtn = document.querySelector(".menu-toggle");

if (menu && nav && toggleBtn) {

    function openMobileMenu() {
        nav.classList.add("open");
        menu.classList.add("open");
        toggleBtn.setAttribute("aria-expanded", "true");
        toggleBtn.innerHTML = `<i class="fas fa-bars"></i>`;
        document.body.classList.add("menu-open");
        document.body.style.overflow = "hidden";
    }

    function closeMobileMenu() {
        nav.classList.remove("open");
        menu.classList.remove("open");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.innerHTML = `<i class="fas fa-bars"></i>`;
        document.body.classList.remove("menu-open");
        document.body.style.overflow = "";
    }

    toggleBtn.addEventListener("click", () => {
        nav.classList.contains("open")
            ? closeMobileMenu()
            : openMobileMenu();
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

    document.addEventListener("click", (e) => {
        if (!nav.classList.contains("open")) return;

        if (!menu.contains(e.target)) {
            closeMobileMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1023 && nav.classList.contains("open")) {
            closeMobileMenu();
        }
    });
}

/* =========================
   HOVER -> TOQUE (MOBILE)
   Ativa estados de :hover (project-card, film-block, service-card,
   projects-gallery img) atraves de toque em telas sem mouse.
========================= */

(function enableTouchHover() {

    const touchHoverSelectors = [
        ".project-card",
        ".service-card",
        ".film-block",
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
            el.addEventListener("touchstart", (e) => {
                const alreadyActive = el.classList.contains(activeClass);
                clearActive(el);
                el.classList.toggle(activeClass, !alreadyActive);
            }, { passive: true });
        });
    });

    document.addEventListener("touchstart", (e) => {
        const insideTarget = touchHoverSelectors.some(sel =>
            e.target.closest(sel)
        );
        if (!insideTarget) clearActive();
    }, { passive: true });

})();

const projectDetails = [
    ["Retratos Corporativos | Growth", "Retratos corporativos", "Growth Supplements", "2026", "Direção criativa · Fotografia · Produção", "Retratos que fortalecem a presença institucional e valorizam as pessoas por trás da marca.", "img/growthlogo.webp", ["img/growth.webp", "img/550A4842.webp", "img/IMG_2988.webp"], "Retratos · Conteúdos para LinkedIn"],
    ["Lançamento Ozoncare", "Lançamento de produto", "Ozoncare", "2025", "Direção criativa · Fotografia · Audiovisual", "Campanha de lançamento da nova linha de cuidados Ozoncare, feita com delicadeza, textura e presença visual.", "img/ozoncare4.webp", ["img/ozoncare4.webp", "img/foto2.webp", "img/foto3.webp", "img/foto4.webp"], "Fotos · Vídeos · Reels · Campanha completa"],
    ["Fotografia de Cardápio | Seu Conde", "Fotografia gastronômica", "Seu Conde", "2026", "Fotografia · Direção de arte · Edição", "Imagens que valorizam sabores, texturas e a identidade de uma experiência gastronômica memorável.", "img/foto4.webp", ["img/foto4.webp", "img/cafe.webp", "img/foto2.webp", "img/foto3.webp"], "Fotos de cardápio · Conteúdo digital"],
    ["Delas Summit | Sebrae", "Evento e cobertura", "Sebrae", "2025", "Fotografia · Vídeo · Conteúdo em tempo real", "Registro de uma edição inspiradora, com uma linguagem dinâmica para traduzir a força das conexões do evento.", "img/delassummitpreenchimento.webp", ["img/delassummitpreenchimento.webp", "img/dellassummit.webp", "img/foto3.webp", "img/foto2.webp"], "Cobertura · Vídeo · Reels"],
    ["Produção de Conteúdo | Casa Inti Café", "Conteúdo para marca", "Casa Inti Café", "2025", "Fotografia · Direção criativa · Social media", "Uma produção leve e afetiva para aproximar a marca de sua comunidade através de imagens cheias de atmosfera.", "img/foto1tortinha.webp", ["img/foto1tortinha.webp", "img/cafe.webp", "img/foto4.webp", "img/foto2.webp"], "Fotografias · Reels · Banco de imagens"],
    ["Léo Stronda | Fábrica de Monstros", "Campanha publicitária", "Fábrica de Monstros", "2025", "Direção criativa · Fotografia · Vídeo", "Energia, movimento e personalidade em uma campanha que traduz o universo da marca com intensidade.", "img/fabricademontros.webp", ["img/fabricademontros.webp", "img/foto3.webp", "img/550A4842.webp", "img/foto2.webp"], "Campanha · Fotos · Vídeos curtos"],
    ["Editorial de Moda | Laura Brocco", "Editorial de moda", "Laura Brocco", "2025", "Direção criativa · Fotografia · Styling", "Um editorial para revelar forma, cor e movimento em uma narrativa contemporânea e autoral.", "img/colagemmariana3.webp", ["img/colagemmariana3.webp", "img/colagemmariana1.webp", "img/marianna.webp", "img/foto3.webp"], "Editorial · Fotografias · Conteúdo digital"],
    ["Campanha Institucional | Bar do Dragão", "Campanha institucional", "Bar do Dragão", "2025", "Fotografia · Direção de arte · Produção", "Uma linguagem quente e sensorial para apresentar a atmosfera e os encontros que dão personalidade ao espaço.", "img/bardodragaodecima.webp", ["img/bardodragaodecima.webp", "img/foto2.webp", "img/cafe.webp", "img/foto4.webp"], "Fotos institucionais · Peças digitais"],
    ["Videoclipe | FATO Duorum", "Videoclipe", "FATO Duorum", "2024", "Direção · Fotografia · Produção audiovisual", "Uma narrativa audiovisual de contrastes, criada para dar imagem, ritmo e textura à música.", "img/fatoduarumcapa.webp", ["img/fatoduarumcapa.webp", "img/fatoduorumolhar.webp", "img/fatoduorumvertical.webp", "img/fatoduorumsemletra.webp"], "Videoclipe · Still · Bastidores"],
    ["Med Plus Nova Geração | Philozon", "Lançamento de produto", "Philozon", "2025", "Fotografia · Vídeo · Direção criativa", "Uma apresentação visual clara e contemporânea para comunicar inovação e confiança em cada ponto de contato.", "img/medplusphilozon.webp", ["img/medplusphilozon.webp", "img/medplushorizontal.webp", "img/foto2.webp", "img/foto3.webp"], "Fotos de produto · Vídeo · Reels"],
    ["La Cocina Mescla", "Evento gastronômico", "La Cocina Mescla", "2025", "Fotografia · Vídeo · Cobertura", "Uma cobertura vibrante para registrar os grandes nomes, sabores e encontros que deram vida ao evento.", "img/coccina.webp", ["img/coccina.webp", "img/cafe.webp", "img/foto4.webp", "img/foto2.webp"], "Cobertura completa · Fotos · Reels"],
    ["Camvel Porto Belo", "Vídeo promocional", "Camvel", "2025", "Produção audiovisual · Drone · Edição", "Um vídeo promocional que apresenta o empreendimento com ritmo, sofisticação e foco na experiência.", "img/camvel.webp", ["img/camvel.webp", "img/foto3.webp", "img/foto2.webp", "img/550A4842.webp"], "Filme promocional · Drone · Reels"]
].map(([title, category, client, year, services, summary, cover, gallery, deliveries]) => ({ title, category, client, year, services, summary, cover, gallery, deliveries, description: `<p>${summary}</p><p>O trabalho foi desenvolvido com atenção aos detalhes e uma direção visual alinhada aos objetivos da marca, criando materiais versáteis para a campanha e os canais digitais.</p><p>Da concepção à entrega, cada escolha foi pensada para gerar identificação e uma experiência visual consistente.</p>`, results: ["Campanha completa alinhada à identidade da marca", "Conteúdos otimizados para redes sociais", "Fortalecimento da presença e posicionamento", "Materiais prontos para diferentes pontos de contato"] }));

Object.assign(projectDetails[0], {
    title: "Retratos Corporativos | Growth Supplements",
    category: "Retratos Corporativos para Fortalecimento de Marca",
    summary: "Produção fotográfica desenvolvida para valorizar os colaboradores da Growth Supplements e fortalecer a presença da empresa no LinkedIn através de uma comunicação mais humana, profissional e consistente.",
    description: `
        <p>A Growth Supplements buscava fortalecer sua presença no LinkedIn e incentivar seus colaboradores a representarem a marca de forma mais profissional na plataforma.</p>
        <p>Para isso, produzimos uma série de retratos corporativos seguindo um padrão visual consistente, proporcionando imagens de alta qualidade para uso nos perfis profissionais e na comunicação institucional da empresa.</p>
        <p>Mais do que fotografias, o projeto reforçou a identidade da Growth, valorizou as pessoas que fazem parte da equipe e contribuiu para uma presença digital mais forte e alinhada aos valores da marca.</p>
    `,
    video: "videos/growth.mp4",
    videoTitle: "Making Of da Produção",
    videoDescription: "Um registro dos bastidores da produção, mostrando parte da estrutura, direção e organização envolvidas na criação dos retratos corporativos da equipe.",
    results: [
        { title: "Presença profissional no LinkedIn", description: "Retratos que fortalecem a imagem dos colaboradores na principal rede profissional do mercado." },
        { title: "Employer Branding", description: "Uma comunicação mais humana e alinhada à cultura da empresa." },
        { title: "Padronização visual", description: "Fotografias consistentes que reforçam a identidade da Growth Supplements." },
        { title: "Valorização da equipe", description: "Conteúdo que destaca as pessoas por trás da marca." },
        { title: "Fortalecimento da marca empregadora", description: "Uma empresa forte começa pelas pessoas que a representam." }
    ]
});

const modal = document.querySelector(".project-modal");
const openButton = document.querySelector("#open-project-modal");
const closeButton = document.querySelector(".project-modal-close");
const modalContainer = document.querySelector(".project-modal-container");
const projectCards = document.querySelectorAll(".projects-grid-custom .project-card");
let lastFocusedProjectTrigger = null;
const makeImage = (src, alt) => { const image = document.createElement("img"); image.src = src; image.alt = alt; image.loading = "lazy"; return image; };
function renderProjectModal(index) {
    currentProjectIndex = (index + projectDetails.length) % projectDetails.length; currentProjectId = currentProjectIndex + 1;
    const project = projectDetails[currentProjectIndex];
    const [projectHeading, ...projectTitleParts] = project.title.split("|").map(part => part.trim());
    const modalEyebrow = projectTitleParts.length ? projectHeading : project.category;
    const modalTitle = projectTitleParts.length ? projectTitleParts.join(" | ") : project.title;
    modalContainer.classList.toggle("growth-project-modal", currentProjectIndex === 0);
    document.querySelector(".modal-video-section > h3").textContent = project.video ? "Vídeo do Projeto" : "Vídeos";
    document.querySelector(".modal-results-section > h3").textContent = project.video ? "Impacto do Projeto" : "Resultados";
    [["#modal-cover", "src", project.cover], ["#modal-cover", "alt", project.title], ["#modal-title", "textContent", modalTitle], ["#modal-category", "textContent", modalEyebrow], ["#modal-summary", "textContent", project.summary], ["#modal-type", "textContent", project.category], ["#modal-client", "textContent", project.client], ["#modal-year", "textContent", project.year], ["#modal-services", "textContent", project.services], ["#modal-deliveries", "textContent", project.deliveries]].forEach(([selector, property, value]) => document.querySelector(selector)[property] = value);
    document.querySelector("#modal-description").innerHTML = project.description;
    document.querySelector("#modal-gallery").replaceChildren(...project.gallery.concat(project.gallery.slice(0, 2)).map(src => makeImage(src, project.title)));
    document.querySelector("#modal-behind").replaceChildren(...project.gallery.slice(1, 4).map(src => makeImage(src, `Bastidores — ${project.title}`)));
    const videosGrid = document.querySelector("#modal-videos-grid");
    if (project.video) {
        const video = document.createElement("video");
        video.className = "modal-project-video";
        video.src = project.video;
        video.poster = project.cover;
        video.controls = true;
        video.preload = "metadata";
        video.playsInline = true;
        video.setAttribute("aria-label", `Vídeo — ${project.title}`);
        const videoBlock = document.createElement("article");
        videoBlock.className = "modal-project-video-block";
        const videoTitle = document.createElement("h4");
        videoTitle.textContent = project.videoTitle;
        const videoDescription = document.createElement("p");
        videoDescription.textContent = project.videoDescription;
        videoBlock.append(videoTitle, videoDescription, video);
        videosGrid.replaceChildren(videoBlock);
    } else {
        videosGrid.replaceChildren(...project.gallery.slice(0, 3).map((src, index) => { const card = document.createElement("article"); card.className = "modal-video-card"; card.append(makeImage(src, `Vídeo ${index + 1} — ${project.title}`)); card.insertAdjacentHTML("beforeend", `<span class="modal-video-play"><i class="fa-solid fa-play"></i></span><strong>${["Filme principal", "Versão para redes", "Bastidores"][index]}</strong><small>${["Campanha completa", "Vídeo vertical · 9:16", "Making of da produção"][index]}</small>`); return card; }));
    }
    document.querySelector("#modal-results").replaceChildren(...project.results.map(item => { const li = document.createElement("li"); const content = typeof item === "string" ? `<span>${item}</span>` : `<span><strong>${item.title}</strong><small>${item.description}</small></span>`; li.innerHTML = `<i class="fa-regular fa-circle-check"></i>${content}`; return li; }));
    renderProject(currentProjectIndex); if (modalContainer) modalContainer.scrollTop = 0;
}
function openProjectModal() { lastFocusedProjectTrigger = document.activeElement; renderProjectModal(currentProjectIndex); modal.classList.add("active"); modal.setAttribute("aria-hidden", "false"); document.body.classList.add("modal-open"); closeButton.focus(); }
function closeProjectModal() { const video = modal.querySelector(".modal-project-video"); if (video) { video.pause(); video.currentTime = 0; } modal.classList.remove("active"); modal.setAttribute("aria-hidden", "true"); document.body.classList.remove("modal-open"); if (lastFocusedProjectTrigger?.focus) lastFocusedProjectTrigger.focus(); }
if (modal && closeButton) {
    if (openButton) openButton.addEventListener("click", openProjectModal);
    projectCards.forEach(card => card.addEventListener("click", () => {
        currentProjectIndex = Number(card.dataset.project) - 1;
        openProjectModal();
    }));
    closeButton.addEventListener("click", closeProjectModal);
    document.querySelector("#modal-prev-project").addEventListener("click", () => renderProjectModal(currentProjectIndex - 1));
    document.querySelector("#modal-next-project").addEventListener("click", () => renderProjectModal(currentProjectIndex + 1));
    modal.addEventListener("click", event => { if (event.target === modal) closeProjectModal(); });
    document.addEventListener("keydown", event => { if (!modal.classList.contains("active")) return; if (event.key === "Escape") closeProjectModal(); if (event.key === "ArrowLeft") renderProjectModal(currentProjectIndex - 1); if (event.key === "ArrowRight") renderProjectModal(currentProjectIndex + 1); });
}

/* Legacy project modal implementation kept disabled.
const legacyProjectDetails = {

    1: {

        title: "Retratos Corporativos | Growth Supplements",

        category: "Retratos Corporativos",

        client: "Growth Supplements",

        year: "2026",

        services: "Direção Criativa • Fotografia Corporativa • Produção",

        description: `
<p>A Growth Supplements buscava fortalecer sua presença no LinkedIn e incentivar seus colaboradores a representarem a marca de forma mais profissional na plataforma.</p>

<p>Para isso, produzimos uma série de retratos corporativos seguindo um padrão visual consistente, proporcionando imagens de alta qualidade para uso nos perfis profissionais e na comunicação institucional da empresa.</p>

<p>Mais do que fotografias, o projeto reforçou a identidade da Growth, valorizou as pessoas que fazem parte da equipe e contribuiu para uma presença digital mais forte e alinhada aos valores da marca.</p><br>

<h3>Impacto do projeto</h3>

<ul>
    <li><strong>Presença profissional no LinkedIn</strong><br>Retratos que fortalecem a imagem dos colaboradores na principal rede profissional do mercado.</li>

    <li><strong>Employer Branding</strong><br>Uma comunicação mais humana e alinhada à cultura da empresa.</li>

    <li><strong>Padronização visual</strong><br>Fotografias consistentes que reforçam a identidade da Growth Supplements.</li>

    <li><strong>Valorização da equipe</strong><br>Conteúdo que destaca as pessoas por trás da marca.</li>

    <li><strong>Fortalecimento da marca empregadora</strong><br>Uma empresa forte começa pelas pessoas que a representam.</li>
</ul>
`,

        cover: "img/growthlogo.webp",

        gallery: [

            "img/growthlogo.webp",
            "img/growthlogo.webp",
            "img/growthlogo.webp",
            "img/growthlogo.webp",
            "img/growthlogo.webp",
            "img/growthlogo.webp"

        ]

    },

    2: {

        title: "Lançamento de Produto | Ozoncare",

        category: "Publicidade",

        client: "Ozoncare",

        year: "2026",

        services: "Vídeo • Foto",

        description:
            "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

        cover: "img/ozoncare4.webp",

        gallery: [

            "img/ozoncare4.webp",
            "img/ozoncare4.webp",
            "img/ozoncare4.webp"

        ],

    },

    3: {
        title: "Fotografia de Cardápio | Seu Conde",

        category: "Fotografia",

        client: "Seu Conde",

        year: "2026",

        services: "Fotografia • Direção • Edição",

        description:
            "Descrição completa do projeto...",

        cover: "img/foto4.webp",

        gallery: [
            "img/foto4.webp",
            "img/foto4.webp",
            "img/foto4.webp"
        ],
    }

    // continue os demais...

}

const modal = document.querySelector(".project-modal");

const openButton =
    document.querySelector("#open-project-modal");

const closeButton =
    document.querySelector(".project-modal-close");

openButton.addEventListener("click", () => {

    const project = projectDetails[currentProjectId];

    document.querySelector("#modal-cover").src =
        project.cover;

    document.querySelector("#modal-title").textContent =
        project.title;

    document.querySelector("#modal-category").textContent =
        project.category;

    document.querySelector("#modal-type").textContent =
        project.category;

    document.querySelector("#modal-client").textContent =
        project.client;

    document.querySelector("#modal-year").textContent =
        project.year;

    document.querySelector("#modal-services").textContent =
        project.services;

    document.querySelector("#modal-description").innerHTML =
        project.description;

    criarGaleria(project.gallery);

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

});

function criarGaleria(imagens) {

    const gallery =
        document.querySelector("#modal-gallery");

    gallery.innerHTML = "";

    imagens.forEach(src => {

        gallery.innerHTML += `

            <img src="${src}" alt="">

        `;

    });

}

closeButton.addEventListener("click", () => {

    modal.classList.remove("active");

    document.body.style.overflow = "";

});

modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.classList.remove("active");

        document.body.style.overflow = "";

    }

});

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        modal.classList.remove("active");

        document.body.style.overflow = "";

    }

});

*/
