console.log ("iniciando servidor :)")
//configuracao express
const express = require ("express")
const server = express()

server.use(express.static("public"))

server.get("/", function (req, res) {
    return res.sendFile(__dirname + "/index.html")
})

//rota sevidor porta 3000
server.listen(3000)