const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

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

document.addEventListener("DOMContentLoaded", animateName);
