(function () {
  const langToggle = document.getElementById("langToggle");
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");
  const particles = document.getElementById("particles");
  const counters = document.querySelectorAll(".stat-number");
  const revealEls = document.querySelectorAll(".reveal");
  const faqItems = document.querySelectorAll(".faq-item");

  let currentLang = "pt";

  function setLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

    document.querySelectorAll("[data-pt], [data-en]").forEach((el) => {
      const value = lang === "pt" ? el.dataset.pt : el.dataset.en;
      if (value) el.textContent = value;
    });

    document.querySelectorAll("[data-pt-html], [data-en-html]").forEach((el) => {
      const value = lang === "pt" ? el.dataset.ptHtml : el.dataset.enHtml;
      if (value) el.innerHTML = value;
    });

    if (langToggle) {
      const pt = langToggle.querySelector(".lang-pt");
      const en = langToggle.querySelector(".lang-en");
      if (pt && en) {
        pt.classList.toggle("active", lang === "pt");
        en.classList.toggle("active", lang === "en");
      }
    }
  }

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      setLang(currentLang === "pt" ? "en" : "pt");
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  function addParticles() {
    if (!particles) return;
    for (let i = 0; i < 32; i += 1) {
      const dot = document.createElement("div");
      dot.className = "particle";
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.width = `${2 + Math.random() * 4}px`;
      dot.style.height = dot.style.width;
      dot.style.animationDuration = `${8 + Math.random() * 12}s`;
      dot.style.animationDelay = `${-Math.random() * 10}s`;
      dot.style.background =
        Math.random() > 0.5 ? "rgba(6, 182, 212, 0.45)" : "rgba(161, 198, 255, 0.4)";
      particles.appendChild(dot);
    }
  }

  function animateCounter(el) {
    const target = Number(el.dataset.target || 0);
    const suffix = el.dataset.suffix || "";
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 35));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = `${current}${suffix}`;
    }, 22);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          if (entry.target.classList.contains("stat-number") && !entry.target.dataset.done) {
            entry.target.dataset.done = "1";
            animateCounter(entry.target);
          }
        }
      });
    },
    { threshold: 0.18 }
  );

  revealEls.forEach((el) => observer.observe(el));
  counters.forEach((el) => observer.observe(el));

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    if (!button) return;
    button.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });

  addParticles();
  setLang("pt");
})();