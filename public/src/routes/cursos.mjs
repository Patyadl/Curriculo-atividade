
import { Router } from 'express'
import pg from 'pg'

const pool = new pg.Pool({
  connectionString: 'postgres://rzvtrbkj:uUmMNmTIzuaAfvYP9U5j45MZI8hU4uKw@motty.db.elephantsql.com/rzvtrbkj',
})

const cursosRoutes = Router();

cursosRoutes.get('/cursos', (req, res) => {
  pool.query('SELECT educacao FROM dados', (error, results) => {
    if (error) {
      throw error
    }
    const cursos = results.rows.map(row => row.educacao)
    res.json(cursos)
  })
})

cursosRoutes.delete('/deletarCurso', async (req, res) => {
  const id = req.body.id

    const deletar = await pool.query('DELETE FROM dados WHERE id = $1', [id])
    res.json({ message: 'Curso deletado!' })
 
})

cursosRoutes.put('/atualizarCurso/:id' , async (req, res) => {
  const id = req.params.id
  const novoCurso= req.body.curso


    const atualizar = await pool.query('UPDATE dados SET educacao = $1 WHERE id = $2 ' , [novoCurso,id])
    res.json({message: "Curso atualizado!"})

  
})


export { cursosRoutes }
