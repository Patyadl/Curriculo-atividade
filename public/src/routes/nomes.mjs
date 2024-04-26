
import { Router } from 'express'
import pg from 'pg'

const pool = new pg.Pool({
  connectionString: 'postgres://rzvtrbkj:uUmMNmTIzuaAfvYP9U5j45MZI8hU4uKw@motty.db.elephantsql.com/rzvtrbkj',
})

const nomeRoutes = Router();

nomeRoutes.get('/nomes', (req, res) => {
  pool.query('SELECT nome FROM dados', (error, results) => {
    if (error) {
      throw error
    }
    const nomes = results.rows.map(row => row.nome)
    res.json(nomes)
  })
})



nomeRoutes.delete('/deletarNome', async (req, res) => {
  const id = req.body.id

    const deletar = await pool.query('DELETE FROM dados WHERE id = $1', [id])
    res.json({ message: 'Usuário deletado!' })
 
})

nomeRoutes.put('/atualizarNome/:id' , async (req, res) => {
  const id = req.params.id
  const novoNome= req.body.nome


    const atualizar = await pool.query('UPDATE dados SET nome = $1 WHERE id = $2 ' , [novoNome,id])
    res.json({message: "Usuário atualizado!"})

  
})


export { nomeRoutes }
