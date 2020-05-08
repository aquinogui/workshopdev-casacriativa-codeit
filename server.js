console.log("iniciando servidor :)")

//configuracao express
const express = require("express")
const server = express()

const db = require("./db")

 //DELETAR IDEIA//
 function deleteIdeia() {
    db.run('DELETE FROM ideas WHERE id = ?', [1], function (err) {
        if (err) return console.log(err)
        console.log("Ideia Deletada", this)
        return res.redirect("/ideias")
    })
}

//arquivos estaticos//
server.use(express.static("public"))

//reqbody//
server.use(express.urlencoded({
    extended: true
}))

//template engine/nunjucks

const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

server.get("/", function (req, res) {

    //CONSULTA DE TABELA//
    db.all('SELECT * FROM ideas', function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("erro banco de dados ")
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 3) {
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", {
            ideas: lastIdeas
        })
    })

})



server.get("/ideias", function (req, res) {
    db.all('SELECT * FROM ideas', function (err, rows) {
        if (err) return console.log(err)
        const reversedIdeas = [...rows].reverse()

        return res.render("ideias.html", {
            ideas: reversedIdeas
        })
    })

})


server.post("/", function (req, res) {

    //inserir dado
    const query = 'INSERT INTO ideas (image,title,category,description,link) VALUES (?,?,?,?,?);'

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function (err) {
        if (err) {
            console.log(err)
            return res.send("erro banco de dados ")
        }

        return res.redirect("/ideias")
    })
})

server.get("/ideias/:id/delete", function(req, res) {

    const query = `DELETE FROM ideas WHERE ID = ?`

    db.run(query, req.params.id, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }
        
        return res.redirect("/ideias")
    })
})


//rota sevidor porta 3000
server.listen(3000)