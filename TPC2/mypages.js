export function genMainPage(data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
            <link rel="icon" type="image/png" href="/definicoes.png">
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h1>Consultas</h1>
                </header>

                <div class="w3-container">
                    <ul class="w3-ul">
                        <li>
                            <a href="/alunos">Lista de Alunos</a>
                        </li>
                        <li>
                            <a href="/cursos">Lista de Cursos</a>
                        </li>
                        <li>
                            <a href="/instrumentos">Lista de Instrumentos</a>
                        </li>
                    </ul>
                </div>
                
                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genAlunosPage(lalunos, instrumento, curso, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h1>Lista de Alunos${instrumento==null? '':' - ' + decodeURIComponent(instrumento)}${curso==null? '':' - ' + decodeURIComponent(curso)}</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Data de Nascimento</th>
                            <th>Curso</th>
                            <th>Ano do Curso</th>
                            <th>Instrumento</th>
                        </tr>`
    lalunos.forEach(aluno => {
        pagHTML += `
        <tr>
            <td>
                <a href = '/aluno/${aluno.id}'> 
                    ${aluno.id}
                </a>
            </td>
            <td>
                <a href = '/aluno/${aluno.id}'> 
                    ${aluno.nome}
                </a>
            </td>
            <td>
                ${aluno.dataNasc}
            </td>
            <td>
                ${aluno.curso}
            </td>
            <td>
                ${aluno.anoCurso}
            </td>
            <td>
                ${aluno.instrumento}
            </td>
        </tr>
        `
    });

    pagHTML += `  
                    </table>
                </div>
                
                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genCursoPage(lcursos, curso, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h1>Lista de Cursos${curso==null? '':' - ' + curso}</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Designação</th>
                            <th>Duração</th>
                            <th>Instrumento</th>
                        </tr>`
    lcursos.forEach(curso => {
        pagHTML += `
        <tr>
            <td>
                <a href = '/curso/${curso.id}'> 
                    ${curso.id}
                </a>
            </td>
            <td>
                <a href = '/curso/${curso.id}'> 
                    ${curso.designacao}
                </a>
            </td>
            <td>
                ${curso.duracao}
            </td>
            <td>
                ${curso.instrumento["#text"]}
            </td>
        </tr>
        `
    });

    pagHTML += `  
                    </table>
                </div>
                
                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genInstrumentoPage(linstrumentos, instrumento, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h1>Lista de Instrumentos${instrumento==null? '':' - ' + instrumento}</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Designação</th>
                        </tr>`
    linstrumentos.forEach(instrumento => {
        pagHTML += `
        <tr>
            <td>
                <a href = '/instrumento/${instrumento["#text"]}'> 
                    ${instrumento.id}
                </a>
            </td>
            <td>
                <a href = '/instrumento/${instrumento["#text"]}'> 
                    ${instrumento["#text"]}
                </a>
            </td>
        </tr>
        `
    });

    pagHTML += `  
                    </table>
                </div>
                
                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genAlunoPage(aluno, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h1>${aluno[0].nome}</h1>
                </header>

                <div class="w3-container">
                    <p><strong>Id: </strong>${aluno[0].id}</p>
                    <p><strong>Nome: </strong>${aluno[0].nome}</p>
                    <p><strong>Data de Nascimento: </strong> ${aluno[0].dataNasc || "N/A"}</p>
                    <p><strong>Curso: </strong> ${aluno[0].curso || "N/A"}</p>
                    <p><strong>Ano do Curso: </strong> ${aluno[0].anoCurso || "N/A"}</p>
                    <p><strong>Instrumento: </strong> ${aluno[0].instrumento || "N/A"}</p>
                </div>

                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}