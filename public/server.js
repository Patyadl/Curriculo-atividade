const express = require('express');
const path = require('path');
const app = express();
const { Pool } = require('pg');

// Configurar middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const pool = new Pool({
  connectionString: 'postgres://rzvtrbkj:uUmMNmTIzuaAfvYP9U5j45MZI8hU4uKw@motty.db.elephantsql.com/rzvtrbkj',
});

pool.query(`
  CREATE TABLE IF NOT EXISTS dados (
    id SERIAL PRIMARY KEY, 
    nome TEXT, 
    idade INTEGER, 
    email TEXT, 
    educacao TEXT
  )`, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Tabela criada!');
});
app.use(express.static(__dirname + "/static"));
app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  'src', 'index.html'));
  
});



app.post('/dados', (req, res) => {
  const { nome, idade, email, educacao } = req.body;
  
  pool.query('INSERT INTO dados (nome, idade, email, educacao) VALUES ($1, $2, $3, $4)', [nome, idade, email, educacao], (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Dados inseridos com sucesso!');
    res.redirect('/'); 
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor está rodando na porta http://localhost:${port}`);
});
