var CARGOS = {
  docente1_18h: {
    nome: "Professor Docente I - 18h",
    carga: 18,
    extincao: false,
    referencias: [
      { nivel: "C", ref: 3, vb: 1588.41, complemento: 602.09 },
      { nivel: "D", ref: 4, vb: 1778.98, complemento: 411.52 },
      { nivel: "D", ref: 5, vb: 1992.46, complemento: 198.04 },
      { nivel: "D", ref: 6, vb: 2231.06, complemento: 0.0 },
      { nivel: "D", ref: 7, vb: 2499.36, complemento: 0.0 },
      { nivel: "D", ref: 8, vb: 2799.27, complemento: 0.0 },
      { nivel: "D", ref: 9, vb: 3135.19, complemento: 0.0 },
    ],
  },
  docente1_30h: {
    nome: "Professor Docente I - 30h",
    carga: 30,
    extincao: false,
    referencias: [
      { nivel: "C", ref: 3, vb: 2647.3, complemento: 1003.53 },
      { nivel: "D", ref: 4, vb: 2964.98, complemento: 685.85 },
      { nivel: "D", ref: 5, vb: 3320.78, complemento: 330.05 },
      { nivel: "D", ref: 6, vb: 3718.43, complemento: 0.0 },
      { nivel: "D", ref: 7, vb: 4165.59, complemento: 0.0 },
      { nivel: "D", ref: 8, vb: 4665.47, complemento: 0.0 },
      { nivel: "D", ref: 9, vb: 5225.31, complemento: 0.0 },
    ],
  },
  docente2_22h: {
    nome: "Professor Docente II - 22h",
    carga: 22,
    extincao: true,
    referencias: [
      { nivel: "A", ref: 1, vb: 1125.55, complemento: 1551.72 },
      { nivel: "B", ref: 2, vb: 1260.61, complemento: 1416.66 },
      { nivel: "C", ref: 3, vb: 1411.92, complemento: 1265.35 },
      { nivel: "D", ref: 4, vb: 1581.31, complemento: 1095.96 },
      { nivel: "D", ref: 5, vb: 1771.08, complemento: 906.19 },
      { nivel: "D", ref: 6, vb: 1983.16, complemento: 694.11 },
      { nivel: "D", ref: 7, vb: 2221.65, complemento: 455.62 },
      { nivel: "D", ref: 8, vb: 2488.24, complemento: 189.03 },
      { nivel: "D", ref: 9, vb: 2786.83, complemento: 0.0 },
    ],
  },
  docente1_40h: {
    nome: "Professor Docente I - 40h",
    carga: 40,
    extincao: true,
    referencias: [
      { nivel: "C", ref: 3, vb: 3529.74, complemento: 1338.03 },
      { nivel: "D", ref: 4, vb: 3953.34, complemento: 914.43 },
      { nivel: "D", ref: 5, vb: 4427.72, complemento: 440.05 },
      { nivel: "D", ref: 6, vb: 4959.06, complemento: 0.0 },
      { nivel: "D", ref: 7, vb: 5554.11, complemento: 0.0 },
      { nivel: "D", ref: 8, vb: 6220.64, complemento: 0.0 },
      { nivel: "D", ref: 9, vb: 6967.11, complemento: 0.0 },
    ],
  },
};

var AQ = {
  18: { mestrado: 310.75, doutorado: 621.47 },
  22: { mestrado: 310.75, doutorado: 621.47 },
  30: { mestrado: 582.67, doutorado: 1165.28 },
  40: { mestrado: 621.47, doutorado: 1243.04 },
};

var ALIMENTACAO = {
  18: 239.52,
  22: 329.34,
  30: 449.1,
  40: 598.8,
};

var GLP = {
  baseMensal: 1588.41,
  temposBase: 48,
  minTempos: 1,
};

var TRANSPORTE = {
  comRegencia: 205.2,
  demais: 342.0,
};

var IRPF_FAIXAS = [
  { ate: 2428.8, aliquota: 0, deducao: 0 },
  { ate: 2826.65, aliquota: 7.5, deducao: 182.16 },
  { ate: 3751.05, aliquota: 15, deducao: 394.16 },
  { ate: 4664.68, aliquota: 22.5, deducao: 675.49 },
  { ate: Infinity, aliquota: 27.5, deducao: 908.73 },
];

var PREVIDENCIA_ALIQUOTA = 0.14;
var DEDUCAO_DEPENDENTE = 189.59;
var MAX_TRIENIOS = 11;
