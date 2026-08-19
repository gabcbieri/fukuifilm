# FUKUIFILM

Site institucional e portfólio desenvolvido com Astro, TypeScript, Tailwind CSS 4 e Docker. A identidade visual original foi preservada; a arquitetura e as interações foram modernizadas.

## Desenvolvimento

```bash
bun install
bun run dev
```

Acesse `http://localhost:4321`.

## Qualidade e produção

```bash
bun run check
bun run build
bun run preview
```

## Docker

```bash
docker compose up --build
```

Acesse `http://localhost:8080`.

## Estrutura

- `src/pages`: páginas Astro.
- `src/layouts`: estrutura compartilhada e metadados.
- `src/data`: conteúdo tipado dos projetos.
- `src/scripts`: interações e animações em TypeScript.
- `src/styles`: Tailwind, tokens visuais e animações.
- `public`: imagens e CSS legado preservado para paridade visual.

## Restauração

A versão imediatamente anterior à migração está marcada pela tag `antes-migracao-astro` e pelo commit `4e75c19`.

Para voltar preservando o histórico, reverta o commit da migração:

```bash
git revert <commit-da-migracao>
```

Para apenas inspecionar a versão anterior:

```bash
git switch --detach antes-migracao-astro
```
