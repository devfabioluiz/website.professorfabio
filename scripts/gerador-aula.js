// Referências aos elementos
const mainForm = document.getElementById("mainForm");
const topicsContainer = document.getElementById("topicsContainer");
const addTopicButton = document.getElementById("addTopicButton");

// Função para adicionar um novo bloco de tópicos
function addTopic() {
  const topicDiv = document.createElement("div");
  topicDiv.classList.add("topic");
  topicDiv.innerHTML = `
    <label for="title">Título:</label><br>
    <input type="text" name="title" placeholder="Título da aula" required><br><br>

    <label for="subtitle">Subtítulo:</label><br>
    <input type="text" name="subtitle" placeholder="Subtítulo do tópico" required><br><br>

    <label for="content">Conteúdo:</label><br>
    <textarea name="content" rows="5" placeholder="Texto do conteúdo" required></textarea><br><br>
  `;
  topicsContainer.appendChild(topicDiv);
}

// Adicionar novo formulário ao clicar no botão "Inserir Mais Tópicos"
addTopicButton.addEventListener("click", addTopic);

// Gerar o HTML ao submeter o formulário
mainForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Capturar todos os tópicos
  const topics = document.querySelectorAll(".topic");
  let htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Aula Gerada</title>
      <link rel="stylesheet" href="./estilos/estilos-aulas.css" />
      <script src="scripts/script-impressao.js"></script>
    </head>
    <body>
      <h1>1º Trimestre</h1>
      <h2>Aula XX de XXXX</h2>
  `;

  topics.forEach((topic) => {
    const title = topic.querySelector('input[name="title"]').value;
    const subtitle = topic.querySelector('input[name="subtitle"]').value;
    const content = topic.querySelector('textarea[name="content"]').value;

    htmlContent += `
      <h3>${title}</h3>
      <h4>${subtitle}</h4>
      <p>${content}</p>
    `;
  });

  htmlContent += `
      <h3>Questões</h3>
      <div class="question">Adicione as questões aqui...</div>

      <h3>Atividades para fazer em casa</h3>
      <h4>Escreva apenas a resposta</h4>
      <div class="question activity">
        <b>Pergunta da Atividades para fazer em casa...</b>
      </div>

      <div class="print-button">
        <button onclick="gerarVersaoImpressao()">Imprimir versão simplificada</button>
      </div>
      <div class="button-container">
        <button class="indice-button" href="../../indice-primeiro.html">
          Ir para índice
        </button>
      </div>
      
    </body>
    </html>
  `;

  // Criar e baixar o arquivo HTML
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "aula_gerada.html";
  a.click();
  URL.revokeObjectURL(url);
});
