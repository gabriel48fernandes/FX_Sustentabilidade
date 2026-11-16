# FX Sustentabilidade — site institucional

Site estático (HTML + CSS + JS puro), sem build. Abra `index.html` no navegador ou rode `npx serve .`.
Deploy direto na Vercel (já tem `vercel.json` com URLs limpas: `/servicos` em vez de `/servicos.html`).

## Estrutura

```
fx-sustentabilidade/
├── index.html                  Início
├── quem-somos.html             Quem somos (+ equipe)
├── servicos.html               Catálogo A–K (accordion) + segmentos
├── hospital-sustentavel.html   Projeto Hospital Sustentável
├── academia-fx.html            Mentorias e produtos digitais (marcado "Em breve")
├── projetos.html               Projetos e resultados (+ galeria)
├── contato.html                Formulário → WhatsApp + dados de contato
├── css/
│   ├── variables.css           Paleta oficial e tokens (cores, fontes, espaçamentos)
│   ├── base.css                Reset, tipografia, layout genérico
│   ├── components.css          Botões, header, footer, cards, accordion, formulário
│   └── sections.css            Blocos específicos (hero, equipe, galeria, Academia...)
├── js/
│   ├── config.js               ⭐ Dados editáveis: contato, menu, mensagens do WhatsApp, vídeo do hero
│   └── main.js                 Header/rodapé, links do WhatsApp, hero em vídeo, animações, formulário
├── assets/
│   ├── img/                    logo, hero-poster.jpg, fotos (equipe/, projetos/)
│   └── video/                  hero.mp4 e hero.webm
└── vercel.json
```

## O que editar e onde

| Quero mudar…                              | Arquivo                                  |
|-------------------------------------------|------------------------------------------|
| WhatsApp, e-mail, Instagram, cidade, horário | `js/config.js` → `contact`             |
| Mensagens prontas do WhatsApp             | `js/config.js` → `messages`              |
| Itens do menu                             | `js/config.js` → `nav`                   |
| Logo (arquivo e se mostra o nome ao lado) | `js/config.js` → `logo` + `assets/img/`  |
| Cores e fontes                            | `css/variables.css`                      |
| Textos de cada página                     | o próprio `.html`                        |

O **header, o rodapé, o botão flutuante do WhatsApp** e todos os links `data-wa="..."` leem o `config.js`.
Nos HTMLs: `data-wa="budget"` (mensagem do config), `data-cfg="contact.email"` (texto), `data-show-if="contact.email"` (some se vazio).

## Hero com vídeo + frame inicial

1. Salve o **primeiro frame** do vídeo como `assets/img/hero-poster.jpg` (ideal ≤ 200 KB, 1920×1080). Ele aparece na hora.
2. Coloque o vídeo em `assets/video/hero.mp4` e `assets/video/hero.webm` (sem áudio, 10–15 s em loop, 2–4 MB).
3. Pronto: o vídeo entra com fade quando carregar. Em celular, com economia de dados ou "reduzir movimento", fica só a imagem.

Comandos úteis (ffmpeg):

```bash
# poster (1º frame)
ffmpeg -i original.mp4 -frames:v 1 -q:v 3 assets/img/hero-poster.jpg

# mp4 leve, sem áudio, 1080p
ffmpeg -i original.mp4 -an -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 28 -movflags +faststart assets/video/hero.mp4

# webm
ffmpeg -i original.mp4 -an -vf "scale=1920:-2" -c:v libvpx-vp9 -crf 36 -b:v 0 assets/video/hero.webm
```

## Fotos

Cada foto tem um bloco `.media` com comentário no HTML. Troque o texto interno por:

```html
<div class="media"><img src="assets/img/projetos/arquivo.jpg" alt="Descrição" loading="lazy"></div>
```

## Pendências para confirmar com a FX antes de publicar

- [ ] Logo oficial em `assets/img/` (hoje é um logo provisório "FX").
- [ ] E-mail, cidade/região de atendimento e horário (`js/config.js`).
- [ ] Cargos/formação do Alexandre e da Karina (`quem-somos.html`) e fotos.
- [ ] Serviço **K — Alvará sanitário** (`servicos.html`): o Instagram cita, mas o catálogo recebido não detalha. Itens estão genéricos.
- [ ] Textos dos Pontos Ecopedagógicos (`projetos.html`), escritos a partir do Instagram.
- [ ] Academia FX está como "Em breve" e com lista de espera via WhatsApp. Ajustar quando houver preços/links de venda.
- [ ] Bloco de números em `projetos.html` está comentado. Só ativar com dados reais.
- [ ] Página "Conteúdos" (blog) do menu sugerido ainda não foi criada.
