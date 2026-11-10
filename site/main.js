// ====== CONFIGURAÇÃO ======
// Número da clínica no formato internacional, só dígitos (55 + DDD + número).
const WHATSAPP_NUMBER = "5511900000000";

// Monta o link do WhatsApp com a mensagem pronta e a origem (ajuda a medir conversões).
function waLink(message) {
  const text = `${message}\n\n(Mensagem enviada pelo site)`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

document.querySelectorAll("[data-wa]").forEach((el) => {
  el.href = waLink(el.dataset.wa);
  el.target = "_blank";
  el.rel = "noopener";
  el.addEventListener("click", () => {
    // Se houver Google Analytics / Meta Pixel, registra o clique como lead.
    if (typeof window.gtag === "function") window.gtag("event", "whatsapp_click", { label: el.dataset.wa });
    if (typeof window.fbq === "function") window.fbq("track", "Contact");
  });
});

// Menu mobile
const toggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("menu");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

document.getElementById("ano").textContent = new Date().getFullYear();
