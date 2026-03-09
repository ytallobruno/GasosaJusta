# Gasosa Justa ⛽

[Andamento](#andamento-do-projeto-) • [Arquitetura](#arquitetura-) • [Ferramentas Utilizadas](#ferramentas-utilizadas-️) • [Como contribuir](#como-contribuir-)

## Descrição da aplicação

O **Gasosa Justa** é uma aplicação ágil e acessível desenhada para acabar com as contas de cabeça desorganizadas na hora de rachar despesas automobilísticas entre amigos ou passageiros.

Seja para uma longa viagem, um rolê pelo litoral ou caronas diárias, a ferramenta entrega a **divisão exata** calculando o peso da distância percorrida, do consumo médio do veículo, do preço atual do abastecimento e de eventuais despesas com pedágios físicos. Tudo embalado num design Neobrutalista e mecânico inspirado em sistemas de fliperama clássicos.

---

## Andamento do projeto 📈

[![Status](https://img.shields.io/website?down_message=em%20andamento&label=STATUS&style=for-the-badge&up_message=ONLINE&url=https://gasosajusta.netlify.app/)](https://gasosajusta.netlify.app/)

Para visualizar meu projeto, **[clique aqui](https://gasosajusta.netlify.app/)**.

---

## Arquitetura 🏗

O projeto adota uma estrutura **feature-based** (orientada a domínio), separando responsabilidades por funcionalidade em vez de por tipo de arquivo.

```text
src/
├── app/                          # Rotas e layout (Next.js App Router)
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── features/
│   ├── calc/
│   │   └── services/
│   │       └── fuelCalculator.ts # Lógica de cálculo (pure functions)
│   └── trip/
│       ├── components/
│       │   ├── GasForm.tsx       # Formulário principal
│       │   └── FuelCost.tsx      # Exibição dos resultados
│       ├── hooks/
│       │   └── useGasForm.ts     # Estado e handlers do formulário
│       └── types/
│           └── trip.types.ts     # Tipagens do domínio de viagem
├── ui/
│   └── Switch.tsx                # Componente atômico compartilhável
└── lib/
    └── formatters.ts             # Utilitários de formatação (pt-BR)
```

### Convenções

| Camada                    | Responsabilidade                                       |
| ------------------------- | ------------------------------------------------------ |
| `app/`                    | Composição de rotas e layout global                    |
| `features/<domínio>/`     | Lógica, UI e tipos de cada funcionalidade              |
| `features/calc/services/` | Funções puras de cálculo (determinísticas e testáveis) |
| `ui/`                     | Componentes atômicos sem lógica de negócio             |
| `lib/`                    | Utilitários cross-cutting (formatadores, parsers)      |

### Aliases de caminho

```ts
@/*          → src/*
@/features/* → src/features/*
@/ui/*       → src/ui/*
@/lib/*      → src/lib/*
@/app/*      → src/app/*
```

---

## Ferramentas utilizadas 🛠️

Utilizei as seguintes tecnologias core em meu projeto:

- TypeScript
- Next.js 16
- Tailwind CSS
- Framer Motion
- Headless UI
- Vitest (testes unitários)
- Deploy: Netlify

---

## Scripts disponíveis

```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build de produção
npm run start      # Servidor de produção
npm run lint       # Verificação de lint
npm run format     # Formatação com Prettier
npm test           # Testes unitários (Vitest)
npm run test:watch # Testes em modo watch
```

---

## Como contribuir 📫

Para contribuir com o nosso projeto, siga estas etapas simples:

> 1. Bifurque este repositório (fork).
> 2. Crie um novo branch: `git checkout -b <nome_branch>`.
> 3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
> 4. Certifique-se de que os testes passam: `npm test`
> 5. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
> 6. Crie a solicitação de Pull Request.
>
> _Consulte a documentação oficial do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)._

---

### Criado e desenvolvido por Ytallo Bruno

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ytallobruno)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ytallobruno/)
