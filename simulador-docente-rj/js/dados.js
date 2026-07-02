var PISO = {
  18: 2190.50,
  22: 2677.27,
  25: 3042.36,
  30: 3650.83,
  40: 4867.77
};

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
  docente2_40h: {
    nome: "Professor Docente II - 40h",
    carga: 40,
    extincao: true,
    referencias: [
      { nivel: "A", ref: 1, vb: 2251.11, complemento: 0 },
      { nivel: "B", ref: 2, vb: 2521.26, complemento: 0 },
      { nivel: "C", ref: 3, vb: 2823.80, complemento: 0 },
      { nivel: "D", ref: 4, vb: 3162.63, complemento: 0 },
      { nivel: "D", ref: 5, vb: 3542.17, complemento: 0 },
      { nivel: "D", ref: 6, vb: 3967.24, complemento: 0 },
      { nivel: "D", ref: 7, vb: 4443.30, complemento: 0 },
      { nivel: "D", ref: 8, vb: 4976.50, complemento: 0 },
      { nivel: "D", ref: 9, vb: 5573.66, complemento: 0 },
    ],
  },
  supervisor_oe_ie_25h: {
    nome: "Prof. Supervisor/Orient./Inspetor Escolar - 25h",
    carga: 25,
    extincao: false,
    regencia: false,
    glp: false,
    referencias: [
      { nivel: "C", ref: 3, vb: 2206.08, complemento: 836.28 },
      { nivel: "D", ref: 4, vb: 2470.83, complemento: 571.53 },
      { nivel: "D", ref: 5, vb: 2767.32, complemento: 275.04 },
      { nivel: "D", ref: 6, vb: 3099.40, complemento: 0.0 },
      { nivel: "D", ref: 7, vb: 3471.32, complemento: 0.0 },
      { nivel: "D", ref: 8, vb: 3887.89, complemento: 0.0 },
      { nivel: "D", ref: 9, vb: 4354.44, complemento: 0.0 },
    ],
  },
};

var AQ = {
  18: { mestrado: 310.75, doutorado: 621.47 },
  22: { mestrado: 310.75, doutorado: 621.47 },
  25: { mestrado: 310.75, doutorado: 621.47 },
  30: { mestrado: 582.67, doutorado: 1165.28 },
  40: { mestrado: 621.47, doutorado: 1243.04 },
};

var ALIMENTACAO = {
  18: 239.52,
  22: 329.34,
  25: 374.25,
  30: 449.1,
  40: 598.8,
};

var GLP = {
  baseMensal: 1588.41,
  temposBase: 48,
  minTempos: 1,
};

var FUNCOES = {
  nenhuma: {
    nome: "Nenhuma",
    gratificacao: 0,
    carga40h: false,
    permiteGLP: true,
    permiteDPDA: true,
    ajudaCusto: 0,
    incidePrev: false,
  },
  coordenador_pedagogico: {
    nome: "Coordenador Pedagógico",
    gratificacao: 950.00,      // Dec. 44.711/14
    carga40h: true,             // Lei 9.584/2022
    permiteGLP: true,           // Art. 7 §único Dec. 46.920/20
    permiteDPDA: false,
    ajudaCusto: 0,
    incidePrev: true,           // gratificação de encargos especiais
  },
  diretor_geral: {
    nome: "Diretor Geral",
    gratificacao: null,
    categorias: {
      A: 2689.32,  // Dec. 42.926/11
      B: 2370.96,
      C: 1911.26,
      D: 1751.58,
      E: 1603.56,
    },
    carga40h: true,            // Lei 9.584/2022
    permiteGLP: false,
    permiteDPDA: false,
    ajudaCusto: 0,
    incidePrev: true,
  },
  diretor_adjunto: {
    nome: "Diretor Adjunto",
    gratificacao: null,
    categorias: {
      A: 1251.76,  // Dec. 43.299/11
      B: 1092.06,
      C: 1047.24,
      D:  950.00,
    },
    adicionalCatD: 71.82,  // Dec. 43.894/2012 — adicional para escolas Tipo D
    carga40h: true,            // Lei 9.584/2022
    permiteGLP: false,
    permiteDPDA: false,
    ajudaCusto: 0,
    incidePrev: true,
  },
  secretario_escolar: {
    nome: "Secretário Escolar",
    categorias: {
      A: 915.42,   // Dec. 43.668/12
      B: 835.58,
      C: 754.48,
      D: 684.22,
      E: 622.90,
    },
    carga40h: false,           // Lei 9.584 NÃO menciona secretário
    permiteGLP: false,
    permiteDPDA: false,
    ajudaCusto: 0,
    incidePrev: true,
  },
  agente_acompanhamento: {
    nome: "Agente de Acomp. da Gestão Escolar",
    gratificacao: null,        // Anexo Dec. 44.812/14
    carga40h: false,           // já é 40h por criação (Lei 6.479/13 Art. 2º §2º)
    permiteGLP: false,
    permiteDPDA: false,
    ajudaCusto: 300.00,        // Lei 6.834/14 Art. 4º (indenizatório)
    incidePrev: false,         // ajuda de custo é indenizatória
  },
  orientador_educacional: {
    nome: "Orientador Educacional",
    gratificacao: 950.00,      // Dec. 44.711/14
    carga40h: true,             // Lei 9.584/2022
    permiteGLP: true,           // Art. 6, III e Art. 7 §único Dec. 46.920/20
    permiteDPDA: false,
    ajudaCusto: 0,
    incidePrev: true,           // gratificação de encargos especiais
  },
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

var DIFICIL_PROVIMENTO = 400.00;   // Decreto 44.710/2014 (majorou Dec. 43.384/2011)
var DIFICIL_ACESSO = 141.02;       // Art. 38, II, Lei 1.614/1990 c/c Decreto 15.186/90

var PREVIDENCIA_ALIQUOTA = 0.14;
var DEDUCAO_DEPENDENTE = 189.59;
var MAX_TRIENIOS = 11;

var MAX_CARGA_SEMANAL = 65;   // Art. 8º, Dec. 46.920/20 — soma de cargos efetivos + GLP

var INSS_FAIXAS = [
  { ate: 1621.00, aliquota: 0.075, deducao: 0 },
  { ate: 2902.84, aliquota: 0.09, deducao: 24.32 },
  { ate: 4354.27, aliquota: 0.12, deducao: 111.40 },
  { ate: 8475.55, aliquota: 0.14, deducao: 198.49 },
  { ate: Infinity, aliquota: 0, deducao: 0, teto: 8475.55 },
];

var SALARIO_MINIMO = 1518.00;

var TIPO_OUTRA_RENDA = {
  clt: { nome: "CLT (particular)" },
  pj: { nome: "Pessoa Jurídica / MEI" },
  rede_federal: { nome: "Rede Federal ou Municipal" },
};

var RECOMPOSICOES = [
  { id: "parcela1",  descricao: "1ª parcela IPCA (50%) — Lei 9.436/21", pct: 13.05, competencia: "2022-01", jaAplicado: true },
  { id: "extra2023", descricao: "Recomposição extra — Lei 9.952/23",      pct:  5.90, competencia: "2023-01", jaAplicado: true },
  { id: "parcela2",  descricao: "1ª parcela de 2026 — Dec. 50.302/26", pct:  5.62, competencia: "2026-07", jaAplicado: false },
  { id: "parcela3",  descricao: "2ª parcela de 2026 — Dec. 50.302/26", pct:  5.62, competencia: "2026-10", jaAplicado: false },
];
