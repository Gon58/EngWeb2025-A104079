# TPC5 - Trabalho Prático 5 (19/03/2025)

## Informação do Aluno

- **Nome:** Gonçalo da Silva Alves
- **Nº:** A104079
- **Foto:** <br/> <img src="pic.jpeg" alt="Profile picture" width="188" height="250"/>

## Resumo

Este projeto, realizado no âmbito da UC de Engenharia Web, consiste em dois serviços: api de dados e front-end. A API de dados, consite numa aplicação em nodejs que recebe pedidos REST, interage com o MongoDB para obter os dados e responde em JSON. Por outro lado, o Front-end, consiste numa aplicação em nodejs que responde com uma interface web (templates PUG) a pedidos do utilizador.
Com estes serviços é possível consultar os alunos e as informações relativas aos mesmos e também adicionar novos alunos ou editar alunos já existentes. Este serviço possui uma página principal, onde podemos escolher a página que queremos consultar, sendo que existem duas opções: a página que possui a lista dos alunos e a página para adicionar um novo aluno. Também é possível aceder à página de cada aluno, onde estão presentes as informações relativas ao mesmo e a uma página para editarmos as informações relativas a um aluno já existente.

## Lista de Resultados:

- [appAlunos](appAlunos)
- [apiAlunos](apiAlunos)
- [alunos.json](alunos.json)

# Utilização:
 - Abrir o terminal e executar os comandos:
   ```sh
   docker start mongoEW

   sudo docker cp alunos.json mongoEW:/tmp

   docker exec -it mongoEW sh

   mongoimport -d alunos -c alunos tmp/alunos.json
   ```
 - Abrir a diretoria apiAlunos no terminal e executar o comando:
   ```sh
   npm start
   ```
 - Abrir a diretoria appAlunos no terminal e executar o comando:
   ```sh
   npm start
   ```
 - Abrir o seguinte link num browser:
   ```sh
   http://localhost:1103/
   ```