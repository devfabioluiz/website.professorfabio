;(function () {
  'use strict'

  const LS_PREFIX = 'dieta_'

  const DIAS = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo']
  const DIAS_LABEL = {
    segunda: 'Segunda',
    terca: 'Terça',
    quarta: 'Quarta',
    quinta: 'Quinta',
    sexta: 'Sexta',
    sabado: 'Sábado',
    domingo: 'Domingo',
  }

  const MOTIVACIONAL = [
    { frase: 'A consistência supera a intensidade. Pequenas escolhas diárias criam grandes resultados.', autor: 'James Clear' },
    { frase: 'Não é sobre ter tempo, é sobre fazer do tempo uma prioridade.', autor: 'Desconhecido' },
    { frase: 'O corpo alcança o que a mente acredita.', autor: 'Napoleon Hill' },
    { frase: 'Disciplina é lembrar o que você quer.', autor: 'David Campbell' },
    { frase: 'Cada refeição é uma escolha. Escolha se fortalecer.', autor: 'Desconhecido' },
    { frase: 'A jornada de mil quilômetros começa com um único passo.', autor: 'Lao Tsé' },
    { frase: 'Cuide do seu corpo. É o único lugar que você tem para viver.', autor: 'Jim Rohn' },
  ]

  const planoAlimentar = {
    segunda: [
      {
        hora: '06:00',
        nome: 'Café da Manhã',
        items: ['170 g iogurte natural', '20 g aveia'],
        obs: '',
      },
      {
        hora: '08:00',
        nome: 'Colação',
        items: ['2 fatias pão Wickbold 5 zeros (60 g)', '60 g queijo minas', '1 banana média', 'Café sem açúcar'],
        obs: '',
      },
      {
        hora: '12:00',
        nome: 'Almoço',
        items: [
          '150 g arroz cozido',
          '100 g feijão',
          '120 g peito de frango',
          '100 g brócolis',
          '120 g legumes (cenoura + chuchu + abobrinha)',
          '100 g tomate cereja',
          'Alface à vontade',
          '5 ml azeite',
        ],
        obs: 'Temperos: alho, cebola, páprica, pimenta do reino',
      },
      {
        hora: '15:00',
        nome: 'Lanche',
        items: ['1 Itambé Protein', 'ou', '170 g iogurte', '20 g aveia'],
        obs: '',
      },
      {
        hora: '18:00',
        nome: 'Jantar',
        items: ['150 g arroz', '120 g frango', '100 g couve flor', '100 g legumes', '100 g tomate cereja', 'Alface', '5 ml azeite'],
        obs: 'Temperos: alho, páprica, cúrcuma',
      },
      {
        hora: '21:00',
        nome: 'Ceia',
        items: ['250 ml leite desnatado', 'Canela'],
        obs: '',
      },
    ],
    terca: [
      { hora: '06:00', nome: 'Café da Manhã', items: ['170 g iogurte natural', '20 g aveia'], obs: '' },
      {
        hora: '08:00',
        nome: 'Colação',
        items: ['2 fatias pão Wickbold 5 zeros (60 g)', '60 g queijo minas', '1 banana média', 'Café sem açúcar'],
        obs: '',
      },
      {
        hora: '12:00',
        nome: 'Almoço',
        items: [
          '150 g arroz cozido',
          '100 g feijão',
          '120 g patinho',
          '100 g brócolis',
          '120 g legumes (cenoura + chuchu + abobrinha)',
          '100 g tomate cereja',
          'Alface à vontade',
          '5 ml azeite',
        ],
        obs: 'Proteína: patinho. Temperos: alho, cebola, páprica, pimenta do reino',
      },
      { hora: '15:00', nome: 'Lanche', items: ['1 Itambé Protein', 'ou', '170 g iogurte', '20 g aveia'], obs: '' },
      {
        hora: '18:00',
        nome: 'Jantar',
        items: ['150 g arroz', '120 g patinho', '100 g couve flor', '100 g legumes', '100 g tomate cereja', 'Alface', '5 ml azeite'],
        obs: 'Proteína: patinho. Temperos: alho, páprica, cúrcuma',
      },
      { hora: '21:00', nome: 'Ceia', items: ['250 ml leite desnatado', 'Canela'], obs: '' },
    ],
    quarta: [
      { hora: '06:00', nome: 'Café da Manhã', items: ['170 g iogurte natural', '20 g aveia'], obs: '' },
      {
        hora: '08:00',
        nome: 'Colação',
        items: ['2 fatias pão Wickbold 5 zeros (60 g)', '60 g queijo minas', '1 banana média', 'Café sem açúcar'],
        obs: '',
      },
      {
        hora: '12:00',
        nome: 'Almoço',
        items: ['Penne', 'Molho de tomate', 'Frango', 'Brócolis'],
        obs: 'Massas com proteína',
      },
      { hora: '15:00', nome: 'Lanche', items: ['1 Itambé Protein', 'ou', '170 g iogurte', '20 g aveia'], obs: '' },
      {
        hora: '18:00',
        nome: 'Jantar',
        items: ['Penne', 'Molho de tomate', 'Frango', 'Brócolis'],
        obs: 'Idem almoço',
      },
      { hora: '21:00', nome: 'Ceia', items: ['250 ml leite desnatado', 'Canela'], obs: '' },
    ],
    quinta: [
      { hora: '06:00', nome: 'Café da Manhã', items: ['170 g iogurte natural', '20 g aveia'], obs: '' },
      {
        hora: '08:00',
        nome: 'Colação',
        items: ['2 fatias pão Wickbold 5 zeros (60 g)', '60 g queijo minas', '1 banana média', 'Café sem açúcar'],
        obs: '',
      },
      {
        hora: '12:00',
        nome: 'Almoço',
        items: [
          '150 g arroz cozido',
          '100 g feijão',
          '120 g atum sólido',
          '100 g brócolis',
          '120 g legumes (cenoura + chuchu + abobrinha)',
          '100 g tomate cereja',
          'Alface à vontade',
          '5 ml azeite',
        ],
        obs: 'Proteína: atum. Temperos: alho, cebola, páprica, pimenta do reino',
      },
      { hora: '15:00', nome: 'Lanche', items: ['1 Itambé Protein', 'ou', '170 g iogurte', '20 g aveia'], obs: '' },
      {
        hora: '18:00',
        nome: 'Jantar',
        items: ['150 g arroz', '120 g atum sólido', '100 g couve flor', '100 g legumes', '100 g tomate cereja', 'Alface', '5 ml azeite'],
        obs: 'Proteína: atum. Temperos: alho, páprica, cúrcuma',
      },
      { hora: '21:00', nome: 'Ceia', items: ['250 ml leite desnatado', 'Canela'], obs: '' },
    ],
    sexta: [
      { hora: '06:00', nome: 'Café da Manhã', items: ['170 g iogurte natural', '20 g aveia'], obs: '' },
      {
        hora: '08:00',
        nome: 'Colação',
        items: ['2 fatias pão Wickbold 5 zeros (60 g)', '60 g queijo minas', '1 banana média', 'Café sem açúcar'],
        obs: '',
      },
      {
        hora: '12:00',
        nome: 'Almoço',
        items: ['Espaguete', 'Patinho', 'Molho de tomate'],
        obs: 'Massas com patinho',
      },
      { hora: '15:00', nome: 'Lanche', items: ['1 Itambé Protein', 'ou', '170 g iogurte', '20 g aveia'], obs: '' },
      {
        hora: '18:00',
        nome: 'Jantar',
        items: ['Espaguete', 'Patinho', 'Molho de tomate'],
        obs: 'Idem almoço',
      },
      { hora: '21:00', nome: 'Ceia', items: ['250 ml leite desnatado', 'Canela'], obs: '' },
    ],
    sabado: [
      { hora: '06:00', nome: 'Café da Manhã', items: ['170 g iogurte natural', '20 g aveia'], obs: '' },
      {
        hora: '08:00',
        nome: 'Colação',
        items: ['2 fatias pão Wickbold 5 zeros (60 g)', '60 g queijo minas', '1 banana média', 'Café sem açúcar'],
        obs: '',
      },
      {
        hora: '12:00',
        nome: 'Almoço',
        items: ['150 g arroz cozido', '100 g feijão', 'Sardinha (75 g drenada)', '100 g brócolis', '100 g tomate cereja', 'Alface à vontade', '5 ml azeite'],
        obs: 'Proteína: sardinha. Temperos: alho, cebola, páprica',
      },
      { hora: '15:00', nome: 'Lanche', items: ['1 Itambé Protein', 'ou', '170 g iogurte', '20 g aveia'], obs: '' },
      {
        hora: '18:00',
        nome: 'Jantar',
        items: ['150 g arroz', 'Sardinha (75 g drenada)', '100 g legumes', '100 g tomate cereja', 'Alface', '5 ml azeite'],
        obs: 'Proteína: sardinha. Temperos: alho, páprica',
      },
      { hora: '21:00', nome: 'Ceia', items: ['250 ml leite desnatado', 'Canela'], obs: '' },
    ],
    domingo: [
      { hora: '06:00', nome: 'Café da Manhã', items: ['170 g iogurte natural', '20 g aveia'], obs: '' },
      {
        hora: '08:00',
        nome: 'Colação',
        items: ['2 fatias pão Wickbold 5 zeros (60 g)', '60 g queijo minas', '1 banana média', 'Café sem açúcar'],
        obs: '',
      },
      {
        hora: '12:00',
        nome: 'Almoço',
        items: ['Alimentos restantes da semana'],
        obs: 'Misturar alimentos disponíveis na despensa',
      },
      { hora: '15:00', nome: 'Lanche', items: ['1 Itambé Protein', 'ou', '170 g iogurte', '20 g aveia'], obs: '' },
      {
        hora: '18:00',
        nome: 'Jantar',
        items: ['Alimentos restantes da semana'],
        obs: 'Idem almoço',
      },
      { hora: '21:00', nome: 'Ceia', items: ['250 ml leite desnatado', 'Canela'], obs: '' },
    ],
  }

  const receitas = [
    {
      nome: 'Frango Grelhado',
      tempo: '20 min',
      nivel: 'Fácil',
      cor: '#f97316',
      bg: '#fff7ed',
      ingredientes: ['120 g peito de frango', 'Sal e pimenta do reino a gosto', '5 ml azeite', 'Alho picado a gosto'],
      preparo: 'Tempere o frango com sal, pimenta e alho. Aqueça o azeite em uma frigideira antiaderente. Grelhe o frango por 5-6 minutos de cada lado até dourar. Sirva com legumes cozidos.',
    },
    {
      nome: 'Patinho Acebolado',
      tempo: '25 min',
      nivel: 'Fácil',
      cor: '#8b5cf6',
      bg: '#f5f3ff',
      ingredientes: ['120 g patinho em tiras', '1 cebola média em rodelas', '5 ml azeite', 'Sal e pimenta do reino'],
      preparo: 'Aqueça o azeite em uma panela. Sele o patinho em fogo alto por 2 minutos. Adicione a cebola e refogue até dourar. Tempere com sal e pimenta. Sirva com arroz.',
    },
    {
      nome: 'Bowl Oriental',
      tempo: '30 min',
      nivel: 'Médio',
      cor: '#06b6d4',
      bg: '#ecfeff',
      ingredientes: ['100 g arroz cozido', '120 g frango ou patinho', '100 g brócolis', '100 g cenoura em tiras', 'Shoyu a gosto'],
      preparo: 'Cozinhe o arroz. Grelhe a proteína escolhida. Cozinhe os brócolis e a cenoura no vapor. Monte o bowl com arroz, proteína e legumes. Finalize com shoyu.',
    },
    {
      nome: 'Yakisoba',
      tempo: '30 min',
      nivel: 'Médio',
      cor: '#e11d48',
      bg: '#fff1f2',
      ingredientes: ['200 g udon', '120 g frango ou patinho', '100 g legumes (cenoura, couve flor, brócolis)', 'Shoyu', 'Molho inglês'],
      preparo: 'Cozinhe o udon conforme instruções. Em um wok ou frigideira grande, sele a proteína. Adicione os legumes e refogue. Acrescente o macarrão, shoyu e molho inglês. Misture bem e sirva.',
    },
    {
      nome: 'Macarrão Bolonhesa',
      tempo: '30 min',
      nivel: 'Fácil',
      cor: '#f97316',
      bg: '#fff7ed',
      ingredientes: ['200 g espaguete ou penne', '120 g patinho moído', '300 g molho de tomate', 'Alho e cebola'],
      preparo: 'Cozinhe o macarrão al dente. Em uma panela, refogue alho e cebola. Adicione o patinho moído e cozinhe até dourar. Acrescente o molho de tomate e deixe apurar. Misture o macarrão ao molho.',
    },
    {
      nome: 'Macarrão Cremoso',
      tempo: '25 min',
      nivel: 'Médio',
      cor: '#d946ef',
      bg: '#fdf4ff',
      ingredientes: ['200 g penne', '120 g frango desfiado', '200 g creme de leite leve', '50 g queijo minas ralado', 'Alho'],
      preparo: 'Cozinhe o penne. Em uma panela, refogue o alho e o frango desfiado. Adicione o creme de leite e o queijo. Misture o macarrão ao molho cremoso. Sirva quente.',
    },
    {
      nome: 'Sanduíche de Atum',
      tempo: '10 min',
      nivel: 'Fácil',
      cor: '#14b8a6',
      bg: '#f0fdfa',
      ingredientes: ['2 fatias pão Wickbold 5 zeros', '1 lata de atum sólido', 'Alface', 'Tomate cereja'],
      preparo: 'Escorra o atum. Toste levemente as fatias de pão. Monte o sanduíche com atum, alface e tomate. Sirva com café sem açúcar.',
    },
    {
      nome: 'Proteína de Soja Refogada',
      tempo: '20 min',
      nivel: 'Fácil',
      cor: '#22c55e',
      bg: '#f0fdf4',
      ingredientes: ['100 g proteína de soja (clara ou bacon)', 'Cebola picada', 'Alho', 'Shoyu', 'Páprica'],
      preparo: 'Hidrate a proteína de soja em água quente por 10 minutos. Escorra bem. Refogue cebola e alho, adicione a soja e tempere com shoyu e páprica. Cozinhe por 5 minutos.',
    },
  ]

  const despensa = [
    { nome: 'Proteína de soja clara', qtd: '102 g', categoria: 'Proteína', max: 500, val: 102 },
    { nome: 'Proteína de soja bacon', qtd: '36 g', categoria: 'Proteína', max: 500, val: 36 },
    { nome: 'Arroz branco', qtd: '742 g', categoria: 'Grãos', max: 1000, val: 742 },
    { nome: 'Feijão fradinho', qtd: '449 g', categoria: 'Grãos', max: 1000, val: 449 },
    { nome: 'Feijão branco', qtd: '306 g', categoria: 'Grãos', max: 1000, val: 306 },
    { nome: 'Macarrão Padre Nosso', qtd: '234 g', categoria: 'Massas', max: 500, val: 234 },
    { nome: 'Peito de frango', qtd: '592 g', categoria: 'Proteína', max: 1000, val: 592 },
    { nome: 'Ervilha congelada', qtd: '1070 g', categoria: 'Legumes', max: 1500, val: 1070 },
    { nome: 'Alho congelado no azeite', qtd: '106 g', categoria: 'Temperos', max: 200, val: 106 },
    { nome: 'Pão Wickbold', qtd: '400 g', categoria: 'Padaria', max: 500, val: 400 },
    { nome: 'Queijo Minas', qtd: '272 g', categoria: 'Laticínios', max: 500, val: 272 },
    { nome: 'Iogurte', qtd: '986 g', categoria: 'Laticínios', max: 1000, val: 986 },
    { nome: 'Legumes congelados', qtd: '694 g', categoria: 'Legumes', max: 1000, val: 694 },
    { nome: 'Couve flor', qtd: '274 g', categoria: 'Legumes', max: 500, val: 274 },
    { nome: 'Brócolis', qtd: '300 g', categoria: 'Legumes', max: 500, val: 300 },
    { nome: 'Patinho', qtd: '462 g', categoria: 'Proteína', max: 500, val: 462 },
    { nome: 'Suco de uva integral', qtd: '1693 g', categoria: 'Bebidas', max: 2000, val: 1693 },
    { nome: 'Itambé Protein', qtd: '2 unidades', categoria: 'Proteína', max: 6, val: 2 },
    { nome: 'Shoyu', qtd: '150 ml', categoria: 'Molhos', max: 300, val: 150 },
    { nome: 'Penne', qtd: '500 g', categoria: 'Massas', max: 500, val: 500 },
    { nome: 'Espaguete', qtd: '500 g', categoria: 'Massas', max: 500, val: 500 },
    { nome: 'Leite desnatado', qtd: '2 litros', categoria: 'Laticínios', max: 3, val: 2 },
    { nome: 'Leite semidesnatado', qtd: '1 litro', categoria: 'Laticínios', max: 3, val: 1 },
    { nome: 'Leite integral', qtd: '1 litro', categoria: 'Laticínios', max: 3, val: 1 },
    { nome: 'Creme de leite leve', qtd: '200 g', categoria: 'Laticínios', max: 300, val: 200 },
    { nome: 'Molho inglês', qtd: '150 ml', categoria: 'Molhos', max: 300, val: 150 },
    { nome: 'Molho madeira', qtd: '200 g', categoria: 'Molhos', max: 300, val: 200 },
    { nome: 'Udon', qtd: '200 g', categoria: 'Massas', max: 300, val: 200 },
    { nome: 'Suco de limão Castelo', qtd: '500 ml', categoria: 'Bebidas', max: 500, val: 500 },
    { nome: 'Molho de tomate', qtd: '3 sachês de 300 g', categoria: 'Molhos', max: 5, val: 3 },
    { nome: 'Amido de milho', qtd: '200 g', categoria: 'Outros', max: 300, val: 200 },
    { nome: 'Vinagre de arroz', qtd: '750 ml', categoria: 'Temperos', max: 750, val: 750 },
    { nome: 'Vinagre de álcool', qtd: '750 ml', categoria: 'Temperos', max: 750, val: 750 },
    { nome: 'Azeite', qtd: '500 ml', categoria: 'Temperos', max: 500, val: 500 },
    { nome: 'Atum sólido', qtd: '4 latas', categoria: 'Proteína', max: 8, val: 4 },
    { nome: 'Sardinha', qtd: '75 g drenada', categoria: 'Proteína', max: 150, val: 75 },
    { nome: 'Alface', qtd: '1 unidade', categoria: 'Legumes', max: 3, val: 1 },
    { nome: 'Alho moído', qtd: '500 g', categoria: 'Temperos', max: 500, val: 500 },
    { nome: 'Cebola picada', qtd: '2 potes de 200 g', categoria: 'Temperos', max: 3, val: 2 },
    { nome: 'Pimenta calabresa', qtd: '50 g', categoria: 'Temperos', max: 100, val: 50 },
    { nome: 'Cebola em pó', qtd: '112 g', categoria: 'Temperos', max: 200, val: 112 },
    { nome: 'Páprica defumada', qtd: '111 g', categoria: 'Temperos', max: 200, val: 111 },
    { nome: 'Cominho', qtd: '50 g', categoria: 'Temperos', max: 100, val: 50 },
    { nome: 'Cúrcuma', qtd: '97 g', categoria: 'Temperos', max: 150, val: 97 },
    { nome: 'Pimenta do reino', qtd: '50 g', categoria: 'Temperos', max: 100, val: 50 },
    { nome: 'Canela', qtd: 'A gosto', categoria: 'Temperos', max: 1, val: 0.5 },
    { nome: 'Adoçante', qtd: 'Disponível', categoria: 'Outros', max: 1, val: 0.5 },
    { nome: 'Hondashi', qtd: '60 g', categoria: 'Temperos', max: 100, val: 60 },
  ].sort(function (a, b) {
    return a.nome.localeCompare(b.nome, 'pt-BR')
  })

  const compras = ['Banana', 'Tomate cereja', 'Aveia', 'Ovos', 'Maçã', 'Mamão']

  const CATEGORIAS_DESPENSA = (function () {
    var cats = []
    despensa.forEach(function (item) {
      if (cats.indexOf(item.categoria) === -1) cats.push(item.categoria)
    })
    return cats.sort()
  })()

  function ls(key) {
    return LS_PREFIX + key
  }

  function load(key, def) {
    try {
      var v = localStorage.getItem(ls(key))
      return v !== null ? JSON.parse(v) : def
    } catch (e) {
      return def
    }
  }

  function save(key, val) {
    try {
      localStorage.setItem(ls(key), JSON.stringify(val))
    } catch (e) {}
  }

  var state = {
    water: load('water', 0),
    checked: load('checked', {}),
    comprasChecked: load('comprasChecked', {}),
    currentDay: 'segunda',
    currentPage: 'dashboard',
    despensaFilter: 'Todas',
    theme: load('theme', 'light'),
  }

  var els = {}

  function qs(sel, ctx) {
    return (ctx || document).querySelector(sel)
  }

  function qsa(sel, ctx) {
    return (ctx || document).querySelectorAll(sel)
  }

  function init() {
    els.app = qs('#app')
    els.loading = qs('#app-loading')
    els.sidebar = qs('#sidebar')
    els.overlay = qs('#sidebar-overlay')
    els.menuToggle = qs('#menu-toggle')
    els.topbarTitle = qs('#topbar-title')
    els.footerYear = qs('#footer-year')
    els.themeToggle = qs('#theme-toggle')
    els.navItems = qsa('.nav-item')
    els.pages = {
      dashboard: qs('#page-dashboard'),
      plano: qs('#page-plano'),
      receitas: qs('#page-receitas'),
      despensa: qs('#page-dispensa'),
      compras: qs('#page-compras'),
      sobre: qs('#page-sobre'),
    }

    els.footerYear.textContent = new Date().getFullYear()
    applyTheme(state.theme)

    renderDashboard()
    renderPlano()
    renderReceitas()
    renderDespensa()
    renderCompras()
    renderSobre()

    bindEvents()
    navigate('dashboard')

    setTimeout(function () {
      els.loading.classList.add('hidden')
      els.app.style.display = 'flex'
    }, 400)
  }

  function bindEvents() {
    els.navItems.forEach(function (btn) {
      btn.addEventListener('click', function () {
        navigate(btn.dataset.page)
      })
    })

    els.menuToggle.addEventListener('click', function () {
      els.sidebar.classList.toggle('open')
      els.overlay.classList.toggle('open')
    })

    els.overlay.addEventListener('click', function () {
      els.sidebar.classList.remove('open')
      els.overlay.classList.remove('open')
    })

    els.themeToggle.addEventListener('click', function () {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      save('theme', state.theme)
      applyTheme(state.theme)
    })
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme)
  }

  function navigate(page) {
    state.currentPage = page

    els.navItems.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.page === page)
    })

    Object.keys(els.pages).forEach(function (key) {
      els.pages[key].classList.toggle('active', key === page)
    })

    var titles = {
      dashboard: 'Dashboard',
      plano: 'Plano Alimentar',
      receitas: 'Receitas',
      despensa: 'Despensa',
      compras: 'Lista de Compras',
      sobre: 'Sobre',
    }
    els.topbarTitle.textContent = titles[page] || 'Dieta'

    els.sidebar.classList.remove('open')
    els.overlay.classList.remove('open')

    if (page === 'dashboard') updateDashboard()
    if (page === 'plano') updatePlanoProgress()
  }

  function renderDashboard() {
    var page = els.pages.dashboard
    var rand = MOTIVACIONAL[Math.floor(Math.random() * MOTIVACIONAL.length)]

    page.innerHTML =
      '<h2 class="page-title">Dashboard</h2>' +
      '<p class="page-subtitle">Visão geral do seu plano alimentar</p>' +
      '<div class="dashboard-grid">' +
      statCard('green', 'scale', 'Peso Inicial', '100,9 kg', 'Registro inicial') +
      statCard('blue', 'target', 'Objetivo', 'Emagrecimento', 'Preservação de massa muscular') +
      statCard('amber', 'trend-up', 'Refeições Hoje', '0/6', 'Clique no Plano Alimentar') +
      '<div class="card water-section" id="water-section">' +
      '<div class="water-header"><span class="water-label"><i data-lucide="droplets" style="width:16px;height:16px;vertical-align:middle;margin-right:6px"></i>Água</span><span class="water-meta">Meta: 3,5 L</span></div>' +
      '<div class="water-bar"><div class="water-fill" id="water-fill" style="width:0%"></div></div>' +
      '<div class="water-percent" id="water-percent">0 / 3500 ml (0%)</div>' +
      '<div class="water-actions">' +
      '<button class="water-btn" data-water="250">+250</button>' +
      '<button class="water-btn" data-water="500">+500</button>' +
      '<button class="water-btn reset" id="water-reset">Reset</button>' +
      '</div></div>' +
      '<div class="card weekly-progress-card">' +
      '<div class="weekly-header"><span class="weekly-title">Progresso Semanal</span><span class="weekly-percent" id="weekly-percent">0%</span></div>' +
      '<div class="weekly-bar"><div class="weekly-fill" id="weekly-fill" style="width:0%"></div></div>' +
      '<div class="weekly-days" id="weekly-days"></div></div>' +
      '<div class="card motivational-card">' +
      '<p class="motivational-text">"' + rand.frase + '"</p>' +
      '<p class="motivational-author">— ' + rand.autor + '</p></div>' +
      '</div>'

    updateWaterUI()
    updateWeeklyProgress()

    qs('#water-section').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-water]')
      if (btn) {
        state.water = Math.min(3500, state.water + parseInt(btn.dataset.water))
        save('water', state.water)
        updateWaterUI()
      }
      var reset = e.target.closest('#water-reset')
      if (reset) {
        state.water = 0
        save('water', state.water)
        updateWaterUI()
      }
    })
  }

  function statCard(iconBg, icon, label, value, desc) {
    return (
      '<div class="card stat-card">' +
      '<div class="stat-icon ' +
      iconBg +
      '"><i data-lucide="' +
      icon +
      '" style="width:22px;height:22px"></i></div>' +
      '<div><div class="stat-label">' +
      label +
      '</div><div class="stat-value">' +
      value +
      '</div><div class="stat-desc">' +
      desc +
      '</div></div></div>'
    )
  }

  function updateWaterUI() {
    var pct = Math.min(100, Math.round((state.water / 3500) * 100))
    var fill = qs('#water-fill')
    var pctEl = qs('#water-percent')
    if (fill) fill.style.width = pct + '%'
    if (pctEl) pctEl.textContent = state.water + ' / 3500 ml (' + pct + '%)'
  }

  function updateDashboard() {
    updateWaterUI()
    updateWeeklyProgress()
    var hoje = new Date().getDay()
    var diaSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'][hoje]
    var dia = DIAS.indexOf(diaSemana) !== -1 ? diaSemana : 'segunda'
    var refeicoes = planoAlimentar[dia] || []
    var feitas = 0
    refeicoes.forEach(function (r) {
      if (state.checked[dia + '-' + r.hora]) feitas++
    })
    var hojeCard = qs('.stat-card:nth-child(3) .stat-value')
    if (hojeCard) hojeCard.textContent = feitas + '/6'
  }

  function updateWeeklyProgress() {
    var total = 0
    var feitas = 0
    DIAS.forEach(function (dia) {
      var refeicoes = planoAlimentar[dia] || []
      refeicoes.forEach(function (r) {
        total++
        if (state.checked[dia + '-' + r.hora]) feitas++
      })
    })
    var pct = total > 0 ? Math.round((feitas / total) * 100) : 0
    var fill = qs('#weekly-fill')
    var pctEl = qs('#weekly-percent')
    if (fill) fill.style.width = pct + '%'
    if (pctEl) pctEl.textContent = pct + '%'

    var daysContainer = qs('#weekly-days')
    if (daysContainer) {
      daysContainer.innerHTML = ''
      DIAS.forEach(function (dia) {
        var ref = planoAlimentar[dia] || []
        var count = 0
        ref.forEach(function (r) {
          if (state.checked[dia + '-' + r.hora]) count++
        })
        var totalDia = ref.length
        var div = document.createElement('div')
        div.className = 'weekly-day' + (count === totalDia && totalDia > 0 ? ' completed' : '')
        div.innerHTML =
          '<span class="weekly-day-label">' +
          DIAS_LABEL[dia].substring(0, 3) +
          '</span>' +
          '<span class="weekly-day-icon"><i data-lucide="' +
          (count === totalDia && totalDia > 0 ? 'check-circle' : 'circle') +
          '" style="width:18px;height:18px"></i></span>' +
          '<span class="weekly-day-count">' +
          count +
          '/' +
          totalDia +
          '</span>'
        daysContainer.appendChild(div)
      })
      lucide.createIcons()
    }
  }

  function renderPlano() {
    var page = els.pages.plano
    page.innerHTML =
      '<h2 class="page-title">Plano Alimentar</h2>' +
      '<p class="page-subtitle">Acompanhe suas refeições do dia</p>' +
      '<div class="plano-days" id="plano-days"></div>' +
      '<div class="plano-meals" id="plano-meals"></div>'

    renderPlanoDays()
    renderPlanoMeals(state.currentDay)
  }

  function renderPlanoDays() {
    var container = qs('#plano-days')
    container.innerHTML = ''
    DIAS.forEach(function (dia) {
      var btn = document.createElement('button')
      btn.className = 'plano-day-btn' + (dia === state.currentDay ? ' active' : '')
      btn.textContent = DIAS_LABEL[dia]
      btn.dataset.dia = dia
      btn.addEventListener('click', function () {
        state.currentDay = dia
        qsa('.plano-day-btn').forEach(function (b) {
          b.classList.toggle('active', b.dataset.dia === dia)
        })
        renderPlanoMeals(dia)
      })
      container.appendChild(btn)
    })
  }

  function renderPlanoMeals(dia) {
    var container = qs('#plano-meals')
    var refeicoes = planoAlimentar[dia] || []
    container.innerHTML = ''

    refeicoes.forEach(function (ref) {
      var key = dia + '-' + ref.hora
      var isChecked = !!state.checked[key]
      var card = document.createElement('div')
      card.className = 'meal-card' + (isChecked ? ' checked' : '')
      card.dataset.key = key

      var itemsHtml = ''
      ref.items.forEach(function (item) {
        itemsHtml += '<span class="meal-item">' + escapeHtml(item) + '</span>'
      })

      card.innerHTML =
        '<div class="meal-check"><button class="meal-check-btn" data-key="' +
        key +
        '"><i data-lucide="check" style="width:14px;height:14px"></i></button></div>' +
        '<div class="meal-content"><div class="meal-header">' +
        '<span class="meal-time">' +
        ref.hora +
        '</span>' +
        '<span class="meal-name">' +
        escapeHtml(ref.nome) +
        '</span></div>' +
        '<div class="meal-items">' +
        itemsHtml +
        '</div>' +
        (ref.obs ? '<div class="meal-obs">' + escapeHtml(ref.obs) + '</div>' : '') +
        '</div>'

      card.addEventListener('click', function (e) {
        var btn = e.target.closest('.meal-check-btn')
        if (!btn) return
        var k = btn.dataset.key
        state.checked[k] = !state.checked[k]
        save('checked', state.checked)
        card.classList.toggle('checked', state.checked[k])
        updateWeeklyProgress()
        updateDashboard()
      })

      container.appendChild(card)
    })

    lucide.createIcons()
  }

  function updatePlanoProgress() {
    renderPlanoMeals(state.currentDay)
  }

  function renderReceitas() {
    var page = els.pages.receitas
    var html = '<h2 class="page-title">Receitas</h2>' +
      '<p class="page-subtitle">Opções para variar seu cardápio</p>' +
      '<div class="receitas-grid" id="receitas-grid">'

    receitas.forEach(function (rec, idx) {
      var shortIng = rec.ingredientes.slice(0, 3).join(', ') + (rec.ingredientes.length > 3 ? '...' : '')
      html +=
        '<div class="receita-card" data-idx="' +
        idx +
        '">' +
        '<div class="receita-img" style="background:linear-gradient(135deg,' +
        rec.bg +
        ',' +
        rec.cor +
        '22)">' +
        '<span style="font-size:2.5rem">&#127858;</span></div>' +
        '<div class="receita-body"><div class="receita-title">' +
        escapeHtml(rec.nome) +
        '</div>' +
        '<div class="receita-meta"><span><i data-lucide="clock" style="width:14px;height:14px"></i>' +
        rec.tempo +
        '</span><span><i data-lucide="chef-hat" style="width:14px;height:14px"></i>' +
        rec.nivel +
        '</span></div>' +
        '<div class="receita-desc">' +
        escapeHtml(shortIng) +
        '</div></div>' +
        '<div class="receita-detail" id="receita-detail-' +
        idx +
        '">' +
        '<h4>Ingredientes</h4><ul>' +
        rec.ingredientes
          .map(function (i) {
            return '<li>' + escapeHtml(i) + '</li>'
          })
          .join('') +
        '</ul>' +
        '<h4>Modo de Preparo</h4><p>' +
        escapeHtml(rec.preparo) +
        '</p></div></div>'
    })

    html += '</div>'
    page.innerHTML = html

    qsa('.receita-card').forEach(function (card) {
      card.addEventListener('click', function () {
        card.classList.toggle('expanded')
      })
    })

    lucide.createIcons()
  }

  function renderDespensa() {
    var page = els.pages.despensa
    page.innerHTML =
      '<h2 class="page-title">Despensa</h2>' +
      '<p class="page-subtitle">Controle dos alimentos disponíveis</p>' +
      '<div class="filter-tabs" id="despensa-filters">' +
      '<button class="filter-tab active" data-cat="Todas">Todas</button>' +
      CATEGORIAS_DESPENSA.map(function (cat) {
        return '<button class="filter-tab" data-cat="' + cat + '">' + cat + '</button>'
      }).join('') +
      '</div>' +
      '<div class="despensa-grid" id="despensa-grid"></div>'

    renderDespensaItems('Todas')

    qs('#despensa-filters').addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-tab')
      if (!btn) return
      state.despensaFilter = btn.dataset.cat
      qsa('.filter-tab').forEach(function (t) {
        t.classList.toggle('active', t.dataset.cat === state.despensaFilter)
      })
      renderDespensaItems(state.despensaFilter)
    })
  }

  function renderDespensaItems(categoria) {
    var container = qs('#despensa-grid')
    var filtered = categoria === 'Todas' ? despensa : despensa.filter(function (item) {
      return item.categoria === categoria
    })

    container.innerHTML = filtered
      .map(function (item) {
        var pct = Math.min(100, Math.round((item.val / item.max) * 100))
        var level = pct > 60 ? 'high' : pct > 30 ? 'medium' : 'low'
        return (
          '<div class="despensa-card">' +
          '<div class="despensa-header">' +
          '<span class="despensa-nome">' +
          escapeHtml(item.nome) +
          '</span>' +
          '<span class="despensa-categoria">' +
          item.categoria +
          '</span></div>' +
          '<span class="despensa-qtd">' +
          item.qtd +
          '</span>' +
          '<div class="despensa-bar"><div class="despensa-fill ' +
          level +
          '" style="width:' +
          pct +
          '%"></div></div></div>'
        )
      })
      .join('')
  }

  function renderCompras() {
    var page = els.pages.compras
    var html =
      '<h2 class="page-title">Lista de Compras</h2>' +
      '<p class="page-subtitle">Itens para adquirir na próxima ida ao mercado</p>' +
      '<div class="compras-list" id="compras-list">'

    compras.forEach(function (item) {
      var isChecked = !!state.comprasChecked[item]
      html +=
        '<div class="compras-item' +
        (isChecked ? ' checked' : '') +
        '" data-item="' +
        escapeHtml(item) +
        '">' +
        '<div class="compras-check"><i data-lucide="check" style="width:12px;height:12px"></i></div>' +
        '<span class="compras-nome">' +
        escapeHtml(item) +
        '</span></div>'
    })

    html += '</div>'
    page.innerHTML = html

    qs('#compras-list').addEventListener('click', function (e) {
      var item = e.target.closest('.compras-item')
      if (!item) return
      var nome = item.dataset.item
      state.comprasChecked[nome] = !state.comprasChecked[nome]
      save('comprasChecked', state.comprasChecked)
      item.classList.toggle('checked', state.comprasChecked[nome])
    })

    lucide.createIcons()
  }

  function renderSobre() {
    var page = els.pages.sobre
    page.innerHTML =
      '<h2 class="page-title">Sobre</h2>' +
      '<div class="card sobre-card">' +
      '<div class="sobre-text">' +
      '<p>Este site foi criado para organizar minha dieta semanal, facilitar o acompanhamento das refeições e controlar os alimentos disponíveis na despensa.</p>' +
      '<p>Aqui você encontra um plano alimentar detalhado para todos os dias da semana, com horários definidos e ingredientes especificados. O progresso é salvo automaticamente no seu navegador, permitindo que você retome de onde parou.</p>' +
      '<p>O objetivo é emagrecimento com preservação de massa muscular, combinando alimentação balanceada com treinos adequados.</p>' +
      '</div></div>'
  }

  function escapeHtml(str) {
    var div = document.createElement('div')
    div.appendChild(document.createTextNode(str))
    return div.innerHTML
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
