
import { Router } from 'express'
import pg from 'pg'

const pool = new pg.Pool({
  connectionString: 'postgres://rzvtrbkj:uUmMNmTIzuaAfvYP9U5j45MZI8hU4uKw@motty.db.elephantsql.com/rzvtrbkj',
})

const idadeRoutes = Router();

idadeRoutes.get('/idades', (req, res) => {
  pool.query('SELECT idade FROM dados', (error, results) => {
    if (error) {
      throw error
    }
    const idade = results.rows.map(row => row.idade)
    res.json(idade)
  })
})

idadeRoutes.delete('/deletarIdade', async (req, res) => {
  const id = req.body.id

    const deletar = await pool.query('DELETE FROM dados WHERE id = $1', [id])
    res.json({ message: 'Idade deletada!' })
 
})

idadeRoutes.put('/atualizarIdade/:id' , async (req, res) => {
  const id = req.params.id
  const novaIdade= req.body.idade


    const atualizar = await pool.query('UPDATE dados SET idade = $1 WHERE id = $2 ' , [novaIdade,id])
    res.json({message: "Idade atualizada!"})

  
})


export { idadeRoutes }
