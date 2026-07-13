/* ═══════════ Toast System ═══════════ */
function showToast(headerText, bodyHTML, duration) {
  duration = duration || 4500;
  var container = document.getElementById("toast-container");
  if (!container) return;

  var toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML =
    '<div class="toast-header">' +
    '<span class="toast-header-label">' + headerText + "</span>" +
    '<button class="toast-close" aria-label="Dismiss">&times;</button>' +
    "</div>" +
    '<div class="toast-body">' + bodyHTML + "</div>";

  container.appendChild(toast);

  var closeBtn = toast.querySelector(".toast-close");
  function dismiss() {
    toast.classList.add("toast-out");
    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 350);
  }

  closeBtn.addEventListener("click", dismiss);
  setTimeout(dismiss, duration);
}

/* ═══════════ Terminal Typing Animation ═══════════ */
(function () {
  var lines = [
    { id: "term-line-1", text: "booting portfolio..." },
    { id: "term-line-2", text: "loading projects..." },
    { id: "term-line-3", text: "loading open source contributions..." },
    { id: "term-line-4", text: "ready" },
  ];

  var currentLine = 0;
  var currentChar = 0;
  var typeSpeed = 38;
  var lineDelay = 400;

  function typeNextChar() {
    if (currentLine >= lines.length) return;

    var line = lines[currentLine];
    var el = document.getElementById(line.id);
    if (!el) return;

    el.classList.remove("hidden");
    var textSpan = el.querySelector(".terminal-text");

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

  var heroObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setTimeout(typeNextChar, 800);
          heroObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  var heroTerminal = document.getElementById("hero-terminal");
  if (heroTerminal) {
    heroObserver.observe(heroTerminal);
  }
})();

/* ═══════════ Scroll-Reveal Animations ═══════════ */
(function () {
  var reveals = document.querySelectorAll(
    ".about-block, .project-card, .timeline-entry, .achievement-badge"
  );

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach(function (el) { revealObserver.observe(el); });
})();

/* ═══════════ Nav Scroll Effect ═══════════ */
(function () {
  var nav = document.getElementById("main-nav");

  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > 60) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
    },
    { passive: true }
  );
})();

/* ═══════════ Mobile Nav Toggle ═══════════ */
(function () {
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("nav-open");
      toggle.classList.toggle("active");
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("nav-open");
        toggle.classList.remove("active");
      });
    });
  }
})();

/* ═══════════ Smooth Scroll ═══════════ */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();

/* ═══════════ Active Nav Highlight ═══════════ */
(function () {
  var sections = document.querySelectorAll("section[id], header[id]");
  var navLinks = document.querySelectorAll(".nav-links a");

  var sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + id) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(function (section) { sectionObserver.observe(section); });
})();

/* ═══════════ EASTER EGG: LinkedIn Toast ═══════════ */
(function () {
  var linkedinLink = document.getElementById("contact-linkedin");
  if (linkedinLink) {
    linkedinLink.addEventListener("click", function (e) {
      e.preventDefault();
      showToast(
        "SYSTEM MSG",
        '<p><span class="toast-prompt">$</span> open linkedin<br>' +
        '<span class="toast-accent">ERR:</span> told you I don\'t use it.<br>' +
        '<span style="opacity:0.5">// try email instead, it actually works</span></p>',
        5000
      );
    });
  }
})();

/* ═══════════ EASTER EGG: Konami Code ═══════════ */
(function () {
  var konamiSequence = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a",
  ];
  var konamiIndex = 0;
  var konamiTriggered = false;

  document.addEventListener("keydown", function (e) {
    if (konamiTriggered) return;

    var expected = konamiSequence[konamiIndex];
    if (e.key === expected || e.key.toLowerCase() === expected) {
      konamiIndex++;
      if (konamiIndex === konamiSequence.length) {
        konamiTriggered = true;
        triggerKonami();
      }
    } else {
      konamiIndex = 0;
    }
  });

  function triggerKonami() {
    // CRT glitch effect on the body
    document.body.classList.add("crt-glitch");
    setTimeout(function () {
      document.body.classList.remove("crt-glitch");
    }, 500);

    // Show the overlay
    var overlay = document.getElementById("konami-overlay");
    if (overlay) {
      overlay.classList.remove("hidden");
      overlay.setAttribute("aria-hidden", "false");

      function dismissOverlay() {
        overlay.classList.add("hidden");
        overlay.setAttribute("aria-hidden", "true");
        document.removeEventListener("keydown", dismissOverlay);
        overlay.removeEventListener("click", dismissOverlay);
      }

      // Wait a beat so the triggering 'a' keypress doesn't immediately dismiss
      setTimeout(function () {
        document.addEventListener("keydown", dismissOverlay);
        overlay.addEventListener("click", dismissOverlay);
      }, 300);
    }
  }
})();

/* ═══════════ EASTER EGG: Logo Click Counter ═══════════ */
(function () {
  var logo = document.getElementById("nav-logo");
  var clicks = 0;
  var timer = null;

  if (logo) {
    logo.addEventListener("click", function (e) {
      e.preventDefault();
      clicks++;

      if (timer) clearTimeout(timer);
      timer = setTimeout(function () { clicks = 0; }, 2000);

      if (clicks === 7) {
        clicks = 0;
        showToast(
          "SevenDB",
          '<p><span class="toast-prompt">&gt;</span> 7 clicks detected.<br>' +
          '<span class="toast-accent">Coincidence?</span> That\'s exactly how many nodes you need for a proper Raft cluster.<br>' +
          '<span style="opacity:0.5">// okay, maybe 3 is enough</span></p>',
          5500
        );
      } else if (clicks === 3) {
        showToast(
          "HINT",
          '<p><span class="toast-prompt">&gt;</span> keep going...</p>',
          2000
        );
      }
    });
  }
})();

/* ═══════════ EASTER EGG: Tab Visibility ═══════════ */
(function () {
  var originalTitle = document.title;

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      document.title = "Come back! The bits are lonely...";
    } else {
      document.title = originalTitle;
    }
  });
})();

/* ═══════════ EASTER EGG: Sudo Detector ═══════════ */
(function () {
  var buffer = "";
  var sudoTriggered = false;

  document.addEventListener("keydown", function (e) {
    // Only track printable single chars
    if (e.key.length !== 1) return;

    buffer += e.key.toLowerCase();

    // Keep buffer short
    if (buffer.length > 20) {
      buffer = buffer.slice(-20);
    }

    if (!sudoTriggered && buffer.includes("sudo")) {
      sudoTriggered = true;
      buffer = "";
      showToast(
        "PERMISSION DENIED",
        '<p><span class="toast-prompt">$</span> sudo: nice try.<br>' +
        '<span class="toast-accent">You\'re not root here.</span><br>' +
        '<span style="opacity:0.5">// this system runs on vibes, not privileges</span></p>',
        4500
      );

      // Allow re-trigger after cooldown
      setTimeout(function () { sudoTriggered = false; }, 15000);
    }
  });
})();

/* ═══════════ SevenDB Modal ═══════════ */
(function () {
  var btn = document.getElementById("sevendb-learn-more");
  var modal = document.getElementById("sevendb-modal");
  var closeBtn = document.getElementById("sevendb-modal-close");

  if (!btn || !modal || !closeBtn) return;

  function openModal() {
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  btn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  // Close on overlay click (not the box itself)
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  // Close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
})();
