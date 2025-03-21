# TPC4 - Trabalho Prático 4 (13/03/2025)

## Informação do Aluno

- **Nome:** Gonçalo da Silva Alves
- **Nº:** A104079
- **Foto:** <br/> <img src="pic.jpeg" alt="Profile picture" width="188" height="250"/>

## Resumo

Este projeto, realizado no âmbito da UC de Engenharia Web, consiste num serviço com templates PUG, que cria páginas web que consomem a API de dados servida pelo json-server relativa a uma lista de alunos, adicionando ou editando também novos alunos. Com este serviço é possível consultar os alunos e as informações relativas aos mesmos e também adicionar novos alunos ou editar alunos já existentes. Este serviço possui uma página principal, onde podemos escolher a página que queremos consultar, sendo que existem duas opções: a página que possui a lista dos alunos e a página para adicionar um novo aluno. Também é possível aceder à página de cada aluno, onde estão presentes as informações relativas ao mesmo e a uma página para editarmos as informações relativas a um aluno já existente.

## Lista de Resultados:

- [appAlunos](alunos_server_skeleton.js)

# Utilização:
 - Abrir a diretoria appAlunos no terminal e executar o comando:
   ```sh
   json-server --w alunos.json
   ```
 - Na mesma diretoria, abrir outro terminal e executar o comando:
   ```sh
   npm start
   ```
 - Abrir o seguinte link num browser:
   ```sh
   http://localhost:1103/
   ```