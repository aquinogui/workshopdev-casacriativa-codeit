const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function () {

    //criar tabela
    db.run('CREATE TABLE IF NOT EXISTS ideas(id INTEGER PRIMARY KEY,image TEXT,title TEXT,category TEXT,description TEXT, link TEXT);')

    //inserir dado
    const query = 'INSERT INTO ideas (image,title,category,description,link) VALUES (?,?,?,?,?);'

    const values = [
        "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        "Curso de programacao",
        "Estudo",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum assumenda enim tempore fugit",
        "https://google.com.br"
    ]

    //db.run(query, values, function (err) {
    //    if (err) return console.log(err)
    //   console.log(this)
    //})

    //DELETAR IDEIA//
    //db.run ('DELETE FROM ideas WHERE id = ?', [1], function (err) {
    //if (err) return console.log (err)
    //console.log ("Ideia Deletada", this)
    //})

    //CONSULTA DE TABELA//
    //db.all('SELECT * FROM ideas', function (err, rows) {
    // if (err) return console.log(err)
    //console.log(rows)
    //})

})

module.exports = db