function gerarVersaoImpressao() {
  const conteudoOriginal = document.body.cloneNode(true);

  // Seleciona todos os elementos de h1 até h5
  for (let i = 1; i <= 5; i++) {
    const headers = conteudoOriginal.querySelectorAll(`h${i}`);
    headers.forEach((header) => {
      const novoHeader = document.createElement("h6");
      novoHeader.innerHTML = header.innerHTML;
      header.parentNode.replaceChild(novoHeader, header);
    });
  }

  const elementos = conteudoOriginal.querySelectorAll("*");
  elementos.forEach((elemento) => {
    elemento.removeAttribute("class");
    elemento.removeAttribute("style");
  });

  const botoes = conteudoOriginal.querySelectorAll("button");
  botoes.forEach((elemento) => {
    elemento.style.display = "none";
  });

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
