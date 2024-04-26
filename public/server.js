const express = require('express');
const path = require('path');
const app = express();
const { Pool } = require('pg');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const pool = new Pool({
  connectionString: 'postgres://rzvtrbkj:uUmMNmTIzuaAfvYP9U5j45MZI8hU4uKw@motty.db.elephantsql.com/rzvtrbkj',
})

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
    console.log('Tabela criada!')
});
app.use(express.static(__dirname + "/static"))
app.use(express.static(path.join(__dirname, 'src')))

app.get('/dados', (req, res) => {
  res.sendFile(path.join(__dirname,  'src', 'index.html'))
  
});



app.post('/dados', (req, res) => {
  const { nome, idade, email, educacao } = req.body
  
  pool.query('INSERT INTO dados (nome, idade, email, educacao) VALUES ($1, $2, $3, $4)', [nome, idade, email, educacao], (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Dados inseridos com sucesso!')
    res.redirect('/')
  })
})

app.put('/curriculo/:id', async (req, res) => {
  const id = req.params.id
  const { nome, idade, email, educacao } = req.body
  const response = await pool.query('UPDATE curriculo SET nome = $1, idade = $2, email = $3, educacao = $4 WHERE id = $5', [nome, idade, email, educacao, id])
  res.json(`Currículo com ID: ${id} foi atualizado!`)
})

app.delete('/curriculo/:id', async (req, res) => {
  const id = req.params.id;
  const response = await pool.query('DELETE FROM curriculo WHERE id = $1', [id])
  res.json(`Currículo com ID: ${id} foi deletado!`)
})

const port = 3000
app.listen(port, () => {
  console.log(`Servidor está rodando na porta http://localhost:${port}`)
})
