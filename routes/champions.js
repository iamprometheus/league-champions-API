import { Router } from 'express'
import { validateChampion } from '../schemes/champion.js'
import { ChampionModel } from '../models/champion.js'
export const championsRouter = Router()

championsRouter.get('/', async (req, res) => {
  if (Object.keys(req.query).length === 0) {
    return res.json(await ChampionModel.getAll())
  }
  const result = await ChampionModel.getByFilters(req.query)
  res.json(result)
})

championsRouter.get('/:name', async (req, res) => {
  const { name } = req.params
  const champ = await ChampionModel.getByName({ name })
  if (champ) return res.json(champ)
  res.status(404).json({ message: 'Champ Not Found' })
})

championsRouter.get('/region/:region', async (req, res) => {
  const { region } = req.params
  const champs = await ChampionModel.getByRegion({ region })
  if (champs.length > 0) return res.json(champs)
  res.status(404).json({ message: 'No champion match with provided region' })
})

championsRouter.get('/species/:species', async (req, res) => {
  const { species } = req.params
  const champs = await ChampionModel.getBySpecies({ species })
  if (champs.length > 0) return res.json(champs)
  res.status(404).json({ message: 'No champion match with provided species' })
})

championsRouter.get('/positions/:position', async (req, res) => {
  const { position } = req.params
  const champs = await ChampionModel.getByPosition({ position })
  if (champs.length > 0) return res.json(champs)
  res.status(404).json({ message: 'No champion match with provided postition' })
})

championsRouter.get('/year/:year', async (req, res) => {
  const { year } = req.params
  const champs = await ChampionModel.getByYear({ year })
  if (champs.length > 0) return res.json(champs)
  res.status(404).json({ message: 'No champion match with provided year' })
})

championsRouter.post('/', async (req, res) => {
  const result = validateChampion(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  res.json(result.data)
})
