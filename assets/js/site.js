// Mobile menu
const toggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("site-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector("span").textContent = open ? "Close" : "Menu";
  });
}

// Gentle fade-in as sections scroll into view
const revealables = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealables.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add("is-in"));
}

// Footer year
document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

// Contact form: submit to Formspree without leaving the page
const form = document.querySelector(".contact-form");
if (form) {
  const status = form.querySelector(".form-status");
  const button = form.querySelector('button[type="submit"]');
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (form.action.includes("YOUR_FORM_ID")) {
      status.className = "form-status is-error";
      status.textContent = "This form isn’t connected yet. Please call 781-771-0687 or email nancy@bewellcounseling.llc.";
      return;
    }
    button.disabled = true;
    status.className = "form-status";
    status.textContent = "Sending…";
    try {
      const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(res.statusText);
      form.reset();
      status.className = "form-status is-ok";
      status.textContent = "Thank you. Your message was sent, and I’ll be in touch within 24 hours.";
    } catch {
      status.className = "form-status is-error";
      status.textContent = "Something went wrong. Please call 781-771-0687 or email nancy@bewellcounseling.llc.";
    } finally {
      button.disabled = false;
    }
  });
}
