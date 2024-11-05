// Configuração do Express
const express = require("express");
const app = express();

// Configuração do banco de dados SQLite
const db = require("./db");

// Configuração dos arquivos estáticos
app.use(express.static("public"));

// Configuração do req.body (para parsing de formulários)
app.use(express.urlencoded({ extended: true }));

// Configuração do Nunjucks para template engine
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: app,
  noCache: true,
});

// Função para deletar uma ideia
function deleteIdeia(req, res) {
  db.run('DELETE FROM ideas WHERE id = ?', [1], function (err) {
    if (err) {
      console.log(err);
      return res.send("Erro ao deletar ideia.");
    }
    console.log("Ideia deletada", this);
    return res.redirect("/ideias");
  });
}

// Rota principal para a página inicial
app.get("/", function (req, res) {
  db.all('SELECT * FROM ideas', function (err, rows) {
    if (err) {
      console.log(err);
      return res.send("Erro ao consultar banco de dados.");
    }

    const reversedIdeas = [...rows].reverse();
    let lastIdeas = [];
    for (let idea of reversedIdeas) {
      if (lastIdeas.length < 3) {
        lastIdeas.push(idea);
      }
    }

    return res.render("index.html", {
      ideas: lastIdeas
    });
  });
});

// Rota para a página de todas as ideias
app.get("/ideias", function (req, res) {
  db.all('SELECT * FROM ideas', function (err, rows) {
    if (err) {
      console.log(err);
      return res.send("Erro ao consultar banco de dados.");
    }
    const reversedIdeas = [...rows].reverse();
    return res.render("ideias.html", {
      ideas: reversedIdeas
    });
  });
});

// Rota para adicionar uma nova ideia
app.post("/", function (req, res) {
  const query = 'INSERT INTO ideas (image, title, category, description, link) VALUES (?,?,?,?,?);';
  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link,
  ];

  db.run(query, values, function (err) {
    if (err) {
      console.log(err);
      return res.send("Erro ao adicionar ideia ao banco de dados.");
    }

    return res.redirect("/ideias");
  });
});

// Rota para deletar uma ideia específica
app.get("/ideias/:id/delete", function (req, res) {
  const query = `DELETE FROM ideas WHERE id = ?`;
  db.run(query, req.params.id, function (err) {
    if (err) {
      console.log(err);
      return res.send("Erro ao deletar ideia.");
    }

    return res.redirect("/ideias");
  });
});

// Exportando a função serverless para Vercel
module.exports = app;
