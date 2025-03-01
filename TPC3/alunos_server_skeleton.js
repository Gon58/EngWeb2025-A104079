// alunos_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var alunosServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                if (req.url === "/"){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(templates.genMainPage(d))
                    res.end()
                }
                else if(req.url === "/alunos"){
                    // GET /alunos --------------------------------------------------------------------
                    axios.get('http://localhost:3000/alunos')
                        .then(response => {
                            var alunos = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.studentsListPage(alunos, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Erro na obtenção da lista de alunos...")
                            res.end()
                        })
                } // GET /alunos/registo --------------------------------------------------------------------
                else if(req.url === "/alunos/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(templates.studentFormPage(d))
                    res.end()
                } // GET /alunos/:id --------------------------------------------------------------------
                else if(req.url.match(/^\/alunos\/[^\/]+$/)){
                    const id = req.url.split("/")[2]
                    axios.get('http://localhost:3000/alunos?id=' + id)
                        .then(response => {
                            var aluno = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.studentPage(aluno, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Erro na obtenção do aluno...")
                            res.end()
                        })
                } else if(req.url.match(/^\/alunos\/edit\/[^\/]+$/)){ // GET /alunos/edit/:id --------------------------------------------------------------------
                    const id = req.url.split("/")[3]
                    axios.get('http://localhost:3000/alunos?id=' + id)
                        .then(resp => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.studentFormEditPage(resp.data, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Erro na obtenção do aluno...")
                            res.end()
                        })
                } else if(req.url.match(/^\/alunos\/delete\/[^\/]+$/)){ // GET /alunos/delete/:id --------------------------------------------------------------------
                    const id = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/alunos/' + id)
                        .then(resp => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.studentDeletedPage(d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Erro na eliminação do aluno...")
                            res.end()
                        })
                } else {
                    res.writeHead(405, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>Pedido não suportado: " + req.method + " " + req.url)
                    res.end()
                }
                break

            case "POST":
                // POST /alunos/registo --------------------------------------------------------------------
                if(req.url === "/alunos/registo"){
                    collectRequestBodyData(req, result => {
                        axios.post('http://localhost:3000/alunos', result)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(templates.studentInsEdPage(resp.data, d, 0))
                                res.end()
                            })
                            .catch(erro => {
                                console.log('Erro: ' + erro)
                                res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Erro na inserção do aluno...")
                                res.end()
                            })
                    })
                }
                else if(req.url.match(/^\/alunos\/edit\/[^\/]+$/)){ // POST /alunos/edit/:id --------------------------------------------------------------------
                    const id = req.url.split("/")[3]
                    collectRequestBodyData(req, result => {
                        axios.put('http://localhost:3000/alunos/' + id, result)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(templates.studentInsEdPage(resp.data, d, 1))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Erro na alteração do aluno...")
                                res.end()
                            })
                    })
                } else {
                    res.writeHead(405, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>Pedido não suportado: " + req.method + " " + req.url)
                    res.end()
                }
                break

            default: 
                // Outros metodos nao sao suportados
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>Método não suportado: " + req.method)
                res.end()
                break
        }
    }
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



