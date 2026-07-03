function calcularINSS(rendaBruta) {
  if (rendaBruta <= 0) return 0;
  var teto = INSS_FAIXAS[3].ate;
  if (rendaBruta > teto) {
    return round2(teto * INSS_FAIXAS[3].aliquota - INSS_FAIXAS[3].deducao);
  }
  for (var i = 0; i < INSS_FAIXAS.length; i++) {
    if (rendaBruta <= INSS_FAIXAS[i].ate) {
      return round2(rendaBruta * INSS_FAIXAS[i].aliquota - INSS_FAIXAS[i].deducao);
    }
  }
  return 0;
}

function calcularCLT(rendaBruta) {
  var inss = calcularINSS(rendaBruta);
  var irrf = calcularIRRF(rendaBruta - inss);
  var decimoTerceiro = round2((rendaBruta - inss - irrf) / 12);
  var ferias = round2(((rendaBruta - inss - irrf) / 12) * 1.33);
  var fgts = round2(rendaBruta * 0.08);
  var liquidoMensal = round2(rendaBruta - inss - irrf);
  var liquidoMensalizada = round2(liquidoMensal + decimoTerceiro + ferias + fgts);
  return {
    bruto: rendaBruta,
    inss: inss,
    irrf: irrf,
    decimoTerceiro: decimoTerceiro,
    ferias: ferias,
    fgts: fgts,
    liquido: liquidoMensal,
    liquidoMensalizado: liquidoMensalizada,
  };
}

function calcularPJ(rendaBruta, aliquotaSimples) {
  aliquotaSimples = aliquotaSimples || 0.06;
  var simples = round2(rendaBruta * aliquotaSimples);
  var inssPJ = round2(SALARIO_MINIMO * 0.11);
  var contador = 480;
  var liquido = round2(rendaBruta - simples - inssPJ - contador);
  return {
    bruto: rendaBruta,
    simples: simples,
    inssPJ: inssPJ,
    contador: contador,
    liquido: liquido,
    liquidoMensalizado: liquido,
  };
}

function calcularRedeFederal(rendaBruta, aliquotaRPPS) {
  aliquotaRPPS = aliquotaRPPS || 0.14;
  var previdencia = round2(rendaBruta * aliquotaRPPS);
  var irrf = calcularIRRF(rendaBruta - previdencia);
  var decimoTerceiro = round2((rendaBruta - previdencia - irrf) / 12);
  var ferias = round2(((rendaBruta - previdencia - irrf) / 12) * 1.33);
  var liquidoMensal = round2(rendaBruta - previdencia - irrf);
  var liquidoMensalizada = round2(liquidoMensal + decimoTerceiro + ferias);
  return {
    bruto: rendaBruta,
    previdencia: previdencia,
    irrf: irrf,
    decimoTerceiro: decimoTerceiro,
    ferias: ferias,
    liquido: liquidoMensal,
    liquidoMensalizado: liquidoMensalizada,
  };
}

function calcularOutraRenda(tipo, rendaBruta) {
  if (!rendaBruta || rendaBruta <= 0) return null;
  switch (tipo) {
    case "clt":
      return calcularCLT(rendaBruta);
    case "pj":
      return calcularPJ(rendaBruta);
    case "rede_federal":
      return calcularRedeFederal(rendaBruta);
    default:
      return null;
  }
}

function getNomeTipoOutraRenda(tipo) {
  var nomes = {
    clt: "CLT (particular)",
    pj: "PJ / MEI",
    rede_federal: "Rede Federal/Municipal",
  };
  return nomes[tipo] || tipo;
}

function calcularIRPFSimplificado(rendaTributavelAnual) {
  var desconto = Math.min(rendaTributavelAnual * 0.20, LIMITE_DESCONTO_SIMPLIFICADO);
  var baseApos = Math.max(0, rendaTributavelAnual - desconto);
  var imposto = 0;
  for (var i = 0; i < FAIXAS_IRPF_ANUAL.length; i++) {
    if (baseApos <= FAIXAS_IRPF_ANUAL[i].ate) {
      imposto = baseApos * FAIXAS_IRPF_ANUAL[i].aliquota - FAIXAS_IRPF_ANUAL[i].deducao;
      break;
    }
  }
  return { base: baseApos, imposto: round2(Math.max(0, imposto)), desconto: round2(desconto) };
}

function calcularIRPFAnualCompleto(params) {
  var rendaBrutaAnual = params.rendaBrutaAnual;
  var previdenciaAnual = params.previdenciaAnual || 0;
  var saudeAnual = params.saudeAnual || 0;
  var prevPrivadaAnual = params.prevPrivadaAnual || 0;
  var educacaoAnual = params.educacaoAnual || 0;
  var pensaoAnual = params.pensaoAnual || 0;
  var dependentesAnual = params.dependentesAnual || 0;

  var base = Math.max(0, rendaBrutaAnual - previdenciaAnual - saudeAnual - prevPrivadaAnual - educacaoAnual - pensaoAnual - dependentesAnual);

  var impostoBruto = 0;
  for (var i = 0; i < FAIXAS_IRPF_ANUAL.length; i++) {
    if (base <= FAIXAS_IRPF_ANUAL[i].ate) {
      impostoBruto = base * FAIXAS_IRPF_ANUAL[i].aliquota - FAIXAS_IRPF_ANUAL[i].deducao;
      break;
    }
  }
  if (impostoBruto < 0) impostoBruto = 0;

  var redutor = 0;
  if (rendaBrutaAnual <= 60000) {
    redutor = Math.min(impostoBruto, 2694.15);
  } else if (rendaBrutaAnual <= 88200) {
    redutor = Math.max(0, 8429.73 - 0.095575 * rendaBrutaAnual);
  } else {
    redutor = 0;
  }

  var impostoDevido = Math.max(0, impostoBruto - redutor);
  var aliquotaEfetiva = base > 0 ? (impostoDevido / base) * 100 : 0;

  return {
    base: base,
    impostoBruto: round2(impostoBruto),
    redutor: round2(redutor),
    impostoDevido: round2(impostoDevido),
    aliquotaEfetiva: round2(aliquotaEfetiva),
  };
}

function montarCardOutraRenda(resultadoOutraRenda) {
  if (!resultadoOutraRenda) return "";
  return (
    '<div class="bg-emerald-50 rounded-lg px-3 py-2.5 border border-emerald-200 text-xs">' +
    '<div class="text-xs font-bold text-emerald-700 mb-1.5">' +
    resultadoOutraRenda.tipoNome +
    ' + SEEDUC</div>' +
    '<div class="space-y-1 text-gray-600">' +
    '<div class="flex justify-between"><span>Bruto ' + resultadoOutraRenda.tipoNome + '</span><span>R$ ' +
    formatarReal(resultadoOutraRenda.bruto) + '</span></div>' +
    (resultadoOutraRenda.inss > 0 ? '<div class="flex justify-between"><span>INSS</span><span class="text-red-500">-R$ ' +
      formatarReal(resultadoOutraRenda.inss) + '</span></div>' : '') +
    (resultadoOutraRenda.previdencia > 0 ? '<div class="flex justify-between"><span>Previdência</span><span class="text-red-500">-R$ ' +
      formatarReal(resultadoOutraRenda.previdencia) + '</span></div>' : '') +
    (resultadoOutraRenda.irrf > 0 ? '<div class="flex justify-between"><span>IRRF</span><span class="text-red-500">-R$ ' +
      formatarReal(resultadoOutraRenda.irrf) + '</span></div>' : '') +
    (resultadoOutraRenda.simples > 0 ? '<div class="flex justify-between"><span>Simples Nacional</span><span class="text-red-500">-R$ ' +
      formatarReal(resultadoOutraRenda.simples) + '</span></div>' : '') +
    (resultadoOutraRenda.contador > 0 ? '<div class="flex justify-between"><span>Contador</span><span class="text-red-500">-R$ ' +
      formatarReal(resultadoOutraRenda.contador) + '</span></div>' : '') +
    (resultadoOutraRenda.inssPJ > 0 ? '<div class="flex justify-between"><span>INSS (PJ)</span><span class="text-red-500">-R$ ' +
      formatarReal(resultadoOutraRenda.inssPJ) + '</span></div>' : '') +
    '<div class="border-t border-emerald-200 my-1"></div>' +
    '<div class="flex justify-between font-medium text-emerald-800"><span>Total Outra Renda</span><span>R$ ' +
    formatarReal(resultadoOutraRenda.liquido) + '</span></div>' +
    (resultadoOutraRenda.decimoTerceiro > 0 ? '<div class="flex justify-between"><span>+13º proporcional</span><span class="text-green-600">R$ ' +
      formatarReal(resultadoOutraRenda.decimoTerceiro) + '</span></div>' : '') +
    (resultadoOutraRenda.ferias > 0 ? '<div class="flex justify-between"><span>+Férias proporcional</span><span class="text-green-600">R$ ' +
      formatarReal(resultadoOutraRenda.ferias) + '</span></div>' : '') +
    (resultadoOutraRenda.fgts > 0 ? '<div class="flex justify-between"><span>+FGTS</span><span class="text-green-600">R$ ' +
      formatarReal(resultadoOutraRenda.fgts) + '</span></div>' : '') +
    '<div class="border-t border-emerald-200 my-1"></div>' +
    '<div class="flex justify-between font-bold text-emerald-800"><span>Líquido mensalizado</span><span>R$ ' +
    formatarReal(resultadoOutraRenda.liquidoMensalizado) + '</span></div>' +
    '</div></div>'
  );
}

function montarCardCombinado(resultadoOutraRenda, liquidoSeeduc, brutoSeeduc, totalBaseSeeduc) {
  if (!resultadoOutraRenda) {
    return '<div class="text-xs text-gray-400 italic p-4 text-center">Preencha a renda adicional acima</div>';
  }
  var combinado = round2(resultadoOutraRenda.liquidoMensalizado + liquidoSeeduc);
  return (
    '<div class="bg-indigo-50 rounded-lg px-3 py-2.5 border border-indigo-200 text-xs">' +
    '<div class="text-xs font-bold text-indigo-700 mb-1.5">' +
    'Total Combinado Mensal</div>' +
    '<div class="space-y-1 text-gray-600">' +
    '<div class="flex justify-between"><span>SEEDUC (líquido)</span><span class="text-blue-600">R$ ' +
    formatarReal(liquidoSeeduc) + '</span></div>' +
    '<div class="flex justify-between"><span>' + resultadoOutraRenda.tipoNome + ' (mês)</span><span class="text-emerald-600">R$ ' +
    formatarReal(resultadoOutraRenda.liquidoMensalizado) + '</span></div>' +
    '<div class="border-t border-indigo-200 my-1"></div>' +
    '<div class="flex justify-between font-bold text-indigo-800 text-sm"><span>Total Líquido</span><span>R$ ' +
    formatarReal(combinado) + '</span></div>' +
    '</div></div>'
  );
}

function montarComparacao(seeducResult, outraRendaResult) {
  if (!seeducResult) return "";
  var liquidoSeeduc = seeducResult.liquido;
  var brutoSeeduc = seeducResult.bruta;
  var totalBaseSeeduc = seeducResult.total;

  var html = "";

  html += '<div class="mt-4 pt-4 border-t-2 border-blue-300">';
  html += '<div class="flex items-center gap-2 mb-3">';
  html += '<span class="text-sm font-bold text-blue-800">COMPARAR CENÁRIOS</span>';
  html += '</div>';

  html += '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">';

  html += '<div>';
  html += montarCardOutraRenda(outraRendaResult);
  html += '</div>';

  html += '<div>';
  html += montarCardCombinado(outraRendaResult, liquidoSeeduc, brutoSeeduc, totalBaseSeeduc);
  html += '</div>';

  html += '</div>';

  if (outraRendaResult) {
    var combinado = round2(outraRendaResult.liquidoMensalizado + liquidoSeeduc);
    var diferenca = round2(combinado - liquidoSeeduc);
    html += '<div class="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-700">';
    html += 'Comparado a <strong>apenas SEEDUC (R$ ' + formatarReal(liquidoSeeduc) + ')</strong>, ';
    html += 'com <strong>' + outraRendaResult.tipoNome + '</strong> você <strong>aumenta em R$ ' +
      formatarReal(diferenca) + '</strong> sua renda mensal líquida';
    html += '<br/><span class="text-amber-500">(considerando ' + outraRendaResult.tipoNome + ' como renda líquida mensalizada de R$ ' +
      formatarReal(outraRendaResult.liquidoMensalizado) + ')</span>';
    html += '</div>';
  }

  html += '</div>';

  return html;
}
