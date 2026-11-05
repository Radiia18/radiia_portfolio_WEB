
const menuToggle = document.querySelector("#menuToggle");
const primaryNav = document.querySelector("#primaryNav");

function closeMenu() {
  primaryNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  primaryNav.classList.toggle("open", !isOpen);
});

primaryNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu();
});


const themeToggle = document.querySelector("#themeToggle");
const savedTheme = localStorage.getItem("radiia-portfolio-theme");
if (savedTheme === "dark") document.body.classList.add("dark-theme");

function updateThemeButton() {
  const isDark = document.body.classList.contains("dark-theme");
  themeToggle.textContent = isDark ? "☼" : "◐";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
}
updateThemeButton();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem("radiia-portfolio-theme",
    document.body.classList.contains("dark-theme") ? "dark" : "light");
  updateThemeButton();
});


const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const emptyState = document.querySelector("#emptyState");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    projectCards.forEach(card => {
      const shouldShow = selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.hidden = !shouldShow;
      if (shouldShow) visibleCount++;
    });
    emptyState.hidden = visibleCount !== 0;
  });
});

const projectDialog = document.querySelector("#projectDialog");
const dialogClose = document.querySelector("#dialogClose");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogCategory = document.querySelector("#dialogCategory");
const dialogDescription = document.querySelector("#dialogDescription");

const projects = [
  {
    title: "Visual research",
    category: "DESIGN · CASE STUDY",
    description: "A creative exercise focused on collecting references, comparing visual styles and building a clear direction for a small design concept."
  },
  {
    title: "Digital concept",
    category: "DEVELOPMENT · CONCEPT",
    description: "A learning concept exploring how a simple digital interface can help people understand information and complete a task more easily."
  }
];

document.querySelectorAll("[data-project]").forEach(button => {
  button.addEventListener("click", () => {
    const project = projects[Number(button.dataset.project)];
    if (!project) return;
    dialogTitle.textContent = project.title;
    dialogCategory.textContent = project.category;
    dialogDescription.textContent = project.description;
    projectDialog.showModal();
  });
});
dialogClose.addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("click", event => {
  if (event.target === projectDialog) projectDialog.close();
});


const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const fields = [
  { input: document.querySelector("#visitorName"), error: document.querySelector("#nameError"),
    validate: value => value.trim().length >= 2, message: "Please enter at least 2 characters." },
  { input: document.querySelector("#visitorEmail"), error: document.querySelector("#emailError"),
    validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()), message: "Enter a valid email address." },
  { input: document.querySelector("#visitorMessage"), error: document.querySelector("#messageError"),
    validate: value => value.trim().length >= 10, message: "Your message must contain at least 10 characters." }
];

fields.forEach(field => {
  field.input.addEventListener("input", () => {
    field.input.classList.remove("invalid");
    field.error.textContent = "";
    formStatus.textContent = "";
  });
});

contactForm.addEventListener("submit", event => {
  event.preventDefault();
  let isFormValid = true;

  fields.forEach(field => {
    const valid = field.validate(field.input.value);
    field.input.classList.toggle("invalid", !valid);
    field.error.textContent = valid ? "" : field.message;
    if (!valid) isFormValid = false;
  });

  if (isFormValid) {
    formStatus.textContent = "Thank you! The form is filled in correctly. (Demo — nothing was sent.)";
    contactForm.reset();
    fields.forEach(field => field.input.classList.remove("invalid"));
  } else {
    formStatus.textContent = "Please correct the fields marked above.";
  }
});


const backToTop = document.querySelector("#backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 450);
}, { passive: true });
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
