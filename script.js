let toastTimeout;

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

async function copyText(id, message = "Copiado correctamente") {
  const text = document.getElementById(id).innerText.trim();

  try {
    await navigator.clipboard.writeText(text);
    showToast(message);
  } catch (error) {
    fallbackCopy(text, message);
  }
}

function fallbackCopy(text, message) {
  const input = document.createElement("textarea");
  input.value = text;
  input.style.position = "fixed";
  input.style.opacity = "0";
  input.style.pointerEvents = "none";

  document.body.appendChild(input);
  input.focus();
  input.select();

  try {
    document.execCommand("copy");
    showToast(message);
  } catch (error) {
    showToast("No fue posible copiar automáticamente");
  }

  document.body.removeChild(input);
}

async function copyAllAccess() {
  const ssid = document.getElementById("ssid").innerText.trim();
  const password = document.getElementById("password").innerText.trim();
  const accessText = `Red WiFi: ${ssid} | Contraseña: ${password}`;

  try {
    await navigator.clipboard.writeText(accessText);
    showToast("Datos de acceso copiados");
  } catch (error) {
    fallbackCopy(accessText, "Datos de acceso copiados");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((item) => {
    item.style.animationPlayState = "paused";
    observer.observe(item);
  });

  requestAnimationFrame(() => {
    reveals.forEach((item) => {
      item.style.animationPlayState = "running";
    });
  });
});