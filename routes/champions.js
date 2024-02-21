import { Router } from 'express'
import { ChampionController } from '../controllers/champion.js'

export const championsRouter = Router()

championsRouter.get('/', ChampionController.getAll)
championsRouter.post('/', ChampionController.create)

championsRouter.get('/:name', ChampionController.getByName)
championsRouter.patch('/:id', ChampionController.update)
championsRouter.delete('/:id', ChampionController.delete)

championsRouter.get('/region/:region', ChampionController.getByRegion)
championsRouter.get('/specie/:specie', ChampionController.getBySpecies)
championsRouter.get('/position/:position', ChampionController.getByPosition)
championsRouter.get('/year/:year', ChampionController.getByYear)
