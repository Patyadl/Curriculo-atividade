import express from 'express'
import { routes } from './src/routes/index.mjs'
import pg from 'pg';
const { Pool } = pg;
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()


app.use(express.static(join(__dirname, 'src')))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/', routes)

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
})


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


const port = 3000
app.listen(port, () => {
  console.log(`Servidor está rodando na porta`)})
export {app}
