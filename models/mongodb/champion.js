import { MongoClient, ObjectId } from 'mongodb'
import { normalizeString, isNumeric } from '../../utils.js'
import 'dotenv/config'

const uri = process.env.MONGO_URI
const client = new MongoClient(uri)
const database = client.db('bot_akshan')
const championRecords = database.collection('champions')

export class ChampionModel {
  static async getAll () {
    const data = await championRecords.find().toArray()
    return data
  }

  static async getByName ({ name }) {
    name = championsMap[normalizeString(name)] ? championsMap[normalizeString(name)] : name
    const query = {
      name: {
        $regex: name,
        $options: 'i'
      }
    }
    try {
      const champion = await championRecords.findOne(query)
      return champion
    } catch (e) {
      console.error(e)
    }
  }

  static async getByPosition ({ position }) {
    const query = {
      positions: {
        $elemMatch: {
          $regex: position,
          $options: 'i'
        }
      }
    }
    const projection = { _id: 0 }
    try {
      if ((await championRecords.countDocuments(query)) === 0) return []
      const champions = await championRecords.find(query, projection).toArray()
      return champions
    } catch (e) {
      console.error(e)
    }
  }

  static async getByRegion ({ region }) {
    region = regionsMapForDiacritics[normalizeString(region)] ? regionsMapForDiacritics[normalizeString(region)] : region
    const query = {
      regions: {
        $elemMatch: {
          $regex: region,
          $options: 'i'
        }
      }
    }
    const projection = {
      _id: 0
    }
    try {
      if ((await championRecords.countDocuments(query)) === 0) return []
      const champions = await championRecords.find(query, projection).toArray()
      return champions
    } catch (e) {
      console.error(e)
    }
  }

  static async getBySpecies ({ specie }) {
    specie = speciesMapForDiacritics[specie] ? speciesMapForDiacritics[specie] : specie
    const query = {
      species: {
        $elemMatch: {
          $regex: specie,
          $options: 'i'
        }
      }
    }
    const projection = {
      _id: 0
    }
    try {
      if ((await championRecords.countDocuments(query)) === 0) return []
      const champions = await championRecords.find(query, projection).toArray()
      return champions
    } catch (e) {
      console.error(e)
    }
  }

  static async getByYear ({ year }) {
    year = parseInt(year)
    const query = { release_year: year }
    const projection = {
      _id: 0
    }
    try {
      const champions = championRecords.find(query, projection).toArray()
      return champions
    } catch (e) {
      console.error(e)
    }
  }

  static async getByFilters (filters) {
    const query = { $and: [] }
    for (let [key, value] of Object.entries(filters)) {
      key = normalizeString(key)
      value = regionsMapForDiacritics[normalizeString(value)] ? regionsMapForDiacritics[normalizeString(value)] : value
      value = speciesMapForDiacritics[normalizeString(value)] ? speciesMapForDiacritics[normalizeString(value)] : value
      value = value === 'mana' ? 'Maná' : value
      if (arrayFilters.includes(key)) {
        query.$and.push({
          [key]: {
            $elemMatch: {
              $regex: value,
              $options: 'i'
            }
          }
        })
        continue
      }
      if (singleStringFilters.includes(key)) {
        query.$and.push({
          [key]: {
            $regex: value,
            $options: 'i'
          }
        })
        continue
      }
      if (isNumeric(key)) {
        key = parseInt(key)
        query.$and.push({
          release_year: key
        })
      }
    }
    const projection = {
      _id: 0
    }
    try {
      if ((await championRecords.countDocuments(query)) === 0) return []
      const champions = await championRecords.find(query, projection).toArray()
      return champions
    } catch (e) {
      console.error(e)
    }
  }

  static async createChampion (data) {
    // verify if champion already exists
    const champion = await championRecords.findOne({ name: data.name })
    if (champion !== undefined) return false
    try {
      // create a document to insert
      const doc = {
        name: data.name,
        encrypted_name: data.encrypted_name,
        gender: data.gender,
        positions: data.positions,
        species: data.species,
        resource: data.resource,
        range_type: data.range_type,
        regions: data.regions,
        release_year: data.release_year,
        icon_url: data.icon_url,
        encrypted_champ_icon_url: data.encrypted_champ_icon_url,
        encrypted_quote_icon_url: data.encrypted_quote_icon_url,
        abilities: data.abilities,
        emojis: data.emojis,
        quotes: data.quotes,
        abilities_icons_url: data.abilities_icons_url,
        aka: data.aka
      }
      const result = await championRecords.insertOne(doc)
      console.log(`A document was inserted with the _id: ${result.insertedId}`)
      return data
    } catch (error) {
      return console.log(error)
    }
  }

  static async deleteChampion (id) {
    const objectId = ObjectId(id)
    try {
      const result = MongoClient.findOneAndDelete({ _id: objectId })
      return result
    } catch (error) {
      console.error(error)
    }
  }
}

const arrayFilters = ['positions', 'species', 'regions', 'range_type']
const singleStringFilters = ['resource', 'gender']
const regionsMapForDiacritics = {
  piltover: 'Piltóver',
  targon: 'Targón',
  freljord: 'Fréljord',
  vacio: 'Vacío',
  bandle: 'Ciudad De Bandle'
}

const speciesMapForDiacritics = {
  serdelvacio: 'Ser Del Vacío',
  espiritu: 'Espíritu',
  sermagico: 'Ser Mágico'
}

const championsMap = {
  aurelionsol: 'Aurelion Sol',
  aurelion: 'Aurelion Sol',
  belveth: 'Bel\'Veth',
  chogath: 'Cho\'Gath',
  drmundo: 'Dr. Mundo',
  mundo: 'Dr. Mundo',
  jarvaniv: 'Jarvan IV',
  jarvan: 'Jarvan IV',
  ksante: 'K\'Sante',
  kaisa: 'Kai\'Sa',
  khazix: 'Kha\'Zix',
  nunu: 'Nunu y Willump',
  nunuywillump: 'Nunu y Willump',
  reksai: 'Rek\'Sai',
  maestroyi: 'Maestro Yi',
  yi: 'Maestro Yi',
  renata: 'Renata Glasc',
  renataglasc: 'Renata Glasc',
  twistedfate: 'Twisted Fate',
  velkoz: 'Vel\'Koz',
  xinzhao: 'Xin Zhao'
}

// Helper function to poblate the database

// import { readJSON } from '../../utils.js'
// const champions = readJSON('./champions.json')
// function poblateDatabase (champs) {
//   for (const champion of champs) {
//     ChampionModel.createChampion(champion)
//   }
// }

// (poblateDatabase(champions))
