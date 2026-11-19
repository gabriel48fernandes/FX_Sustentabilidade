/* ==========================================================================
   CONFIG — dados básicos do site (edite aqui, sem mexer nas páginas)
   Contato, redes, menu, mensagens do WhatsApp e vídeo do hero.
   O header, o rodapé e todos os botões de WhatsApp leem este arquivo.
   ========================================================================== */
window.FX_CONFIG = {

  /* ---------- Empresa ---------- */
  site: {
    name: "FX Sustentabilidade",
    legalName: "FX Sustentabilidade e Gestão",
    tagline: "Soluções ambientais que transformam negócios.",
    footerAbout: "Consultoria, gestão ambiental e sustentabilidade para empresas e instituições."
  },

  /* ---------- Contato ---------- */
  contact: {
    whatsapp: "5551980905963",            // só números, com 55 + DDD
    whatsappDisplay: "(51) 98090-5963",   // como aparece escrito no site
    email: "",                            // TODO: preencher (se vazio, o e-mail some do site)
    instagram: "fxsustentabilidade",      // sem @
    city: "",                             // TODO: ex. "Taquara, RS" (se vazio, não aparece)
    hours: ""                             // TODO: ex. "Seg a Sex, 8h às 18h" (se vazio, não aparece)
  },

  /* ---------- Logo ---------- */
  logo: {
    src: "assets/img/logo.svg",           // troque pelo arquivo oficial (mantenha o nome ou altere aqui)
    alt: "Logo FX Sustentabilidade",
    showText: true                        // false se o logo oficial já traz o nome escrito
  },

  /* ---------- Mensagens pré-preenchidas do WhatsApp ----------
     Use nos HTMLs com data-wa="budget", data-wa="academy", etc. */
  messages: {
    default:  "Olá! Vim pelo site da FX Sustentabilidade e gostaria de saber mais.",
    budget:   "Olá! Vim pelo site da FX Sustentabilidade e gostaria de solicitar um orçamento.",
    hospital: "Olá! Vim pelo site e gostaria de saber mais sobre o Projeto Hospital Sustentável.",
    academy:  "Olá! Tenho interesse na Academia FX (mentorias e cursos on-line). Podem me avisar quando abrir?",
    training: "Olá! Gostaria de um treinamento para a minha equipe.",
    project:  "Olá! Gostaria de levar um projeto de educação ambiental para a minha instituição."
  },

  /* ---------- Menu principal ----------
     key = valor de <body data-page="..."> (marca o item ativo) */
  nav: [
    { key: "home",     label: "Início",               href: "index.html" },
    { key: "quem",     label: "Quem somos",           href: "quem-somos.html" },
    { key: "servicos", label: "Serviços",             href: "servicos.html" },
    { key: "hospital", label: "Hospital Sustentável", href: "hospital-sustentavel.html" },
    { key: "academia", label: "Academia FX",          href: "academia-fx.html" },
    { key: "projetos", label: "Projetos",             href: "projetos.html" },
    { key: "contato",  label: "Contato",              href: "contato.html" }
    // Quando criar a página de blog: { key: "conteudos", label: "Conteúdos", href: "conteudos.html" }
  ],
  navCta: { label: "Orçamento", message: "budget" },

    /* ---------- Imagem do topo de cada página interna ----------
     Deixe "" para ficar só o fundo verde. Para usar uma foto, coloque o arquivo em
     assets/img/paginas/ e escreva o caminho (ex.: "assets/img/paginas/sede.jpg").
     Para ajustar o enquadramento: { src: "assets/img/paginas/sede.jpg", position: "50% 30%" }
     (position = horizontal vertical, de 0% a 100%). */
  pageHero: {
    quem:     "assets/img/paginas/sede.jpeg",   // ex.: "assets/img/paginas/sede.jpg"
    servicos: "",
    hospital: "",
    academia: "",
    projetos: "",
    contato:  ""
  },

  /* ---------- Hero da home (vídeo) ----------
     1) Coloque o 1º frame do vídeo em assets/img/hero-poster.jpg  (aparece na hora)
     2) Coloque o vídeo em assets/video/hero.mp4 e hero.webm       (entra por cima quando carregar)
     O vídeo só carrega em tela grande, sem economia de dados e sem "reduzir movimento". */
  hero: {
    video: {
      enabled: true,
      mp4: "assets/video/hero.mp4",
      webm: "assets/video/hero.webm",
      minWidth: 768                       // abaixo disso, só a imagem
    }
  }
};
