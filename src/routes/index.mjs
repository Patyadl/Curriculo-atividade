
import { Router } from 'express'
import { nomeRoutes } from './nomes.mjs'
import { cursosRoutes } from './cursos.mjs'
import { idadeRoutes } from './idade.mjs';
import { emailRoutes } from './email.mjs';
import { curriculosRoutes } from './curriculos.mjs';
const routes = Router();

routes.use('/', nomeRoutes);
routes.use('/', cursosRoutes);
routes.use('/', idadeRoutes);
routes.use('/',emailRoutes);
routes.use('/',curriculosRoutes);

export { routes };
