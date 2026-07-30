(() => {
  const lightbox = document.getElementById("art-lightbox");
  if (!lightbox) return;

  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const stage = lightbox.querySelector(".lightbox-stage");
  const triggers = document.querySelectorAll("[data-lightbox-src]");
  let lastTrigger = null;

  const openLightbox = (trigger) => {
    lastTrigger = trigger;
    lightboxImage.src = trigger.dataset.lightboxSrc;
    lightboxImage.alt = trigger.dataset.lightboxAlt || "Enlarged product artwork";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage.src = "";
    if (lastTrigger) lastTrigger.focus();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openLightbox(trigger));
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  stage.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();