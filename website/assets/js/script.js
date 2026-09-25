document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open navigation");
    });
  });

  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Demo form behavior. Replace with your backend/API endpoint when available.
  document.querySelectorAll("form[data-form-type]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const status = form.querySelector(".form-status");
      const type = form.dataset.formType;
      const name = form.elements.name.value.trim();

      status.textContent = `Thanks${name ? ", " + name : ""}. Your ${type.toLowerCase()} request is ready to be connected.`;

      // Keep the entered data available for future backend integration.
      // Example payload:
      // const payload = Object.fromEntries(new FormData(form).entries());
      form.reset();
    });
  });
});
