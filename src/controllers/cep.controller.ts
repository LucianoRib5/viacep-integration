import { NextFunction, Request, Response } from 'express';
import { CepService } from '../services/cep.service';
import { cepParamSchema } from '../validators/cep.validator';

export class CepController {
  private readonly cepService: CepService;

  constructor() {
    this.cepService = new CepService();
  }

  getCepByParam = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = cepParamSchema.safeParse(req.params);
  
      if (!result.success) {
        res.status(400).json({ error: result.error.format() });
        return;
      }
  
      const { cep } = result.data;
      const data = await this.cepService.getCep(cep);
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getAllCeps = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.cepService.getAllCeps();
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  favoriteOrUnfavoriteCep = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = cepParamSchema.safeParse(req.params);
  
      if (!result.success) {
        res.status(400).json({ error: result.error.format() });
        return;
      }
  
      const { cep } = result.data;
      const data = await this.cepService.favoriteOrUnfavoriteCep(cep);
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}
