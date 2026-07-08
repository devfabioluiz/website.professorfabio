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

function calcularVencimentos(params) {
  var cargoKey = params.cargoKey;
  var cargo = CARGOS[cargoKey];
  var ref = cargo.referencias[params.refIndex];
  var cargaOriginal = cargo.carga;
  var funcao = (params.funcaoKey && FUNCOES[params.funcaoKey]) ? FUNCOES[params.funcaoKey] : FUNCOES.nenhuma;

  var dataSim = params.dataSimulacao;

  var cargaEfetiva = cargaOriginal;
  var cargaParaGLP = (!params.cedido && funcao.carga40h) ? 40 : cargaOriginal;
  var cargaParaAuxilios = (!params.cedido && funcao.carga40h) ? 40 : cargaOriginal;

  var vb = aplicarRecomposicoes(ref.vb, dataSim);

  var pisoKey = params.usarPiso2026 !== false ? PISO_2026 : PISO_2025;
  var piso = pisoKey[cargaEfetiva];
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

  var diespValor = 0;
  if (params.diesp && cargoKey.indexOf("docente") === 0) {
    var key = cargoKey.indexOf("docente2") === 0 ? "docente2" : "docente1";
    diespValor = aplicarRecomposicoes(DIESP[key], dataSim);
  }

  var gratFuncao = 0;
  if (funcao.categorias && params.categoriaEscola && funcao.categorias[params.categoriaEscola]) {
    gratFuncao = aplicarRecomposicoes(funcao.categorias[params.categoriaEscola], dataSim);
  } else if (funcao.gratificacao > 0) {
    gratFuncao = aplicarRecomposicoes(funcao.gratificacao, dataSim);
  }
  var ajudaCusto = funcao.ajudaCusto;
  var adicionalFuncao = (funcao.adicionalCatD && params.categoriaEscola === "D")
    ? aplicarRecomposicoes(funcao.adicionalCatD, dataSim) : 0;

  if (params.cedido) {
    glpTempos = 0;
    glpValor = 0;
    dpValor = 0;
    daValor = 0;
    diespValor = 0;
    gratFuncao = 0;
    ajudaCusto = 0;
    adicionalFuncao = 0;
  }

  var basePrev = round2(total + trienioValor + aqValor + (funcao.incidePrev ? round2(gratFuncao + adicionalFuncao) : 0));
  var previdencia = round2(basePrev * PREVIDENCIA_ALIQUOTA);

  // ── Migração 18h → 30h (Decreto 49.026/2024) ──
  var rubricaMigracao = 0;
  if (params.migrado18h && cargoKey === "docente1_30h" && !params.incluirRubricaPrev) {
    var cargo18h = CARGOS["docente1_18h"];
    if (params.refIndex < cargo18h.referencias.length) {
      var ref18h = cargo18h.referencias[params.refIndex];
      var vb18h = aplicarRecomposicoes(ref18h.vb, dataSim);
      var total18h = round2(vb18h + Math.max(0, round2(pisoKey[18] - vb18h)));
      var trienioValor18h = trienioPct > 0 ? round2(total18h * trienioPct / 100) : 0;
      var aq18h = params.qualificacao === "nenhuma" ? 0 : aplicarRecomposicoes(AQ[18][params.qualificacao], dataSim);
      var basePrev18h = round2(total18h + trienioValor18h + aq18h + (funcao.incidePrev ? round2(gratFuncao + adicionalFuncao) : 0));
      rubricaMigracao = round2(basePrev - basePrev18h);
      previdencia = round2(basePrev18h * PREVIDENCIA_ALIQUOTA);
    }
  }

  var abonoPermanenciaValor = params.abonoPermanencia ? previdencia : 0;

  var auxTransporte = params.comRegencia ? TRANSPORTE.comRegencia : TRANSPORTE.demais;
  var auxAlimentacao = ALIMENTACAO[cargaParaAuxilios];
  var auxilios = round2(auxTransporte + auxAlimentacao);

  var bruta = round2(total + trienioValor + aqValor + glpValor + dpValor + daValor + diespValor + gratFuncao + adicionalFuncao + ajudaCusto + auxilios);

  return {
    cargo: cargo,
    funcao: funcao,
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
    diespValor: diespValor,
    gratFuncao: gratFuncao,
    adicionalFuncao: adicionalFuncao,
    ajudaCusto: ajudaCusto,
    funcaoNome: funcao.nome !== "Nenhuma" ? funcao.nome : null,
    cargaEfetiva: cargaEfetiva,
    cargaParaGLP: cargaParaGLP,
    auxTransporte: auxTransporte,
    auxAlimentacao: auxAlimentacao,
    auxilios: auxilios,
    bruta: bruta,
    previdencia: previdencia,
    basePrev: basePrev,
    abonoPermanenciaValor: abonoPermanenciaValor,
    exibeAbonoPermanencia: abonoPermanenciaValor > 0,
    ref: ref,
    recomposicoesAtivas: getRecomposicoesAtivas(dataSim),
    exibeComplemento: complemento > 0,
    exibeTrienio: params.trienios > 0,
    exibeAQ: aqValor > 0,
    exibeGLP: glpValor > 0,
    exibeDP: dpValor > 0,
    exibeDA: daValor > 0,
    exibeDIESP: diespValor > 0,
    exibeGratFuncao: gratFuncao > 0,
    exibeAdicionalFuncao: adicionalFuncao > 0,
    exibeAjudaCusto: ajudaCusto > 0,
    exibeConversao40h: false,
    rubricaMigracao: rubricaMigracao,
  };
}

function calcular(params) {
  var r = calcularVencimentos(params);

  var pensao = params.pensaoAlimenticia || 0;
  var baseIRRF = round2(r.basePrev + r.glpValor - r.previdencia - pensao - (params.dependentes * DEDUCAO_DEPENDENTE));
  if (baseIRRF < 0) baseIRRF = 0;

  var irrf = round2(calcularIRRF(baseIRRF));
  var liquido = round2(r.bruta - r.previdencia - irrf - pensao + (r.abonoPermanenciaValor || 0));
  var aliquotaEfetivaIR = baseIRRF > 0 ? round2((irrf / baseIRRF) * 100) : 0;

  return {
    vb: r.vb,
    complemento: r.complemento,
    total: r.total,
    trienioValor: r.trienioValor,
    trienioPct: r.trienioPct,
    aqValor: r.aqValor,
    qualificacaoNome: r.qualificacaoNome,
    glpTempos: r.glpTempos,
    glpValor: r.glpValor,
    dpValor: r.dpValor,
    daValor: r.daValor,
    diespValor: r.diespValor,
    gratFuncao: r.gratFuncao,
    adicionalFuncao: r.adicionalFuncao,
    ajudaCusto: r.ajudaCusto,
    funcaoNome: r.funcaoNome,
    cargaEfetiva: r.cargaEfetiva,
    auxTransporte: r.auxTransporte,
    auxAlimentacao: r.auxAlimentacao,
    auxilios: r.auxilios,
    bruta: r.bruta,
    previdencia: r.previdencia,
    basePrev: r.basePrev,
    abonoPermanenciaValor: r.abonoPermanenciaValor,
    exibeAbonoPermanencia: r.exibeAbonoPermanencia,
    baseIRRF: baseIRRF,
    irrf: irrf,
    liquido: liquido,
    pensaoAlimenticia: pensao,
    aliquotaEfetivaIR: aliquotaEfetivaIR,
    ref: r.ref,
    recomposicoesAtivas: r.recomposicoesAtivas,
    exibeComplemento: r.exibeComplemento,
    exibeTrienio: r.exibeTrienio,
    exibeAQ: r.exibeAQ,
    exibeGLP: r.exibeGLP,
    exibeDP: r.exibeDP,
    exibeDA: r.exibeDA,
    exibeDIESP: r.exibeDIESP,
    exibeGratFuncao: r.exibeGratFuncao,
    exibeAdicionalFuncao: r.exibeAdicionalFuncao,
    exibeAjudaCusto: r.exibeAjudaCusto,
    exibeConversao40h: false,
    rubricaMigracao: r.rubricaMigracao,
  };
}

function calcularDupla(params1, params2, dataSimulacao, dependentes, pensaoAlimenticia) {
  var r1 = calcularVencimentos({
    cargoKey: params1.cargoKey,
    refIndex: params1.refIndex,
    trienios: params1.trienios,
    qualificacao: params1.qualificacao,
    funcaoKey: params1.funcaoKey,
    categoriaEscola: params1.categoriaEscola,
    comRegencia: params1.comRegencia,
    glpTempos: params1.glpTempos,
    dificilProvimento: params1.dificilProvimento,
    dificilAcesso: params1.dificilAcesso,
    diesp: params1.diesp,
    cedido: params1.cedido,
    abonoPermanencia: params1.abonoPermanencia,
    migrado18h: params1.migrado18h,
    incluirRubricaPrev: params1.incluirRubricaPrev,
    usarPiso2026: params1.usarPiso2026,
    dependentes: 0,
    dataSimulacao: dataSimulacao,
  });

  var r2 = calcularVencimentos({
    cargoKey: params2.cargoKey,
    refIndex: params2.refIndex,
    trienios: params2.trienios,
    qualificacao: params2.qualificacao,
    funcaoKey: params2.funcaoKey,
    categoriaEscola: params2.categoriaEscola,
    comRegencia: params2.comRegencia,
    glpTempos: params2.glpTempos,
    dificilProvimento: params2.dificilProvimento,
    dificilAcesso: params2.dificilAcesso,
    diesp: params2.diesp,
    cedido: params2.cedido,
    abonoPermanencia: params2.abonoPermanencia,
    migrado18h: params2.migrado18h,
    incluirRubricaPrev: params2.incluirRubricaPrev,
    usarPiso2026: params2.usarPiso2026,
    dependentes: 0,
    dataSimulacao: dataSimulacao,
  });

  var baseIRRF_semDep1 = round2(r1.basePrev + r1.glpValor - r1.previdencia);
  var baseIRRF_semDep2 = round2(r2.basePrev + r2.glpValor - r2.previdencia);

  var combinedBaseIRRF = Math.max(0, round2(baseIRRF_semDep1 + baseIRRF_semDep2 - pensaoAlimenticia - (dependentes * DEDUCAO_DEPENDENTE)));
  var combinedIRRF = round2(calcularIRRF(combinedBaseIRRF));

  var irrfSeparado1 = round2(calcularIRRF(Math.max(0, baseIRRF_semDep1)));
  var irrfSeparado2 = round2(calcularIRRF(Math.max(0, baseIRRF_semDep2)));
  var irrfTotalSeparado = round2(irrfSeparado1 + irrfSeparado2);

  function sum(prop) { return round2((r1[prop] || 0) + (r2[prop] || 0)); }

  var auxAlimentacaoTotal = sum('auxAlimentacao');
  var auxAlimentacaoCap = Math.min(auxAlimentacaoTotal, ALIMENTACAO[40]);
  var auxAlimentacaoDiff = round2(auxAlimentacaoTotal - auxAlimentacaoCap);

  if (auxAlimentacaoDiff > 0) {
    var r1AjusteAlim = round2(r1.auxAlimentacao - auxAlimentacaoCap);
    var r2AjusteAlim = r2.auxAlimentacao;
    r1.auxAlimentacao = auxAlimentacaoCap;
    r2.auxAlimentacao = 0;
    r1.bruta = round2(r1.bruta - r1AjusteAlim);
    r2.bruta = round2(r2.bruta - r2AjusteAlim);
    r1.auxilios = round2(r1.auxilios - r1AjusteAlim);
    r2.auxilios = round2(r2.auxilios - r2AjusteAlim);
  }

  // Auxílio transporte: pago uma única vez (Dec. 42.788/11, art. 1º, §2º)
  // Dupla matrícula → 2+ turmas → enquadra como "Demais" (5 créditos/semana)
  var auxTransporteUnico = TRANSPORTE.demais;
  var auxTransporteAjuste1 = round2(r1.auxTransporte - auxTransporteUnico);
  r1.auxTransporte = auxTransporteUnico;
  r1.bruta = round2(r1.bruta - auxTransporteAjuste1);
  r1.auxilios = round2(r1.auxilios - auxTransporteAjuste1);
  var auxTransporteAjuste2 = r2.auxTransporte;
  r2.auxTransporte = 0;
  r2.bruta = round2(r2.bruta - auxTransporteAjuste2);
  r2.auxilios = round2(r2.auxilios - auxTransporteAjuste2);
  var auxTransporteDiff = round2(auxTransporteAjuste1 + auxTransporteAjuste2);

  var combinedBruta = round2(r1.bruta + r2.bruta);
  var combinedPrevidencia = round2(r1.previdencia + r2.previdencia);
  var combinedLiquido = round2(combinedBruta - combinedPrevidencia - combinedIRRF - pensaoAlimenticia + (r1.abonoPermanenciaValor || 0) + (r2.abonoPermanenciaValor || 0));
  var cargaTotal = r1.cargaParaGLP + r2.cargaParaGLP + r1.glpTempos + r2.glpTempos;
  var excede65h = cargaTotal > MAX_CARGA_SEMANAL;

  return {
    matricula1: r1,
    matricula2: r2,
    combinado: {
      cargo1: r1.cargo,
      cargo2: r2.cargo,
      vb: sum('vb'),
      complemento: sum('complemento'),
      total: sum('total'),
      trienioValor: sum('trienioValor'),
      aqValor: sum('aqValor'),
      glpTempos: r1.glpTempos + r2.glpTempos,
      glpValor: sum('glpValor'),
      dpValor: sum('dpValor'),
      daValor: sum('daValor'),
      diespValor: sum('diespValor'),
      gratFuncao: sum('gratFuncao'),
      adicionalFuncao: sum('adicionalFuncao'),
      ajudaCusto: sum('ajudaCusto'),
      abonoPermanenciaValor: sum('abonoPermanenciaValor'),
      auxTransporte: sum('auxTransporte'),
      auxTransporteDiff: auxTransporteDiff,
      auxAlimentacao: auxAlimentacaoCap,
      auxAlimentacaoDiff: auxAlimentacaoDiff,
      auxilios: sum('auxilios'),
      bruta: combinedBruta,
      previdencia: combinedPrevidencia,
      basePrev: sum('basePrev'),
      baseIRRF: combinedBaseIRRF,
      irrf: combinedIRRF,
      irrfSeparado: irrfTotalSeparado,
      liquido: combinedLiquido,
      pensaoAlimenticia: pensaoAlimenticia,
      cargaTotal: cargaTotal,
      cargaParaGLP1: r1.cargaParaGLP,
      cargaParaGLP2: r2.cargaParaGLP,
      cargaEfetiva1: r1.cargaEfetiva,
      cargaEfetiva2: r2.cargaEfetiva,
      excede65h: excede65h,
      recomposicoesAtivas: r1.recomposicoesAtivas,
      exibeComplemento: r1.exibeComplemento || r2.exibeComplemento,
      exibeTrienio: r1.exibeTrienio || r2.exibeTrienio,
      exibeAQ: r1.exibeAQ || r2.exibeAQ,
      exibeGLP: r1.exibeGLP || r2.exibeGLP,
      exibeDP: r1.exibeDP || r2.exibeDP,
      exibeDA: r1.exibeDA || r2.exibeDA,
      exibeDIESP: r1.exibeDIESP || r2.exibeDIESP,
      exibeGratFuncao: r1.exibeGratFuncao || r2.exibeGratFuncao,
      exibeAdicionalFuncao: r1.exibeAdicionalFuncao || r2.exibeAdicionalFuncao,
      exibeAjudaCusto: r1.exibeAjudaCusto || r2.exibeAjudaCusto,
      exibeAbonoPermanencia: r1.exibeAbonoPermanencia || r2.exibeAbonoPermanencia,
    },
  };
}
