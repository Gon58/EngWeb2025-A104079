import { createServer } from 'http'
import axios from 'axios';
import { genMainPage, genAlunosPage, genCursoPage, genInstrumentoPage, genAlunoPage } from './mypages.js'
import { readFile } from 'fs'

createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(req.url == '/'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.write(genMainPage(d))
        res.end()  
    }
    else if(req.url == '/alunos'){
        axios.get('http://localhost:3000/alunos')
            .then(function(resp){
                var alunos = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genAlunosPage(alunos, null, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url == '/cursos'){
        axios.get('http://localhost:3000/cursos')
            .then(function(resp){
                var cursos = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genCursoPage(cursos, null, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url == '/instrumentos'){
        axios.get('http://localhost:3000/instrumentos')
            .then(function(resp){
                var instr = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genInstrumentoPage(instr, null, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url.match(/\/aluno\/[a-zA-Z%0-9]+$/)){
        var id = req.url.split('/')[2]
        id = id.replace('%20', ' ')
        axios.get('http://localhost:3000/alunos?id=' + id)
            .then(function(resp){
                var aluno = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genAlunoPage(aluno, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url.match(/\/curso\/[a-zA-ZÀ-ÿ%0-9]+$/)){
        var curso = req.url.split('/')[2]
        axios.get('http://localhost:3000/alunos?curso=' + curso)
            .then(function(resp){
                var alunos = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genAlunosPage(alunos, null, curso, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url.match(/\/instrumento\/[a-zA-ZÀ-ÿ%0-9]+$/)){
        var instrumento = req.url.split('/')[2]
        instrumento = instrumento.replace('%20', ' ')
        axios.get('http://localhost:3000/alunos?instrumento=' + instrumento)
            .then(function(resp){
                var alunos = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genAlunosPage(alunos,instrumento, null, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url.match(/w3\.css$/)){
        readFile("w3.css", function(erro, dados){
            if(erro){
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na leitura do ficheiro: ' + erro + '</p>')
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/css'})
                res.end(dados)
            }
        })
    }
    else if(req.url.match(/favicon\.ico$/)){
        readFile("definicoes.png", function(erro, dados){
            if(erro){
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na leitura do ficheiro: ' + erro + '</p>')
            }
            else{
                res.writeHead(200, {'Content-Type': 'image/png'})
                res.end(dados)
            }
        })
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end('<p>Operação não suportada: ' + req.url + '</p>')
    }
}).listen(3017)

console.log('Servidor à escuta na porta 3017...')