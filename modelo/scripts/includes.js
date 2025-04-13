(function () {
  /**
   * Função para carregar um arquivo HTML e inserir seu conteúdo no elemento alvo.
   * @param {string} filePath - Caminho do arquivo HTML.
   * @param {string} targetId - ID do elemento onde o conteúdo será inserido.
   */
  function loadTemplate(filePath, targetId) {
    const target = document.getElementById(targetId);

    if (target) {
      fetch(filePath)
        .then((response) => {
          if (!response.ok) {
            console.error(`Erro ao carregar ${filePath}: ${response.status}`);
            throw new Error(`Erro ao carregar ${filePath}: ${response.status}`);
          }
          return response.text();
        })
        .then((html) => {
          target.innerHTML = html;
        })
        .catch((error) => {
          console.error(`Erro ao carregar o arquivo ${filePath}:`, error);
          target.innerHTML = `<p>Erro ao carregar o conteúdo de ${filePath}.</p>`;
        });
    } else {
      console.error(`Elemento com ID ${targetId} não encontrado.`);
    }
  }

  // Carrega os templates quando o DOM estiver pronto
  document.addEventListener("DOMContentLoaded", () => {
    loadTemplate("../templates/head-template.html", "head-container");
    loadTemplate("../templates/header-template.html", "header-container");
    loadTemplate("../templates/footer-template.html", "footer-container");
  });
})();
