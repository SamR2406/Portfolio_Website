const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const openLinkInNewTab = (url) => {
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
};

const animateName = () => {
  const nameElement = document.getElementById("myname");
  if (!nameElement) return;

  const target = nameElement.dataset.target || "Samuel Reale";
  const duration = 2000;
  const start = performance.now();

  const scramble = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const revealCount = Math.floor(progress * target.length);

    let output = "";
    for (let i = 0; i < target.length; i += 1) {
      if (target[i] === " ") {
        output += " ";
        continue;
      }

      if (i < revealCount) {
        output += target[i];
        continue;
      }

      const randomIndex = Math.floor(Math.random() * letters.length);
      output += letters[randomIndex];
    }

    nameElement.textContent = output;

    if (progress < 1) {
      requestAnimationFrame(scramble);
    } else {
      nameElement.textContent = target;
    }
  };

  requestAnimationFrame(scramble);
};

const setupProjectPreviews = () => {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    const previewWrapper = card.querySelector(".project-preview");
    const previewButton = card.querySelector(".preview-link");
    const previewImage = card.querySelector(".preview-image");

    if (!previewWrapper || !previewButton || !previewImage) return;

    const projectUrl = card.dataset.projectUrl;
    const imageUrl = card.dataset.imageUrl;

    const togglePreview = () => {
      const isHidden = previewWrapper.classList.contains("hidden");
      if (isHidden) {
        previewWrapper.classList.remove("hidden");
        if (!previewImage.dataset.loaded && imageUrl) {
          previewImage.src = imageUrl;
          previewImage.dataset.loaded = "true";
        }
      } else {
        previewWrapper.classList.add("hidden");
      }
    };

    card.addEventListener("click", (event) => {
      if (event.target.closest(".preview-link")) return;
      togglePreview();
    });

    card.addEventListener("keydown", (event) => {
      if (event.target.closest(".preview-link")) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      togglePreview();
    });

    const openProject = (event) => {
      event.stopPropagation();
      openLinkInNewTab(projectUrl);
    };

    previewButton.addEventListener("click", openProject);
    previewButton.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openProject(event);
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  animateName();
  setupProjectPreviews();
});
