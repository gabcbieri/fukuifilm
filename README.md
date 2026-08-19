# FUKUIFILM

Site institucional e portfólio da FUKUIFILM, construído com HTML, CSS, JavaScript e um servidor estático em Bun.

## Desenvolvimento

```bash
bun install
bun run dev
```

Acesse `http://localhost:3000`.

## Verificações

```bash
bun run typecheck
bun run optimize:images
```

## Restaurar a versão anterior

O estado anterior às otimizações está no commit `da8c146`. Para visualizá-lo sem alterar o histórico, use `git switch --detach da8c146`. Para desfazer o commit final das melhorias, use `git revert <commit>`.
