import { ChampionModel } from '../models/mongodb/champion.js'
import { validateChampion } from '../schemes/champion.js'

export class ChampionController {
  static async getAll (req, res) {
    if (Object.keys(req.query).length === 0) {
      return res.json(await ChampionModel.getAll())
    }
    const result = await ChampionModel.getByFilters(req.query)
    if (result.length !== 0) return res.json(result)
    res.status(404).json({ message: 'No champions matching with provided filters' })
  }

  static async getByName (req, res) {
    const { name } = req.params
    const champ = await ChampionModel.getByName({ name })
    if (champ) return res.json(champ)
    res.status(404).json({ message: 'Champ Not Found' })
  }

  static async getByRegion (req, res) {
    const { region } = req.params
    const champs = await ChampionModel.getByRegion({ region })
    if (champs.length > 0) return res.json(champs)
    res.status(404).json({ message: 'No champion match with provided region' })
  }

  static async getBySpecies (req, res) {
    const { specie } = req.params
    const champs = await ChampionModel.getBySpecies({ specie })
    if (champs.length > 0) return res.json(champs)
    res.status(404).json({ message: 'No champion match with provided species' })
  }

  static async getByPosition (req, res) {
    const { position } = req.params
    const champs = await ChampionModel.getByPosition({ position })
    if (champs.length > 0) return res.json(champs)
    res.status(404).json({ message: 'No champion match with provided postition' })
  }

  static async getByYear (req, res) {
    const { year } = req.params
    const champs = await ChampionModel.getByYear({ year })
    if (champs.length > 0) return res.json(champs)
    res.status(404).json({ message: 'No champion match with provided year' })
  }

  static async create (req, res) {
    const result = validateChampion(req.body)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newChamp = result.data
    const champion = await ChampionModel.createChampion(newChamp)
    if (!champion) return res.status(404).json({ message: 'A champion with those attributes already exists.' })
    return res.json({ message: 'New Champ added correctly', champ: champion })
  }

  static async update (req, res) {
    // const result = ChampionModel.getByName('Name')
  }

  static async delete (req, res) {
    const { id } = req.params
    const result = await ChampionModel.deleteChampion(id)
    if (!result) return res.status(404).json({ message: 'No champion matching with provided id.' })
    res.json({ message: 'Champ deleted correctly', champ: result })
  }
}
