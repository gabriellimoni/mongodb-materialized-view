# MongoDB leanings and talks

## Materialized views

### Step by step demo

1. Iniciar instância do Mongo com 1 nó
1. Conectar com compass
1. Gerar dataset: `bun ./materialized-views/generate-dataset.ts`
1. Executar consulta sem MV: `bun ./materialized-views/query-without-mv.ts`
1. Gerar explain no compass
1. Gerar MV: `bun ./materialized-views/load-full-view.ts`
1. Executar consulta com MV: `bun ./materialized-views/query-mv.ts`
1. Gerar explain no compass
1. Criar índice: `bun ./materialized-views/create-index.ts`
1. Executar consulta com MV: `bun ./materialized-views/query-mv.ts`
1. Gerar explain no compass

### Bonus

1. Configurar change stream para carregar MV sob demanda
1. Adicionar uns documentos com preços bem altos
1. Executar consultas sem MV e com MV novamente

## Replica set

TODO...
