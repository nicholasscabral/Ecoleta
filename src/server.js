//requisitos para inciar o servidor 
const express = require("express"); //recebendo o express
const server = express(); //express se torna um função executavel

//pegar o banco de dados
const db = require("./database/db")

// configurar pasta publica (arquivos estaticos/ styles)
server.use(express.static("public"))

// habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))


//utlizando template engine "pagina dinamica"
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server, //ligando o nunjucks ao express
    noCache: true
})


//configurar caminhos da aplicação 
//pagina inicial
//req: Requisição
//res: Resposta
server.get("/", (req, res) => {
  return res.render("index.html", { title: "Um titulo"}) //antes: sendFile(__dirname: + ...) para enviar o arquivo para a pagina
  //segundo parametro de render é um objeto que sera a "variavel do html"
})



server.get("/create-point", (req, res) => {
    
    // req.query: query strings da nossa url
    // console.log(req.query)
  
  
    return res.render("create-point.html") //antes: sendFile(__dirname: + ...)  para enviar o arquivo para a pagina
})

server.post("/savepoint", (req, res) => {

    // req.body: o corpo do nosso formulario
    // console.log(req.body)

    //inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?); 
    `

    const values =  [
       req.body.image, 
       req.body.name, 
       req.body.address, 
       req.body.address2, 
       req.body.state, 
       req.body.city, 
       req.body.items 
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err) 
            return res.send("erro no cadastro!")

        }

        console.log("cadastrado com sucesso")
        console.log(this) //this = resposta do run

        return res.render("create-point.html", { saved: true }) //mostrando "cadastro concluido no modal"
    }

    db.run(query, values, afterInsertData) //function() executando imediatamente // function: passada como parametro

})



server.get("/search", (req, res) => {

  const search = req.query.search

  if(search == "") {
    //pesquisa vazia
    return res.render("search-results.html", { total: 0}) //antes: sendFile(__dirname: + ...)  para enviar o arquivo para a pagina
  }


  //pegar os dados do banco de dados
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) { //procurando por cidade, filtrando sem o nome inteiro %qualquer coisa antes e depois
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        // mostrar a pagina html com os dados do banco de dados// enviando objeto para a pagina
        return res.render("search-results.html", { places: rows, total: total}) //antes: sendFile(__dirname: + ...)  para enviar o arquivo para a pagina
    })
})


//ligar o servidor + mensagem de que ta funcionando 
server.listen(4000, () =>
  console.log("Servidor iniciado/reiniciado...")
);
