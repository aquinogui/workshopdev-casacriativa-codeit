console.log("iniciando servidor :)")

//configuracao express
const express = require("express")
const server = express()

const db = require("./db")

//const ideas = [
//{
// img:"https://image.flaticon.com/icons/svg/2729/2729007.svg",
//        category:"Estudo",
// description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum assumenda enim tempore fugit",
// url:"https://google.com.br"
// },
// {
//   img:"https://image.flaticon.com/icons/svg/2729/2729005.svg",
// title:"Exercicios em casa",
//category:"Exercicios em casa",
//description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum assumenda enim tempore fugit",
//url:"https://google.com.br"
//},
//{
//   img:"https://image.flaticon.com/icons/svg/2729/2729027.svg",
//   title:"Meditacao",
// category:"Estudo",
//description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum assumenda enim tempore fugit",
//url:"https://google.com.br"
//},
//{
//  img:"https://image.flaticon.com/icons/svg/2729/2729032.svg",
//title:"Pintura",
//category:"Criatividade",
//description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum assumenda enim tempore fugit",
//url:"https://google.com.br"
//},
//]

//arquivos estaticos//
server.use(express.static("public"))

//template engine/nunjucks

const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

server.get("/", function (req, res) {

    //CONSULTA DE TABELA//
    db.all('SELECT * FROM ideas', function (err, rows) {
        if (err) return console.log(err)

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

    const reversedIdeas = [...ideas].reverse()

    return res.render("ideias.html", {
        ideas: reversedIdeas
    })
})


//rota sevidor porta 3000
server.listen(3000)