# TPC1 - Trabalho Prático 1 (11/02/2025)

## Informação do Aluno

- **Nome:** Gonçalo da Silva Alves
- **Nº:** A104079
- **Foto:** <br/> <img src="pic.jpeg" alt="Profile picture" width="188" height="250"/>

## Resumo

Este projeto, realizado no âmbito da UC de Engenharia Web, consiste num serviço em nodejs que cria páginas web que consomem a API de dados servida pelo json-server relativa a uma escola de música. Com este serviço é possível consultar os alunos, os cursos e os instrumentos relativos à escola. Este serviço possui uma página principal, onde podemos escolher a página que queremos consultar, relativamente às componentes descritas anteriormente. Também é possível aceder à página de cada aluno, onde estão presentes as informações relativas ao mesmo, a uma página com os alunos que frequentam um determinado curso e a uma página com os alunos que aprendem um determinado instrumento.

## Lista de Resultados:

- [server.js](server.js)
- [mypages.js](mypages.js)
- [w3.css](w3.css)
- [db.json](db.json)

# Utilização:
 - Executar o comando:
   ```sh
   json-server --w db.json
   ```
 - Abrir outro terminal e executar o comando:
   ```sh
   node server.js
   ```
 - Abrir o seguinte link num browser:
   ```sh
   http://localhost:3017/
   ```