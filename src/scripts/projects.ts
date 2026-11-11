// @ts-nocheck
/* =========================
   GALERIA DE PROJETOS
========================= */

import { projectGalleryItems } from "../data/projects";

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
        image.style.visibility = project.image ? "" : "hidden";
        if (project.image) image.src = project.image;
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
        // Evita que o carrossel avance junto com a navegação do modal.
        if (document.querySelector(".project-modal.active")) return;

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

        if (
            !menu.contains(e.target) &&
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
    ["Lançamento Ozoncare", "Lançamento de produto", "Ozoncare", "2025", "Direção criativa · Fotografia · Audiovisual", "Campanha de lançamento da nova linha de cuidados Ozoncare, feita com delicadeza, textura e presença visual.", "img/ozoncare4.webp", ["img/1ozoncare.jpg", "img/2ozoncare.jpg", "img/4ozoncare.jpg", "img/5ozoncare.jpg", "img/6ozoncare.png", "img/adrianaozoncare.png"], "Fotos · Vídeos · Reels · Campanha completa"],
    ["Fotografia de Cardápio | Seu Conde", "Fotografia gastronômica", "Seu Conde", "2026", "Fotografia · Direção de arte · Edição", "Imagens que valorizam sabores, texturas e a identidade de uma experiência gastronômica memorável.", "img/seuconde/IMG_2431.jpg", ["img/seuconde/IMG_2431.jpg", "img/seuconde/IMG_2435.jpg", "img/seuconde/IMG_2483.jpg", "img/seuconde/IMG_2574.jpg", "img/seuconde/IMG_2577.jpg", "img/seuconde/IMG_2606.jpg", "img/seuconde/IMG_7465.jpg"], "Fotos de cardápio · Conteúdo digital"],
    ["Delas Summit | Sebrae", "Evento e cobertura", "Sebrae", "2025", "Fotografia · Vídeo · Conteúdo em tempo real", "Registro de uma edição inspiradora, com uma linguagem dinâmica para traduzir a força das conexões do evento.", "img/delassummitpreenchimento.webp", [], "Cobertura · Vídeo · Reels"],
    ["Produção de Conteúdo | Casa Inti Café", "Conteúdo para marca", "Casa Inti Café", "2025", "Fotografia · Direção criativa · Social media", "Uma produção leve e afetiva para aproximar a marca de sua comunidade através de imagens cheias de atmosfera.", "img/otimizadas/inticafe/550A0044.webp", ["img/otimizadas/inticafe/550A0044.webp", "img/otimizadas/inticafe/550A0060.webp", "img/otimizadas/inticafe/550A0184.webp", "img/otimizadas/inticafe/550A0196.webp", "img/otimizadas/inticafe/550A0232.webp", "img/otimizadas/inticafe/550A0277.webp", "img/otimizadas/inticafe/550A0311.webp", "img/otimizadas/inticafe/550A0314.webp", "img/otimizadas/inticafe/550A0334.webp", "img/otimizadas/inticafe/550A1601.webp", "img/otimizadas/inticafe/550A1610.webp", "img/otimizadas/inticafe/550A1616.webp", "img/otimizadas/inticafe/550A1629.webp", "img/otimizadas/inticafe/550A1637.webp", "img/otimizadas/inticafe/550A1647.webp", "img/otimizadas/inticafe/550A1651.webp", "img/otimizadas/inticafe/550A1665.webp", "img/otimizadas/inticafe/550A1666.webp", "img/otimizadas/inticafe/550A1668.webp", "img/otimizadas/inticafe/550A1670.webp", "img/otimizadas/inticafe/550A1680.webp", "img/otimizadas/inticafe/550A1729.webp", "img/otimizadas/inticafe/550A1736.webp", "img/otimizadas/inticafe/550A1748.webp", "img/otimizadas/inticafe/550A1755.webp", "img/otimizadas/inticafe/550A1772.webp", "img/otimizadas/inticafe/550A1812.webp", "img/otimizadas/inticafe/550A1834.webp", "img/otimizadas/inticafe/550A1869.webp", "img/otimizadas/inticafe/550A1895.webp", "img/otimizadas/inticafe/550A1907.webp", "img/otimizadas/inticafe/550A1943.webp", "img/otimizadas/inticafe/550A1949.webp", "img/otimizadas/inticafe/550A1986.webp", "img/otimizadas/inticafe/550A2001.webp", "img/otimizadas/inticafe/550A9510.webp", "img/otimizadas/inticafe/550A9575.webp"], "Fotografias · Reels · Banco de imagens"],
    ["Léo Stronda | Fábrica de Monstros", "Campanha publicitária", "Fábrica de Monstros", "2025", "Direção criativa · Fotografia · Vídeo", "Energia, movimento e personalidade em uma campanha que traduz o universo da marca com intensidade.", "img/fabricademontros.webp", [], "Campanha · Fotos · Vídeos curtos"],
    ["Editorial de Moda | Laura Brocco", "Editorial de moda", "Laura Brocco", "2025", "Direção criativa · Fotografia · Styling", "Um editorial para revelar forma, cor e movimento em uma narrativa contemporânea e autoral.", "img/laurabrocco/COLAGEM 001.jpg", ["img/laurabrocco/COLAGEM 001.jpg", "img/laurabrocco/LAURA BROCCO-004.jpg", "img/laurabrocco/LAURA BROCCO-007.jpg", "img/laurabrocco/LAURA BROCCO-014.jpg", "img/laurabrocco/LAURA BROCCO-057.jpg", "img/laurabrocco/LAURA BROCCO-066.jpg", "img/laurabrocco/LAURA BROCCO-069.jpg", "img/laurabrocco/LAURA BROCCO-075.jpg", "img/laurabrocco/LAURA BROCCO-081.jpg", "img/laurabrocco/LAURA BROCCO-139.jpg", "img/laurabrocco/LAURA BROCCO-147.jpg", "img/laurabrocco/LAURA BROCCO-154.jpg", "img/laurabrocco/LAURA BROCCO-217.jpg", "img/laurabrocco/LAURA BROCCO-285.jpg", "img/laurabrocco/LAURA BROCCO-290.jpg", "img/laurabrocco/LAURA BROCCO-304.jpg", "img/laurabrocco/LAURA BROCCO-333.jpg", "img/laurabrocco/LAURA BROCCO-337.jpg"], "Editorial · Fotografias · Conteúdo digital"],
    ["Campanha Institucional | Bar do Dragão", "Campanha institucional", "Bar do Dragão", "2025", "Fotografia · Direção de arte · Produção", "Uma linguagem quente e sensorial para apresentar a atmosfera e os encontros que dão personalidade ao espaço.", "img/bardodragaodecima.webp", [], "Fotos institucionais · Peças digitais"],
    ["Videoclipe | FATO Duorum", "Videoclipe", "FATO Duorum", "2024", "Direção · Fotografia · Produção audiovisual", "Uma narrativa audiovisual de contrastes, criada para dar imagem, ritmo e textura à música.", "img/fatoduarumcapa.webp", ["img/fatoduorumolhar.webp", "img/fatoduorumvertical.webp", "img/fatoduorumsemletra.webp", "img/tainhafatoduorum.png"], "Videoclipe · Still · Bastidores"],
    ["Med Plus Nova Geração | Philozon", "Lançamento de produto", "Philozon", "2025", "Fotografia · Vídeo · Direção criativa", "Uma apresentação visual clara e contemporânea para comunicar inovação e confiança em cada ponto de contato.", "img/medplusphilozon.webp", [], "Fotos de produto · Vídeo · Reels"],
    ["La Cocina Mescla", "Evento gastronômico", "La Cocina Mescla", "2025", "Fotografia · Vídeo · Cobertura", "Uma cobertura vibrante para registrar os grandes nomes, sabores e encontros que deram vida ao evento.", "img/otimizadas/coccina/550A1311.webp", ["img/otimizadas/coccina/550A1311.webp", "img/otimizadas/coccina/550A1349.webp", "img/otimizadas/coccina/550A8899.webp", "img/otimizadas/coccina/550A8903.webp", "img/otimizadas/coccina/550A8949.webp", "img/otimizadas/coccina/550A8978.webp", "img/otimizadas/coccina/550A8995.webp"], "Cobertura completa · Fotos · Reels"],

    ["Camvel Porto Belo", "Vídeo promocional", "Camvel", "2025", "Produção audiovisual · Drone · Edição", "Um vídeo promocional que apresenta o empreendimento com ritmo, sofisticação e foco na experiência.", "img/camvel.webp", [], "Filme promocional · Drone · Reels"],

    ["Produção de Conteúdo | Elemento Fit", "Produção de conteúdo", "Elemento Fit", "2026", "Fotografia · Produção audiovisual · Direção criativa", "Produção de fotos e vídeos para a Element Fit, criando conteúdos visuais que apresentam a marca e acompanham seu universo de treino, movimento e bem-estar.", "img/element-fit-placeholder.webp", [], "Fotografias · Vídeos · Conteúdo para marca"],

    ["Produção Audiovisual | Mauna Lani", "Produção audiovisual e redes sociais", "Mauna Lani", "2026", "Produção audiovisual · Fotografia · Conteúdo para redes sociais", "Produção audiovisual e conteúdo para redes sociais da Mauna Lani, apresentando a pousada e sua atmosfera por meio de vídeos, imagens e ações no perfil.", "img/mauna-lani-placeholder.webp", ["img/mauna-lani-placeholder.webp", "img/mauna-lani-placeholder.webp", "img/mauna-lani-placeholder.webp", "img/mauna-lani-placeholder.webp"], "Vídeos · Fotografias · Conteúdo para redes sociais"],
    ["Cobertura Audiovisual | Startup Summit", "Cobertura audiovisual", "Green Films", "—", "Cobertura audiovisual · Conteúdo em tempo real", "Cobertura audiovisual do Startup Summit realizada ao longo de três dias. A convite da Green Films, a FukuiFilm integrou a equipe responsável por registrar o evento e produzir conteúdo em tempo real.", "img/capastartupsummit.jpg", [], "Cobertura de três dias · Conteúdo em tempo real"]
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
    video: "/videos/otimizados/growth.mp4",
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

Object.assign(projectDetails[1], {
    videos: [
        { src: "/videos/otimizados/ozoncare-intimo.mp4", title: "Íntimo Ozoncare" },
        { src: "/videos/otimizados/ozoncare-pre.mp4", title: "Pré Ozoncare" }
    ]
});

Object.assign(projectDetails[2], {
    videos: [
        { src: "/videos/otimizados/seu-conde-1-2-3-4.mp4", title: "Seu Conde — Vídeo 1, 2, 3 e 4" },
        { src: "/videos/otimizados/seu-conde-combo-casal.mp4", title: "Combo Casal" },
        { src: "/videos/otimizados/seu-conde-combo-cine-conde.mp4", title: "Combo Cine Conde" },
        { src: "/videos/otimizados/seu-conde-happy-hour.mp4", title: "Happy Hour Seu Conde" },
        { src: "/videos/otimizados/seu-conde-nada-por-acaso.mp4", title: "Nada É por Acaso" }
    ]
});

Object.assign(projectDetails[3], {
    videos: [
        { src: "/videos/otimizados/dia-1-delas.mp4", title: "Dia 1 — Delas Summit" },
        { src: "/videos/otimizados/dia-2-delas.mp4", title: "Dia 2 — Delas Summit" }
    ]
});

Object.assign(projectDetails[4], {
    videos: [
        { src: "/videos/otimizados/inti-workshop-enologa-pintura.mp4", title: "Workshop Enóloga e Pintura em Taça" },
        { src: "/videos/otimizados/inti-brownie.mp4", title: "Brownie" },
        { src: "/videos/otimizados/inti-ceviche.mp4", title: "Ceviche" },
        { src: "/videos/otimizados/inti-coffee-party.mp4", title: "Coffee Party" },
        { src: "/videos/otimizados/inti-drinks.mp4", title: "Drinks" },
        { src: "/videos/otimizados/inti-samuel-pompeo.mp4", title: "Samuel Pompeo — 06.12" },
        { src: "/videos/otimizados/inti-tacu-tacu.mp4", title: "Tacu Tacu" }
    ]
});

Object.assign(projectDetails[5], {
    videos: [
        { src: "/videos/otimizados/ctmonstros-abs.mp4", title: "ABS" },
        { src: "/videos/otimizados/ctmonstros-atletas-fabrica.mp4", title: "Atletas Fábrica CT" },
        { src: "/videos/otimizados/ctmonstros-bike-indoor.mp4", title: "Bike Indoor" },
        { src: "/videos/otimizados/ctmonstros-bootcamp.mp4", title: "Bootcamp" },
        { src: "/videos/otimizados/ctmonstros-fabrica-dance.mp4", title: "Fábrica Dance" },
        { src: "/videos/otimizados/ctmonstros-funciona-hit.mp4", poster: "/videos/posters/ctmonstros-funciona-hit.jpg", title: "Funciona HIT" }
    ]
});

Object.assign(projectDetails[9], {
    videos: [
        { src: "/videos/otimizados/philozon/philozon-principal-vertical.mp4", title: "Principal Vertical" },
        { src: "/videos/otimizados/philozon/philozon-principal-nova-geracao-legenda.mp4", title: "Principal Nova Geração" },
        { src: "/videos/otimizados/philozon/philozon-be-dental-completo-legendado.mp4", title: "Be Dental" },
        { src: "/videos/otimizados/philozon/philozon-institucional-20-anos-legenda.mp4", title: "Institucional — 20 anos" },
        { src: "/videos/otimizados/philozon/philozon-mobilidade.mp4", title: "Mobilidade" },
        { src: "/videos/otimizados/philozon/philozon-ozonhof-part-2-video-oficial.mp4", title: "Ozonhof — Parte 2" }
    ]
});

Object.assign(projectDetails[10], {
    videos: [
        { src: "/videos/otimizados/coccina/cultura-historias-sabores-bacon.mp4", title: "Cultura, Histórias e Sabores — Bacon" },
        { src: "/videos/otimizados/coccina/omakase-final.mp4", title: "Omakase" },
        { src: "/videos/otimizados/coccina/sunset.mp4", title: "Sunset" }
    ]
});

Object.assign(projectDetails[11], {
    videos: [
        { src: "/videos/otimizados/camvel/dia-do-consumidor.mp4", title: "Dia do Consumidor" },
        { src: "/videos/otimizados/camvel/operacao-limpa-patio.mp4", title: "Operação Limpa Pátio" },
        { src: "/videos/otimizados/camvel/video-camvel-final.mp4", title: "Vídeo Camvel" }
    ]
});

Object.assign(projectDetails[8], {
    noGalleryRepeat: true
});

Object.assign(projectDetails[7], {
    videos: [
        { src: "/videos/otimizados/bardodragao.MP4", title: "Bar do Dragão" }
    ]
});

Object.assign(projectDetails[8], {
    videos: [
        { src: "/videos/otimizados/fatoduorumvideo.mp4", title: "Videoclipe — FATO Duorum" }
    ]
});


Object.assign(projectDetails[12], {
    videos: [
        { src: "/videos/otimizados/academianovaelementofit.mp4", title: "Academia Nova Element Fit" },
        { src: "/videos/otimizados/algunsplanoselementofit.mp4", title: "Alguns Planos Element Fit" },
        { src: "/videos/otimizados/novaoportunidadeelementofit.mp4", title: "Nova Oportunidade Element Fit" },
        { src: "/videos/otimizados/planoelementofit.mp4", title: "Plano Element Fit" },
        { src: "/videos/otimizados/treinargluetoselementofit.mp4", title: "Treinar Glúteos Element Fit" }
    ],
    description: `
        <p>A FukuiFilm realiza produções audiovisuais e fotográficas para a Element Fit, desenvolvendo conteúdos que valorizam a experiência da marca e traduzem sua energia em imagens.</p>
        <p>Entre vídeos e fotografias, cada produção explora diferentes aspectos da Element Fit e amplia as possibilidades de comunicação visual da marca.</p>
    `,
    results: [
        {
            title: "Conteúdo em diferentes formatos",
            description: "Produções que reúnem vídeo e fotografia para a comunicação da Element Fit."
        },
        {
            title: "Energia em destaque",
            description: "Imagens que acompanham o movimento e a axtmosfera da marca."
        },
        {
            title: "Identidade visual",
            description: "Conteúdos desenvolvidos para apresentar a Element Fit de forma consistente."
        }
    ]
});

Object.assign(projectDetails[13], {
    gallery: [
        "img/otimizadas/maunalani/1maunalani.webp",
        "img/otimizadas/maunalani/2maunalani.webp",
        "img/otimizadas/maunalani/3maunalani.webp",
        "img/otimizadas/maunalani/4maunalani.webp",
        "img/otimizadas/maunalani/5maunalani.webp",
        "img/otimizadas/maunalani/6maunalani.webp"
    ],
    videos: [
        { src: "/videos/otimizados/dentroeforamaunalani.mp4", title: "Dentro e Fora — Mauna Lani" },
        { src: "/videos/otimizados/feriasmaunalani.mp4", title: "Férias — Mauna Lani" },
        { src: "/videos/otimizados/v1maunalani.mp4", title: "Vídeo 1 — Mauna Lani" }
    ],
    description: `
        <p>A FukuiFilm produz materiais audiovisuais para a Mauna Lani e desenvolve conteúdos e ações para o perfil da pousada nas redes sociais.</p>
        <p>Os vídeos e as imagens apresentam os espaços e detalhes que fazem parte da experiência de se hospedar na Mauna Lani, aproximando o público do local e de sua proposta.</p>
    `,
    results: [
        {
            title: "A pousada em destaque",
            description: "Conteúdos audiovisuais que apresentam a Mauna Lani ao público."
        },
        {
            title: "Presença nas redes sociais",
            description: "Materiais e ações pensados para a comunicação da pousada em seu perfil."
        },
        {
            title: "Atmosfera e detalhes",
            description: "Imagens que valorizam os espaços e a experiência da pousada."
        }
    ]
});

Object.assign(projectDetails[14], {
    videos: [
        { src: "/videos/otimizados/dia1startupsummit.mp4", title: "Dia 1 — Startup Summit" },
        { src: "/videos/otimizados/dia2startupsummit.mp4", title: "Dia 2 — Startup Summit" },
        { src: "/videos/otimizados/dia3startupsummit.mp4", title: "Dia 3 — Startup Summit" }
    ],
    description: `
        <p>Durante os três dias de evento, a FukuiFilm trabalhou junto à Green Films na cobertura audiovisual do Startup Summit. A equipe acompanhou a programação e registrou os momentos do encontro enquanto ele acontecia.</p>
        <p>A cobertura em tempo real permitiu compartilhar o que acontecia no evento durante sua realização, levando a experiência do Startup Summit também a quem acompanhava de fora.</p>
    `,
    results: [
        {
            title: "Três dias de cobertura",
            description: "Acompanhamento audiovisual do Startup Summit durante toda a programação."
        },
        {
            title: "Conteúdo em tempo real",
            description: "Registros produzidos para compartilhar a experiência do evento enquanto acontecia."
        }
    ]
});


const modal = document.querySelector(".project-modal");
const openButton = document.querySelector("#open-project-modal");
const closeButton = document.querySelector(".project-modal-close");
const modalContainer = document.querySelector(".project-modal-container");
const projectCards = document.querySelectorAll(".projects-grid-custom .project-card");
const modalGallery = document.querySelector("#modal-gallery");
const galleryResizeObserver = new ResizeObserver(() => {
    modalGallery.querySelectorAll("img").forEach(fitGalleryImage);
});

galleryResizeObserver.observe(modalGallery);
const galleryShowMoreButton = document.querySelector("#modal-gallery-more");
const imageViewer = document.querySelector("#project-image-viewer");
const imageViewerImage = document.querySelector(".project-image-viewer-image");
const imageViewerCount = document.querySelector(".project-image-viewer-count");
const imageViewerClose = document.querySelector(".project-image-viewer-close");
const imageViewerPrev = document.querySelector(".project-image-viewer-prev");
const imageViewerNext = document.querySelector(".project-image-viewer-next");
let lastFocusedProjectTrigger = null;
let lastFocusedGalleryImage = null;
let galleryImageIndices = [];
let imageViewerIndex = 0;
let imageViewerTouchStartX = 0;
const makeImage = (src, alt) => { const image = document.createElement("img"); image.src = src; image.alt = alt; image.loading = "lazy"; return image; };
const fitGalleryImage = (image) => {
    if (!image.naturalWidth || !image.naturalHeight) return;

    const width = image.getBoundingClientRect().width;
    if (!width) return;

    const rowGap = parseFloat(getComputedStyle(modalGallery).rowGap) || 0;
    const rowHeight = parseFloat(getComputedStyle(modalGallery).gridAutoRows) || 1;

    const naturalHeight = width * (image.naturalHeight / image.naturalWidth);

    const rowSpan = Math.ceil(
        (naturalHeight + rowGap) / (rowHeight + rowGap)
    );

    const newValue = `span ${Math.max(1, rowSpan)}`;

    if (image.style.gridRowEnd !== newValue) {
        image.style.gridRowEnd = newValue;
    }
};
const portraitVideoFiles = new Set([
    "academianovaelementofit.mp4", "algunsplanoselementofit.mp4", "dentroeforamaunalani.mp4",
    "feriasmaunalani.mp4", "novaoportunidadeelementofit.mp4", "ozoncare-intimo.mp4",
    "ozoncare-pre.mp4", "planoelementofit.mp4", "seu-conde-1-2-3-4.mp4",
    "seu-conde-combo-casal.mp4", "seu-conde-combo-cine-conde.mp4",
    "seu-conde-happy-hour.mp4", "seu-conde-nada-por-acaso.mp4",
    "treinargluetoselementofit.mp4", "v1maunalani.mp4",
    "ctmonstros-abs.mp4", "ctmonstros-atletas-fabrica.mp4", "ctmonstros-bike-indoor.mp4",
    "ctmonstros-bootcamp.mp4", "ctmonstros-fabrica-dance.mp4", "ctmonstros-funciona-hit.mp4",
    "bardodragao.MP4", "CULTURA, HISTÓRIAS E SABORES - BACON_V2.mp4", "OMAKASE_FINAL_V2.mp4", "SUNSET_V3.mp4",
    "philozon-principal-vertical.mp4", "philozon-mobilidade.mp4", "philozon-ozonhof-part-2-video-oficial.mp4",
    "dia-do-consumidor.mp4", "operacao-limpa-patio.mp4", "video-camvel-final.mp4"
]);
const configureProjectVideo = (video, src, label, poster) => {
    const filename = src.split("/").pop() || "";
    const isPortrait = portraitVideoFiles.has(filename);
    video.className = `modal-project-video ${isPortrait ? "modal-project-video--portrait" : "modal-project-video--landscape"}`;
    video.src = src;
    video.poster = poster || `/videos/posters/${filename.replace(/\.mp4$/i, ".jpg")}`;
    video.controls = true;
    video.preload = "none";
    video.playsInline = true;
    video.setAttribute("aria-label", label);
    return video;
};
const isBehindMedia = (item) => {
    const src = typeof item === "string" ? item : item?.src;
    return typeof src === "string" && /[^/\\]*bastidores\.(?:jpe?g|png|webp|gif|mp4|webm|mov|m4v)$/i.test(src);
};
const makeGalleryMedia = (item, project, index) => {
    if (typeof item === "string") {
        const image = makeImage(item, project.title);
        image.addEventListener("load", () => fitGalleryImage(image));

        if (image.complete) {
            fitGalleryImage(image);
        }
        image.dataset.galleryIndex = String(index);
        image.tabIndex = 0;
        image.setAttribute("role", "button");
        image.setAttribute("aria-label", `${project.title} — abrir imagem em tela cheia`);
        return image;
    }
    const label = item.title || `Vídeo ${index + 1} — ${project.title}`;
    const video = configureProjectVideo(document.createElement("video"), item.src, label);
    video.title = label;
    return video;
};
let activeGalleryItems = [];
let renderedGalleryCount = 0;
function renderImageViewer() {
    const galleryIndex = galleryImageIndices[imageViewerIndex];
    const project = projectDetails[currentProjectIndex];
    imageViewerImage.src = activeGalleryItems[galleryIndex];
    imageViewerImage.alt = `${project.title} — imagem ${imageViewerIndex + 1}`;
    imageViewerCount.textContent = `${imageViewerIndex + 1} / ${galleryImageIndices.length}`;
}
function openImageViewer(galleryIndex, trigger) {
    galleryImageIndices = activeGalleryItems
        .map((item, index) => typeof item === "string" ? index : -1)
        .filter(index => index >= 0);
    imageViewerIndex = galleryImageIndices.indexOf(galleryIndex);
    if (imageViewerIndex < 0) return;
    lastFocusedGalleryImage = trigger;
    renderImageViewer();
    imageViewer.classList.add("active");
    imageViewer.setAttribute("aria-hidden", "false");
    imageViewerClose.focus();
}
function closeImageViewer() {
    imageViewer.classList.remove("active");
    imageViewer.setAttribute("aria-hidden", "true");
    imageViewerImage.removeAttribute("src");
    if (lastFocusedGalleryImage?.focus) lastFocusedGalleryImage.focus();
}
function moveImageViewer(direction) {
    imageViewerIndex = (imageViewerIndex + direction + galleryImageIndices.length) % galleryImageIndices.length;
    renderImageViewer();
}
function appendNextGalleryBatch() {
    const nextBatch = activeGalleryItems.slice(renderedGalleryCount, renderedGalleryCount + 10);
    modalGallery.append(...nextBatch.map((item, index) => makeGalleryMedia(item, projectDetails[currentProjectIndex], renderedGalleryCount + index)));
    renderedGalleryCount += nextBatch.length;
    galleryShowMoreButton.style.display = renderedGalleryCount < activeGalleryItems.length ? "" : "none";
}
galleryShowMoreButton.addEventListener("click", appendNextGalleryBatch);
modalGallery.addEventListener("click", event => {
    const image = event.target.closest("img[data-gallery-index]");
    if (image) openImageViewer(Number(image.dataset.galleryIndex), image);
});
modalGallery.addEventListener("keydown", event => {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches("img[data-gallery-index]")) {
        event.preventDefault();
        openImageViewer(Number(event.target.dataset.galleryIndex), event.target);
    }
});
imageViewerClose.addEventListener("click", closeImageViewer);
imageViewerPrev.addEventListener("click", () => moveImageViewer(-1));
imageViewerNext.addEventListener("click", () => moveImageViewer(1));
imageViewer.addEventListener("click", event => {
    if (event.target === imageViewer) closeImageViewer();
});
imageViewer.addEventListener("touchstart", event => {
    imageViewerTouchStartX = event.changedTouches[0].clientX;
}, { passive: true });
imageViewer.addEventListener("touchend", event => {
    const distance = event.changedTouches[0].clientX - imageViewerTouchStartX;
    if (Math.abs(distance) < 45) return;
    moveImageViewer(distance < 0 ? 1 : -1);
}, { passive: true });
function renderProjectModal(index) {
    currentProjectIndex = (index + projectDetails.length) % projectDetails.length; currentProjectId = currentProjectIndex + 1;
    const project = projectDetails[currentProjectIndex];
    const [projectHeading, ...projectTitleParts] = project.title.split("|").map(part => part.trim());
    const modalEyebrow = projectTitleParts.length ? projectHeading : project.category;
    const modalTitle = projectTitleParts.length ? projectTitleParts.join(" | ") : project.title;
    modalContainer.classList.toggle("growth-project-modal", currentProjectIndex === 0);
    const hasProjectVideos = Boolean(project.video || project.videos?.length);
    document.querySelector(".modal-video-section > h3").textContent = "Vídeos";
    document.querySelector(".modal-results-section > h3").textContent = hasProjectVideos ? "Impacto do Projeto" : "Resultados";
    const coverImage = document.querySelector("#modal-cover");
    coverImage.style.display = project.cover ? "" : "none";
    if (project.cover) coverImage.src = project.cover;
    else coverImage.removeAttribute("src");
    document.querySelector("#modal-watch").style.display = project.video || project.videos?.length ? "" : "none";
    [["#modal-cover", "alt", project.title], ["#modal-title", "textContent", modalTitle], ["#modal-category", "textContent", modalEyebrow], ["#modal-summary", "textContent", project.summary], ["#modal-type", "textContent", project.category], ["#modal-client", "textContent", project.client], ["#modal-year", "textContent", project.year], ["#modal-services", "textContent", project.services], ["#modal-deliveries", "textContent", project.deliveries]].forEach(([selector, property, value]) => document.querySelector(selector)[property] = value);
    document.querySelector("#modal-description").innerHTML = project.description;
    const hasGalleryImages = project.gallery.some(item => typeof item === "string");
    const galleryItems = !project.noGalleryRepeat && project.gallery.every(item => typeof item === "string") && project.gallery.length < 6
        ? project.gallery.concat(project.gallery.slice(0, 6 - project.gallery.length))
        : project.gallery;
    document.querySelector(".modal-gallery-section").style.display = hasGalleryImages ? "" : "none";
    activeGalleryItems = galleryItems;
    renderedGalleryCount = 0;
    modalGallery.replaceChildren();
    if (activeGalleryItems.length > 10) appendNextGalleryBatch();
    else {
        modalGallery.replaceChildren(...activeGalleryItems.map((item, itemIndex) => makeGalleryMedia(item, project, itemIndex)));
        renderedGalleryCount = activeGalleryItems.length;
        galleryShowMoreButton.style.display = "none";
    }
    const behindItems = [
        ...project.gallery,
        ...(project.videos || []),
        ...(project.video ? [project.video] : [])
    ].filter(isBehindMedia);
    const behindSection = document.querySelector(".modal-behind-section");
    const bottomGrid = document.querySelector(".modal-bottom-grid");
    behindSection.style.display = behindItems.length ? "" : "none";
    bottomGrid.classList.toggle("modal-bottom-grid--without-behind", behindItems.length === 0);
    document.querySelector("#modal-behind").replaceChildren(...behindItems.map((item, itemIndex) => {
        const src = typeof item === "string" ? item : item.src;
        if (/\.(?:mp4|webm|mov|m4v)$/i.test(src)) {
            return configureProjectVideo(document.createElement("video"), src, `Bastidores ${itemIndex + 1} — ${project.title}`);
        }
        return makeImage(src, `Bastidores ${itemIndex + 1} — ${project.title}`);
    }));
    const videosGrid = document.querySelector("#modal-videos-grid");
    const videoSection = document.querySelector(".modal-video-section");
    const hasVideoSectionContent = hasProjectVideos;
    videoSection.style.display = hasVideoSectionContent ? "" : "none";
    if (project.videos?.length) {
        const videoGroups = {
            landscape: document.createElement("div"),
            portrait: document.createElement("div")
        };
        videoGroups.landscape.className = "modal-videos-group modal-videos-group--landscape";
        videoGroups.portrait.className = "modal-videos-group modal-videos-group--portrait";
        project.videos.forEach(item => {
            const video = configureProjectVideo(document.createElement("video"), item.src, item.title, item.poster);
            const videoBlock = document.createElement("article");
            videoBlock.className = `modal-project-video-block ${video.classList.contains("modal-project-video--portrait") ? "modal-project-video-block--portrait" : ""}`;
            videoBlock.append(video);
            videoGroups[video.classList.contains("modal-project-video--portrait") ? "portrait" : "landscape"].append(videoBlock);
        });
        videosGrid.replaceChildren(...[videoGroups.landscape, videoGroups.portrait].filter(group => group.childElementCount));
    } else if (project.video) {
        const video = configureProjectVideo(document.createElement("video"), project.video, `Vídeo — ${project.title}`);
        const videoBlock = document.createElement("article");
        videoBlock.className = `modal-project-video-block ${video.classList.contains("modal-project-video--portrait") ? "modal-project-video-block--portrait" : ""}`;
        const videoDescription = document.createElement("p");
        videoDescription.textContent = project.videoDescription;
        videoBlock.append(video, videoDescription);
        const videoGroup = document.createElement("div");
        videoGroup.className = `modal-videos-group modal-videos-group--${video.classList.contains("modal-project-video--portrait") ? "portrait" : "landscape"}`;
        videoGroup.append(videoBlock);
        videosGrid.replaceChildren(videoGroup);
    } else {
        videosGrid.replaceChildren();
    }
    document.querySelector("#modal-results").replaceChildren(...project.results.map(item => { const li = document.createElement("li"); const content = typeof item === "string" ? `<span>${item}</span>` : `<span><strong>${item.title}</strong><small>${item.description}</small></span>`; li.innerHTML = `<i class="fa-regular fa-circle-check"></i>${content}`; return li; }));
    renderProject(currentProjectIndex); if (modalContainer) modalContainer.scrollTop = 0;
}
function openProjectModal() { lastFocusedProjectTrigger = document.activeElement; renderProjectModal(currentProjectIndex); modal.classList.add("active"); modal.setAttribute("aria-hidden", "false"); document.body.classList.add("modal-open"); closeButton.focus(); }
function closeProjectModal() { modal.querySelectorAll("video").forEach(video => { video.pause(); video.currentTime = 0; }); modal.classList.remove("active"); modal.setAttribute("aria-hidden", "true"); document.body.classList.remove("modal-open"); if (lastFocusedProjectTrigger?.focus) lastFocusedProjectTrigger.focus(); }
if (modal && closeButton) {
    modal.addEventListener("play", event => {
        const playingVideo = event.target;
        if (!(playingVideo instanceof HTMLVideoElement)) return;
        modal.querySelectorAll("video").forEach(video => {
            if (video !== playingVideo) video.pause();
        });
    }, true);
    if (openButton) openButton.addEventListener("click", openProjectModal);
    projectCards.forEach(card => card.addEventListener("click", () => {
        currentProjectIndex = Number(card.dataset.project) - 1;
        openProjectModal();
    }));
    closeButton.addEventListener("click", closeProjectModal);
    document.querySelector("#modal-prev-project").addEventListener("click", () => renderProjectModal(currentProjectIndex - 1));
    document.querySelector("#modal-next-project").addEventListener("click", () => renderProjectModal(currentProjectIndex + 1));
    modal.addEventListener("click", event => { if (event.target === modal) closeProjectModal(); });
    document.addEventListener("keydown", event => {
        if (!modal.classList.contains("active")) return;
        if (imageViewer.classList.contains("active")) {
            if (event.key === "Escape") closeImageViewer();
            if (event.key === "ArrowLeft") moveImageViewer(-1);
            if (event.key === "ArrowRight") moveImageViewer(1);
            return;
        }
        if (event.key === "Escape") closeProjectModal();
        if (event.key === "ArrowLeft") renderProjectModal(currentProjectIndex - 1);
        if (event.key === "ArrowRight") renderProjectModal(currentProjectIndex + 1);
    });
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
