import { Router } from 'express';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: 'postgres://rzvtrbkj:uUmMNmTIzuaAfvYP9U5j45MZI8hU4uKw@motty.db.elephantsql.com/rzvtrbkj',
});

const curriculosRoutes = Router();

curriculosRoutes.get('/curriculos', (req, res) => {
  pool.query('SELECT * FROM dados', (error, results) => {
      res.json(results.rows)
  });
});

export { curriculosRoutes };
