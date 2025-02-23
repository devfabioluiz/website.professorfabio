function gerarVersaoImpressao() {
  const conteudoOriginal = document.body.cloneNode(true);
  const elementos = conteudoOriginal.querySelectorAll("*");
  elementos.forEach((elemento) => {
    elemento.removeAttribute("class");
    elemento.removeAttribute("style");
  });

  const botao = conteudoOriginal.querySelectorAll("button");
  botao.forEach((elemento) => {
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
