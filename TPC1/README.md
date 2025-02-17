# TPC1 - Trabalho Prático 1 (11/02/2025)

## Informação do Aluno

- **Nome:** Gonçalo da Silva Alves
- **Nº:** A104079
- **Foto:** <br/> <img src="pic.jpeg" alt="Profile picture" width="188" height="250"/>

## Resumo

Este projeto, realizado no âmbito da UC de Engenharia Web, consiste num serviço em nodejs que cria páginas web que consomem a API de dados servida pelo json-server da oficina de reparações. Este serviço permite que consultemos reparações, através do nome dos clientes, as intervenções realizadas na oficina e as viaturas.

Para acessar a cada página, basta abrir os seguintes links no navegados:

- **Reparações:** http://localhost:1234/reparacoes
- **Viaturas:** http://localhost:1234/viaturas
- **Intervenções:** http://localhost:1234/intervencoes

## Lista de Resultados:

- [server.js](server.js)

# Utilização:
 - Executar os comandos:
   ```sh
   json-server -w dataset_reparacoes.json
   node server.js
   ```