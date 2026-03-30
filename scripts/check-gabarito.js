document.querySelectorAll(".btn-gabarito").forEach((botao) => {
  botao.addEventListener("click", () => {
    const gabarito = botao.nextElementSibling;

    if (gabarito.style.display === "none" || gabarito.style.display === "") {
      gabarito.style.display = "block";
      botao.textContent = "Esconder gabarito";
    } else {
      gabarito.style.display = "none";
      botao.textContent = "Ver gabarito";
    }
  });
});
