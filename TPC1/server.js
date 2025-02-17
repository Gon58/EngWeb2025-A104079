const http = require('http');
const axios = require('axios');

http.createServer((req, res) => {
    console.log("METHOD: " + req.method);
    console.log("URL: " + req.url);

    if (req.method === 'GET') {
        if(req.url === '/reparacoes') {
            axios.get("http://localhost:3000/reparacoes?_sort=nome")
                .then((response) => {
                    var reparacoes = response.data;
                    res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
                    res.write("<h1>Reparações</h1>");
                    res.write("<ul>");
                    reparacoes.forEach((reparacao) => {
                        res.write(`<li><a href="reparacoes/${reparacao.nome}">${reparacao.nome}</a></li>`);
                    });
                    res.write("</ul>");
                    res.end();
                })
                .catch((error) => {
                    res.writeHead(500, { "Content-Type": "text/html;charset=UTF-8" });
                    console.log(error);
                    res.end();
                });
        } else if(req.url.match(/^\/reparacoes\/([^\/]+)$/)){
            var id = decodeURIComponent(req.url.split("/")[2]);

            axios.get(`http://localhost:3000/reparacoes?nome=${id}`)
                .then((response) => {
                        var reparacao = response.data;
                        res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
                        console.log(reparacao.nome);
                        if (reparacao && reparacao.length > 0) {
                            res.write(`<h1>${reparacao[0].nome}</h1>`);
                        } else {
                            res.write("<h1>Reparação não encontrada</h1>");
                        } 
                        res.write(`
                            <div class>
                                <p><strong>Nome: </strong>${reparacao[0].nome}</p>
                                <p><strong>Nif: </strong> ${reparacao[0].nif || "N/A"}</p>
                                <p><strong>Data: </strong> ${reparacao[0].data || "N/A"}</p>
                                <div class>
                                    <h2>Viatura:</h2>
                                    <p><strong>Matrícula:</strong> ${reparacao[0].viatura.matricula || "N/A"}</p>
                                    <p><strong>Marca:</strong> ${reparacao[0].viatura.marca || "N/A"}</p>
                                    <p><strong>Modelo:</strong> ${reparacao[0].viatura.modelo || "N/A"}</p>
                                </div>
                                <p><strong>Nº Intervenções: </strong> ${reparacao[0].nr_intervencoes || "N/A"}</p>
                                <h2>Intervenções:</h2>
                            </div>
                        `);
                        let n = 1;
                        reparacao[0].intervencoes.forEach(intervencao => {
                            res.write(`
                                <div class>
                                    <h3>Intervenção ${n}:</h3>
                                    <p><strong>Código: </strong>${intervencao.codigo}</p>
                                    <p><strong>Nome: </strong> ${intervencao.nome || "N/A"}</p>
                                    <p><strong>Descrição: </strong> ${intervencao.descricao || "N/A"}</p>
                                </div>
                            `);
                            n++;
                        });
                        res.end();
                })
                .catch((error) => {
                        res.writeHead(500, { "Content-Type": "text/html;charset=UTF-8" });
                        console.log(error);
                        res.end();
                });
        } else if(req.url === '/intervencoes') {
            axios.get("http://localhost:3000/reparacoes")
                .then((response) => {
                    var reparacoes = response.data;
                    res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
                    res.write("<h1>Intervenções</h1>");
                    res.write("<ul>");
                    let intervencoes = [];
                    let codigos = new Set();

                    reparacoes.forEach(reparacao => {
                        reparacao.intervencoes.forEach(intervencao => {
                            if (!codigos.has(intervencao.codigo)) {
                                codigos.add(intervencao.codigo);
                                intervencoes.push(intervencao);
                            }
                        });
                    });

                    intervencoes.sort((a, b) => a.codigo.localeCompare(b.codigo));
                    intervencoes.forEach((intervencao) => {
                        res.write(`
                            <div class="card">
                                <h2>Código: ${intervencao.codigo}</h2>
                                <p><strong>Nome: </strong> ${intervencao.nome || "N/A"}</p>
                                <p><strong>Descrição: </strong> ${intervencao.descricao || "N/A"}</p>
                            </div>
                        `);
                    });
                    res.write("</ul>");
                    res.end();
                })
                .catch((error) => {
                    res.writeHead(500, { "Content-Type": "text/html;charset=UTF-8" });
                    console.log(error);
                    res.end();
                });
            } else if(req.url === '/viaturas') {
                axios.get("http://localhost:3000/reparacoes")
                    .then((response) => {
                        var reparacoes = response.data;
                        res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
                        res.write("<h1>Viaturas</h1>");
                        res.write("<ul>");
                        let viaturas = [];
                        let matriculas = new Set();
    
                        reparacoes.forEach(reparacao => {
                            if (!matriculas.has(reparacao.viatura.matricula)) {
                                matriculas.add(reparacao.viatura.matricula);
                                viaturas.push(reparacao.viatura);
                            }
                        });
    
                        viaturas.sort((a, b) => a.marca.localeCompare(b.marca));
                        let n = 1;
                        viaturas.forEach((viatura) => {
                            res.write(`
                                <div class="card">
                                    <h2>Viatura ${n}</h2>
                                    <p><strong>Matrícula:</strong> ${viatura.matricula || "N/A"}</p>
                                    <p><strong>Marca:</strong> ${viatura.marca || "N/A"}</p>
                                    <p><strong>Modelo:</strong> ${viatura.modelo || "N/A"}</p>
                                </div>
                            `);
                            n++;
                        });
                        res.write("</ul>");
                        res.end();
                    })
                    .catch((error) => {
                        res.writeHead(500, { "Content-Type": "text/html;charset=UTF-8" });
                        console.log(error);
                        res.end();
                    });
        } else {
            res.writeHead(404, { "Content-Type": "text/html;charset=UTF-8" });
            res.write("<h1>O Recurso não existe</h1>\n");
            res.end()
        }
    } else {
        res.writeHead(405, { "Content-Type": "text/html;charset=UTF-8" });
        res.write("<title>EW</title>\n<p>Método não permitido!</p>\n");
        res.end();
    }
}).listen(1234);

console.log("Servidor à escuta na porta 1234...");