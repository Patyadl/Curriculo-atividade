
import { Router } from 'express'
import pg from 'pg'

const pool = new pg.Pool({
  connectionString: 'postgres://rzvtrbkj:uUmMNmTIzuaAfvYP9U5j45MZI8hU4uKw@motty.db.elephantsql.com/rzvtrbkj',
})

const emailRoutes= Router();

emailRoutes.get('/email', (req, res) => {
  pool.query('SELECT email FROM dados', (error, results) => {
    if (error) {
      throw error
    }
    const email = results.rows.map(row => row.email)
    res.json(email)
  })
})

emailRoutes.delete('/deletarEmail', async (req, res) => {
  const id = req.body.id

    const deletar = await pool.query('DELETE FROM dados WHERE id = $1', [id])
    res.json({ message: 'Email deletado!' })
 
})

emailRoutes.put('/atualizarEmail/:id' , async (req, res) => {
  const id = req.params.id
  const novoEmail= req.body.email


    const atualizar = await pool.query('UPDATE dados SET email = $1 WHERE id = $2 ' , [novoEmail,id])
    res.json({message: "Email atualizado!"})

  
})


export { emailRoutes }
