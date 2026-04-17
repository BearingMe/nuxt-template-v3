# Hierarquia de Componentes

## Regra da Hierarquia

Página → Componente → Primitivo

- **Página**: detém toda a lógica de negócio, orquestra estado e chamadas de API
- **Componente**: renderiza primitivos, pode ter estado derivado simples, composição horizontal
- **Primitivo**: sem estado, renderização pura (Button, Input, Text, componentes de UI de terceiros)

Nunca ultrapasse 3 níveis. Se sentir necessidade de um 4º nível, verifique: é lógica (vai para a página ou hook) ou estrutura (achate, reutilize primitivos).

---

## Contando Níveis

A profundidade da hierarquia é medida pela perspectiva do consumidor. Composição interna dentro de um primitivo é encapsulamento, não um novo nível. Se `FormText` usa `Input` internamente, isso é um detalhe de implementação — `FormText` ainda é um primitivo para quem o importa. Apenas os níveis visíveis ao consumidor contam.

Exemplo:

```
Login (página)
└── LoginForm (componente)
    ├── FormText (primitivo)      ← usa Input internamente — não conta como 4º nível
    └── FormPassword (primitivo)  ← mesmo caso: o Input interno é encapsulado
```

Três níveis visíveis ao consumidor. O aninhamento dentro de `FormText` é problema dele.

**Por que isso importa:** Se a composição interna contasse, todo primitivo que usa outro primitivo quebraria a regra dos 3 níveis. Um `Select` usa `Popover` que usa `Portal` — três níveis de primitivos sozinhos. Mas da perspectiva do consumidor, é apenas `Select`.

**Caso ambíguo — composição horizontal entre componentes:** Um componente (nível 2) pode renderizar outro componente (também nível 2) sem criar um novo nível, desde que ambos sejam coordenados pela mesma página. O nível é determinado por quem detém a lógica, não por quem renderiza quem. Se o componente filho recebe apenas props e emite eventos, ele ainda é nível 2 — a página continua sendo a orquestradora.

---

## Limites de Linhas de Código

LOC é um cheiro fraco — útil como sinal inicial, não como regra. Um componente com 120 linhas bem organizadas pode ser mais legível do que um com 60 linhas confusas. Use os números abaixo para levantar a questão, não para forçar uma extração.

| Tipo       | Referência de LOC | Sinal                                                               |
| ---------- | ----------------- | ------------------------------------------------------------------- |
| Página     | > 200 LOC         | Considere extrair componentes de tela. A lógica permanece na página |
| Componente | > 100 LOC         | Considere componentes compostos ou dividir responsabilidades        |
| Primitivo  | > 50 LOC          | Verifique se acumulou lógica ou responsabilidades demais            |

### Outros sinais para considerar uma extração

Estes são mais confiáveis do que LOC isolado:

- **Seções visualmente distintas**: o template tem blocos claramente separados que nunca interagem entre si (ex: um cabeçalho, um painel de filtros e uma tabela de resultados numa mesma página)
- **Scroll excessivo para entender o fluxo**: você precisa rolar muito para conectar um `ref` à sua utilização no template
- **Comentários de seção**: você adicionou comentários como `// --- Filtros ---` ou `// --- Tabela ---` para se orientar — isso é um sinal de que aquele bloco quer ser um componente
- **Props demais num componente**: mais de 5–6 props é sinal de que o componente está fazendo coisas demais ou que a composição seria mais adequada
- **Lógica condicional complexa no template**: múltiplos `v-if` aninhados ou condições longas inline geralmente indicam que aquele trecho merece seu próprio componente com props claras
- **Reutilização em outro lugar**: se você se pegar copiando um bloco para outra página, extraia antes de colar

---

## Propriedade da Lógica

- **Página primeiro**: todas as chamadas de API, validação de negócio e de submissão, gerenciamento de estado, orquestração
- **Componente**: recebe props e callbacks; estado derivado simples é permitido
- **Hooks / Composables**: para lógica compartilhada entre múltiplas páginas, OU quando a lógica de uma página é densa o suficiente para que extrair uma unidade coesa de comportamento melhore a legibilidade — mesmo que usada apenas uma vez. O teste: a parte extraída representa uma responsabilidade única e nomeável? Se sim, extraia. Se é apenas "a metade de cima da página movida para outro lugar", deixe inline.
- **Primitivo**: sem lógica, apenas renderização

---

## Props vs Composição

- **Props**: variações simples, casos pontuais
- **Componentes Compostos / Slots**: quando um componente tem 3+ seções nomeadas que são sempre usadas juntas, ou quando o mesmo padrão estrutural se repete entre instâncias

Padrão: prefira props, a menos que a estrutura se repita ou tenha 3+ seções co-dependentes.

---

## Organização de Pastas

> **Nota:** A estrutura abaixo é um exemplo, não uma prescrição. Adapte às convenções do seu framework primeiro — as opiniões do framework sempre têm prioridade. Next.js, Nuxt, SvelteKit, Remix, Astro e outros ditam seu próprio roteamento e layout de arquivos. Use isso como modelo mental para _separação de responsabilidades_, depois mapeie para o que seu framework espera.

Exemplo (SPA genérico):

```
components/ui/          → primitivos (Button, Input, Text, Icon)
components/app/         → componentes sem domínio claro, ou domínio com 1–2 componentes
components/<domínio>/   → domínio com 3+ componentes sempre usados juntos
pages/<tela>.tsx        → orquestrador no nível de página
hooks/                  → lógica compartilhada (ou composables/, utils/, etc.)
```

O princípio por trás da estrutura:

- Páginas orquestram, componentes renderizam, primitivos renderizam puramente
- Lógica compartilhada fica em um diretório dedicado (hooks, composables, helpers — como o ecossistema chamar)
- Extrações específicas de página ficam colocalizadas com sua página ou tela

---

## Otimização

Por padrão, chamadas de API pertencem à página. No entanto, quando um componente não é sempre renderizado — seja por lazy load ou por renderização condicional (`v-if`) — e sua query é necessária apenas quando ele é montado, é permitido que o componente possua sua própria query internamente.

**Condição:** o componente não deve ser sempre renderizado. O critério não é o mecanismo (lazy vs eager), mas sim se a query seria desperdiçada enquanto o componente está fora da tela.

Exemplo:

```
// Permitido — componente lazy loaded, query só executa quando montado
const HeavyPanel = defineAsyncComponent(() => import('./HeavyPanel.vue'))

// Dentro de HeavyPanel.vue
const { data } = useQuery(...)
```

```
// Permitido — componente condicional, mesmo sendo eager
// Dentro de ConditionalPanel.vue (renderizado com v-if)
const { data } = useQuery(...)
```

```
// Não permitido — componente sempre presente na página com query própria
import AlwaysVisiblePanel from './AlwaysVisiblePanel.vue'

// Dentro de AlwaysVisiblePanel.vue
const { data } = useQuery(...) // ← lógica deve estar na página
```

---

## Regras de Consistência

- Consistência supera esperteza
- Nomenclatura, estrutura de pastas, padrões de props, uso de hooks → previsíveis
- Reutilize apenas quando a lógica ou estrutura for repetida e estável

---

## Resumo

1. **Hierarquia**: Página → Componente → Primitivo (máximo 3 níveis visíveis ao consumidor; composição interna de primitivos é encapsulamento, não um novo nível)
2. **Limites de LOC**: Página > 200 → extraia componentes; Componente > 100 → composto; Primitivo < 50
3. **Props vs composição**: variações pequenas = props; 3+ seções co-dependentes ou estrutura repetida = composto
4. **Propriedade da lógica**: página detém, componentes renderizam, primitivos são puros, hooks/composables para lógica compartilhada ou extração coesa de uso único
5. **Pastas**: siga seu framework primeiro, depois separe por responsabilidade — primitivos, compartilhados, específicos da tela
6. **Consistência**: previsível acima de inteligente; padrões da comunidade acima de preferência pessoal
7. **Otimização**: componentes não renderizados sempre (lazy ou `v-if`) podem conter sua própria query; componentes sempre presentes não
