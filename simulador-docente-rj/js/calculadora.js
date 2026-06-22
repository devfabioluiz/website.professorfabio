function round2(v) {
  return Math.round(v * 100) / 100;
}

function formatarReal(valor) {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calcularIRRF(baseCalculo) {
  if (baseCalculo <= 0) return 0;

  var irrfBruto = 0;
  for (var i = 0; i < IRPF_FAIXAS.length; i++) {
    if (baseCalculo <= IRPF_FAIXAS[i].ate) {
      irrfBruto = baseCalculo * (IRPF_FAIXAS[i].aliquota / 100) - IRPF_FAIXAS[i].deducao;
      break;
    }
  }
  if (irrfBruto < 0) irrfBruto = 0;

  if (baseCalculo <= 5000.00) {
    return 0;
  } else if (baseCalculo <= 7350.00) {
    var reducao = 978.62 - (0.133145 * baseCalculo);
    return Math.max(0, round2(irrfBruto - reducao));
  } else {
    return round2(irrfBruto);
  }
}

function getTrienioPercentual(trienios) {
  return trienios > 0 ? 5 + trienios * 5 : 0;
}

function getRecomposicoesAtivas(dataSimulacao) {
  var ativas = [];
  if (!dataSimulacao) return ativas;

  RECOMPOSICOES.forEach(function (r) {
    if (!r.jaAplicado && dataSimulacao >= r.competencia) {
      ativas.push(r);
    }
  });
  return ativas;
}

function aplicarRecomposicoes(valor, dataSimulacao) {
  if (!dataSimulacao) return valor;
  var v = valor;
  RECOMPOSICOES.forEach(function (r) {
    if (!r.jaAplicado && dataSimulacao >= r.competencia) {
      v = round2(v * (1 + r.pct / 100));
    }
  });
  return v;
}

function calcular(params) {
  var cargo = CARGOS[params.cargoKey];
  var ref = cargo.referencias[params.refIndex];
  var cargaOriginal = cargo.carga;
  var funcao = (params.funcaoKey && FUNCOES[params.funcaoKey]) ? FUNCOES[params.funcaoKey] : FUNCOES.nenhuma;

  var dataSim = params.dataSimulacao;

  var converteu40h = !params.cedido && funcao.carga40h && cargaOriginal < 40;
  var cargaEfetiva = converteu40h ? 40 : cargaOriginal;

  var vb;
  if (converteu40h) {
    vb = aplicarRecomposicoes(round2(ref.vb * (40 / cargaOriginal)), dataSim);
  } else {
    vb = aplicarRecomposicoes(ref.vb, dataSim);
  }

  var piso = PISO[cargaEfetiva];
  var complemento = Math.max(0, round2(piso - vb));
  var total = round2(vb + complemento);

  var trienioPct = getTrienioPercentual(params.trienios);
  var trienioValor = trienioPct > 0 ? round2(total * trienioPct / 100) : 0;

  var aqValor = params.qualificacao === "nenhuma" ? 0 : aplicarRecomposicoes(AQ[cargaEfetiva][params.qualificacao], dataSim);

  var glpTempos = funcao.permiteGLP ? (params.glpTempos || 0) : 0;
  var glpBase = aplicarRecomposicoes(GLP.baseMensal, dataSim);
  var glpValor = glpTempos > 0 ? round2(glpTempos * 4 * (glpBase / GLP.temposBase)) : 0;

  var dpValor = (params.dificilProvimento && funcao.permiteDPDA) ? aplicarRecomposicoes(DIFICIL_PROVIMENTO, dataSim) : 0;
  var daValor = (params.dificilAcesso && funcao.permiteDPDA) ? aplicarRecomposicoes(DIFICIL_ACESSO, dataSim) : 0;

  var gratFuncao = 0;
  if (funcao.categorias && params.categoriaEscola && funcao.categorias[params.categoriaEscola]) {
    gratFuncao = aplicarRecomposicoes(funcao.categorias[params.categoriaEscola], dataSim);
  } else if (funcao.gratificacao > 0) {
    gratFuncao = aplicarRecomposicoes(funcao.gratificacao, dataSim);
  }
  var ajudaCusto = funcao.ajudaCusto;

  // Cedido: perde GLP, DP, DA, gratificações de função e ajuda de custo
  if (params.cedido) {
    glpTempos = 0;
    glpValor = 0;
    dpValor = 0;
    daValor = 0;
    gratFuncao = 0;
    ajudaCusto = 0;
  }

  var basePrev = round2(total + trienioValor + aqValor + (funcao.incidePrev ? gratFuncao : 0));

  var previdencia = round2(basePrev * PREVIDENCIA_ALIQUOTA);

  var baseIRRF = round2(basePrev + glpValor - previdencia - (params.dependentes * DEDUCAO_DEPENDENTE));
  if (baseIRRF < 0) baseIRRF = 0;

  var irrf = round2(calcularIRRF(baseIRRF));

  var auxTransporte = params.comRegencia ? TRANSPORTE.comRegencia : TRANSPORTE.demais;
  var auxAlimentacao = ALIMENTACAO[cargaEfetiva];
  var auxilios = round2(auxTransporte + auxAlimentacao);

  var bruta = round2(total + trienioValor + aqValor + glpValor + dpValor + daValor + gratFuncao + ajudaCusto + auxilios);

  var liquido = round2(bruta - previdencia - irrf);

  var aliquotaEfetivaIR = baseIRRF > 0 ? round2((irrf / baseIRRF) * 100) : 0;

  return {
    vb: vb,
    complemento: complemento,
    total: total,
    trienioValor: trienioValor,
    trienioPct: trienioPct,
    aqValor: aqValor,
    qualificacaoNome: params.qualificacao === "nenhuma" ? "Nenhuma" : (params.qualificacao === "mestrado" ? "Mestrado" : "Doutorado"),
    glpTempos: glpTempos,
    glpValor: glpValor,
    dpValor: dpValor,
    daValor: daValor,
    gratFuncao: gratFuncao,
    ajudaCusto: ajudaCusto,
    funcaoNome: funcao.nome !== "Nenhuma" ? funcao.nome : null,
    cargaEfetiva: cargaEfetiva,
    auxTransporte: auxTransporte,
    auxAlimentacao: auxAlimentacao,
    auxilios: auxilios,
    bruta: bruta,
    previdencia: previdencia,
    basePrev: basePrev,
    baseIRRF: baseIRRF,
    irrf: irrf,
    liquido: liquido,
    aliquotaEfetivaIR: aliquotaEfetivaIR,
    ref: ref,
    recomposicoesAtivas: getRecomposicoesAtivas(dataSim),
    exibeComplemento: complemento > 0,
    exibeTrienio: params.trienios > 0,
    exibeAQ: aqValor > 0,
    exibeGLP: glpValor > 0,
    exibeDP: dpValor > 0,
    exibeDA: daValor > 0,
    exibeGratFuncao: gratFuncao > 0,
    exibeAjudaCusto: ajudaCusto > 0,
    exibeConversao40h: converteu40h,
  };
}
