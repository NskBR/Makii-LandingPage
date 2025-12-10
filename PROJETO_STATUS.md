# Status do Projeto - MAKII Publicidade

## Resumo
Landing page moderna para a MAKII Publicidade, agência e produtora digital de Manaus.

---

## Tecnologias Utilizadas
- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animações)

---

## Estrutura de Componentes

```
src/
├── app/
│   ├── globals.css       # Estilos globais e variáveis
│   ├── layout.tsx        # Layout principal com metadata
│   └── page.tsx          # Página inicial (composição dos componentes)
├── components/
│   ├── Header.tsx        # Navegação centralizada (Início, Serviços, Sobre)
│   ├── Hero.tsx          # Seção principal com logo e animações
│   ├── ScrollMarquee.tsx # Marquee animado com palavras-chave
│   ├── Services.tsx      # Cards de serviços oferecidos
│   ├── VideoShowcase.tsx # Player de vídeo + Slideshow de fotos
│   ├── About.tsx         # Seção "Quem Somos"
│   ├── Contact.tsx       # Contato (Email, WhatsApp, Instagram)
│   └── Footer.tsx        # Rodapé
public/
├── logo.jpeg             # Logo da marca
├── Video/
│   ├── drone.mp4         # Vídeo de drone
│   └── evento.mp4        # Vídeo de eventos
└── fotos/
    ├── fotografia.jpg    # Foto 1 do slideshow
    └── fotografia2.jpg   # Foto 2 do slideshow
```

---

## Funcionalidades Implementadas

### Header
- [x] Navegação centralizada
- [x] Links: Início, Serviços, Sobre
- [x] Botão "Fale Conosco" (vai para seção de contato)
- [x] Menu mobile responsivo

### Hero
- [x] Logo da marca
- [x] Animações de entrada
- [x] Texto principal com gradient

### ScrollMarquee
- [x] Marquee 1: Palavras-chave (Marketing Criativo, Estratégia Digital, etc.)
- [x] Marquee 2: Serviços (Tráfego Pago, Gestão de Redes, etc.)
- [x] Removido: Seção de clientes (Marquee 3)

### Services
- [x] Cards de serviços com ícones
- [x] Animações de hover
- [x] Serviços: Tráfego Pago, Gestão de Redes, Produção de Conteúdo, Cobertura de Eventos, Drone 360°

### VideoShowcase
- [x] Player de vídeo à esquerda
- [x] Botões de seleção à direita (Drone, Eventos, Fotografia)
- [x] Transição suave entre vídeos
- [x] Slideshow de fotos para "Fotografia Profissional"
- [x] Animação de slide (arrastar) no slideshow
- [x] Ícone de câmera no botão de fotografia
- [x] Tamanho fixo baseado no primeiro vídeo
- [x] Background/moldura ajustado ao tamanho do player

### About
- [x] Seção "Quem Somos"
- [x] Texto sobre a agência
- [x] Animações de entrada

### Contact
- [x] Cards de contato (Email, WhatsApp, Instagram)
- [x] Email: makiiagenciadigital6@gmail.com
- [x] WhatsApp: (92) 98168-6606
- [x] Instagram: @makii.publicidade
- [x] Botão CTA para WhatsApp
- [x] Animações de hover nos cards

### Footer
- [x] Copyright
- [x] Links sociais

---

## Componentes Removidos
- ~~Portfolio~~ (removido a pedido)
- ~~ScrollSections~~ ("Nosso processo como trabalhamos" - removido)
- ~~Seção de Clientes~~ no ScrollMarquee (removido)
- ~~Link "Contato"~~ no Header (já tem "Fale Conosco")
- ~~Link "Portfólio"~~ no Header

---

## Deploy

### GitHub
- Repositório: https://github.com/NskBR/Makii-LandingPage
- Branch: main

### Netlify
- [x] Arquivo `netlify.toml` configurado
- Build command: `npm run build`
- Publish directory: `.next`
- Plugin: `@netlify/plugin-nextjs`

---

## Informações de Contato da Empresa
- **Nome:** MAKII Publicidade
- **Localização:** Manaus, AM - Brasil
- **Email:** makiiagenciadigital6@gmail.com
- **WhatsApp:** (92) 98168-6606
- **Instagram:** @makii.publicidade

---

## Comandos Úteis

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar servidor de produção
npm run start
```

---

## Notas para Próximas Sessões

1. **VideoShowcase** usa um sistema de referência invisível para manter o tamanho do player consistente
2. **Slideshow** usa Framer Motion com `variants` e `custom` prop para animação direcional
3. **Header** tem navegação centralizada com `absolute left-1/2 -translate-x-1/2`
4. Todos os componentes usam `useInView` do Framer Motion para animações de entrada

---

*Última atualização: Dezembro 2024*
