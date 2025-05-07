import express from 'express';
import { CepController } from '../controllers/cep.controller';

const router = express.Router();
const cepController = new CepController();

router.get('/:cep', cepController.getCepByParam);
router.get('/', cepController.getAllCeps);

export default router;