/**
 * Eliora — navigation, scroll animations
 */
(function () {
  /* Mobile nav */
  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.querySelector(".nav-drawer");

  if (toggle && drawer) {
    toggle.addEventListener("click", () => {
      drawer.classList.toggle("is-open");
      toggle.setAttribute(
        "aria-expanded",
        drawer.classList.contains("is-open")
      );
    });

    drawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => drawer.classList.remove("is-open"));
    });
  }

  /* Scroll fade-in */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  /* Active nav on scroll */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-main a[href^="#"]');

  if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              link.classList.toggle(
                "is-active",
                link.getAttribute("href") === `#${id}`
              );
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => navObserver.observe(section));
  }
})();
