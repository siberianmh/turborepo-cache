import * as express from 'express'
import { CacheController } from '../lib/controllers/cache'

const controller = new CacheController()

export const getFile = async (req: express.Request, res: express.Response) =>
  controller.getFile(req, res)

export const putFile = async (req: express.Request, res: express.Response) =>
  controller.putFile(req, res)
