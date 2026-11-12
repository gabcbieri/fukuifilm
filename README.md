# FUKUIFILM

Website institucional e portfólio digital da FUKUIFILM, desenvolvido para apresentar projetos de fotografia, audiovisual, campanhas e direção visual.

A aplicação utiliza Astro e TypeScript, com geração de páginas estáticas para produção e foco em performance, responsividade e experiência de navegação.

## Stack tecnológica

| Tecnologia | Aplicação |
|---|---|
| Astro | Framework de desenvolvimento e geração de páginas |
| TypeScript | Tipagem estática e lógica da aplicação |
| Tailwind CSS 4 | Estilização e interface |
| Bun | Gerenciamento de dependências e scripts |
| Docker | Containerização |
| Nginx | Servidor web |
| Cloudflare Pages | Hospedagem e deploy |

## Arquitetura

```text
fukuifilm/
├── design/              # Referências e arquivos de design
├── public/              # Assets estáticos
│   ├── img/
│   └── videos/
├── src/                 # Código-fonte da aplicação
├── videos/              # Mídias do projeto
├── astro.config.mjs     # Configuração do Astro
├── package.json         # Dependências e scripts
├── tsconfig.json        # Configuração do TypeScript
├── Dockerfile           # Definição da imagem Docker
├── compose.yaml         # Orquestração dos serviços
└── nginx.conf           # Configuração do Nginx
```

## Requisitos

- Bun
- Node.js compatível com a versão do Astro
- Docker e Docker Compose (opcionais)

## Instalação

Clone o repositório:

```bash
git clone https://github.com/gabcbieri/fukuifilm.git
cd fukuifilm
```

Instale as dependências:

```bash
bun install
```

## Desenvolvimento

Inicie o servidor local:

```bash
bun run dev
```

A aplicação estará disponível em `http://localhost:4321`.

## Validação e build

Execute a verificação do projeto:

```bash
bun run check
```

Gere os arquivos de produção:

```bash
bun run build
```

O Astro gera as páginas HTML estáticas e os recursos de produção no diretório `dist/`.

Para visualizar a versão compilada:

```bash
bun run preview
```

## Docker

Construa a imagem e inicie os serviços:

```bash
docker compose up --build
```

## Deploy

O projeto utiliza Cloudflare Pages integrado ao GitHub para automação de build e publicação.

| Configuração | Valor |
|---|---|
| Build command | `bun run build` |
| Build output directory | `dist` |
| Production branch | `main` |

As alterações enviadas à branch de produção são processadas pela integração de deploy da Cloudflare Pages.

---

**FUKUIFILM** — Fotografia, campanhas e filmes.
