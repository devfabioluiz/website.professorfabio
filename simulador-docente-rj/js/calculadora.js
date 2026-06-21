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

function calcular(params) {
  var cargo = CARGOS[params.cargoKey];
  var ref = cargo.referencias[params.refIndex];
  var carga = cargo.carga;

  var total = round2(ref.vb + ref.complemento);

  var trienioPct = getTrienioPercentual(params.trienios);
  var trienioValor = trienioPct > 0 ? round2(total * trienioPct / 100) : 0;

  var aqValor = params.qualificacao === "nenhuma" ? 0 : round2(AQ[carga][params.qualificacao]);

  var glpTempos = params.glpTempos || 0;
  var glpValor = glpTempos > 0 ? round2(glpTempos * 4 * (GLP.baseMensal / GLP.temposBase)) : 0;

  var basePrev = round2(total + trienioValor + aqValor);

  var previdencia = round2(basePrev * PREVIDENCIA_ALIQUOTA);

  var baseIRRF = round2(basePrev + glpValor - previdencia - (params.dependentes * DEDUCAO_DEPENDENTE));
  if (baseIRRF < 0) baseIRRF = 0;

  var irrf = round2(calcularIRRF(baseIRRF));

  var auxTransporte = params.comRegencia ? TRANSPORTE.comRegencia : TRANSPORTE.demais;
  var auxAlimentacao = ALIMENTACAO[carga];
  var auxilios = round2(auxTransporte + auxAlimentacao);

  var bruta = round2(total + trienioValor + aqValor + glpValor + auxilios);

  var liquido = round2(bruta - previdencia - irrf);

  var aliquotaEfetivaIR = baseIRRF > 0 ? round2((irrf / baseIRRF) * 100) : 0;

  return {
    vb: ref.vb,
    complemento: ref.complemento,
    total: total,
    trienioValor: trienioValor,
    trienioPct: trienioPct,
    aqValor: aqValor,
    qualificacaoNome: params.qualificacao === "nenhuma" ? "Nenhuma" : (params.qualificacao === "mestrado" ? "Mestrado" : "Doutorado"),
    glpTempos: glpTempos,
    glpValor: glpValor,
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
    exibeComplemento: ref.complemento > 0,
    exibeTrienio: params.trienios > 0,
    exibeAQ: aqValor > 0,
    exibeGLP: glpValor > 0
  };
}
