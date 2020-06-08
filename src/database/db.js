//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()//verbose = ver mensagens no terminal

//criar o objeto que ira fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db") // criar o arquivo database.db banco de dados

module.exports = db //exportando o objeto db
// utilizar oo obejto de banco de dados para nossas operações
//db.serialize( () => { //serialize(): roda uma sequencia de codigo, eh um metodo(função atrelada a um objeto)

//     //com comandos SQL eu vou

//     //1 criar uma tabela 
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places ( 
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT 
//         );
//     `)

//     // 2 inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?); 
//     `

//     const values =  [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//         "Papersider",
//         "Guilherme gemballa, jardim america",
//         "Numero 260",
//         "Santa Catarina",
//         "Rio do sul",
//         "Residuos eletronicos, lampadas"
//     ]

//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err) 
//         }

//         console.log("cadastrado com sucesso")
//         console.log(this) //this = resposta do run
//     }

    //db.run(query, values, afterInsertData) //function() executando imediatamente // function: passada como parametro

    //3 consultar dados da tabela
    db.all(`SELECT * FROM places`, function(err, rows) { // "*" significa TUDO
        if(err) {
            return console.log(err)
        }

        console.log("aqui estao seus registros")
        console.log(rows)
    })


    //4 deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [11], function(err) { // [x] x= registro que deseja ser deletado
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com sucesso ")
    // })

//})