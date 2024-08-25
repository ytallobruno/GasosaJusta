# Gasosa Justa ⛽

<div id="inicio" align=center>
  <a href="#andamento">Andamento</a>&nbsp;&nbsp;
  <a href="#ferramentas">Ferramentas Utilizadas</a>&nbsp;&nbsp;
  <a href="#contribuir">Como contribuir</a>&nbsp;&nbsp;
  <a href="#react">REACT</a>&nbsp;&nbsp;
</div>

## Descrição da aplicação:

Projeto feito com a intenção de usar o gasto por pessoa da gasolina para uma viagem, roles e afins.

<br>

<h2 id="andamento">Andamento do projeto 📈</h2>

> ![Badge](https://img.shields.io/website?down_message=em%20andamento&label=STATUS&style=for-the-badge&up_message=conclu%C3%ADdo&url=https://gasosajusta.netlify.app/)
>
> Para visualizar meu projeto, <a href="https://"> **clique aqui**</a>.

<br>

<h2 id="ferramentas"> Ferramentas utilizadas 🛠️</h2>

Utilizei as seguintes ferramentas em meu projeto:

- Typescript
- React (Vite)
- Deploy: Netlify
- Além de dependências como:

```json
  "dependencies": {
    "@chakra-ui/react": "2.8.2",
    "@emotion/react": "11.13.3",
    "@emotion/styled": "11.13.0",
    "framer-motion": "11.3.29",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "eslint": "^9.9.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "globals": "^15.9.0",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.0.1",
    "vite": "^5.4.1"
  }
```

<br>

<h2 id="contribuir">Como contribuir 📫</h2>

Para contribuir com nosso projeto, siga estas etapas:

> - Bifurque este repositório (fork).
> - Crie um branch: `git checkout -b <nome_branch>`.
> - Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
> - Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
> - Crie a solicitação de pull.
>   _Consulte a documentação do GitHub em_ [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

<div id="autor" align="center">
  
  **Criado e desenvolvido por [Ytallo Bruno](https://www.linkedin.com/in/ytallobruno/).**
  
 <div align="center"> 
    <a href="https://github.com/ytallobruno" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" height="40em" title="GitHub de Ytallo"></a>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="https://www.linkedin.com/in/ytallobruno/" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" height="40em" title="LinkedIn de Ytallo"></a>
  </div>
</div>

<h2 id="react"> Documentação Vite + React ⚛️</h2>

> ## React + TypeScript + Vite
>
> This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
>
> Currently, two official plugins are available:
>
> - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
> - [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
>
> ## Expanding the ESLint configuration
>
> If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:
>
> - Configure the top-level `parserOptions` property like this:
>
> ```js
> export default tseslint.config({
>   languageOptions: {
>     // other options...
>     parserOptions: {
>       project: ["./tsconfig.node.json", "./tsconfig.app.json"],
>       tsconfigRootDir: import.meta.dirname,
>     },
>   },
> });
> ```
>
> - Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
> - Optionally add `...tseslint.configs.stylisticTypeChecked`
> - Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:
>
> ```js
> // eslint.config.js
> import react from "eslint-plugin-react";
>
> export default tseslint.config({
>   // Set the react version
>   settings: { react: { version: "18.3" } },
>   plugins: {
>     // Add the react plugin
>     react,
>   },
>   rules: {
>     // other rules...
>     // Enable its recommended rules
>     ...react.configs.recommended.rules,
>     ...react.configs["jsx-runtime"].rules,
>   },
> });
> ```
