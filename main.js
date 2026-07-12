/* ═══════════ Terminal Typing Animation ═══════════ */
(function () {
  const lines = [
    { id: "term-line-1", text: "booting portfolio..." },
    { id: "term-line-2", text: "loading projects..." },
    { id: "term-line-3", text: "loading open source contributions..." },
    { id: "term-line-4", text: "ready" },
  ];

  let currentLine = 0;
  let currentChar = 0;
  const typeSpeed = 38;
  const lineDelay = 400;

  function typeNextChar() {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];
    const el = document.getElementById(line.id);
    if (!el) return;

    el.classList.remove("hidden");
    const textSpan = el.querySelector(".terminal-text");

    if (currentChar < line.text.length) {
      textSpan.textContent += line.text[currentChar];
      currentChar++;
      setTimeout(typeNextChar, typeSpeed);
    } else {
      currentLine++;
      currentChar = 0;
      setTimeout(typeNextChar, lineDelay);
    }
  }

  // Start terminal animation when hero is visible
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(typeNextChar, 800);
          heroObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  const heroTerminal = document.getElementById("hero-terminal");
  if (heroTerminal) {
    heroObserver.observe(heroTerminal);
  }
})();

/* ═══════════ Scroll-Reveal Animations ═══════════ */
(function () {
  const reveals = document.querySelectorAll(
    ".about-block, .project-card, .timeline-entry, .achievement-badge"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => revealObserver.observe(el));
})();

/* ═══════════ Nav Scroll Effect ═══════════ */
(function () {
  const nav = document.getElementById("main-nav");
  let lastScrollY = 0;

  window.addEventListener(
    "scroll",
    () => {
      const scrollY = window.scrollY;
      if (scrollY > 60) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
      lastScrollY = scrollY;
    },
    { passive: true }
  );
})();

/* ═══════════ Mobile Nav Toggle ═══════════ */
(function () {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("nav-open");
      toggle.classList.toggle("active");
    });

    // Close nav when a link is clicked
    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("nav-open");
        toggle.classList.remove("active");
      });
    });
  }
})();

/* ═══════════ Smooth Scroll ═══════════ */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();

/* ═══════════ Active Nav Highlight ═══════════ */
(function () {
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
})();
