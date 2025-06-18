document.querySelectorAll(".btn-copy").forEach((button) => {
  button.addEventListener("click", function () {
    // Seleciona o elemento <code> relacionado ao botão clicado
    const codeElement = this.parentElement.querySelector("code");
    if (codeElement) {
      const code = codeElement.innerText;

      // Copia o conteúdo para a área de transferência
      navigator.clipboard
        .writeText(code)
        .then(() => {
          alert("Código copiado com sucesso!");
        })
        .catch((err) => {
          console.error("Erro ao copiar o código: ", err);
          alert("Erro ao copiar o código. Tente novamente.");
        });
    } else {
      alert("Erro: código não encontrado.");
    }
  });
});
