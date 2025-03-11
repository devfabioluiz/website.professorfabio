function gerarVersaoImpressao() {
  const conteudoOriginal = document.body.cloneNode(true);

  // Seleciona todos os elementos de h1 até h5 e substitui por h6
  for (let i = 1; i <= 5; i++) {
    const headers = conteudoOriginal.querySelectorAll(`h${i}`);
    headers.forEach((header) => {
      const novoHeader = document.createElement("h6");
      novoHeader.innerHTML = header.innerHTML;
      header.parentNode.replaceChild(novoHeader, header);
    });
  }

  // Remove os elementos com os IDs 'texto-leitura' e 'question-container-casa'
  const textoLeitura = conteudoOriginal.querySelector("#texto-leitura");
  const questoesAula = conteudoOriginal.querySelector(
    "#question-container-aula"
  );
  if (textoLeitura) {
    textoLeitura.remove();
  }
  if (questoesAula) {
    questoesAula.remove();
  }

  // Remove IDs, classes e estilos de todos os outros elementos
  const elementos = conteudoOriginal.querySelectorAll("*");
  elementos.forEach((elemento) => {
    elemento.removeAttribute("id");
    elemento.removeAttribute("class");
    elemento.removeAttribute("style");
  });

  // Esconde botões
  const botoes = conteudoOriginal.querySelectorAll("button");
  botoes.forEach((botao) => {
    botao.style.display = "none";
  });

  // Cria a versão para impressão
  const janelaImpressao = window.open("", "_blank");
  janelaImpressao.document.write(`
    <html>
      <head>
        <title>Versão para Impressão</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        ${conteudoOriginal.innerHTML}
      </body>
    </html>
  `);
  janelaImpressao.document.close();
  janelaImpressao.focus();
  janelaImpressao.print();
  janelaImpressao.close();
}
